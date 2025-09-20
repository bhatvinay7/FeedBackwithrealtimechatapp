from fastapi import Form
from pydantic import BaseModel,Field

class InviteSchema(BaseModel):
    mobilenumber: str = Field(...,min_length=10, max_length=10)
    # projectId: int = Field(...)
  

    @classmethod
    def as_form(
        cls,
        mobilenumber: str = Form(...),
        # projectId: int = Form(...),
       
    ):
        return cls(mobilenumber=mobilenumber)