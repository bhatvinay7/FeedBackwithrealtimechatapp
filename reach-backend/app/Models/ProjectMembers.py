from sqlalchemy import Column, Integer,ForeignKey,String
from sqlalchemy.orm import relationship
from  app.DB_Connection.db_connection import Base

class ProjectMember(Base):
    __tablename__ = "ProjectMembers"
    id = Column(Integer, primary_key=True, index=True)
    phonenumber=Column(String, nullable=False)
    projectId=Column(Integer, ForeignKey("Projects.id"),nullable=False)
    userId=Column(Integer, ForeignKey("users.id"),nullable=False)
    project=relationship("Project", back_populates="ProjectMember")   
    employee=relationship("User", back_populates="user")
    
