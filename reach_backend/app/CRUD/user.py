# api/user.py
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from sqlalchemy.orm import Session
from app.Models.User import User
from utility.createToken import  create_jwt_token
import bcrypt
from app.DB_Connection.db_connection import get_db

from app.Schema.userSchema import userForm
router = APIRouter(
    prefix="/api/user",
    tags=["user"]
)

@router.post("/signup")
def create_user(user:userForm = Depends(userForm.as_form), db: Session = Depends(get_db)):
    try:
        # token=create_jwt_token({"username": user.username, "emailId": user.emailId}, 30)
        print(user)
        current_user= db.query(User).filter(User.emailId == user.emailId).first()
        if current_user :
            return JSONResponse(
            status_code=409, 
            content={"message": "Email already exists."}
        )
        hashedPassword = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt()) 
        db_user = User(
        username=user.username,
        emailId=user.emailId,
        password=hashedPassword.decode('utf-8')
    )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    
        return JSONResponse(status_code=201,content={"message":"User created successfully"})
    except Exception as e:
        print(e)
        return JSONResponse(
            status_code=500, 
            content={"message": f"An error occurred: {str(e)}"}
        )    

        
    