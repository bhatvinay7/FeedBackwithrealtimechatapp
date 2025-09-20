from pydantic import BaseModel, Field, model_validator
from fastapi import Form


class GroupMessage(BaseModel):
    message:str =Field(...)
    projectId:int=Field(...)
    senderId:int = Form(...)
    
    # Example of a Pydantic field validator
    @model_validator(mode="after")
    def validate_message(self):
        if self.message=="":
           raise ValueError("Please provide message")
        elif self.projectId=="" or self.senderId=="":
             raise ValueError("message not sent! try again")

    
    
    
    @classmethod
    def as_form(
        cls,
        message: str = Form(...),
        projectId:int=Form(...),
        senderId:int = Form(...)
    ):
        return cls(
            message=message,
            projectId=projectId,
            senderId=senderId
        )    