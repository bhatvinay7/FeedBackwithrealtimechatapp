from sqlalchemy import Column, Integer, String,ForeignKey,Boolean,DateTime
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
from datetime import datetime,timezone
class IndividualMessageStatus(Base):
    __tablename__ = "IndividualMessageStatus"
    id = Column(Integer, primary_key=True, index=True)
    messageId=Column(Integer, ForeignKey("IndividualMessage.id"),index=True)
    receiverId=Column(Integer, ForeignKey("users.id"),index=True,nullable=False)
    isMessageSeen = Column(Boolean,default=False)  
    isReceived=Column(Boolean,default=False)      
    isDelevered=Column(Boolean,default=False)    
    timeStamp= Column(DateTime, default=lambda: datetime.now(timezone.utc),nullable=False)
    user = relationship("User", back_populates="IndividualMessageStatus")
    IndividualMessage=relationship("IndividualMessage",back_populates="status",)
    
    