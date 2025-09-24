import jwt
from app.core.config import settings
from datetime import datetime, timedelta
from fastapi import HTTPException,Request
ALGORITHM = "HS256"

from datetime import datetime, timedelta

ALGORITHM = "HS256"

def create_jwt_token(data: dict, time: int):
    expires_delta = timedelta(minutes=time)
    print(expires_delta)
    print(data)

    to_encode = data.copy()  # Don't mutate the original dictionary
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)

def decode_jwt_token(request:Request):
    try:
        token= request.headers["Authorization"].split(" ")[1]
        print(token)
        payload = jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    


