from sqlalchemy import Column, Integer, String,ForeignKey,Boolean
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
class ManagerFeedBack(Base):
    __tablename__ = "managerFeedBack"
    id = Column(Integer, primary_key=True, index=True)
    projectId=Column(Integer,ForeignKey("Projects.id"),nullable=False)
    project_delivery=Column(Integer,nullable=False)
    receiverId=Column(Integer, ForeignKey("users.id"),nullable=False)
    work_accuracy=Column(Integer,nullable=False)
    team_collaboration=Column(Integer,nullable=False)
    areas_for_improvement=Column(String,nullable=False)
    discription=Column(String,nullable=False)
    timeStamp= Column(String)      
    projectFeedBack= relationship("Project", back_populates="ManagerFeedBack")
    user = relationship("User", back_populates="receiver")
   
    
  
    