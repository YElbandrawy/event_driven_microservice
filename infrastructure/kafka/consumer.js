const { Kafka } = require('kafkajs');
const logHandler = require('../../application/logHandler');

const kafka = new Kafka({
  clientId: 'consumer-service',
  brokers: ['kafka:9093'],
});

const consumer = kafka.consumer({ groupId: 'user-activity-group' });

/**
 * Message:{value:{UserId:"123",action:"ordered"}}
 */
const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-logs', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const log = JSON.parse(message.value.toString());
        logHandler(log);
      } catch (err) {
        console.error('Error processing message:', err);
      }
    },
  });
};

module.exports = consumeMessages;
