var h = require('./helpers');
var c = require('./commands');
var arDrone = require('ar-drone');
var client = arDrone.createClient();

// client.on('navdata', console.log);

var ROTATE_SPEED = 1,
SPIN_WAIT = 2000;

main = function() {
  c.exitIfLowBattery(client);

  h.log('Taking Off');
  client.takeoff(function() {
    h.log('Took Off');
    client.after(3000, function() {
      this.clockwise(ROTATE_SPEED);
    }).after(SPIN_WAIT, function() {
      this.stop();
    }).after(50, function() {
      c.land(client);
    });
  });
};

try {
  main();
} catch (e) {
  h.log('Landing due to exception:\n', e);
  client.land(function() {
    process.exit();
  });
}
