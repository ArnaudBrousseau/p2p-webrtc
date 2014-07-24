var IRCSignal = require('../lib/irc_signal.js');
var assert = require("assert");

describe('IRCSignal', function(){
    it('creates channels', function(){
      assert.equal('ok', IRCSignal.createIRCChannel());
    });
});
