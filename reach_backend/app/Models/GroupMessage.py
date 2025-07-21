from sqlalchemy import Column, Integer, String,ForeignKey,Boolean,DateTime
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
from datetime import datetime,timezone
import datetime
class GroupMessage(Base):
    __tablename__ = "GroupMessages"
    id = Column(Integer, primary_key=True, index=True)
    projectId=Column(Integer, ForeignKey("Projects.id"),nullable=False)
    message=Column(String,nullable=False)
    fileLink=Column(String,nullable=True)
    senderId=Column(Integer, ForeignKey("users.id"),nullable=False)      
    timeStamp= Column(DateTime, default=lambda: datetime.now(timezone.utc),nullable=False)
    ProjectMessage= relationship("Project", back_populates="groupMessage")
    user = relationship("User", back_populates="groupMessage")
    message=relationship("UserMessage",back_populates="userMessage",cascade="all, delete-orphan")
    
    