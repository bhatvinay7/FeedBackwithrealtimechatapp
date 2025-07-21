# models/user.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from  app.DB_Connection.db_connection import Base
from app.Models.GroupMessage import GroupMessage
from app.Models.user_Roles import UserRole
from app.Models.UserFeedBack import UserFeedBack
from app.Models.Project import Project
from app.Models.ProjectMembers import ProjectMember
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String,nullable=False)
    mobileNumber=Column(String,nullable=True)
    emailId=Column(String, unique=True, index=True)
    picture=Column(String, nullable=True)
    password=Column(String,nullable=False)
    user= relationship("ProjectMember", back_populates="employee")
    Project= relationship("Project", back_populates="manager")
    groupMessage=relationship("GroupMessage", back_populates="user")     
    FeedBack=relationship("UserFeedBack", back_populates="user")
    receiver=relationship("ManagerFeedBack", back_populates="user")
    userRole=relationship("UserRole", back_populates="user")
    message=relationship("UserMessage",back_populates="user")
    IndividualMessage=relationship("IndividualMessage",back_populates="user")
    IndividualMessageStatus=relationship("IndividualMessageStatus",back_populates="user") 
    
                                                        
                                                        