require("./index.css")
require("../node_modules/font-awesome/css/font-awesome.min.css")

const $ = require("jquery")
const { View } = require("./view.js")
const { Tabs } = require("./tabs.js")

const {
    colors,
    shadows,
    mkToolbar
} = require("./common.js")

function Ui () {

    const pages = {
        pageA: {
            view: PageA(() => View($view, null, pages, "pageB"))
        },
        pageB: {
            view: PageB(() => View($view, null, pages, "pageA"))
        },
    }

    const $view = $("<div>")
        .prop("id", "main-view")

    const $app = $("<div>")
        .css("border-radius", "3px")
        .css("overflow", "hidden")
        .css("box-shadow", shadows.card1)
        .css("max-width", "26rem")
        .css("max-height", "40rem")
        .css("width", "100%")
        .css("height", "100%")
        .append($view)

    $(document.body).append($app)

    View($view, null, pages, "pageA", true)
}

function PageA (toPageB) {

    const $pageA = $("<div>")
        .append(mkToolbar("Page A", {
            right: [{ icon: "plus", action: toPageB }]
        }))

    return $pageA
}

function PageB (toPageA) {

    const $view = $("<div>")
        .prop("id", "pageb-view")

    const pages = {
        subPageA: {
            tabTitle: "Sub-Page A",
            view: SubPageA(),
            action: () => View($view, $tabs, pages, "subPageA")
        },
        subPageB: {
            tabTitle: "Sub-Page B",
            view: SubPageB()
            action: () => View($view, $tabs, pages, "subPageB")
        }
    }

    const $tabs = Tabs(pages)

    const $pageB = $("<div>")
        .append(mkToolbar("Page B", {
            shadow: false,
            left: [{ icon: "arrow-left", action: toPageA }]
        }))
        .append($tabs)
        .append($view)

    View($view, $tabs, pages, "subPageB", true)

    return $pageB
}

function SubPageA () {

    const $subPageA = $("<div>")
        .text("Sub-Page A")

    return $subPageA
}

function SubPageB () {

    const $subPageB = $("<div>")
        .text("Sub-Page B")

    return $subPageB
}

Ui()
