from fastapi import FastAPI
from sqlalchemy.orm import Session
from app.core.config import settings
from app.CRUD.user import router as user_router
from app.Models import *
from starlette.middleware.sessions import SessionMiddleware
from app.DB_Connection.db_connection import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.api.router.googleAuth import router as auth_router
from app.CRUD.create_project import router as projrct_create_router
from app.CRUD.employee_FeedBack import router as employee_feedBack_router
from app.CRUD.pull_messages import router as message_router
from app.CRUD.pull_project_Members import router as Project_member_router
from app.CRUD.single_user121_message import router as One_to_One_mmessage_router
from app.CRUD.accept_invite import router as invite_router
from app.CRUD.project import router as project_Router
from app.CRUD.projectDetails import router as project_detail
from app.CRUD.manger_FeedBack import router as manger_feedback_router
from app.CRUD.projectFeedback import router as project_link_router
from app.CRUD.pullChannels import router as channel_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"${settings.NEXT_PUBLIC_FRONTEND_API_URL}"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
app.add_middleware(SessionMiddleware, secret_key=settings.secret_key)


Base.metadata.create_all(bind=engine)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(projrct_create_router)
app.include_router(employee_feedBack_router)
app.include_router(message_router)
app.include_router(Project_member_router)
app.include_router(One_to_One_mmessage_router)
app.include_router(invite_router)
app.include_router(project_Router)
app.include_router(project_detail)
app.include_router(manger_feedback_router)
app.include_router(project_link_router)
app.include_router(channel_router)