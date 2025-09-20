from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, Depends,Request,Query
from app.Models.UserFeedBack import UserFeedBack
from app.DB_Connection.db_connection import get_db
from app.Schema.UserFeedBackSchema import UserFeedBackForm
from app.Models.User import User
from utility.auth_Middleware import verify_auth
from utility.createToken import decode_jwt_token
router = APIRouter(prefix="/api/feedback", tags=["Feedback"])

@router.post("/employee_feedback",dependencies=[Depends( verify_auth)])
def create_employee_feedback(request:Request,
    feedback: UserFeedBackForm = Depends(UserFeedBackForm.as_form),
    db: Session = Depends(get_db),
):
    try:

        payload=decode_jwt_token(request)
        print(feedback)
        new_feedback = UserFeedBack(
            senderId=payload.get('id'),
            projectId=feedback.projectId,
            message=feedback.message,
            rating=feedback.rating,
            timeStamp=feedback.timeStamp
        )

        db.add(new_feedback)
        db.commit()
        db.refresh(new_feedback)

        return JSONResponse(
            status_code=201, content={"message": "Thank you for giving your feedback"}
        )
    except IntegrityError as e:
        print(str(e))
        db.rollback()
        return JSONResponse(
            status_code=409, content={"message":"Feedback for this user and project already exists."}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500, content={"message": f"An error occurred: {str(e)}"}
        )


@router.get("/get_employee_feedback")
def get_employee_feedback(
    projectId:int=Query(...),
    db: Session = Depends(get_db),
):
    try:
        # if not feedbacks:
        #     return JSONResponse(
        #         status_code=404,
        #         content={"message": "No feedback found for this user in this project"},
        #     )
        print(projectId)
        feedbacks = (
            db.query(
                UserFeedBack.message.label('message'),
                UserFeedBack.rating.label('rating'),
                UserFeedBack.timeStamp.label('timeStamp'),
                User.username.label("username"),
                User.picture.label("picture"),
            )
            .join(
                User,
                UserFeedBack.senderId == User.id,
            )
            .filter(UserFeedBack.projectId == projectId)
            .all()
        )
        print(feedbacks)
        data=[feedback._asdict() for feedback in feedbacks]
        print(data)
        return JSONResponse(
            status_code=200,
            content={"data": data},
        )
    except Exception as e:
        print(str(e))
        return JSONResponse(
            status_code=500, content={"message": f"An error occurred: {str(e)}"}
        )
