let assert = require('assert');


describe('Game should init to false', () => {
    let gamePlaying = true;
    it('should degault gamePlaying to false initially', () =>{
        assert.equal(gamePlaying).should.equal(true)
    })
});
