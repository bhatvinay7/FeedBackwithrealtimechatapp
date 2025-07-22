# from fastapi import APIRouter, Depends
# from app.DB_Connection.db_connection import get_db

from fastapi import Form
from pydantic import BaseModel, Field


class IndividualMessageStatus(BaseModel):
    timestamp: str = Field(...)

    @classmethod
    def as_form(
        cls,
        timeStamp: str = Form(...),
    ):
        return cls(timeStamp=timeStamp)
