module.exports = (userlog) => {
  //Change status field
  //Means NOTHING, just simulating log processing by adding a status field'
  userlog.status = 'Processed';
  return userlog;
};
