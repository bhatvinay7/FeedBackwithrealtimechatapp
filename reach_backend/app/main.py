from fastapi import FastAPI
# from app.DB_Connection import get_db
from sqlalchemy.orm import Session
from app.core.config import settings
from app.CRUD.user import router as user_router
from app.Models import *
from starlette.middleware.sessions import SessionMiddleware
from app.DB_Connection.db_connection import Base,engine
from fastapi.middleware.cors import CORSMiddleware
from app.api.router.googleAuth import router as auth_router
app= FastAPI()

app.add_middleware(CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST","PATCH","DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
app.add_middleware(SessionMiddleware, secret_key=settings.secret_key)


# index = pc.Index("your-index-name")
Base.metadata.create_all(bind=engine)
# app.include_router(store_email, prefix="/email")
# app.include_router(get_autoResponse, prefix="/get_auto_response")
app.include_router(auth_router)
app.include_router(user_router)

