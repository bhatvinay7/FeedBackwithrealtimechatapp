import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { Kafka,SASLOptions } from 'kafkajs'
const app = express();
const kafka = new Kafka({
 clientId: 'feedback-client1',
 brokers: ["feedback-cluster-kafka-bootstrap.kafka:9092"],
 ssl: false,      
  sasl: {
    mechanism: 'plain',
    username: process.env.username,
    password: process.env.password
  } as SASLOptions 
})


const consumerOneToOne = kafka.consumer({ groupId: 'one-to-one-group' });

try{
    ( async()=>{

    await consumerOneToOne.connect();
    await consumerOneToOne.subscribe({ topic: 'one-to-one-messages', fromBeginning: false });
    
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
app.listen(3005,"0.0.0.0",()=>{
    console.log("kafka server1 is running on port 3005")
})