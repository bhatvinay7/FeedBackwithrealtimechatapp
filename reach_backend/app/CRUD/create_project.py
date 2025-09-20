from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.Models.Project import Project
from fastapi import APIRouter,Depends,Request
from app.DB_Connection.db_connection import get_db
from app.Schema.projectSchema import ProjectForm
from utility.createToken import decode_jwt_token
from utility.auth_Middleware import verify_auth
from app.Models.Project  import  StatusEnum 
router=APIRouter(
    prefix="/api/project",
    tags=["Project"]
)
@router.post("/create",dependencies=[Depends(verify_auth)])
def  create_Project(request:Request, project:ProjectForm=Depends(ProjectForm.as_form), db:Session=Depends(get_db)):
    try:
        
        payload=decode_jwt_token(request)
        # print(payload)
        # print(project)
        new_project = Project(
            projectName=project.projectName,
            managerId=payload.get('id'),
            projectDiscription=project.projectDiscription,
            projectStatus=StatusEnum[project.projectStatus],
            projectStartDate=project.projectStartDate,
            projectEndDate=project.projectEndDate
        )
        
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        
        return JSONResponse(status_code=201, content={"message": "Project created successfully"})
    
    except Exception as e:
        print(str(e))
        print("hiii")
        return JSONResponse(
            status_code=500, 
            content={"message": f"An error occurred: {str(e)}"}
        )