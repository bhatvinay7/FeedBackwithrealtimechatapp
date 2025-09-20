from fastapi.responses import JSONResponse
from fastapi import Request, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from fastapi import APIRouter, Depends
from app.DB_Connection.db_connection import get_db
from app.Models.User import User
from app.Models.ProjectMembers import ProjectMember
from utility.createToken import decode_jwt_token
from app.Models.Project import Project
from utility.auth_Middleware import verify_auth

router = APIRouter(prefix="/api/project", tags=["Project"])


@router.get("/info", dependencies=[Depends(verify_auth)])
def project_info(request: Request, index:int=Query(...), db: Session = Depends(get_db)):
    try:
        payload = decode_jwt_token(request)
        print(payload)

        projectCount = (
            db.query(func.count(Project.id).label("totalPages"))
            .filter(
                Project.isDeleted == False,
                or_(
                    Project.managerId == payload.get("id"),
                    ProjectMember.userId == payload.get("id"),
                ),
            ).scalar()

        )

        projects = (
            db.query(
                Project.id.label("projectId"),
                Project.projectName,
                Project.projectStatus,
                Project.projectStartDate,
                Project.projectEndDate,
                User.username.label("managerName"),
                Project.managerId.label("managerId"),
                func.count(ProjectMember.id).label("members_count"),
               
            )
            .outerjoin(User, Project.managerId == User.id)
            .outerjoin(ProjectMember, Project.id == ProjectMember.projectId)
            .filter(Project.isDeleted == False, Project.managerId == payload.get("id"))
            .group_by(Project.id, User.username)
            .offset((index - 1) * 8)
            .limit(8)
            .all()
        )
        results = [
            {
                "managerId": row.managerId,
                "members_count": row.members_count,
                "projectId": row.projectId,
                "projectName": row.projectName,
                "projectStatus": (
                    row.projectStatus.value
                    if hasattr(row.projectStatus, "value")
                    else row.projectStatus
                ),
                "projectStartDate": row.projectStartDate,
                "projectEndDate": row.projectEndDate,
                "managerName": row.managerName,
            }
            for row in projects
        ]
        results= {
            "projects": results,
            "totalPages": projectCount,
        }
        print(results)
        return JSONResponse(status_code=200, content={"data":results})

    except Exception as e:
        print(str(e))
        return JSONResponse(status_code=500, content={"message": "server error"})
