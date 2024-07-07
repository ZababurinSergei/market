import { Component } from '../index.mjs'
import { nkGit } from './this/index.mjs'

const name = 'mss-input'

const component = await Component()

component.observedAttributes = ["open", "disabled"];

Object.defineProperties(component.prototype, {
    '_nk-git': {
        value: null,
        writable: true
    },
    'nk-git': {
        set(value) {
            this['_nk-git'] = value
            if(this._task.length !== 0) {
                this._task = this._task.filter(item => {
                    if (this['_nk-git'] && item.component === 'nk-git') {
                        this['_nk-git'].onMessage(item)
                        return false
                    } else {
                        return true
                    }
                })
            } else {
                // alert('Сообщений нет')
            }
        },
        get() {
            return this['_nk-git'];
        }
    },
    update: {
        value: async function() {
            await this.controller.addEventListener.terminate();
            await this.controller.addEventListener.init();
        },
        writable: false
    },
    erase: {
        get: function() {
            this.shadowRoot.querySelector('input').value = ''
        }
    },
    open: {
        set(value) {

        },
        get() {
            return this.hasAttribute('open');
        }
    },
    html: {
        value: undefined,
        writable: true
    },
    init: {
        value: function(value) {
            this.html = {
                container: this.shadowRoot.querySelector('.container'),
                input: this.shadowRoot.querySelector('input')
            }

            this.removeAttribute('disabled')
        },
        writable: false
    },
    onMessage: {
        value: function(event) {
            switch (event.method) {
                case 'set.item':
                    this.options = event.data.items
                    break
                default:
                    console.warn('Событие не обрабатывается', event)
                    break
            }

            switch (event.action) {
                case 'get.git.value':
                    if(this.html.input.value.length !== 0) {
                        event.callback({
                            status: true,
                            value: this.html.input.value
                        })
                    } else {
                        event.callback({
                            status: false,
                            value: this.html.input.value
                        })
                    }
                    break
                default:
                    console.warn('Событие не обрабатывается', event)
                    break
            }
        },
        writable: false
    },
    attribute: {
        value: function(event) {
            switch (event.name) {
                case 'disabled':
                    if(event.newValue === '' || event.newValue === true || event.newValue === 'true') {
                        this.html?.input?.setAttribute('readonly', true)
                    } else {
                        this.html?.input?.removeAttribute('readonly')
                    }
                    break
                default:
                    console.warn('Событие не обрабатывается', event)
                    break
            }
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