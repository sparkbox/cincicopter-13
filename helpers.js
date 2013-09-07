var _ = require('underscore');

var ANIMATIONS = ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg',
  'theta20degYaw200deg', 'theta20degYawM200deg', 'turnaround',
  'turnaroundGodown', 'yawShake', 'yawDance', 'phiDance', 'thetaDance',
  'vzDance', 'wave', 'phiThetaMixed', 'doublePhiThetaMixed',
  'flipAhead', 'flipBehind', 'flipLeft', 'flipRight'];

module.exports = {
  run: function(command) {
    var args = Array.prototype.slice.call(arguments);
    args = args.slice(0, args.length);
    log(command);
    command.apply(args);
  },
  log: function() {
    var args = Array.prototype.slice.call(arguments);
    console.log('Sparkbot: ', args.join(' '));
  },
  isAnimation: function(commandName) {
    return _.contains(ANIMATIONS, commandName);
  }
};
