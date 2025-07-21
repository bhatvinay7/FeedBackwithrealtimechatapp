from fastapi import APIRouter, Depends,Request
from fastapi.responses import JSONResponse,RedirectResponse
from app.core.config import settings
from app.Models.User import User
from Utility.createToken import create_jwt_token
from urllib.parse import urlencode

from authlib.integrations.starlette_client import OAuth
from sqlalchemy.orm import Session

from app.DB_Connection.db_connection import get_db
# from starlette.config import Config
oauth = OAuth()
oauth.register(
    name='google',
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    access_token_url='https://oauth2.googleapis.com/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/v2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v2/',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

router=APIRouter(prefix="/api",
    tags=["auth"])
@router.get("/auth/google/login")
async def google_login(request:Request):
    redirect_uri = request.url_for("auth_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback",name="auth_callback")
async def auth_callback(request: Request,db:Session=Depends(get_db)):
    try:
       token = await oauth.google.authorize_access_token(request)
       userinfo=token.get("userinfo")
       print(userinfo)
       Cookieetoken=create_jwt_token({"username": userinfo["name"], "emailId": userinfo["email"]}, 30)
       user= db.query(User).filter(User.emailId == userinfo["email"]).first()   
       print(user)
       if user:
           if user and  not user.picture:
               user.picture=userinfo["picture"]
               db.commit()
              
          
          
           response= RedirectResponse(url=f"http://localhost:3000")
           response.set_cookie(
        key="token",
        value=f"{Cookieetoken}",
        httponly=True,        # Prevents JavaScript access (good for auth tokens)
        max_age=3600,         # Cookie expiration in seconds (1 hour)
        expires=3600,         # Same as max_age
        path="/",             # Cookie will be sent with all requests under this path
        secure=False,         # Set to True in HTTPS environments
        samesite="lax"        # Prevents CSRF attacks (strict/lax/none)
        
        
    )
           return response   
            # return JSONResponse(
            # status_code=400, 
            # content={"message": "User credentials are not avalable"}
        
            
       else:
           params = urlencode({"error":"User credentials are not avalable"})
           return RedirectResponse(url=f"http://localhost:3000/signup?{params}")
         
    #    id_token = token.get("id_token")
    #    print(id_token)
    #    user_info = await oauth.google.parse_id_token(request,id_token)
    #    return RedirectResponse(url=f"http://localhost:3000")

    #    redirect_url = f"http://localhost:3000?email={user_info['email']}"
    #    return RedirectResponse(url=redirect_url)
    
    except Exception as e:  
        params = urlencode({"error":f"{str(e)}"})
        return RedirectResponse(url=f"http://localhost:3000/signin?{params}")
        return  JSONResponse(status_code=500, content=f"error - {str(e)}")
