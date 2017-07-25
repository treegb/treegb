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


/* ** Get viewport dimension and always listen for any changes. */
var viewportwidth;
var viewportHeight;

function getViewportWidthHeight() {
    viewportWidth = Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
    viewportHeight = Math.min(document.documentElement.clientHeight, window.innerHeight || 0); 
}

addLoadEvent(getViewportWidthHeight);
window.addEventListener("resize", getViewportWidthHeight);


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




/* ** Create <liScrollJumpBtn>. When clicking this narrow button on the right side of scrren, viewport will pop out "option box" and you can chose to jump to given <li> top or bottom. This give user some navigation convenience. */
/* ** Global variable to save status. */

var liScrollJumpClickLiRgist1;
var liScrollJumpClickLiAbsPosRgist1;
var scrollYRgist1;
/* ** Set to null is important since it tell later function this position is not set yet. */
var scrollYRgist2 = null;
var scrollYRgist3 = 0;
var scrollYRgist4 = 0;
var scrollYRgist5 = 0;

function liScrollJump() {
    /* ** Create <liScrollJumpBtn> DOM structure. */
    var liAll = document.querySelectorAll(".section1 li");
    
    function getScrollY () {
        /* ** I get this code from here : https://stackoverflow.com/questions/19618545/body-scrolltop-vs-documentelement-scrolltop-vs-window-pagyoffset-vs-window-scrol */
        /* <window.scrollY> should return current document position (body scroll bar position) (viewport top left to body top left distance), but I don't know why it don't work in my firefox. */
        return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    
    /* ** Get current clicked li element absolute position and also current document scrollY position. */
    function getElmAbslPos(elm) {
        scrollYRgist1 = getScrollY();
        /* ** <getBoundingClientRect().top> is distance that specific element relative to viewport top left position.
           For example, if viewport is at 30% document position, and given element is at 46% document position, the <getBoundingClientRect().top> will return 16%. (actually it will return a interger, and the unit is px).
           This code need to cauculate here because user might move (scroll) the viewport even when <jumpOptMain> is poping out (desktop). */
        var rltPos = elm.getBoundingClientRect().top;
        /* ** Calculate element absolute position based on <elmRltPos>. */
        liScrollJumpClickLiAbsPosRgist1 = scrollYRgist1 + rltPos;
    }
    
    var i = 0;

    for (; i < liAll.length ; i++) {
        var liScrollJumpBtn = document.createElement("div");
        liScrollJumpBtn.classList.add("liScrollJumpBtn");
        liAll[i].appendChild(liScrollJumpBtn);
    }
    
    /* ** Create <jumpOptMain> and corresponding DOM structure. */
    var jumpOptMain = document.createElement("div");
    jumpOptMain.classList.add("jumpOptMain");
    jumpOptMain.classList.add("hide");
    jumpOptMain.innerHTML =
        '<div class="jumpOptAbrt jumpOptBackAbrt">' +
        '    <img class="icon glow" src="../img/170724_202104.svg">' +
        '    <img class="icon dim" src="../img/170724_202109.svg">' +
        '</div>' +
        '<div class="jumpOptBack jumpOptBackAbrt">' +
        '    <img class="icon glow" src="../img/170724_202103.svg">' +
        '    <img class="icon dim" src="../img/170724_202108.svg">' +
        '</div>' +
        '<div class="jumpOptUp jumpOptUpDown">' +
        '    <img class="icon glow" src="../img/170724_202101.svg">' +
        '    <img class="icon dim" src="../img/170724_202106.svg">' +
        '</div>' +
        '<div class="jumpOptDown jumpOptUpDown">' +
        '    <img class="icon glow" src="../img/170724_202101.svg">' +
        '    <img class="icon dim" src="../img/170724_202106.svg">' +
        '</div>' +
        '<div class="jumpOptBmk jumpOptBmkJump jumpOptBmk1Jump">' +
        '    <p class="textPcent">0<span class="textPcentPcentSign">%</span></p>' +
        '    <p class="textDscrpt">Jump to bookmark 1</p>' +
        '</div>' +
        '<div class="jumpOptBmk jumpOptBmkSave jumpOptBmk1Save">' +
        '    <div class="iconCtn">' +
        '        <img class="icon glow" src="../img/170724_202105.svg">' +
        '        <img class="icon dim" src="../img/170724_202110.svg">' +
        '    </div>' +
        '    <p class="textDscrpt">Save to bookmark 1</p>' +
        '</div>' +
        '<div class="jumpOptBmk jumpOptBmkJump jumpOptBmk2Jump">' +
        '    <p class="textPcent">0<span class="textPcentPcentSign">%</span></p>' +
        '    <p class="textDscrpt">Jump to bookmark 2</p>' +
        '</div>' +
        '<div class="jumpOptBmk jumpOptBmkSave jumpOptBmk2Save">' +
        '    <div class="iconCtn">' +
        '        <img class="icon glow" src="../img/170724_202105.svg">' +
        '        <img class="icon dim" src="../img/170724_202110.svg">' +
        '    </div>' +
        '    <p class="textDscrpt">Save to bookmark 2</p>' +
        '</div>' +
        '<div class="jumpOptBmk jumpOptBmkJump jumpOptBmk3Jump">' +
        '    <p class="textPcent">0<span class="textPcentPcentSign">%</span></p>' +
        '    <p class="textDscrpt">Jump to bookmark 3</p>' +
        '</div>' +
        '<div class="jumpOptBmk jumpOptBmkSave jumpOptBmk3Save">' +
        '    <div class="iconCtn">' +
        '        <img class="icon glow" src="../img/170724_202105.svg">' +
        '        <img class="icon dim" src="../img/170724_202110.svg">' +
        '    </div>' +
        '    <p class="textDscrpt">Save to bookmark 3</p>' +
        '</div>';

    document.body.appendChild(jumpOptMain);
    

    /* ** Applying <.section1> <addEventListener("click", ... )> some function, to detect current scroll position and clicked object first, for later use.  */
    var section1All = document.querySelectorAll(".section1");
    var i = 0;

    for (; i < section1All.length ; i++) {
        section1All[i].addEventListener("click",
            function(a) {
                if (a.target.classList.contains("liScrollJumpBtn")) {
                    var btn = a.target;
                    liScrollJumpClickLiRgist1 = btn.parentNode;
                    getElmAbslPos(liScrollJumpClickLiRgist1);
                    jumpOptMain.classList.remove("hide");
                }
            }
        );
    }
    
    
    /* ** Applying <jumpOptMain> <addEventListener("click", ... )> and this feature function. */
    document.querySelector(".jumpOptMain").addEventListener("click",
        function(a) {
            /* ** Set some "padding" so the screen will not clip off top of the page information. Unit is px.
               Example - If set to <viewportHeight * (35/100);> = pad 35% of screen height. */
            var padTop = viewportHeight * (50/100);
            var textPcentString = "<span class='textPcentPcentSign'>%</span>";
            
            /* ** This adjusting value will make "percent value indicator" more accurate, when scroll to page bottom, percent value should be exactly "100%", not less than 100% (due to screen have some height and scrollY calculate from top left of screen). */
            function adjustDocElmOfstHeight(scrollY) {
                return Math.round(scrollY / (document.documentElement.offsetHeight - viewportHeight) * 100);
            }

            /* ** Function of pressing different button. */
            if (a.target.classList.contains("jumpOptUp") || document.querySelector(".jumpOptUp").contains(a.target)) {
                window.scrollTo(0, liScrollJumpClickLiAbsPosRgist1 - padTop);
                scrollYRgist2 = scrollYRgist1;
            } else if (a.target.classList.contains("jumpOptDown") || document.querySelector(".jumpOptDown").contains(a.target)) {
                window.scrollTo(0, liScrollJumpClickLiAbsPosRgist1 + liScrollJumpClickLiRgist1.clientHeight - padTop);
                scrollYRgist2 = scrollYRgist1;
            } else if (a.target.classList.contains("jumpOptBack") || document.querySelector(".jumpOptBack").contains(a.target)) {
                if (scrollYRgist2 === null) {
                    /* ** Do nothing. */
                } else {
                    window.scrollTo(0, scrollYRgist2);
                }
            } else if (a.target.classList.contains("jumpOptAbrt") || document.querySelector(".jumpOptAbrt").contains(a.target)) {
                /* ** Do nothing. */
            /* ** Bmk1. */
            } else if (a.target.classList.contains("jumpOptBmk1Jump") || document.querySelector(".jumpOptBmk1Jump").contains(a.target)) {
                window.scrollTo(0, scrollYRgist3);
                scrollYRgist2 = scrollYRgist1;
            } else if (a.target.classList.contains("jumpOptBmk1Save") || document.querySelector(".jumpOptBmk1Save").contains(a.target)) {
                scrollYRgist3 = getScrollY();
                /* ** Custom display string. */
                document.querySelector(".jumpOptBmk1Jump .textPcent").innerHTML = adjustDocElmOfstHeight(scrollYRgist3).toString() + textPcentString;
            /* ** Bmk2. */
            } else if (a.target.classList.contains("jumpOptBmk2Jump") || document.querySelector(".jumpOptBmk2Jump").contains(a.target)) {
                window.scrollTo(0, scrollYRgist4);
                scrollYRgist2 = scrollYRgist1;
            } else if (a.target.classList.contains("jumpOptBmk2Save") || document.querySelector(".jumpOptBmk2Save").contains(a.target)) {
                scrollYRgist4 = getScrollY();
                /* ** Custom display string. */
                document.querySelector(".jumpOptBmk2Jump .textPcent").innerHTML = adjustDocElmOfstHeight(scrollYRgist4).toString() + textPcentString;
            /* ** Bmk3. */
            } else if (a.target.classList.contains("jumpOptBmk3Jump") || document.querySelector(".jumpOptBmk3Jump").contains(a.target)) {
                window.scrollTo(0, scrollYRgist5);
                scrollYRgist2 = scrollYRgist1;
            } else if (a.target.classList.contains("jumpOptBmk3Save") || document.querySelector(".jumpOptBmk3Save").contains(a.target)) {
                scrollYRgist5 = getScrollY();
                /* ** Custom display string. */
                document.querySelector(".jumpOptBmk3Jump .textPcent").innerHTML = adjustDocElmOfstHeight(scrollYRgist5).toString() + textPcentString;
            }
            
            jumpOptMain.classList.add("hide");
        }
    );
}

addLoadEvent(liScrollJump);

