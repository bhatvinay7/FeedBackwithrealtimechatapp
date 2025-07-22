import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
console.log("hii")
import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

import { Kafka } from 'kafkajs';

const kafka = new Kafka({ clientId: 'chat-app', brokers: ['kafka1:9092', 'kafka2:9093','kafka3:9094'] });
const producer = kafka.producer();


import { createClient } from "redis";
const REDIS_URL = process.env.Redis_URL;
const password = process.env.password;
const port = process.env.port;
const publisher = createClient({
  username: "default",
  password: password!,
  socket: {
    host: REDIS_URL!,
    port: parseInt(port!),
  },
});
const subscriber = createClient({
  username: "default",
  password: password!,
  socket: {
    host: REDIS_URL!,
    port: parseInt(port!),
  },
});

(async () => {
  await publisher.connect();
  await subscriber.connect();
  await producer.connect();
  console.log("Connected to Redis");
  console.log("connected to kafka server")
})();

// // Handle potential errors for both clients
// publisher.on('error', (err) => console.error('Publisher Redis Client Error:', err));
// subscriber.on('error', (err) => console.error('Subscriber Redis Client Error:', err));
// Create a WebSocket server on a specific port

const userRoomMap = new Map<WebSocket, Map<string, number>>();
const rooms = new Map<string, Set<WebSocket>>();
interface Message {
  userId?: number;
  roomId?: number;
  message?: string;
  subscribe?: boolean | null;
  type:string
}

wss.on("connection", (ws) => {
  console.log("user");


  ws.on("message", async (data: string) => {
    const message: Message = JSON.parse(data.toString());
   
    if (message.subscribe && message.roomId) {
      const previousRoomId = userRoomMap.get(ws)?.keys().next().value!;

      //  Remove the socket from the previous room (if any)
      if (
        previousRoomId &&
        rooms.has(previousRoomId) &&
        previousRoomId !== `${message.roomId}-${message.type}`!
      ) {
        rooms.get(previousRoomId)!.delete(ws);
      }

      if (!rooms.has(`${message.roomId}-${message.type}`)) {
        rooms.set(`${message.roomId}-${message.type}`, new Set());
        await subscribeToRoomChannel(`${message.roomId}-${message.type}`); // Subscribe to this Redis room/channel only once
      }
      rooms.get(`${message.roomId}-${message.type}`)!.add(ws);
      const userId = message.userId;
      const roomMap = new Map<string, number>();
      roomMap.set(`${message.roomId}-${message.type}`, userId!);
      userRoomMap.set(ws, roomMap);

      if (message.message) {
        // const buffer: Buffer = Buffer.from(message.message);
        await publishMessage(`${message.roomId}-${message.type}`, JSON.stringify(message));
      }
    }
   else if(!message.subscribe){
   const users = rooms.get(userRoomMap.get(ws)?.keys().next().value!);
   ws.send("UNSUBSCRIBED FROM THE CHANNEL");
    if (users?.size == 0) {
      subscriber.unsubscribe(
        userRoomMap.get(ws)?.keys().next().value!.toString()?.split("-")?.[0]!
      );
    }
    users!.delete(ws);
    userRoomMap.delete(ws);

    }

  });

  ws.on("close", () => {
    const users = rooms.get(userRoomMap.get(ws)?.keys().next().value!);
    if (users?.size == 0) {
      subscriber.unsubscribe(
        userRoomMap.get(ws)?.keys().next().value?.split("-")?.[0]!
      );
    }
    ws.send("UNSUBSCRIBED FROM THE CHANNEL");
    users!.delete(ws);
    userRoomMap.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server started on port 8080");

async function subscribeToRoomChannel(roomId: string) {
  await subscriber.subscribe(
    roomId.toString(),
    async (messageStr: string, channel: string) => {
      const clients = rooms.get(channel);
    //   const user=clients?.values().next().value
    //   if(user){
      

    //   }
    const [roomId,chatType]=channel.split("-")
    console.log(chatType)

  if(chatType=="not_group"){
    console.log("inside not group");
      await producer.send({
      topic: 'one-to-one-messages',
      messages: [{ value: messageStr }],
    });

  }  
  else if(chatType=="group"){
      await producer.send({
      topic: 'group-messages',
      messages: [{ value:messageStr }],
    });
  }

// For group
      
      if (clients) {
        for (const client of clients) {
          const roomMap = userRoomMap.get(client);
          if (
            client.readyState === WebSocket.OPEN &&
            roomMap?.get(channel) != JSON.parse(messageStr).userId.toString()
          ) {
           
            


            client.send(messageStr);
          }
        }
      }
    }
  );
}

// Example of publishing a message
async function publishMessage(channel:string, message: string) {
  try {
    if (message) {
      console.log("inside pub");

      await publisher.publish(channel.toString(), message);
    }
  } catch (err) {
    console.error("Error publishing message:", err);
  }
}


app.listen(8080, () => {
  console.log("WebSocket server is running on port 8080");
}
)