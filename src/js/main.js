var cookie = require('cookie');

window.onload = function () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL;
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var localMediaStream = null;
  var streaming = false;
  var uid = cookie.parse(document.cookie).uid;
  var socket = io('http://localhost:8080/');

  canvas.dataset.uid = uid;

  socket.on('connect', function () {
    socket.on('face', function (data) {
      var img = document.querySelector('img[data-uid="'+data.uid+'"]');
      if (img === null) {
        img = document.createElement('img');
        img.dataset.uid = data.uid;
        document.body.appendChild(img);
      }
      img.src = data.face;

      var tmpImg = new Image();
      tmpImg.src = data.face;

      var comp = ccv.detect_objects({
        canvas: ccv.grayscale(ccv.pre(tmpImg)),
        cascade: cascade,
        interval: 5,
        min_neighbors: 1
      });
      console.log(comp);
      if (comp.length === 0) {
        img.classList.add("away");
      } else {
        img.classList.remove("away");
      }
    });

    socket.on('goodbye', function (uid) {
      var img = document.querySelector('img[data-uid="'+uid+'"]');
      document.body.removeChild(img);
    });
  });

  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true, audio: false}, function (stream) {
      localMediaStream = stream;
      video.src = window.URL.createObjectURL(localMediaStream);
      resizeVideoAndCanvas();
    }, function (error) {
      // error
    });
  }

  var resizeVideoAndCanvas = function () {
    var width = 320;
    var height = 240;
    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
  };

  var capture = function () {
    var data;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    data = {face: canvas.toDataURL('image/png'), uid: uid};
    socket.emit('face', data);
  };
  (function () {
    capture();
    setTimeout(arguments.callee, 1000);
  })();
};
