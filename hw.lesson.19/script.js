class Tabs {
    #tabsEl;

    static ITEM_C = "tabs_main";
    static TITLE_C = "tabs_title";
    static BODY_C = "tabs_body";
    static ACTIVE_C = "active";
    static ACTIVE_TAB_C = "tab-active";

    constructor(tabsEl) {
        this.#tabsEl = tabsEl;
        this.bindStyles();
        this.bindEvents();
    }

    activateTab(element) {
        const tabs = document.getElementsByClassName(Tabs.TITLE_C);
        Array.prototype.forEach.call(tabs, (tab) => {
            console.log(tab.classList);
            tab.classList.remove(Tabs.ACTIVE_TAB_C);
        });
        element.classList.add(Tabs.ACTIVE_TAB_C);
    }

    onTabsElClick(e) {
        if (e.target.classList.contains(Tabs.TITLE_C)) {
            const headerEl = e.target;
            this.activateTab(headerEl);
            const contentEl = this.openContent(headerEl);
            const activeEl = this.findContent();

            if (activeEl && activeEl !== contentEl) {
                this.closeContent(activeEl);
            }

            this.toggleContent(contentEl);
        }
    }

    toggleContent(el) {
        el.classList.toggle(Tabs.ACTIVE_C);
    }

    openContent(el) {
        const itemEl = el.closest("." + Tabs.ITEM_C);
        return itemEl.querySelector("." + Tabs.BODY_C);
    }

    closeContent(el) {
        el.classList.remove(Tabs.ACTIVE_C);
    }

    findContent() {
        return this.#tabsEl.querySelector("." + Tabs.ACTIVE_C);
    }

    bindStyles() {
        const tabsItems = this.#tabsEl.children;

        for (let itemEl of tabsItems) {
            const [headerEl, contentEl] = itemEl.children;

            itemEl.classList.add(Tabs.ITEM_C);
            headerEl.classList.add(Tabs.TITLE_C);
            contentEl.classList.add(Tabs.BODY_C);
        }
    }

    bindEvents() {
        this.#tabsEl.addEventListener("click", (e) => this.onTabsElClick(e));
    }
}

const tabsEl = document.querySelector("#container");
new Tabs(tabsEl);


