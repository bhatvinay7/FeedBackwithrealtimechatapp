from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from fastapi import Depends, APIRouter, Query
from app.DB_Connection.db_connection import get_db
from utility.auth_Middleware import verify_auth
from app.Models.Project import Project
from app.Models.ProjectMembers import ProjectMember
from app.Models.User import User
from app.Models.managerFeedBack import ManagerFeedBack
from app.Schema.userSchema import (
    User_Response_Schema,
)
from app.Models.TiggerProjectFeedBack import TiggerFeedBack


router = APIRouter(prefix="/api/project", tags=["project_Details"])


@router.get("/details", dependencies=[Depends(verify_auth)])
def get_project_Details(projectId: int = Query(...), db: Session = Depends(get_db)):
    try:

        print(type(projectId))
        if not projectId:
            return JSONResponse(
                status_code=400, content={"message": "Project Id is missing"}
            )

        members = (
            db.query(
                User.id.label("id"),
                User.username.label("username"),
                User.emailId.label("emailId"),
                User.mobilenumber.label("mobilenumber"),
                User.picture.label("picture"),
                ManagerFeedBack.receiverId.label("isFeedbackReceived"),
            )
            .join(ProjectMember, User.id == ProjectMember.userId)
            .outerjoin(ManagerFeedBack, ManagerFeedBack.receiverId == User.id)
            .filter(ProjectMember.projectId == projectId)
            .all()
        )
        print(members)

        project_details = (
            db.query(
                Project.id.label("id"),
                Project.projectName.label("projectName"),
                Project.projectDiscription.label("projectDescription"),
                cast(Project.projectStatus, String).label("projectStatus"),
                TiggerFeedBack.isFeedBackOpen.label("isFeedbackOpen"),
                User.username.label("managerName"),
                User.picture.label("picture"),
            )
            .join(User, Project.managerId == User.id)
            .outerjoin(TiggerFeedBack, TiggerFeedBack.projectId == Project.id)
            .filter(Project.id == projectId)
        )
        # print(project_details)
        results = [row._asdict() for row in project_details]
        print(results)

        # Members = [
        #     User_Response_Schema.model_validate(user).model_dump() for user in members
        # ]
        Members = [row._asdict() for row in members]

        print(Members)

        results = {**results[0], "members": Members}

        print(results)

        return JSONResponse(status_code=200, content={"data": results})

    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})
