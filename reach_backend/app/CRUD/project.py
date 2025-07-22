from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session, func
from fastapi import APIRouter, Depends
from app.DB_Connection.db_connection import get_db
from Models.User import User
from Models.ProjectMembers import ProjectMember
from Models.Project import Project

router = APIRouter(prefix="/project", tags=["Project"])


@router.get("/info")
def project_info(db: Session = Depends(get_db)):
    try:
        projects = (
            db.query(
                Project.ProjectId,
                Project.projectName,
                Project.projectStatus,
                Project.projectStartDate,
                Project.projectEndDate,
                User.username.label("managerName"),
                members_count=func.count(ProjectMember.id),
            )
            .join(Project.managerId == User.id)
            .outerjoin(ProjectMember, Project.id == ProjectMember.projectId)
            .filter(Project.isDeleted == False)
            .group_by(Project.id, User.username)
            .all()
        )
        return JSONResponse(status_code=200, content={"data": projects})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "server error"})
