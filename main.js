var arDrone = require('ar-drone');
var client = arDrone.createClient();

var land = function() {
  console.log('Landing');
  client.land(function() {
    console.log('Landed');
    process.exit();
  });
};

// client.on('navdata', console.log);

var ROTATE_SPEED = 0.8,
SPIN_WAIT = 3000;

main = function() {
  console.log('Taking Off');
  client.takeoff();

  client.after(3000, function() {
    this.clockwise(ROTATE_SPEED);
  }).after(SPIN_WAIT, function() {
    this.stop();
  }).after(50, function() {
    land();
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
