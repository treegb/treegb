var eyeIndex = document.querySelectorAll('.eyeIndex');

for (var i=0 ; i<eyeIndex.length ; i++) {
    var eyeIndexCurrent = eyeIndex[i];
    var eyeIndexSrc = "./img/eye.png";
    eyeIndexCurrent.setAttribute('src', eyeIndexSrc);
}