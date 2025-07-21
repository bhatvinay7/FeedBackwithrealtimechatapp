from pydantic import BaseModel, Field, model_validator,validators
from fastapi import Form


class GroupMessage(BaseModel):
    message:str =Field(...)
    projectId:str=Field(...)
    
    
    # Example of a Pydantic field validator
    @classmethod
    def validate_message(cls, value):
        if value.message=="":
           raise ValueError("Please provide message")
        elif value.projectId=="":
             raise ValueError("message not sent! try again")
        return value
    
    
    @classmethod
    def as_form(
        cls,
        message: str = Form(...),
        projectId:str=Form(...),
    ):
        return cls(
            message=message,
            projectId=projectId,
        )    