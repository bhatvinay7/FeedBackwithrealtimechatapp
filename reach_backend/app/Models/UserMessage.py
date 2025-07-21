from sqlalchemy import Column, Integer, String,ForeignKey,Boolean,DateTime
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
from app.Models import Project
from app.Models import User
from app.Models import GroupMessage
from datetime import datetime,timezone

class UserMessage(Base):
    __tablename__ = "UserMessages"
    id = Column(Integer, primary_key=True, index=True)
    projectId=Column(Integer,ForeignKey("Projects.id"),nullable=False)
    messageId=Column(Integer, ForeignKey("GroupMessages.id", ondelete="CASCADE"),nullable=False)
    receiverId=Column(Integer, ForeignKey("users.id"),nullable=False)
    timeStamp=Column(DateTime, default=lambda: datetime.now(timezone.utc),nullable=False)    
    isMessageSeen = Column(Boolean,default=False)  
    isReceived=Column(Boolean,default=False)      
    isDelevered=Column(Boolean,default=False)    
    project = relationship("Project", back_populates="userMessages")
    user = relationship("User", back_populates="message")
    userMessage=relationship("GroupMessage",back_populates="message")
    
    