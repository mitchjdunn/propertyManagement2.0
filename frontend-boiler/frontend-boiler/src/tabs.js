const $ = require("jquery")
const { mkToolbarBase, colors } = require("./common.js")

module.exports = {

    Tabs (pages) {
        const $tabs = mkToolbarBase()
            .css("justify-content", "stretch")
            .css("align-items", "stretch")
            .css("font-size", "1rem")
            .append([... Object.values(pages)].map(page => {
                const { tabTitle, action } = page
                page.$el = $("<div>")
                    .css("display", "flex")
                    .css("align-items", "center")
                    .css("justify-content", "center")
                    .css("flex", "1")
                    .css("cursor", "pointer")
                    .text(tabTitle)
                    .on("click", action)
                return page.$el
            }))
        $tabs.activate = page => {
            $tabs.children().css("color", colors.offlight)
            page.$el.css("color", colors.light)
        }
        return $tabs
    }

}
