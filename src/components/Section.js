export default class Section {
    constructor({ renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector)
        this._renderer = renderer
    }

    renderItems(items) {
        items.forEach(item => {
            this.addItem(this._renderer(item))
        })
    }

    addItem(item, option = 'append') {
        switch (option) {
            case 'append':
                this._container.append(item)
                break;
            case 'prepend':
                this._container.prepend(item)
                break;
        }
    }
}