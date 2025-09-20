from fastapi.responses import JSONResponse
from fastapi import Request, Query
from sqlalchemy.orm import Session
from app.Models.ProjectMembers import ProjectMember
from fastapi import APIRouter, Depends
from app.DB_Connection.db_connection import get_db
from app.Schema.invite_schema import InviteSchema
from utility.createToken import decode_jwt_token
from app.Models.User import User
from utility.createRedisClient import get_redis_client
import uuid
router = APIRouter(prefix="/api/invite", tags=["invite"])


@router.post("/accept")
def accept_invite(
    request: Request,
    groupId=Query(...),
    unqId=Query(...),
    ProjectMembers: InviteSchema = Depends(InviteSchema.as_form),
    db: Session = Depends(get_db),
):
    try:

        token = decode_jwt_token(request)
        print(ProjectMembers)
        member= (
            db.query(ProjectMember)
            .filter(
                ProjectMember.userId == token.get("id"),
                ProjectMember.projectId == groupId,
            )
            .first()
        )
        if member:
            return JSONResponse(
                status_code=409,
                content={"message": "User are already joined the group"},
            )
        redisClient=get_redis_client()    
        getId=redisClient.get('unqId')
        if not getId or getId != unqId:
            return JSONResponse(
                status_code=400,
                content={"message": "Invalid or expired invitation link"},
            )    
            
        update_user=db.query(User).filter(User.id==token.get('id')).first()
        update_user.mobilenumber=ProjectMembers.mobilenumber    
        print(update_user)
        new_member = ProjectMember(
            projectId=groupId,
            userId=token.get("id"),
            phonenumber=ProjectMembers.mobilenumber,
        )
        db.add(new_member)
        db.commit()
        db.refresh(new_member)
        redisClient.delete('unqId')
        return JSONResponse(
            status_code=201,
            content={"message": "you have been added to the project successfully"},
        )

    except Exception as e:
        print(str(e))
        return JSONResponse(
            status_code=500, content={"message": f"An error occurred: {str(e)}"}
        )

@router.get('/generate/invite_link')
def generate_invite_link(groupId:int=Query(...),db:Session=Depends(get_db)):
    try:
       unique_id =uuid.uuid4()

       uuid_string = str(unique_id)
       redisClient=get_redis_client()  
       redisClient.set('unqId', uuid_string, ex=60*60*24)
       return JSONResponse(
           status_code=200,
           content={"invite_link": f"/api/invite/accept?groupId={groupId}&unqId={uuid_string}"}
       )
    except Exception as e:
        print(str(e))
        return JSONResponse(
            status_code=500, content={"message": f"An error occurred: {str(e)}"}
        )   
        
        
        
        
        
        
    except Exception as e:
        print(str(e))
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})    