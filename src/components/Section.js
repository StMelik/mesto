export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector)
        this._renderer = renderer
        this._items = items
    }

    renderItems() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item))
        })
    }

    addItem(item) {
        this._container.prepend(item)
    }
}