from sqlalchemy import Column, Integer, String,ForeignKey,UniqueConstraint
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base

from datetime import datetime,timezone
import datetime
class UserFeedBack(Base):
    __tablename__ = "UserFeedBack"
    id = Column(Integer, primary_key=True, index=True)
    projectId=Column(Integer, ForeignKey("Projects.id"),index=True)
    message=Column(String,nullable=False)
    rating=Column(Integer,nullable=False)
    senderId=Column(Integer, ForeignKey("users.id"),nullable=False)      
    timeStamp= Column(String,nullable=False)
    project = relationship("Project", back_populates="userFeedback")
    user= relationship("User", back_populates="FeedBack")
    __table_args__ = (
        UniqueConstraint("projectId", "senderId", name="uix_project_employee_feedback"),
    )
  
    