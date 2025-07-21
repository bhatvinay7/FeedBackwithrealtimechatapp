from sqlalchemy import Column, Integer, String,ForeignKey,Boolean,DateTime
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
from datetime import datetime,timezone
class IndividualMessage(Base):
    __tablename__ = "IndividualMessage"
    id = Column(Integer, primary_key=True, index=True)
    projectId=Column(Integer, ForeignKey("Projects.id"),nullable=False)
    senderId=Column(Integer, ForeignKey("users.id"),nullable=False)
    message= Column(String,nullable=True)
    Link=Column(String,nullable=True)       
    isDeleted=Column(Boolean,nullable=True,default=False) 
    timeStamp= Column(DateTime, default=lambda: datetime.now(timezone.utc),nullable=False)
    project= relationship("Project", back_populates="IndividualMessage")
    user = relationship("User", back_populates="IndividualMessage")
    status=relationship("IndividualMessageStatus",back_populates="IndividualMessage")
    
    
    