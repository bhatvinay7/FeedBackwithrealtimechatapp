from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from fastapi import APIRouter,Depends
from app.DB_Connection.db_connection import get_db
from app.Schema.one2one_messageSchema import One2OneMessageForm
from app.Models.IndividualMessage import IndividualMessage
from app.Models.IndividualMessageStatus import IndividualMessageStatus 
router=APIRouter(
    prefix='/one_to_one_message',
    tags=['one_2_one_message']
) 


@router.post('/add')
def one_to_one_message(message: One2OneMessageForm = Depends(One2OneMessageForm.as_Form), db: Session = Depends(get_db),):
    try:
        new_message = IndividualMessage(
            projectId=message.projectId,
            senderId=message.senderId,
            Link="",
            timeStamp="",
            status =[ IndividualMessageStatus(
            messageId=new_message.id,
            receiverId=message.receiverId,
            isDelevered=True,
            timeStamp=message.timeStamp
         ) ] 
        )
            

        db.add(new_message)
    
        db.commit()
        db.refresh(new_message)

        return JSONResponse(status_code=201, content={"message": "Message sent successfully"})

    except Exception as e:
        db.rollback()
        return JSONResponse(status_code=500, content={"message": f"An error occurred: {str(e)}"})

       