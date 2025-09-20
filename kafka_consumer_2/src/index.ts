import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express();
import { Kafka } from 'kafkajs';
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9093','kafka3:9094']
})

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

// Updated interface to handle both managerId and userId
interface Member {
  id: number;
  role?: 'manager' | 'employee'; // Optional field to distinguish roles
}

// Interface for the incoming message
interface UserMessage {
  roomId: string;
  message: string;
  userId: string;
  timeStamp: string;
}

// Initialize Redis connection
(async () => {
  try {
    await publisher.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.error('Redis connection failed:', error);
  }
})();

const consumerGroup = kafka.consumer({ groupId: 'group-message-group' });

// Helper function to get or create members list
async function getMembersForProject(roomId: string): Promise<Member[]> {
  try {
    // First check Redis cache
    // const cachedData = await publisher.get(`${roomId}`);
    // if (cachedData) {
    //   return JSON.parse(cachedData) as Member[];
    // }

    // If not in cache, fetch from database
    const project = await prisma.projects.findUnique({
      where: {
        id: parseInt(roomId)
      },
      select: {
        managerId: true,
        ProjectMembers: {
          select: {
            userId: true
          }
        },
      }
    });
    console.log(project)
    if (!project) {
      console.error(`Project with id ${roomId} not found`);
      return [];
    }

    // Combine managerId and ProjectMembers into a unified members array
    const members: Member[] = [];
    
    // Add manager
    if (project.managerId) {
      members.push({
        id: project.managerId,
        role: 'manager'
      });
    }
    for (const id of project?.ProjectMembers){
      members.push({id:id?.userId,role:"employee"})
    }



    // Cache the result in Redis for future use
    await publisher.set(`${roomId}`, JSON.stringify(members));
    console.log(`Cached ${members.length} members for project ${roomId}`);

    return members;
  } catch (error) {
    console.error('Error getting members for project:', error);
    return [];
  }
}

// Main consumer logic
async function startKafkaConsumer() {
  try {
    await consumerGroup.connect();
    console.log('Kafka consumer connected');
    
    await consumerGroup.subscribe({ topic: 'group-messages', fromBeginning: false });
    console.log('Subscribed to group-messages topic');
    
    await consumerGroup.run({
      eachMessage: async ({ message, partition }) => {
        try {
          // console.log(`Processing message from partition ${partition}, offset ${offset}`);
          
          if (!message.value) {
            console.warn('Received empty message');
            return;
          }

          const messageStr = message.value.toString();
          
          // Validate message content
          if (!messageStr || messageStr.trim() === '' || messageStr === 'null' || messageStr === 'undefined') {
            console.warn('Received invalid message content:', messageStr);
            return;
          }

          // Parse the message
          let userMessage: UserMessage;
          try {
            userMessage = JSON.parse(messageStr);
          } catch (parseError) {
            console.error('Failed to parse message JSON:', parseError);
            return;
          }

          // Validate required fields
          if (!userMessage.roomId || !userMessage.userId || !userMessage.message) {
            console.warn('Missing required fields in message:', userMessage);
            return;
          }

          console.log('Processing group message:', userMessage);

          // Get members for this project
          const members = await getMembersForProject(userMessage.roomId);
          
          if (members.length === 0) {
            console.warn(`No members found for project ${userMessage.roomId}`);
            return;
          }

          // Create the group message
          const newMessage = await prisma.groupMessages.create({
            data: {
              projectId: parseInt(userMessage.roomId),
              message: userMessage.message,
              senderId: parseInt(userMessage.userId),
              timeStamp: userMessage.timeStamp
            }
          });

          console.log(`Created group message with ID: ${newMessage.id}`);

          // Optional: Create user messages for delivery tracking
          // Uncomment and modify based on your schema
        
          await Promise.all(
            members.map(async (member: Member) => {
              try {
                return await prisma.userMessages.create({
                  data: {
                    projectId: parseInt(userMessage.roomId),
                    messageId: newMessage.id,
                    receiverId: member.id,
                    isDelevered: true, // Note: fixed typo from "isDelevered"
                    timeStamp: newMessage.timeStamp
                  }
                });
              } catch (error) {
                console.error(`Failed to create user message for member ${member.id}:`, error);
                return null;
              }
            })
          );
        

        } catch (messageError) {
          console.error('Error processing message:', messageError);
          // Don't throw here to avoid stopping the consumer
        }
      },
    });

  } catch (error) {
    console.error('Kafka consumer error:', error);
    throw error;
  }
}

// Start the consumer with proper error handling
(async () => {
  try {
    await startKafkaConsumer();
    console.log('Kafka consumer started successfully');
  } catch (error) {
    console.error('Failed to start Kafka consumer:', error);
    process.exit(1);
  }
})();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  try {
    await consumerGroup.disconnect();
    await publisher.quit();
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  try {
    await consumerGroup.disconnect();
    await publisher.quit();
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

app.listen(3004,"0.0.0.0", () => {
  console.log('Kafka Consumer Server is running on port 3004');
});