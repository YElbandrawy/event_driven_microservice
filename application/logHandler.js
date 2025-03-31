const logProcessor = require('../domain/services/processLog');
const MongoLogRepository = require('../infrastructure/database/MongoLogRepository');
const Log = require('../domain/entities/Log');

module.exports = async (userLog) => {
  let newLog = new Log(userLog.userId, userLog.action);
  //process
  newLog = logProcessor(newLog);
  await MongoLogRepository.save(newLog);
  console.log('new Log Saved to the DB😄');
};
