from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session, Depends,IntegrityError
from fastapi import APIRouter,Depends
from app.Models.UserFeedBack import UserFeedBack
from app.DB_Connection.db_connection import get_db
from app.Schema.userFeedBackSchema import UserFeedBackForm

router=APIRouter(
    prefix="/feedback",
    tags=["Feedback"]
) 

@router.post("/employee_create_feedback")
def create_employee_feedback(feedback: UserFeedBackForm = Depends(UserFeedBackForm.as_form), db: Session = Depends(get_db)):
    try:
        
        # check for required fields in UserFeedBackForm.as_form
        
        
        new_feedback = UserFeedBack(
            userId=feedback.userId,
            projectId=feedback.projectId,
            feedbackText=feedback.feedbackText,
            rating=feedback.rating
        )
        
        db.add(new_feedback)
        db.commit()
        db.refresh(new_feedback)
        
        return JSONResponse(status_code=201, content={"message": "Thank you for giving your feedback"})
    except IntegrityError as e:
        db.rollback()
        return JSONResponse(status_code=409, detail="Feedback for this user and project already exists.")   
    except Exception as e:
        return JSONResponse(
            status_code=500, 
            content={"message": f"An error occurred: {str(e)}"}
        )   