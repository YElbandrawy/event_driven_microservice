const mongoose = require('mongoose');
const LogRepository = require('../../domain/repositories/logRepository');

const logSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  status: String,
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

logSchema.pre('save', function () {
  if (!this.timeStamp) {
    this.timeStamp = Date.now();
  }
});

const Log = mongoose.model('Log', logSchema);

/******************************************************/
class MongoLogRepository extends LogRepository {
  static async save(log) {
    return await Log.create(log);
  }

  static async find(filter) {
    return await Log.find(filter).sort({ timestamp: -1 }).limit(10);
  }
}

module.exports = MongoLogRepository;
