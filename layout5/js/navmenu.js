"use strict";

const navmenu = {

    button : document.querySelector("button"),
    nav : document.querySelector("header nav"),

    init : function() {
        this.button.addEventListener("click", this.toggleMenu, false);
    },

    toggleMenu : function(event) {
        if (navmenu.button.getAttribute("aria-expanded") === "false") {
            navmenu.nav.classList.add("visible");
            navmenu.button.setAttribute("aria-expanded", "true");
        } else {
            navmenu.nav.classList.remove("visible");
            navmenu.button.setAttribute("aria-expanded", "false");
        }
    }

};

navmenu.init();