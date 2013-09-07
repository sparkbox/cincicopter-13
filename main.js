var arDrone = require('ar-drone');
var client = arDrone.createClient();

var land = function() {
  client.after(1, function() {
    client.land();
  }).after(1, function() {
    process.exit();
  });
};

// var run = function(function)

var ROTATE_SPEED = 0.8,
SPIN_WAIT = 3000;

main = function() {
  client.takeoff();

  client.after(5000, function() {
    this.clockwise(ROTATE_SPEED);
  }).after(SPIN_WAIT, function() {
    this.stop();
  }).after(1000, function() {
    this.counterClockwise(ROTATE_SPEED);
  }).after(SPIN_WAIT, function() {
    this.stop();
  }).after(50, function() {
    this.land();
  }).after(50, function() {
    process.exit();
  });
};

try {
  main();
} catch (e) {
  console.log('Landing due to exception.');
  client.land();
  client.after(1, function() {
    process.exit();
  });
}
