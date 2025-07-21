import express from 'express'

import { Kafka } from 'kafkajs'
const app = express();
const kafka = new Kafka({
  clientId: 'chat',
 brokers: ['kafka1:9092', 'kafka2:9093','kafka3:9094']
})


const consumerOneToOne = kafka.consumer({ groupId: 'one-to-one-group' });

try{
    ( async()=>{

    await consumerOneToOne.connect();
    await consumerOneToOne.subscribe({ topic: 'one-to-one-messages', fromBeginning: true });
    
    await consumerOneToOne.run({
      eachMessage: async ({ message }) => {
        const messageStr = message.value?.toString();
        const parsedMessage = JSON.parse(messageStr!);
        
      },
    });

})();

}

catch(error:any){
    console.log(error.message)
}
app.listen(3005,()=>{
    console.log("kafka server1 is running on port 3005")
})