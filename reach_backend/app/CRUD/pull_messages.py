from fastapi.responses import JSONResponse
from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Query, Request,Form
from app.DB_Connection.db_connection import get_db
from app.Models.User import User
from app.Models.GroupMessage import GroupMessage
from app.Models.UserMessage import UserMessage
from app.Models.Project import Project
from utility.auth_Middleware import verify_auth
from utility.createToken import decode_jwt_token

router = APIRouter(prefix="/api/get_users", tags=["get_Message"])

@router.get("/group_message", dependencies=[Depends(verify_auth)])
def get_users_message(projectId: int = Query(...), db: Session = Depends(get_db)):
    try:
        messages = (
            db.query(
                GroupMessage.message.label("message"),
                GroupMessage.fileLink.label("filelink"),
                GroupMessage.senderId.label("userId"),
                GroupMessage.timeStamp.label("timeStamp"),
                User.username.label("username"),
                User.picture.label("picture"),
                UserMessage.isMessageSeen.label("isMessageSeen"),
                UserMessage.isDelevered.label("isDelevered"),
            )
            .outerjoin(User, GroupMessage.senderId == User.id)
            .outerjoin(UserMessage, UserMessage.messageId == GroupMessage.id)
            .filter(GroupMessage.projectId == projectId)
            .order_by(GroupMessage.timeStamp.asc())
            .all()
        )
        result=[row._asdict() for row in messages]
        print(result)
        print(messages)
        return JSONResponse(status_code=200, content={"data": result})
    except Exception as e:
        print(str(e))
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})


@router.post("/update_message_status", dependencies=[Depends(verify_auth)])
def update_message_status(request:Request, projectId: int = Form(...), db: Session = Depends(get_db)):
    try:
        payload = decode_jwt_token(request)
        print(payload)
        user_Id = payload.get("id")
        print(projectId)
        if not projectId:
            return JSONResponse(
                status_code=409, content={"message": "projectId is missing"}
            )
        messageIds = (
            db.query(UserMessage.id.label("id"))
            .join(GroupMessage, UserMessage.messageId == GroupMessage.id)
            .join(Project,GroupMessage.projectId == Project.id)
            .filter(
                Project.id == projectId,
                UserMessage.isMessageSeen.is_(None),
                UserMessage.receiverId ==user_Id,
            )
        )
        print(messageIds)
        ids = [row.id for row in messageIds]
        if len(ids) > 0:
            db.query(UserMessage).filter(UserMessage.id.in_(ids)).update(
                {
                    UserMessage.isMessageSeen: True,
                    UserMessage.isReceived: True,
                }, 
                synchronize_session=False,  # don't scan all rows into session
            )
        db.commit()

        return JSONResponse(
            status_code=200, content={"message": "message status updated"}
        )

    except Exception as e:
        print(str(e))
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})
