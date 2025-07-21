from pydantic import BaseModel, Field ,model_validator, ValidationError
from typing import Optional
from fastapi  import Form, Depends

class userForm(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    emailId: str = Field(..., pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$')  

    password: str = Field(..., min_length=8, max_length=10)

    @model_validator(mode='after')
    def validate_password(self):
        password = self.password
        if not any(char.isdigit() for char in password):
            raise ValueError('Password must contain at least one digit.')
        if not any(char.isupper() for char in password):
            raise ValueError('Password must contain at least one uppercase letter.')
        return self 
    
    @classmethod
    def as_form(
        cls,
        username: str = Form(...),
        emailId: str = Form(...),
        password: str = Form(...),
       
    ):
        return cls(username=username, emailId=emailId, password=password)    