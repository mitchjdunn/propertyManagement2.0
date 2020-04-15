const $ = require("jquery")

module.exports = self = {

    colors: {
        primary: "#3f51b5",
        light: "#ffffff",
        offlight: "#cccccc"
    },

    shadows: {
        card1: "0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.24)"
    },

    mkToolbar (text, { shadow, left = [], right = [] } = {}) {
        return self.mkToolbarBase({ shadow })
            .append(left.map(({ icon, action }) =>
                self.mkToolbarButton(icon, action)))
            .append($("<span>")
                .css("margin-left", "1rem")
                .text(text))
            .append($("<span>")
                .css("flex", "1"))
            .append(right.map(({ icon, action }) =>
                self.mkToolbarButton(icon, action)))
    },

    mkToolbarBase ({ shadow = true } = {}) {
        return $("<div>")
            .css("display", "flex")
            .css("align-items", "center")
            .css("width", "100%")
            .css("height", "3rem")
            .css("font-size", "1.5rem")
            .css("color", self.colors.light)
            .css("background", self.colors.primary)
            .css("box-shadow", shadow ? self.shadows.card1 : undefined)
    },

    mkToolbarButton (icon, action) {
        return $("<div>")
            .css("padding", "1rem")
            .css("cursor", "pointer")
            .append($("<i>")
                .addClass("fa")
                .addClass("fa-" + icon))
            .on("click", action)
    },

}
