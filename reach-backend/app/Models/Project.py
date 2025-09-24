from sqlalchemy import Column, Integer, String,ForeignKey,Boolean,Enum
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
import enum


class StatusEnum(enum.Enum):
    NOT_STARTED="not started"
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class Project(Base):
    __tablename__ = "Projects"
    id = Column(Integer, primary_key=True, index=True)
    projectName = Column(String,nullable=False)
    managerId= Column(Integer, ForeignKey("users.id"),nullable=False)
    projectDiscription = Column(String,nullable=False)
    projectStatus = Column(Enum(StatusEnum), default=StatusEnum.NOT_STARTED, nullable=False)          
    projectStartDate = Column(String,nullable=False)
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
    tigger_feedback=relationship("TiggerFeedBack",back_populates="project")