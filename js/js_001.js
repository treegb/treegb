var eyeIndex = document.querySelectorAll('.eyeIndex');

for (var i=0 ; i<eyeIndex.length ; i++) {
    var eyeIndexCurrent = eyeIndex[i];
    var eyeIndexSrc = "./img/eye.png";
    eyeIndexCurrent.setAttribute('src', eyeIndexSrc);
}

var eye = document.querySelectorAll('.eye');

for (var i=0 ; i<eye.length ; i++) {
    var eyeCurrent = eye[i];
    var eyeSrc = "../img/eye.png";
    eyeCurrent.setAttribute('src', eyeSrc);
}