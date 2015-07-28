var five = require("johnny-five");
var firmata = require("firmata");

//CONSTANTS
var START_SYSEX = 0xF0,
    END_SYSEX = 0xF7,
    NV11_ACTIVATE = 0x52,
    NV11_DATA = 0x53;

var io = new firmata.Board('/dev/cu.usbmodem1411', function() {

    var board = new five.Board({io: io});

    //Register a listener for NV11 sysex messages
    firmata.SYSEX_RESPONSE[NV11_DATA] = function(io) {
        board.info(io.currentBuffer);
    };

    module.exports.nv11 = function(board, rxPin, txPin) {
        board.on('ready', function() {

            // Tell the custom firmata where the LIDAR is plugged in
            var data = [];
            data[0] = START_SYSEX;
            data[1] = NV11_ACTIVATE;
            data[2] = rxPin;
            data[3] = txPin;
            data[4] = END_SYSEX;
            board.io.sp.write(new Buffer(data));

            console.log('Ready!');
        });
    };

    module.exports.nv11(board, 9, 10);
});
