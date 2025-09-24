
from typing import Any
from pydantic import BaseModel, Field, model_validator
from fastapi import Form

class ProjectForm(BaseModel):
    projectName: str = Field(..., min_length=3)
    projectDiscription: str = Field(..., min_length=10)
    projectStatus: str = Field(...)
    projectStartDate: str = Field(...)
    projectEndDate: str = Field(...)

    @model_validator(mode='after')
    def validate_project(self) -> 'ProjectForm':
        if self.projectStatus not in ["PENDING", "IN_PROGRESS", "COMPLETED",'NOT_STARTED']:
            raise ValueError('Project status must be one of: Not Started, In Progress, Completed.')
        if not self.projectStartDate:
            raise ValueError('Please provide the project start date.')
        if not self.projectEndDate:
            raise ValueError('Please provide the estimated project end date.')
        if(self.projectStartDate > self.projectEndDate):
            raise ValueError('Project start date cannot be after the end date.')
        return self

    @classmethod
    def as_form(
        cls,
        projectName: str = Form(...),
        projectDiscription: str = Form(...),
        projectStatus: str = Form(...),
        projectStartDate: str = Form(...),
        projectEndDate: str = Form(...)
    ):
        return cls(
            projectName=projectName,
            projectDiscription=projectDiscription,
            projectStatus=projectStatus,
            projectStartDate=projectStartDate,
            projectEndDate=projectEndDate
        )




