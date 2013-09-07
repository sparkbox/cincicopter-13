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
  var command = commands[0],
  action = command.action,
  wait = command.wait,
  duration = command.duration;

  if (action === 'land') {
    c.land(client);
  } else if(h.isAnimation(action)) {
    h.log(action + ' for ' + wait + 'ms');
    client.animate(action, duration);
  } else {
    h.log(action + ' for ' + wait + 'ms');
    client[command.action](command.speed);
  }
  client.after(wait, function() {
    processCommands(commands.slice(1));
  });
};

main = function() {
  c.exitIfLowBattery(client);

  h.log('Taking Off');
  client.takeoff(function() {
    h.log('Took Off');
    commands = [
      {action: 'stop', wait: 1000},
      {action: 'up', speed: 0.3, wait: 500},
      {action: 'stop', wait: 1000},
      {action: 'flipAhead', wait: FLIP_WAIT, duration: 10},
      {action: 'stop', wait: 1000},
      {action: 'land'},
    ];
    processCommands(commands);
  });
};

try {
  setTimeout(function() { main(); }, 2000);
} catch (e) {
  h.log('Landing due to exception:\n', e);
  client.land(function() {
    process.exit();
  });
}
