"use strict";

const customizer = {

    body : document.querySelector("body"),
    currentFontSize : "regular",
    currentTheme : "light",

    init : function() {
        this.createControls();
    },

    createControls : function() {
        const mainContainer = document.querySelector(".container");
        const header = document.getElementsByTagName("header")[0];

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("optionsContainer");
        optionsContainer.setAttribute("aria-hidden", "true");

        const themeOption = this.createThemeOption();
        const fontOptions = this.createFontOptions();
        
        optionsContainer.append(themeOption, fontOptions);
        mainContainer.insertBefore(optionsContainer, header);
    },

    createThemeOption : function() {
        const themeOption = document.createElement("input");
        themeOption.setAttribute("type", "button");
        themeOption.setAttribute("value", "Dark Theme");
        themeOption.addEventListener('click', this.changeTheme, false);
        themeOption.classList.add("themeOption");
        return themeOption;
    },

    changeTheme : function() {
        let newTheme, newValue;
        if (customizer.currentTheme === 'light') {
            newTheme = "dark";
            newValue = "Light Theme";
        } else {
            newTheme = "light";
            newValue = "Dark Theme";
        }
        document.querySelector(".themeOption").setAttribute("value", newValue);
        
        customizer.body.classList.remove(customizer.currentTheme);
        customizer.body.classList.add(newTheme);
        customizer.currentTheme = newTheme;
    },

    createFontOptions : function() {
        let fontOptions = document.createElement("div");
        fontOptions.classList.add("fontOptions")

        const smallFontOption = customizer.createFontOption('Regular Text Size', 'regularFontOption');
        const mediumFontOption = customizer.createFontOption('Larger Text Size', 'largerFontOption');
        const largeFontOption = customizer.createFontOption('Largest Text Size', 'largestFontOption');

        smallFontOption.classList.add("selected");

        fontOptions.addEventListener('click', this.selectFontOption, false);
        fontOptions.addEventListener('click', this.resizeFonts, false);
        fontOptions.append(smallFontOption, mediumFontOption, largeFontOption);
        return fontOptions;
    },

    createFontOption : function(title, classIdentifier) {
        let fontOption = document.createElement("a");
        fontOption.appendChild(document.createTextNode("A"));
        fontOption.setAttribute("href", "#");
        fontOption.setAttribute("title", title);
        fontOption.classList.add(classIdentifier);
        fontOption.addEventListener('click', event => {
            event.preventDefault();
        }, false);
        return fontOption;
    },

    selectFontOption : function(event) {
        const selectedFontOption = document.querySelector(".selected");
        if (selectedFontOption) {
            selectedFontOption.classList.remove("selected");
        }
        if (customizer.getNewFontSize(event) !== undefined) {
            event.target.classList.add("selected");
        }
    },

    resizeFonts : function(event) {
        const currentFontSize = customizer.currentFontSize;
        const newFontSize = customizer.getNewFontSize(event);
        if (newFontSize == undefined || newFontSize === currentFontSize) {
            return;
        }
 
        customizer.body.classList.remove(currentFontSize);
        customizer.body.classList.add(newFontSize);
        customizer.currentFontSize = newFontSize;
    },

    getNewFontSize : function(event) {
        const targetClassList = event.target.classList;
        if (targetClassList.contains("regularFontOption")) {
            return "regular";
        } else if (targetClassList.contains("largerFontOption")) {
            return "larger";
        } else if (targetClassList.contains("largestFontOption")) {
            return "largest";
        } 
    },
    
}

customizer.init();