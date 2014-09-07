var _ = require('lodash');
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/Dev/tty.usbmodem1411", {
    baudrate: 9600
});
// setTimeout(function() {
//     serialPort.write(1, function(err, results) {
//         console.log('err ' + err);
//         console.log('results ' + results);
//     });
// }, 1000);
serialPort.on('open', function() {
    serialPort.on('data', _.throttle(function(data) {
      console.log('data received: ', data, '   ', data.length);
  }, 5000));
});

  // float voltage = analogRead(A0) * VIN / 1024.0;
  // float r1 = voltage / (VIN - voltage);
  // float temperature = 1./( 1./(TERMIST_B)*log(r1)+1./(25. + 273.) ) - 273;

// var serialPort = require("serialport");
// serialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//     console.log(port.pnpId);
//     console.log(port.manufacturer);
//   });
// });
