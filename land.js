var arDrone = require('ar-drone');
var client = arDrone.createClient();

console.log('============ EMERGENCY LANDING =============');
client.land(function() {
  console.log('============ LANDED =============');
  process.exit();
});
