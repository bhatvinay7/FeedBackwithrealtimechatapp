from fastapi import HTTPException, Request
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from app.core.config import settings
SECRET_KEY = settings.secret_key
ALGORITHM = "HS256"

def verify_auth(request: Request):
    auth = request.headers.get("Authorization") or request.cookies.get('token')
    print(auth)
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization token missing")
    
    token = auth.split(" ")[1]
    print(token)
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        return payload
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
