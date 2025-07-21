import express from 'express'

const app = express();
import { Kafka } from 'kafkajs';
const kafka = new Kafka({
  clientId: 'my-app',
 brokers: ['kafka1:9092', 'kafka2:9093','kafka3:9094']
})
const consumerGroup = kafka.consumer({ groupId: 'group-message-group' });
try{
    (async()=>{
        await consumerGroup.connect();
        await consumerGroup.subscribe({ topic: 'group-messages', fromBeginning: true });
        
        await consumerGroup.run({
          eachMessage: async ({ message }) => {
            console.log('Group message:', message.value?.toString());
          },
        });
    
    
    })()

}
catch(error:any){
    console.log(error.message)
}

app.listen(3004, () => {
  console.log('kafka Server2 is running on port 3004');
});