from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy import Session, or_
from app.Models.Project import Project
from app.Models.User import User
from app.DB_Connection.db_connection import get_db
from app.Models.ProjectMembers import ProjectMember

router = APIRouter(prefix="/get_members", tags=["fet_members"])


@router.get("/")
def get_members(projectId: int = Query(...), db: Session = Depends(get_db)):
    try:
        members = (
            db.query(
                User.username,
                User.emailId,
                ProjectMember.phonenumber,
            )
            .outerjoin(ProjectMember, User.id == ProjectMember.userId)
            .outerjoin(Project, Project.userId == User.id)
            .filter(or_(ProjectMember.projectId == projectId, Project.id == projectId))
            .distinct()
            .all()
        )
        return JSONResponse(status_code=200, content={"data": members})

    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})
