from fastapi.response import JSONResponse
from sqlalchemy.orm import Session
from app.Models.ProjectMembers import ProjectMembers
from fastapi import APIRouter,Depends
from app.DB_Connection.db_connection import get_db
from app.Schema.projectMemberSchema import ProjectMemberForm
router=APIRouter(
    prefix="/invite",
    tags=["invite"]
    
)
@router.post('/accept')
def accept_invite(ProjectMember:ProjectMemberForm=Depends(ProjectMemberForm.as_Form),db:Session=Depends(get_db)):
    try:
        token=""
        new_member=ProjectMember(
            
            phoneNumber=ProjectMember.phoneNumber,
            projectId=ProjectMember.projectId,
            userId=token.id
        )
        
        db.add(new_member)
        db.commit()
        db.refresh(new_member)
        return JSONResponse(status_code=201,content={"message":"you have been added to the project successfully"})
        
    except Exception as e:
        return JSONResponse(status_code=500,content={"message":f"An error occurred: {str(e)}"    })   
        
        
        
        
        
    