from fastapi.response import JSONResponse
from sqlalchemy.orm import Session
from app.Models.Project import Project
from fastapi import APIRouter,Depends
from app.DB_Connection.db_connection import get_db
from app.Schema.projectSchema import ProjectForm

router=APIRouter(
    prefix="/project",
    tags=["Project"]
)
@router.post("/create")
def  create_Project(project:ProjectForm=Depends(ProjectForm.as_form),db:Session=Depends(get_db)):
    try:
        
        
        new_project = Project(
            projectName=project.projectName,
            managerName=project.managerName,
            projectDiscription=project.projectDiscription,
            projectStatus=project.projectStatus,
            projectStartDate=project.projectStartDate,
            projectEndDate=project.projectEndDate
        )
        
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        
        return JSONResponse(status_code=201, content={"message": "Project created successfully"})
    
    except Exception as e:
        return JSONResponse(
            status_code=500, 
            content={"message": f"An error occurred: {str(e)}"}
        )