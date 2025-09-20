from fastapi import APIRouter, Depends, Request, Query, Form
from fastapi.responses import JSONResponse, RedirectResponse
from app.core.config import settings

from app.Models.User import User
from utility.createToken import create_jwt_token
from urllib.parse import urlencode
import bcrypt

from authlib.integrations.starlette_client import OAuth
from sqlalchemy.orm import Session

from app.DB_Connection.db_connection import get_db

# from starlette.config import Config
oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    access_token_url="https://oauth2.googleapis.com/token",
    access_token_params=None,
    authorize_url="https://accounts.google.com/o/oauth2/v2/auth",
    authorize_params=None,
    api_base_url="https://www.googleapis.com/oauth2/v2/",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

router = APIRouter(prefix="/api", tags=["auth"])


@router.get("/auth/google/login")
async def google_login(
    request: Request, userRole: str = Query(...), path: str = Query(...)
):

    redirect_uri = str(request.url_for("auth_callback"))

    response = await oauth.google.authorize_redirect(request, redirect_uri)
    response.set_cookie(key="userRole", value=userRole, httponly=True)
    response.set_cookie(key="redirectPath", value=path, httponly=True)
    return response


@router.get("/auth/google/callback", name="auth_callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    try:

        user_role = ["employee", "manager"]
        userRole = request.cookies.get("userRole")
        redirect_path = request.cookies.get("redirectPath")
        print(userRole)

        if userRole not in user_role:
            params = urlencode({"error": "please mention the valid role"})
            return RedirectResponse(url=f"http://localhost:3000/signup?{params}")

        params = urlencode({"error": "User credentials are not avalable"})
        token = await oauth.google.authorize_access_token(request)
        print(token)
        userinfo = token.get("userinfo")
        print(userinfo.get("name"))
        user = db.query(User).filter(User.emailId == userinfo["email"]).first()
        print(user)
        Cookieetoken = create_jwt_token(
            {
                "username": userinfo["name"],
                "emailId": userinfo["email"],
                "id": user.id,
                "role": userRole,
                "picture":user.picture
            },
            2*24*60*60,
        )

        print(user)
        if user:
            if user and not user.picture:
                user.picture = userinfo["picture"]
                user.username = userinfo["name"]
                db.commit()

            redirectUrl = "/invite"
            print(redirect_path)
            if redirectUrl == redirect_path:
                path = "http://localhost" + f"{redirectUrl}"
            else:
                path = "http://localhost:3000"
            print(path)

            response = RedirectResponse(url=(path))
            response.set_cookie(
                key="token",
                value=f"{Cookieetoken}",
                httponly=True,  # Prevents JavaScript access (good for auth tokens)
                max_age=3600,  # Cookie expiration in seconds (1 hour)
                expires=3600,  # Same as max_age
                path="/",  # Cookie will be sent with all requests under this path
                secure=True,  # Set to True in HTTPS environments
                samesite="lax",  # Prevents CSRF attacks (strict/lax/none)
            )

            return response
        else:

            return RedirectResponse(url=f"http://localhost:3000/signup?{params}")

    except Exception as e:
        print(e)
        return RedirectResponse(url=f"http://localhost:3000/signin?{params}")


@router.post("/user/signin")
def user_signin(request:Request,
    password: str = Form(...),
    emailId: str = Form(...),
    userRole: str = Query(...),
    path: str = Query(...),
    db: Session = Depends(get_db),
):
    try:
        if not password or not emailId:
            return JSONResponse(
                status_code=409, content={"message": "User credentials are missing"}
            )
        user = db.query(User).filter(User.emailId == emailId).first()
       
        if user:
            if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                return JSONResponse(
                    status_code=404, content={"message": "password is incorrect"}
                )
            Cookieetoken = create_jwt_token(
                {
                    "username": user.username,
                    "emailId": user.emailId,
                    "id": user.id,
                    "role": userRole,
                },
                30,
            )
            redirectUrl = "/invite"

            if redirectUrl == path:
                redirect_path = "http://localhost" + f"{redirectUrl}"
            else:
                redirect_path = "http://localhost:3000/"
                print(path)

                response = RedirectResponse(redirect_path)
                response.set_cookie(
                    key="token",
                    value=f"{Cookieetoken}",
                    httponly=True,  # Prevents JavaScript access (good for auth tokens)
                    max_age=3600,  # Cookie expiration in seconds (1 hour)
                    expires=3600,  # Same as max_age
                    path="/",  # Cookie will be sent with all requests under this path
                    secure=True,  # Set to True in HTTPS environments
                    samesite="lax",  # Prevents CSRF attacks (strict/lax/none)
                )

            return response

        else:
            return JSONResponse(
                status_code=404, content={"message": "User Credentials are not found"}
            )

    except Exception as e:
        print(str(e))
        return JSONResponse(status_code=500, content={"message": f"{str(e)}"})
