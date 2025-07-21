from pydantic import BaseModel,Field,model_validator
from fastapi import Form

class UserFeedBackSchema(BaseModel):
    message:str=Field(...)
    rating:int=Field(...)
    
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
        
    ):
        return cls(
            message=message,
            message=rating,
            
        )
