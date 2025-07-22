from fastapi import Form
from pydantic import BaseModel,Field

class InviteSchema(BaseModel):
    phonenumber: str = Field(...,min_length=10, max_length=10)
    projectId: int = Field(...)
    userId: int = Field(...)

    @classmethod
    def as_form(
        cls,
        phonenumber: str = Form(...),
        projectId: int = Form(...),
        userId:int = Form(...)
    ):
        return cls(phonenumber=phonenumber, projectId=projectId, userId=userId)