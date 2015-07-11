'use strict';

angular.module('dndAdminTemplate')
  .factory('dndsocket', ['socketFactory', '$sessionStorage', function (socketFactory, $sessionStorage) {

    /*var myIoSocket = io.connect('http://ec2-52-10-59-85.us-west-2.compute.amazonaws.com:5000/reports');
    //var myIoSocket = io.connect('http://localhost:3000');

    myIoSocket.on('connect', function (err) {
      console.log("Conectado", err, $sessionStorage.session.cookieId);
      myIoSocket.emit('register', $sessionStorage.session.cookieId)
    });

    myIoSocket.on('connect_failed', function (err) {
      console.log(err, "connect failed");
    });

    var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;*/
    var namespace = '/reports'; // change to an empty string to use the global namespace
    var socket = io.connect('http://ec2-52-10-59-85.us-west-2.compute.amazonaws.com:5000' + namespace);
    socket.on('connect', function() {
      socket.emit('register', {cookie_id: 'e57fea1586d87bd467d00199ed3825ab93457c5333909762e4f5b15cfe3ebd86'});
    });
    socket.on('message', function(json) {
      console.log("message", json);
    });

    return socket;

  }]);

/*
  namespace = '/reports';

  socket = io.connect('http://192.168.1.101:5000' + namespace);

  socket.on('connect', function () {
    console.log("connected");
    socket.emit('register', {cookie_id: '57455727fd9bc7ccb4c6fcfdfabe188a729805fc101b1d2b7fc64e75674c6072'});
  });

  socket.on('message', function (json) {
      console.log(json);
    });
*/
