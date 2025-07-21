from sqlalchemy import Column, Integer, String,ForeignKey,Boolean,DateTime
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
from datetime import datetime,timezone
import datetime
class Project(Base):
    __tablename__ = "Projects"
    id = Column(Integer, primary_key=True, index=True)
    projectName = Column(String,nullable=False)
    managerName = Column(String,nullable=False)
    managerId= Column(Integer, ForeignKey("users.id"),nullable=False)
    projectDiscription = Column(String,nullable=False)
    projectStatus = Column(String,nullable=False)          
    projectStartDate = Column(DateTime, default=lambda: datetime.now(timezone.utc),nullable=False)
    projectEndDate = Column(String,nullable=False)     
    isFeedBackeOpen= Column(Boolean,nullable=True,default=False)
    isDeleted=Column(Boolean,nullable=True,default=False)
    manager=relationship("User", back_populates="Project")
    ProjectMember = relationship("ProjectMember", back_populates="project")
    groupMessage=relationship("GroupMessage",back_populates="ProjectMessage")
    IndividualMessage=relationship("IndividualMessage",back_populates="project")
    ManagerFeedBack=relationship("ManagerFeedBack",back_populates="projectFeedBack")
    userFeedback=relationship("UserFeedBack",back_populates="project")
    userMessages=relationship("UserMessage",back_populates="project")