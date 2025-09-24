from pydantic import BaseModel, Field ,model_validator,ConfigDict
from typing import Optional
from fastapi  import Form, Depends

class userForm(BaseModel):
    username: Optional[str|None] = Field(..., min_length=3, max_length=10)
    emailId: str = Field(..., pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$')  

    password: str = Field(..., min_length=8, max_length=10)

    @model_validator(mode='after')
    def validate_password(self):
        password = self.password
        # if not any(char.isdigit() for char in password):
        #     raise ValueError('Password must contain at least one digit.')
        # if not any(char.isupper() for char in password):
        #     raise ValueError('Password must contain at least one uppercase letter.')
        return self 
    
    @classmethod
    def as_form(
        
        
        cls,
        username: Optional[str |None]  = Form(...),
        emailId: str = Form(...),
        password: str = Form(...),
       
    ):
        return cls(username=username, emailId=emailId, password=password)    
    
    
class User_Response_Schema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    emailId: str
    mobilenumber:str
    picture:str
    # add more fields as needed

    

class Project_Reponse_Schema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:int
    projectDiscription:str
    projectName:str
    projectStatus:str
    

class MemberWithProjectSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    member:User_Response_Schema
    # user: Project_Reponse_Schema
        