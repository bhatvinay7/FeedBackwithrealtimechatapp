from pydantic import BaseModel, Field
from typing import Optional, List
from fastapi import Form

from fastapi import Form

class FeedbackForm(BaseModel):
    projectId: str = Field(..., min_length=1, description="ID of the project being reviewed is missing")
    receiverId: str = Field(..., min_length=1, description="ID of the user receiving the feedback is missing")
    
    project_delivery: int = Field(
        ..., ge=0, le=10, description="please provide Score for project delivery (0-10)"
    )
    work_accuracy: int = Field(
        ..., ge=0, le=10, description="please provide Score for work accuracy (0-10)"
    )
    team_collaboration: int = Field(
        ..., ge=0, le=10, description=" please provide Score for team collaboration (0-10)"
    )

    areas_for_improvement: str = Field(
        ..., min_length=5, description="please provide Suggestions for areas the employee can improve"
    )
    discription: str = Field(
        ..., min_length=5, description=" please provide General feedback or comments"
    )
    @classmethod
    def as_form(
        cls,
        projectId: str = Form(...),
        receiverId: str = Form(...),
        project_delivery: int = Form(...),
        work_accuracy: int = Form(...),
        team_collaboration: int = Form(...),
        areas_for_improvement: str = Form(...),
        discription: str = Form(...)
    ):
        return cls(
            projectId=projectId,
            receiverId=receiverId,
            project_delivery=project_delivery,
            work_accuracy=work_accuracy,
            team_collaboration=team_collaboration,
            areas_for_improvement=areas_for_improvement,
            discription=discription
        )
