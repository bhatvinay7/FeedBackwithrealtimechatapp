from sqlalchemy import Column, Integer, String,ForeignKey
from sqlalchemy.orm import relationship
from ..DB_Connection.db_connection import Base

class ProjectMember(Base):
    __tablename__ = "ProjectMembers"
    id = Column(Integer, primary_key=True, index=True)
    phoneNumber=Column(Integer, nullable=False)
    projectId=Column(Integer, ForeignKey("Projects.id"),nullable=False)
    userId=Column(Integer, ForeignKey("users.id"),nullable=False)
    project=relationship("Project", back_populates="ProjectMember")   
    employee=relationship("User", back_populates="user")
    
