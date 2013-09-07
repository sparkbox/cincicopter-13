var c = require('./commands');
var arDrone = require('ar-drone');
var client = arDrone.createClient();

c.land(client);
