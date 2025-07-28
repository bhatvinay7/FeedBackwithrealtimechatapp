from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.DB_Connection.db_connection import Base


class Member(Base):
    __tablename__ = "Members"
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("users.id"), nullable=False)
    channelId = Column(String, ForeignKey("Channels.id"), nullable=False,index=True)
    
    user = relationship("User", back_populates="members")
    channel = relationship("Channel", back_populates="members")