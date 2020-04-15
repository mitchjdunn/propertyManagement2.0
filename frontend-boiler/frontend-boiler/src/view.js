const $ = require("jquery")

module.exports = {

    View ($view, $tabs, pages, requestedPageKey, tryLocal) {
        const viewId = $view.prop("id")
        const storageKey = `view-${viewId}`
        const pageKey = (tryLocal && localStorage.getItem(storageKey)) || requestedPageKey
        localStorage.setItem(storageKey, pageKey)
        $view.children().detach()
        $view.append(pages[pageKey].view)
        if ($tabs)
            $tabs.activate(pages[pageKey])
    }
}
