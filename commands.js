var h = require('./helpers');

module.exports = {
  land: function(client) {
    h.log('Landing');
    client.land(function() {
      h.log('Landed');
      process.exit();
    });
  },
  exitIfLowBattery: function(client) {
    var batteryLevel = client.battery();
    if (batteryLevel <= 20) {
      h.log('Battery too low ('+batteryLevel+'%), exitting.');
      process.exit();
    } else {
      h.log('Battery all good ('+batteryLevel+'%).');
    }
  }
};
