import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

import { Kafka,SASLOptions  } from "kafkajs";

const kafka = new Kafka({
  clientId: "chat-app",
  brokers: ["feedback-cluster-kafka-bootstrap.kafka:9092"],
  ssl: false,      
  sasl: {
    mechanism: 'plain',
    username: process.env.username,
    password: process.env.password
  } as SASLOptions 
});
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
  console.log("connected to kafka server");
})();

// // Handle potential errors for both clients
publisher.on("error", (err) =>
  console.error("Publisher Redis Client Error:", err)
);
subscriber.on("error", (err) =>
  console.error("Subscriber Redis Client Error:", err)
);
// Create a WebSocket server on a specific port
const userRoomMap = new Map<WebSocket, Map<string, number>>();
const userSocketMap = new Map<number, WebSocket>();
const rooms = new Map<string, Set<WebSocket>>();
interface Message {
  userId?: number
  roomId?: number
  message?: string|null
  timeStamp?:string
  type: string;
  join?: boolean | null;
}

wss.on("connection", (ws) => {
 
  ws.on("message", async (data: string) => {
    console.log(data.toString())
    const message: Message = JSON.parse(data.toString());
      if(!userSocketMap.get(message.userId!))
      userSocketMap.set(message.userId!, ws);
      if (message.roomId && message.join!) {
        const previousRoomId = userRoomMap
        .get(ws)
        ?.keys()
        .next()?.value!.split("-")?.[0];
        
        if (previousRoomId! != message.roomId.toString()) {
         
          rooms.get(userRoomMap
        .get(ws)
        ?.keys()
        .next()?.value!)?.delete(ws);
          const newUser=new Map()
          newUser.set(`${message.roomId}-${message.type}`,message.userId)
          userRoomMap.set(ws,newUser)
         
          
        }
        
        if (!rooms.has(`${message.roomId}-${message.type}`)) {
          rooms.set(`${message.roomId}-${message.type}`, new Set());
          // console.log(rooms)
          await subscribeToRoomChannel(`${message.roomId}-${message.type}`); // Subscribe to this Redis room/channel only once
        }
        // console.log(rooms.get(`${message.roomId}-${message.type}`))
        rooms.get(`${message.roomId}-${message.type}`)?.add(ws);
        
        console.log(JSON.stringify(rooms.size) +" "+"open on message")
       
        if (message.message) {
        // const buffer: Buffer = Buffer.from(message.message);
        await publishMessage(
          `${message.roomId}-${message.type}`,
          JSON.stringify(message)
        );
      }
    }
    //  else if(!message.subscribe){
    //  const users = rooms.get(userRoomMap.get(ws)?.keys().next().value!);
    //  ws.send("UNSUBSCRIBED FROM THE CHANNEL");
    //   if (users?.size == 0) {
    //     subscriber.unsubscribe(
    //       userRoomMap.get(ws)?.keys().next().value!.toString()?.split("-")?.[0]!
    //     );
    //   }
    //   users!.delete(ws);
    //   userRoomMap.delete(ws);

    //   }
  });

  ws.on("close", async () => {

    const clients = rooms.get(userRoomMap.get(ws)?.keys().next().value!);
    if (clients) {
      clients.delete(ws);
      if (clients.size === 0) {
        console.log('deleted room'+userRoomMap.get(ws)?.keys().next().value!)
        rooms.delete(userRoomMap.get(ws)?.keys().next().value!);
        subscriber.unsubscribe(userRoomMap.get(ws)?.keys().next()?.value!);
      }
      console.log("unsubcribed from " + userRoomMap.get(ws)?.keys().next().value!)
      userRoomMap.delete(ws);
      console.log("confirmed")
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

async function subscribeToRoomChannel(roomId: string) {
  try {
    await subscriber.subscribe(
      roomId.toString(),
      async (messageStr: string, channel: string) => {
        const clients = rooms?.get(channel);
        //   const user=clients?.values().next().value
        //   if(user){

        //   }
        const [roomId, chatType] = channel.split("-");

        if (chatType == "not_group") {
          console.log("inside not group");
          await producer.send({
            topic: "one-to-one-messages",
            messages: [{ value: messageStr }],
          });
        } else if (chatType == "group") {
          await producer.send({
            topic: "group-messages",
            messages: [{ value: messageStr }],
          });
        }

        await SendMessageToUsers(clients, channel, messageStr);
      }
    );
  } catch (error: any) {
    console.log(error.message);
  }
}

// Example of publishing a message
async function publishMessage(channel: string, message: string) {
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
});

async function SendMessageToUsers(
  clients: Set<WebSocket> | undefined,
  channel: string,
  messageStr: string
) {
  try {
    if (clients) {
      for (const client of clients) {
        const roomMap = userRoomMap.get(client)!;
        if (
          client.readyState === WebSocket.OPEN &&
          roomMap.get(channel) != JSON.parse(messageStr).userId
        ) {
          client.send(messageStr);
        }
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
