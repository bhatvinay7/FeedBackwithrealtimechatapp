from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship 
from app.DB_Connection.db_connection import Base

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True)
    name = Column(String,nullable=False)
    userRole=relationship("UserRole",back_populates="role")
