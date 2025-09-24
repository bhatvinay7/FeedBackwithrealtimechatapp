from sqlalchemy import Column, Integer, String,ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime,timezone
from app.DB_Connection.db_connection import Base
import datetime
class UserRole(Base):
    __tablename__ = "user_roles"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True,nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), primary_key=True,nullable=False)
    assigned_at = Column(String,nullable=False)

    user = relationship("User", back_populates="userRole")
    role = relationship("Role", back_populates="userRole")
