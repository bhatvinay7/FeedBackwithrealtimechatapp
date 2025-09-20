from fastapi import Form
from pydantic import BaseModel,Field

class One2OneMessageForm(BaseModel):
    projectId:int=Field(...)
    messageId:int=Field(...)
    receiverId:int=Field(...)
    isDelevered:bool=Field(...)
    timeStamp:str=Field(...)
    
    # timeStamp=Column(DateTime, default=lambda: datetime.now(timezone.utc),nullable=False)    
    # isMessageSeen = Column(Boolean,default=False)  
    # isReceived=Column(Boolean,default=False)      
    @classmethod
    def as_Form(
        cls,
        projectId: int = Form(...),
        messageId: int = Form(...),
        receiverId: int = Form(...),
        isDelevered: bool = Form(...),
        timeStamp :str   = Form(...)
    ):
        return cls(
            projectId=projectId,
            messageId=messageId,
            receiverId=receiverId,
            isDelevered=isDelevered,
            timeStamp=timeStamp
        )