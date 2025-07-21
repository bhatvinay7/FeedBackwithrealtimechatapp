from sqlalchemy import Column, Integer, String,ForeignKey,Boolean,DateTime
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
from app.Models import Project
from app.Models import User
from datetime import datetime,timezone
import datetime
class UserFeedBack(Base):
    __tablename__ = "UserFeedBack"
    id = Column(Integer, primary_key=True, index=True)
    projectId=Column(Integer, ForeignKey("Projects.id"),index=True)
    message=Column(String,nullable=False)
    rating=Column(Integer,nullable=False)
    senderId=Column(Integer, ForeignKey("users.id"),nullable=False)      
    timeStamp= Column(DateTime, default=lambda: datetime.now(timezone.utc))
    project = relationship("Project", back_populates="userFeedback")
    user= relationship("User", back_populates="FeedBack")
 
    