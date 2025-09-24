from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean 

class Channel(Base):
    __tablename__ = "Channels"
    id = Column(String, primary_key=True, index=True)
    members=relationship("Member",back_populates="channel")
    individualMessages = relationship("IndividualMessage", back_populates="channel")
    
    