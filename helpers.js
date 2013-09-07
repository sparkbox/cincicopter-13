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
  }
};
