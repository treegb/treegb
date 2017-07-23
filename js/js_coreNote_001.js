/* ** This function offer you can call <window.onload()> several times and don't overwrite older revoke. */
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}


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


/* ** Create <btnToggleHide> in <section1> and make it function to toggle the visibility of <foldableContent>. */
var section1 = document.getElementsByClassName("section1");
var i = 0;

for (; i<section1.length ; i++) {
    var btnToggleHide = document.createElement("div");
    btnToggleHide.classList.add("btnToggleHide");
    btnToggleHide.onclick = function () {
        var btnToggleHide = this;
        var section1 = btnToggleHide.parentNode;
        
        if ( ! (section1.classList.contains("hide")) ) {
            section1.classList.add("hide");
        } else {
            section1.classList.remove("hide");
        }
    }
    section1[i].appendChild(btnToggleHide);
}


/* ** Create <btnToggleHideCodeBlock> for <code4> and <code5> to make it function to toggle the visibility.
   ** Aware, if you rename [<code4> // <code5>] in CSS, this code should update the name too. */
   
var codeBlockAll = document.querySelectorAll(".code5, .code4");
var i = 0;

for (; i < codeBlockAll.length ; i++) {
    var codeBlock = codeBlockAll[i];
    var codeBlockCtn = document.createElement("div");
    codeBlockCtn.classList.add("codeBlockCtn");
    var btnToggleHideCodeBlock = document.createElement("div");
    btnToggleHideCodeBlock.classList.add("btnToggleHideCodeBlock");
    btnToggleHideCodeBlock.onclick = function () {
        var btnToggleHideCodeBlock = this;
        var codeBlockCtn = btnToggleHideCodeBlock.parentNode;
        
        if ( ! (codeBlockCtn.classList.contains("hide")) ) {
            codeBlockCtn.classList.add("hide");
        } else {
            codeBlockCtn.classList.remove("hide");
        }
    }
    /* Insert into DOM. */
    codeBlock.parentNode.insertBefore(codeBlockCtn, codeBlock);
    codeBlockCtn.appendChild(btnToggleHideCodeBlock);
    codeBlockCtn.appendChild(codeBlock);
}


/* ** Create <sideButton> (back to top (TOC) ). (And it's corespond child element). */
var sideButton = document.createElement("div");
sideButton.classList.add("sideButton");
var sideButtonCtn = document.createElement("div");
sideButtonCtn.classList.add("ctn");
var sideButtonUl = document.createElement("ul");
var sideButtonLi1 = document.createElement("li");
var sideButtonLi2 = document.createElement("li");
var toc = document.getElementById("toc");
var sideButtonA = document.createElement("a");
sideButtonA.setAttribute("href", "#toc");
var sideButtonImg = document.createElement("img");
sideButtonImg.setAttribute("src", "../img/back-to-top.png");

sideButtonA.appendChild(sideButtonImg);
sideButtonLi2.appendChild(sideButtonA);
sideButtonLi1.innerHTML="Top"
sideButtonUl.appendChild(sideButtonLi1);
sideButtonUl.appendChild(sideButtonLi2);
sideButtonCtn.appendChild(sideButtonUl);
sideButton.appendChild(sideButtonCtn);
document.body.appendChild(sideButton);


/*window.addEventListener("click",
    function (a) {
        var crrTarget = a.target;
        if (crrTarget.classList.contains("foldableContent")) {
            crrTarget.style.color="red";
        }
    }
);*/


/* Extract iframe content, remove iframe element ("container") and put those content back in same position again. This will cause content in iframe CSS act like they are in invoking document instead of invoked document.  */
function extractIframeConent () {
    var iframes = document.querySelectorAll(".ifrmRefDest");
    var i = 0;

    for (; i<iframes.length ; i++) {
        var iframeCrr = iframes[i];
        var iframeDocumentCrr = iframeCrr.contentDocument || iframeCrr.contentWindow.document;
        /*This code works too, just as same as above. */
        /*var iframeContentCrr = iframeCrr.contentDocument?iframeCrr.contentDocument:iframeCrr.contentWindow.document;*/
        var iframeContentCrr = iframeDocumentCrr.body.querySelector(".ifrmRefSrc");

        while (iframeContentCrr.hasChildNodes()) {
            /*window.alert("nodeType : " + iframeContentCrr.firstChild.nodeType + " ; textContent : " + iframeContentCrr.firstChild.textContent);*/
            iframeCrr.parentNode.insertBefore(iframeContentCrr.firstChild, iframeCrr);
                /*window.alert("left textContent : " + iframeContentCrr.textContent);*/
        }
        
        iframeCrr.parentNode.removeChild(iframeCrr);
    }
};

addLoadEvent(extractIframeConent);

