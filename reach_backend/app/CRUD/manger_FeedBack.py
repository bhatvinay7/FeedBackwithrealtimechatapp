from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session,IntegrityError
from fastapi import APIRouter, Depends
from app.Models.managerFeedBack import   ManagerFeedBack
from app.DB_Connection.db_connection import get_db      
from app.Schema.managerFeedBackSchema import ManagerFeedBackForm
router = APIRouter(
    prefix="/manager_feedback", 
    tags=["Manager Feedback"]
)

@router.post("/create")
def create_manager_feedback(feedback: ManagerFeedBackForm = Depends(ManagerFeedBackForm.as_form), db: Session = Depends(get_db)):
    try:
        # check for required fields in ManagerFeedBackForm.as_form
        # add the 
        
        new_feedback = ManagerFeedBack(
            projectId=feedback.projectId,
            feedbackText=feedback.feedbackText,
            rating=feedback.rating,
            project_delivery=feedback.project_delivery,
            receiverId=feedback.receiverId,
            work_accuracy=feedback.work_accuracy,
            team_collaboration=feedback.team_collaboration,     
            areas_for_improvement=feedback.areas_for_improvement,
            discription=feedback.discription,   
            timeStamp=feedback.timeStamp
        )
        
        db.add(new_feedback)
        db.commit()
        db.refresh(new_feedback)
        
        return JSONResponse(status_code=201, content={"message": "Your feedback has been recorded successfully"})
    except IntegrityError as e:
        db.rollback()
        return JSONResponse(status_code=409, detail="Feedback for this user and project already exists.")
    except Exception as e:
        return JSONResponse(
            status_code=500, 
            content={"message": f"An error occurred: {str(e)}"}
        )             
