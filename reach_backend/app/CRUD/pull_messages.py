from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Query
from app.DB_Connection.db_connection import get_db
from app.Models.User import User
from app.Models.GroupMessage import GroupMessage

router = APIRouter(prefix="/get_users", tags=["get_Message"])


@router.get("/group_message")
def get_users_message(projectId: int = Query(...), db: Session = Depends(get_db)):
    try:
        messages = (
            db.query(
                GroupMessage.message,
                GroupMessage.fileLink,
                GroupMessage.senderId,
                GroupMessage.timeStamp,
                User.username.label("senderName"),
                User.picture.label("picture"),
                User.phonenumber.label("phoneNumber"),
            )
            .outerjoin(User, GroupMessage.senderId == User.id)
            .filter(GroupMessage.projectId == projectId)
            .order_by(GroupMessage.timeStamp.asc())
            .all()
        )

        return JSONResponse(status_code=200, content={"data": messages})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})

