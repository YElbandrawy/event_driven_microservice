# Event-Driven Microservice with Node.js and Kafka

## Overview

This project is a **scalable, event-driven microservice** built using **Node.js, Kafka, and MongoDB Atlas**. It processes user activity logs in real-time, leveraging **Kafka** for event streaming, **MongoDB Atlas** for storage, and **Docker & Kubernetes** for deployment.

## Architecture

The system follows a **Domain-Driven Design (DDD)** and consists of the following key components:

1. **Kafka Producer:**

   - Generate Random user activity logs and publishes them to a Kafka topic (topic: 'user-logs').

2. **Kafka Consumer:**

   - Listens for events from the Kafka topic and processes them.
   - Transforms and stores the logs into **MongoDB Atlas**, with optimized indexing for fast retrieval.

3. **MongoDB Atlas Storage:**

   - Chosen for its **scalability**, **managed infrastructure**, and **global distribution**.
   - Proper indexing applied for **fast search and filtering**.

4. **REST API for Log Retrieval:**

   - Provides **pagination and filtering** capabilities.
   - Built using **Express.js**.

5. **Containerization & Deployment:**

   - **Docker** is used to containerize the microservice.
   - **Kubernetes (K8s)** orchestrates the deployment.
   - Can be deployed on **Google Cloud, AWS, or any K8s cluster**.

---

## Features

✅ **Event-driven architecture** using Kafka for real-time log processing.\
✅ **Scalable & Resilient** with microservice design and containerized deployment.\
✅ **Optimized Query Performance** with MongoDB Atlas indexing.\
✅ **REST API** with pagination and filtering for efficient log retrieval.\
✅ **Dockerized & Kubernetes-ready** for cloud deployment.

---

## Setup Instructions

### Prerequisites

- **Node.js**
- **Docker & Kubernetes**
- **Kafka** (Locally)
- **MongoDB Atlas Account**
- **Google Cloud/AWS Account** (for deployment)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/YElbandrawy/event_driven_microservice.git
   cd event_driven_microservice
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB Atlas:

   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database named `Logs`

4. Set up environment variables (`.env` file):

   ```plaintext
   PORT=3000
   DATABASE=<your_mongodb_atlas_connection_string>
   DATABASE_USERNAME=<YOUR_ATLAS_USERNAME>
   DATABASE_PASSWORD=<YOUR_DATABASE_PASSWORD>
   ```

5. Build and Start with Docker Compose:

   ```bash
   docker-compose up -d --build
   ```

6. Start the producer:

   ```bash
   node ./infrastructure/kafka/producer.js
   ```

   Access the logs through the API `http://localhost:3000/api/v1/logs`

---

## API Endpoints

### 1. Fetch Processed Logs

```
GET api/v1/logs?page=1&limit=10&userId=user-123&action=view&startDate=2025-04-01&endDate=2025-04-02
```

#### Query Parameters:

- `page` (int) - Page number (default: 1)
- `limit` (int) - Number of logs per page (default: 10)
- `userId` (string) - Filter by user ID
- `action` (string) - Filter by action type (view, click, etc.)

#### Response Format:

```json
{
  "status": "success",
  "results": 10,
  "data": [
    {
      "_id": "67eb43bd528e57324dfd18c0",
      "userId": "user-321",
      "action": "purchase",
      "status": "Processed",
      "createdAt": "2025-04-01T01:39:09.676Z"
    }
    // More logs...
  ]
}
```

---

## Code Analysis

### `producer.js`

- Generates random user activity logs and sends them to Kafka.
- Uses `kafkajs` for Kafka integration.
- Configurable generation rates and patterns.

```javascript
// Example of how the producer generates logs

const actions = ['login', 'logout', 'purchase', 'view', 'click'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const publishMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: 'user-logs',
    messages: [
      {
        value: JSON.stringify({
          userId: `user-${Math.floor(Math.random() * 1000)}`,
          action: getRandomElement(actions),
          timestamp: Date.now(),
        }),
      },
    ],
  });
  console.log('Message sent!');
  await producer.disconnect();
};

// Send a message every 5 seconds
setInterval(publishMessage, 5000);
```

### `consumer.js`

- Listens for messages from Kafka.
- Passes the received logs to `logHandler`.
- Implements error handling and retries.
- Manages consumer groups for scalable consumption.

### `logHandler.js`

- Processes incoming logs from the consumer.
- Performs data validation and transformation.
- Stores logs in MongoDB with proper indexing.

### `server.js`

- Application entry point.
- Implements Express-based REST API for log retrieval.
- Implements **pagination and filtering**.

---

## Troubleshooting

### Common Issues

1. **Kafka Connection Problems**

   - Verify Kafka brokers are running
   - Check network connectivity
   - Ensure topic 'user-logs' exists

2. **MongoDB Connection Failures**

   - Verify MongoDB Atlas IP whitelist settings
   - Check database credentials
   - Test connection string manually

---

## Author

👨‍💻 **Youssef Elbandrawy**\
💼 **Software Engineer | Node.js Developer**\
📧 [LinkedIn](https://www.linkedin.com/in/youssef-elbandrawy)\
📁 **[GitHub](https://github.com/YElbandrawy)**
