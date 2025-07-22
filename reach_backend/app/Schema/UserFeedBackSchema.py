from pydantic import BaseModel,Field,model_validator
from fastapi import Form

class UserFeedBackSchema(BaseModel):
    message:str=Field(...,min_length=8, max_length=100)
    rating:int=Field(...,max_digits=5)
    projectId:int=Field(...)
    senderId:int=Field(...)   
    
    @model_validator(mode='after')
    def validate(self):
        if self.message=="":
            raise ValueError("please provide the feedback")
        elif self.rating==None:
            raise ValueError("please provide the rating")
    
        elif not self.senderId or not self.projectId :
            raise ValueError("projectId or senderId is missing")
    
    @classmethod
    def as_form(
        cls,
        message: str = Form(...),
        rating: str = Form(...),
        projectId:int = Form(...),
        senderId:int=Form(...)
    ):
        return cls(
            message=message,
            rating=rating,
            projectId=projectId,
            senderId=senderId
        )
