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




/* ** Get viewport dimension and always listen for any changes. */
var viewportwidth;
var viewportHeight;

function getViewportWidthHeight() {
    viewportWidth = Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
    viewportHeight = Math.min(document.documentElement.clientHeight, window.innerHeight || 0); 
}

addLoadEvent(getViewportWidthHeight);
window.addEventListener("resize", getViewportWidthHeight);




/* ** The reason I need to put all things into a big <addLoadEvent()> is because any further DOM operation should wait for <extractIframeConent> to ready to get (extract) all iframe content into current HTML DOM. Any DOM operation before <extractIframeConent> is not safe and might cause unexpected result. */
addLoadEvent(function () {
    /* ** "Global-like" varialbe in this big function (and accessible only in this big function). */
    var section1All = document.querySelectorAll(".section1");
    var liAll = document.querySelectorAll(".section1 li");
    var codeBlockAll = document.querySelectorAll(".cbk1");

    /* ** <.eye> and <.eyeIndex> might be useless now (I even forget what different between these 2), I never use them again. */
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

    /* ** Aware <.hide> class in [<.section1> // <.cbk1>] doesn't meant to be a volatile class toggle to be added and removed when clicking button, but to be a "default" or "fall back" value.
       When there is <.forceHide> and <.forceDisplay> class aside, these 2 class will have higher priority effect. */
    /* ** Share function for after similar usage. */
    function toggleHideClass(toggleClassTarget) {
        if (toggleClassTarget.classList.contains("forceHide")) {
            toggleClassTarget.classList.remove("forceHide");
            toggleClassTarget.classList.add("forceDisplay");
        } else if (toggleClassTarget.classList.contains("forceDisplay")){
            toggleClassTarget.classList.remove("forceDisplay");
            toggleClassTarget.classList.add("forceHide");
        } else if (toggleClassTarget.classList.contains("hide")){
            toggleClassTarget.classList.add("forceDisplay");
        } else {
            toggleClassTarget.classList.add("forceHide");
        }
    }

    /* ** Create <btnToggleHide> in <section1> and make it function to toggle the visibility of <foldableContent>. */
    var i = 0;

    for (; i<section1All.length ; i++) {
        /* ** Aware, <.hide> have no any effect on CSS style, the purpose of <.hide> is give here javascript to add <.forceHide> class. HTML document arthor don't need to care about writing <forceHide> and <forceDisplay> class in HTML document. Just simplily put <.hide> in where you expect to hide to give javascript advice to hide here if possible.*/
        if (section1All[i].classList.contains("hide")) {
            section1All[i].classList.add("forceHide");
        }    
    
        var btnToggleHide = document.createElement("div");
        btnToggleHide.classList.add("btnToggleHide");
        btnToggleHide.onclick = function () {
            var btnToggleHide = this;
            var section1 = btnToggleHide.parentNode;
            toggleHideClass(section1);
        }
        
        section1All[i].appendChild(btnToggleHide);
    }


    /* ** Create <btnToggleHideCodeBlock> for <cbk1> to make it function to toggle the visibility.
       ** Aware, if you rename <cbk1> in CSS, this code should update the name too. */
    var i = 0;

    for (; i < codeBlockAll.length ; i++) {
        var codeBlockCtn = document.createElement("div");
        codeBlockCtn.classList.add("codeBlockCtn");
        
        /* ** Aware, <.hide> have no any effect on CSS style, the purpose of <.hide> is give here javascript to add <.forceHide> class. HTML document arthor don't need to care about writing <forceHide> and <forceDisplay> class in HTML document. Just simplily put <.hide> in where you expect to hide to give javascript advice to hide here if possible.
           ** <.hide> class in <.cbk1> will be used to send to their parent <codeBlockCtn> (and add same class name again) and have no any more purpose. */
        if (codeBlockAll[i].classList.contains("hide")) {
            codeBlockCtn.classList.add("hide");
            codeBlockCtn.classList.add("forceHide");
        }
        
        var btnToggleHideCodeBlock = document.createElement("div");
        btnToggleHideCodeBlock.classList.add("btnToggleHideCodeBlock");
        btnToggleHideCodeBlock.onclick = function () {
            var btnToggleHideCodeBlock = this;
            var codeBlockCtn = btnToggleHideCodeBlock.parentNode;            
            toggleHideClass(codeBlockCtn);
        }
        
        /* Insert into DOM. */
        codeBlockAll[i].parentNode.insertBefore(codeBlockCtn, codeBlockAll[i]);
        codeBlockCtn.appendChild(btnToggleHideCodeBlock);
        codeBlockCtn.appendChild(codeBlockAll[i]);
    }



    /* ** Create <sideMenu>. Including back to top (TOC) button, and some more function. */
    var sideMenu = document.createElement("ul");

    sideMenu.innerHTML =
        '    <li class="group menu">' +
        '        <ul>' +
        '            <li class="btn menu">' +
        '                <img src="../img/170726_151101.svg" class="dim">' +
        '                <img src="../img/170726_151102.svg" class="glow">' +
        '            </li>' +
        '        </ul>' +
        '    </li>' +
        '    <li class="group bkToTop">' +
        '        <ul>' +
        '            <li class="btn bkToTop">' +
        '                <a href="#toc"><img src="../img/170726_151111.svg" class="dim">' +
        '                <img src="../img/170726_151112.svg" class="glow"></a>' +
        '            </li>' +
        '        </ul>' +
        '    </li>' +
        '    <li class="group toggleHideCodeBlk">' +
        '        <ul>' +
        '            <li class="btn expand">' +
        '                <img src="../img/170726_151105.svg" class="dim">' +
        '                <img src="../img/170726_151106.svg" class="glow">' +
        '            </li>' +
        '            <li class="btn compact">' +
        '                <img src="../img/170726_151107.svg" class="dim">' +
        '                <img src="../img/170726_151108.svg" class="glow">' +
        '            </li>' +
        '            <li class="btn minimal">' +
        '                <img src="../img/170726_151109.svg" class="dim">' +
        '                <img src="../img/170726_151110.svg" class="glow">' +
        '            </li>' +
        '        </ul>' +
        '    </li>';

    sideMenu.classList.add("sideMenu");
    sideMenu.classList.add("hide");
    /* ** <sideMenu> each buttons corresponding functions. */
    function closeSideMenu() {
        var sideMenu = document.querySelector(".sideMenu");
        sideMenu.classList.add("hide");
        /* ** Different time delay. When <.sideMenu> close (<.hide>), <.btn.menu> should dim immediately
           , but others buttons which clicked should remain glow for a short period of time before css transition end. */
        var sideMenuBtnAll = sideMenu.querySelectorAll(".btn");
        sideMenuBtnAll[0].classList.remove("clicked");
        setTimeout(function() {                    
            var i = 1;
            for (; i< sideMenuBtnAll.length ; i++) {
                if (sideMenuBtnAll[i].classList.contains("clicked")) {
                    sideMenuBtnAll[i].classList.remove("clicked");
                }
            }
        /* ** This 300 milliseconds should update with CSS transition. */
        }, "300");
    }
    
    sideMenu.addEventListener("click", function (a) {
            var tgetBtn = a.target;
            function dimAllBtnGlowCrrOne(glowElm) {
                var sideMenuBtnAll = document.querySelectorAll(".sideMenu .btn");
                var i = 1;
                for (; i< sideMenuBtnAll.length ; i++) {
                    if (sideMenuBtnAll[i].classList.contains("clicked")) {
                        sideMenuBtnAll[i].classList.remove("clicked");
                    }
                }
                glowElm.classList.add("clicked");
            }
            
            /* ** Detect which button is clicked.
               ** <.btn.menu>. */
            if (document.querySelector(".btn.menu").contains(tgetBtn) || document.querySelector(".btn.menu") === tgetBtn) {
                var sideMenu = document.querySelector(".sideMenu");
                if (sideMenu.classList.contains("hide")) {
                    sideMenu.classList.remove("hide");
                    sideMenu.querySelector(".btn.menu").classList.add("clicked");
                } else {
                    closeSideMenu();
                }
            /* ** <.btn.bkToTop>. */
            } else if (document.querySelector(".btn.bkToTop").contains(tgetBtn) || document.querySelector(".btn.bkToTop") === tgetBtn) {
                dimAllBtnGlowCrrOne(document.querySelector(".btn.bkToTop"));
                closeSideMenu();
            /* ** <.btn.expand>. */
            } else if (document.querySelector(".btn.expand").contains(tgetBtn) || document.querySelector(".btn.expand") === tgetBtn) {
                dimAllBtnGlowCrrOne(document.querySelector(".btn.expand"));
                /* ** Exclude the <.section1> out action. If uncomment this code works good , but I don't need it now. */
                /*var i = 0;
                for (; i<section1All.length ; i++) {
                    if (section1All[i].classList.contains("forceHide")) {
                        section1All[i].classList.remove("forceHide");
                        section1All[i].classList.add("forceDisplay");
                    }
                }*/
                
                var i = 0;
                for (; i<codeBlockAll.length ; i++) {
                    var codeBlockParentNode = codeBlockAll[i].parentNode;
                    if (codeBlockParentNode.classList.contains("forceHide")) {
                        codeBlockParentNode.classList.remove("forceHide");
                        codeBlockParentNode.classList.add("forceDisplay");
                    }
                }
            /* ** <.btn.compact>. */
            } else if (document.querySelector(".btn.compact").contains(tgetBtn) || document.querySelector(".btn.compact") === tgetBtn) {
                dimAllBtnGlowCrrOne(document.querySelector(".btn.compact"));
                /* ** Exclude the <.section1> out action. If uncomment this code works good , but I don't need it now. */
                /*var i = 0;
                for (; i<section1All.length ; i++) {
                    if (section1All[i].classList.contains("hide")) {
                        if (section1All[i].classList.contains("forceDisplay")) {
                            section1All[i].classList.remove("forceDisplay");
                            section1All[i].classList.add("forceHide");
                        } else if (! section1All[i].classList.contains("forceHide")) {
                            section1All[i].classList.add("forceHide");
                        }
                    } else if (section1All[i].classList.contains("forceHide")) {
                            section1All[i].classList.remove("forceHide");
                    }
                }*/
                
                var i = 0;
                for (; i<codeBlockAll.length ; i++) {
                    var codeBlockParentNode = codeBlockAll[i].parentNode;
                    if (codeBlockParentNode.classList.contains("hide")) {
                        if (codeBlockParentNode.classList.contains("forceDisplay")) {
                            codeBlockParentNode.classList.remove("forceDisplay");
                            codeBlockParentNode.classList.add("forceHide");
                        } else if (! codeBlockParentNode.classList.contains("forceHide")) {
                            codeBlockParentNode.classList.add("forceHide");
                        }
                    } else if (codeBlockParentNode.classList.contains("forceHide")) {
                        codeBlockParentNode.classList.remove("forceHide");
                    }
                }
            /* ** <.btn.minimal>. */
            } else if (document.querySelector(".btn.minimal").contains(tgetBtn) || document.querySelector(".btn.minimal") === tgetBtn) {
                dimAllBtnGlowCrrOne(document.querySelector(".btn.minimal"));
                /* ** Exclude the <.section1> out action. If uncomment this code works good , but I don't need it now. */
                /*var i = 0;
                for (; i<section1All.length ; i++) {
                    if (section1All[i].classList.contains("hide")) {
                        if (section1All[i].classList.contains("forceDisplay")) {
                            section1All[i].classList.remove("forceDisplay");
                            section1All[i].classList.add("forceHide");
                        } else if (! section1All[i].classList.contains("forceHide")) {
                            section1All[i].classList.add("forceHide");
                        }
                    } else if (section1All[i].classList.contains("forceHide")) {
                            section1All[i].classList.remove("forceHide");
                    }
                }*/
                
                var i = 0;
                for (; i<codeBlockAll.length ; i++) {
                    var codeBlockParentNode = codeBlockAll[i].parentNode;
                    if (codeBlockParentNode.classList.contains("forceDisplay")) {
                        codeBlockParentNode.classList.remove("forceDisplay");
                        codeBlockParentNode.classList.add("forceHide");
                    } else {
                        codeBlockParentNode.classList.add("forceHide");
                    }
                }
            }
        }
    );

    document.body.appendChild(sideMenu);




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

    /* ** Now I don't contain code in <liScrollJump> anymore. */
    /*function liScrollJump() {*/
        /* ** Create <liScrollJumpBtn> DOM structure. */        
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
        
    /* ** Now I don't contain code in <liScrollJump> anymore. So these 2 line was commented. */
    /*}
    addLoadEvent(liScrollJump);*/


    /* ** Global eventListener if any part of <window> get clicked. */
    window.addEventListener("click", function(a) {
        if (! (sideMenu.contains(a.target) || sideMenu === a.target)) {
            /* Not finished!!! */
            closeSideMenu();
        }
    });
});
/* ** End of a big addLoadEvent(). */
