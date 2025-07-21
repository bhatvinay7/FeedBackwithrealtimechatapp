from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret"
ALGORITHM = "HS256"

from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_jwt_token(data: dict, time: int):
    expires_delta = timedelta(minutes=time)
    print(expires_delta)
    print(data)

    to_encode = data.copy()  # Don't mutate the original dictionary
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# from jose import JWTError, jwt

# # Example secret key (in production, store this securely!)
# SECRET_KEY = "your_secret_key"
# ALGORITHM = "HS256"

# # Data to encode into the token
# data = {"sub": "user123"}

# # Create a JWT
# token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# # Decode a JWT
# try:
#     payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#     username = payload.get("sub")
# except JWTError:
#     raise HTTPException(status_code=401, detail="Invalid token")
