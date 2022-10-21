class NMComponent extends HTMLElement {
    constructor(...args) {
        super(...args);
        this._moveInnerContentToBasicSlot();
    }

    _moveInnerContentToBasicSlot() {
        const defaultSlot = this.querySelector('slot:not([name])');

        if (defaultSlot) {
            for (const child of this.children) {
                if (!child.getAttribute('slot')) {
                    defaultSlot.appendChild(child);
                }
            }
        }
    }

    attachTemplate(templateId) {
        const template = document.getElementById(templateId).content;
        this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
    }
}

class NMEvent extends Event {
    constructor(type, iventInitDict, data) {
        super(type, iventInitDict);
        this.iventInitDict = iventInitDict;
        this.data = data;
    }

    clone() {
        return new NMEvent(this.type, this.iventInitDict, this.data);
    }
}
