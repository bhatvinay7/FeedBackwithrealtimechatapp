from pydantic import BaseModel, Field
from fastapi import Form


class MnagerFeedbackForm(BaseModel):
    projectId: int = Field(..., description="ID of the project being reviewed")
    receiverId: int = Field(..., description="ID of the employee receiving feedback")

    project_delivery: int = Field(
        ..., ge=0, le=10, description="Score for project delivery (0–10)"
    )
    work_accuracy: int = Field(
        ..., ge=0, le=10, description="Score for work accuracy (0–10)"
    )
    team_collaboration: int = Field(
        ..., ge=0, le=10, description="Score for team collaboration (0–10)"
    )

    areas_for_improvement: str = Field(
        ..., min_length=5, description="Suggestions for improvement"
    )
    description: str = Field(
        ..., min_length=5, description="General feedback or comments"
    )
    timeStamp: str = Field(..., description="Timestamp of the feedback")
    


    @classmethod
    def as_form(
        cls,
        projectId: int = Form(...),
        receiverId: int = Form(...),
        project_delivery: int = Form(...),
        work_accuracy: int = Form(...),
        team_collaboration: int = Form(...),
        areas_for_improvement: str = Form(...),
        description: str = Form(...),
        timeStamp: str = Form(...),
     
    ) -> "MnagerFeedbackForm":
        return cls(
            projectId=projectId,
            receiverId=receiverId,
            project_delivery=project_delivery,
            work_accuracy=work_accuracy,
            team_collaboration=team_collaboration,
            areas_for_improvement=areas_for_improvement,
            description=description,
            timeStamp=timeStamp,
           
        )
        
    