import {Component} from '../index.mjs'

const name = 'nk-swagger'

const component = await Component()

component.observedAttributes = ["open", "disabled"];

Object.defineProperties(component.prototype, {
    open: {
        set(value) {
        },
        get() {
            return this.hasAttribute('open');
        }
    },
    disabled: {
        set(value) {
            if (value) {
                this.setAttribute('disabled', '');
            } else {
                this.removeAttribute('disabled');
            }
        },
        get() {
            return this.hasAttribute('disabled');
        }
    },
    html: {
        value: null,
        writable: true
    },
    init: {
        value: function (value) {
            // this.html = {
            //     button: this.shadowRoot.querySelector('[class*="button"]'),
            //     list: this.shadowRoot.querySelector('[class*="list"]'),
            //     arrow: this.shadowRoot.querySelector('.button_arrow')
            // }

            // this.disabled = true
        },
        writable: false
    },
    onMessage: {
        value: function (event) {
            console.trace()
        },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
}

export default {}