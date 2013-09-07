var h = require('./helpers');
var c = require('./commands');
var _ = require('underscore');
var arDrone = require('ar-drone');
var client = arDrone.createClient();
// client.on('navdata', console.log);

var ROTATE_SPEED = 1,
SPIN_WAIT = 2000,
FLIP_WAIT = 2000;

var processCommands = function(commands) {
  if (_.isEmpty(commands)) { return; }
  command = commands[0];
  action = command.action;
  if (action === 'land') {
    c.land(client);
  } else {
    h.log(action + ' for ' + command.duration + 'ms');
    client[command.action](command.speed);
    client.after(command.duration, function() {
      h.log('next');
      processCommands(commands.slice(1));
    });
  }
};

main = function() {
  c.exitIfLowBattery(client);

  h.log('Taking Off');
  client.takeoff(function() {
    h.log('Took Off');
    commands = [
      {action: 'stop', duration: 1000},
      {action: 'up', speed: 0.3, duration: 500},
      {action: 'stop', duration: 1000},
      {action: 'clockwise', speed: 0.3, duration: 500},
      {action: 'stop', duration: 1000},
      {action: 'land'},
    ];
    processCommands(commands);
  });
};

try {
  setTimeout(function() { main(); }, 1000);
} catch (e) {
  h.log('Landing due to exception:\n', e);
  client.land(function() {
    process.exit();
  });
}
