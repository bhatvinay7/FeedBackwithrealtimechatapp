from fastapi.responses import JSONResponse
from fastapi import Depends, APIRouter, Request
from app.DB_Connection.db_connection import get_db
from sqlalchemy.orm import Session
from utility.auth_Middleware import verify_auth
from app.Models.TiggerProjectFeedBack import TiggerFeedBack
from app.Models.Project import Project
from app.Models.ProjectMembers import ProjectMember
from app.Models.User import User
from utility.createToken import decode_jwt_token
from app.Models.managerFeedBack import ManagerFeedBack

router = APIRouter(prefix="/api/get", tags=["user_feedback"])


@router.get("/project/feedback", dependencies=[Depends(verify_auth)])
def post_feedback(request: Request, db: Session = Depends(get_db)):
    try:
        payload = decode_jwt_token(request)
        feedBacks = (
            db.query(
                Project.id.label("projectId"), Project.projectName.label("projectName"))
            .outerjoin(TiggerFeedBack, Project.id == TiggerFeedBack.projectId)
            .join(ProjectMember, Project.id == ProjectMember.projectId).outerjoin(ManagerFeedBack,ManagerFeedBack.projectId==Project.id)
            .filter( TiggerFeedBack.isFeedBackOpen==None , ProjectMember.userId == payload.get("id"),ManagerFeedBack.receiverId==None)
        )

        projectids = [row._asdict() for row in feedBacks]
        print(projectids)
        return JSONResponse(status_code=200, content={"data": projectids})
    except Exception as e:
        print(str(e))
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})
