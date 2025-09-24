from fastapi import Depends
from sqlalchemy import Column, Integer, String,Boolean,ForeignKey
from sqlalchemy.orm import relationship
from  app.DB_Connection.db_connection import Base


class  TiggerFeedBack(Base):
    __tablename__="tiggerfeedback"
    id=Column(Integer,primary_key=True,nullable=False,index=True)
    isFeedBackOpen=Column(Boolean,default=False)
    projectId=Column(Integer,ForeignKey("Projects.id"),nullable=False)
    project=relationship("Project",back_populates="tigger_feedback")