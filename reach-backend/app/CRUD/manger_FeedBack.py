from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Request, Query
from app.Models.managerFeedBack import ManagerFeedBack
from app.DB_Connection.db_connection import get_db
from app.Schema.managerFeedBackSchema import MnagerFeedbackForm
from app.Models.Project import Project
from utility.auth_Middleware import verify_auth
from utility.createToken import decode_jwt_token
from app.Models.User import User

router = APIRouter(prefix="/api/manager_feedback", tags=["ManagerFeedback"])


@router.post("/post", dependencies=[Depends(verify_auth)])
def create_manager_feedback(
    feedback: MnagerFeedbackForm = Depends(MnagerFeedbackForm.as_form),
    db: Session = Depends(get_db),
):
    try:
        # check for required fields in ManagerFeedBackForm.as_form
        # add the

        new_feedback = ManagerFeedBack(
            projectId=feedback.projectId,
            project_delivery=feedback.project_delivery,
            receiverId=feedback.receiverId,
            work_accuracy=feedback.work_accuracy,
            team_collaboration=feedback.team_collaboration,
            areas_for_improvement=feedback.areas_for_improvement,
            description=feedback.description,
            timeStamp=feedback.timeStamp,
        )

        db.add(new_feedback)
        db.commit()
        db.refresh(new_feedback)

        return JSONResponse(
            status_code=201,
            content={"message": "Your feedback has been recorded successfully"},
        )
    except IntegrityError as e:
        db.rollback()
        return JSONResponse(
            status_code=409,
            content={"message": "Feedback for this user and project already exists."},
        )
    except Exception as e:
        print(e)
        return JSONResponse(
            status_code=500, content={"message": f"An error occurred: {str(e)}"}
        )


@router.get("/get_feedback")
def manager_feedback_get(request: Request, db: Session = Depends(get_db)):
    try:
        payload = decode_jwt_token(request)
        feedbacks = (
            db.query(
                ManagerFeedBack.id.label("feedbackId"),
                Project.projectName.label("projectName"),
            )
            .join(Project, Project.id == ManagerFeedBack.projectId)
            .filter(ManagerFeedBack.receiverId == payload.get("id"))
            .all()
        )

        # if not feedbacks:
        #     return JSONResponse(status_code=2, content={"message": "No feedback found for this project"})
        print([feedback._asdict() for feedback in feedbacks])
        return JSONResponse(
            status_code=200,
            content={"data": [feedback._asdict() for feedback in feedbacks]},
        )
    except Exception as e:
        print(str(e))
        return JSONResponse(
            status_code=500, content={"message": f"An error occurred: {str(e)}"}
        )


@router.get("/get_feedback/detail")
def manager_feedback_get(
    request: Request, feedbackId=Query(...), db: Session = Depends(get_db)
):
    try:
        payload = decode_jwt_token(request)
        feedbacks = (
            db.query(
                ManagerFeedBack.project_delivery.label("project_delivery"),
                ManagerFeedBack.receiverId.label("receiverId"),
                ManagerFeedBack.work_accuracy.label("work_accuracy"),
                ManagerFeedBack.team_collaboration.label("team_collaboration"),
                ManagerFeedBack.areas_for_improvement.label("areas_for_improvement"),
                ManagerFeedBack.description.label("description"),
                ManagerFeedBack.timeStamp.label("timeStamp"),
            )
            .join(User, ManagerFeedBack.receiverId == User.id)
            .filter(
                ManagerFeedBack.receiverId == payload.get("id"),
                ManagerFeedBack.id == feedbackId,
            ).all()
        )

        print([feedback._asdict() for feedback in feedbacks])
        return JSONResponse(
            status_code=200,
            content={"data": [feedback._asdict() for feedback in feedbacks]},
        )
    except Exception as e:
        print(str(e))
        return JSONResponse(
            status_code=500, content={"message": f"An error occurred: {str(e)}"}
        )
