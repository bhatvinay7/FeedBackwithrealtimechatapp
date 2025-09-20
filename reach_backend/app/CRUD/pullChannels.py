from fastapi.responses import JSONResponse
from fastapi import Depends, APIRouter, Request
from sqlalchemy.orm import Session, aliased
from sqlalchemy import or_, literal, func, and_
from sqlalchemy.sql import case
from app.DB_Connection.db_connection import get_db
from utility.createToken import decode_jwt_token
from app.Models.Project import Project
from app.Models.User import User
from app.Models.ProjectMembers import ProjectMember
from app.Models.GroupMessage import GroupMessage
from app.Models.UserMessage import UserMessage

router = APIRouter(prefix="/api/getChannels", tags=["channels"])


@router.get("/")
def get_Channels(request: Request, db: Session = Depends(get_db)):
    try:
        payload = decode_jwt_token(request)
        user_id = payload.get("id")

        # ---- Subquery: latest message per project ----
        ranked_messages = (
            db.query(
                GroupMessage.id.label("gm_id"),
                GroupMessage.projectId.label("gm_projectId"),
                GroupMessage.message.label("lastMessage"),
                GroupMessage.fileLink.label("fileLink"),
                GroupMessage.timeStamp.label("timeStamp"),
                func.row_number()
                .over(
                    partition_by=GroupMessage.projectId,
                    order_by=GroupMessage.timeStamp.desc()
                )
                .label("rn")
            )
            .subquery()
        )
        gm_alias = aliased(ranked_messages)

        # ---- Subquery: unseen count per project ----
        unseen_subq = (
            db.query(
                GroupMessage.projectId.label("pid"),
                func.count().label("unseenCount")
            )
            .join(UserMessage, UserMessage.messageId == GroupMessage.id)
            .filter(
                UserMessage.receiverId == user_id,
                UserMessage.isMessageSeen.is_(None)
            )
            .group_by(GroupMessage.projectId)
            .subquery()
        )

        # ---- Main query ----
        query = (
            db.query(
                Project.id.label("projectId"),
                Project.projectName.label("projectName"),
                gm_alias.c.lastMessage,
                gm_alias.c.fileLink,
                gm_alias.c.timeStamp,
                literal("group").label("chatType"),
                func.coalesce(unseen_subq.c.unseenCount, 0).label("unseenMessageCount")
            )
            .outerjoin(ProjectMember, ProjectMember.projectId == Project.id)
            .outerjoin(User, User.id == ProjectMember.userId)
            .outerjoin(
                gm_alias,
                and_(
                    gm_alias.c.gm_projectId == Project.id,
                    gm_alias.c.rn == 1
                )
            )
            .outerjoin(unseen_subq, unseen_subq.c.pid == Project.id)
            .filter(
                or_(
                    User.id == user_id,
                    Project.managerId == user_id
                )
            )
            .order_by(func.coalesce(gm_alias.c.timeStamp).desc())
        )

        channel_array = [row._asdict() for row in query]
        return JSONResponse(status_code=200, content={"data": channel_array})

    except Exception as e:
        print(str(e))
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})
