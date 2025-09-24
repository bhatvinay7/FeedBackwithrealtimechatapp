from pydantic import BaseModel,Field,model_validator
from fastapi import Form

class UserFeedBackForm(BaseModel):
    message:str=Field(...,min_length=8, max_length=100)
    rating:int=Field(...)
    projectId:int=Field(...)
    timeStamp:str=Field(...)
        
     
    
    @model_validator(mode='after')
    def validate(self):
        if self.message=="":
            raise ValueError("please provide the feedback")
        elif self.rating==None:
            raise ValueError("please provide the rating")
    
    @classmethod
    def as_form(
        cls,
        message: str = Form(...),
        rating: str = Form(...),
        projectId:int = Form(...),
        timeStamp:str=Form(...)
        
    ):
        return cls(
            message=message,
            rating=rating,
            projectId=projectId,
            timeStamp=timeStamp
        
          
        )
