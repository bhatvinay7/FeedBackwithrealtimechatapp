from sqlalchemy import Column, Integer, String,ForeignKey,Text
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
class GroupMessage(Base):
    __tablename__ = "GroupMessages"
    id = Column(Integer, primary_key=True, index=True)
    projectId=Column(Integer, ForeignKey("Projects.id"),nullable=False)
    message=Column(Text,nullable=False)
    fileLink=Column(String,nullable=True)
    senderId=Column(Integer, ForeignKey("users.id"),nullable=False)      
    timeStamp= Column(String,nullable=False)
    ProjectMessage= relationship("Project", back_populates="groupMessage")
    user = relationship("User", back_populates="groupMessage")
    usermessage=relationship("UserMessage",back_populates="userMessage",cascade="all, delete-orphan")
    
    