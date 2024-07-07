import { apiInit, SwaggerClient, init, onload, v4 as uuidv } from './this/index.mjs';
import { onMessage } from './onMessage.mjs';
// const swagger = apiInit()
const url = new URL('./this/config/api.yaml', import.meta.url)
const initializeSwagger = new SwaggerClient(url.pathname)

const servicePath = new URL('../', import.meta.url);

let swagger = null
const store = {};
let eventMessages = {};

let config = {
    root: '/git',
    git: 'github.com',
    user: 'ElenaSidneva',
    service: 'yoga_studio',
    gitUser: `/git/github.com/ElenaSidneva`,
    gitDir: `/git/github.com/ElenaSidneva/yoga_studio`,
    gitUrl: `https://github.com/ElenaSidneva/yoga_studio`,
    oauth2format: 'github',
    corsProxy: 'https://cors-pr6x.onrender.com',
    branch: 'main'
}
const BaseClass = class extends HTMLElement {
    _isOnload = false;
    controller = {};
    _isBroadcastChannel = false
    component = (name = 'undefined', uuid = undefined) => (uuid !== undefined ? store[name][uuid] : store[name]);

    _broadcastChannel = [{
        self: new BroadcastChannel('broadcast'),
        value: undefined,
        await: undefined
    }];

    set ui(value) {
        swagger.ui = value
    }

    get ui() {
        return swagger.ui
    }

    set api(value) {
        debugger
        swagger = value
    }

    get api() {
        return swagger
    }
    set broadcastChannel(value) {
        if(!this._isBroadcastChannel) {
            this._broadcastChannel[0].value = value;
            if (value.hasOwnProperty('await')) {
                this._broadcastChannel[0].await = value.await;
            }
            this._broadcastChannel[0].self.addEventListener('message', this._broadcastChannel[0].value.broadcastChannel);
            this._broadcastChannel[0].self.addEventListener('messageerror', this._broadcastChannel[0].value.messageerror);
            this._isBroadcastChannel = true
        }
    }

    get broadcastChannel() {
        return this._broadcastChannel[0].value;
    }

    get external() {
        if (this._broadcastChannel[0].await) {
            let componentState = {};
            let errors = [];
            for (let component of this._broadcastChannel[0].await) {
                if (store[component]) {
                    if (!componentState.hasOwnProperty(component)) {
                        componentState[component] = [];
                    }
                    componentState[component] = store[component];
                } else {
                    errors.push({
                        error: 'компонент не найден',
                        component: component
                    });
                }
            }

            const isError = errors.length !== 0;

            if (!isError) {
                for (let i = 0; i < this._broadcastChannel[0].await.length; ++i) {
                    if (this[this._broadcastChannel[0].await[i]] === null) {
                        const component = this._broadcastChannel[0].await[i];
                        this[this._broadcastChannel[0].await[i]] = componentState[component][0].self;
                    }
                }
            }

            return true;
        } else {
            return {
                status: true,
                value: undefined,
                description: `для компонента нет подключаемых компонентов. Если это требуется добавьте их в массив await
                       self.broadcastChannel = {
                          await: ['nk-opfs'],
                          broadcastChannel: actions.broadcastChannel,
                          messageerror: actions.messageerror
                       }`
            };
        }
    }

    get config() {
        return config;
    }

    set config(value) {
        for (let key in value) {
            config[key] = value[key];
        }
        return true;
    }

    get store() {
        return store;
    }

    execute = async function() {
        this._task = this._task.filter(item => {
            const isTagName = item.tagName === this.tagName.toLowerCase()
            const components = this.store[`${item.component}`]
            const isComponent =  !!components
            let component = null
            let isId = true
            if(!item.id) {
                isId = false
                alert(`В запросе надо указать id что бы пониматьв каком компоненте делать изменения. Компонент ${item.component} из ${item.tagName} uuid: ${item.uuid}`)
                return true
            }

            if(isComponent) {
                component = (components.filter(data => item.id === data.id))[0]
            }

            if (isTagName && isId && isComponent) {
                switch (item.type) {
                    case 'self':
                        // if (this[`_${item.component}`]) {
                            if (component) {

                            // if(item.id) {
                            // console.log('-------3----------------------------- >>>>>>>>>>>', this)
                            // debugger
                            const bindOnMessage = item.hasOwnProperty('callback') ? item.callback.bind(this) : onMessage.bind(this);
                            // bindOnMessage(this[`_${item.component}`], item);
                            bindOnMessage(component, item);
                            return false;
                            // }
                        }
                        return true;
                        break;
                    case 'main':
                        if (component) {
                            component.self.onMessage(item);
                            return false
                        }
                        return true;
                        break;
                    case 'worker':
                        if (this[`_${item.component}`]) {
                            if (item.hasOwnProperty('callback')) {
                                delete item.callback;
                            }

                            if (this[`_${item.component}`]._worker !== null) {
                                this[`_${item.component}`]._worker.postMessage(item);
                                return false;
                            }

                            if (this[`_${item.component}`]._worker === undefined) {
                                console.error('Не должно быть undefined');
                                return false;
                            }
                        }

                        return true;
                        break;
                    default:
                        break;
                }
            }

            return true;
        });
    };

    _task = [];

    set task(value) {
        this._task.push(Object.assign(value, {
            tagName: this.tagName.toLowerCase(),
            uuid: this.dataset.uuid
        }));

        this.execute().catch(e => console.error(e));
    }

    get task() {
        return {
            task: this._task,
            new: structuredClone({
                tagName: this.tagName.toLowerCase(),
                uuid: this.dataset.uuid,
                component: this._broadcastChannel[0].await,
                type: ['self', 'main', 'worker'],
                action: 'default',
                value: '',
                message: '',
                data: {
                    id: '',
                    type: '',
                    phase: ''
                }
            })
        };
    }

    get help() {
        return {
            task: {
                id: this.tagName.toLowerCase(),
                uuid: this.dataset.uuid,
                component: this._broadcastChannel[0].await,
                type: ['self', 'main', 'worker'],
                action: 'default',
                value: '',
                message: {
                    id: '',
                    type: '',
                    phase: ''
                }
            }
        };
    }

    constructor() {
        super();
        this.dataset.servicesPath = servicePath.pathname;
        this.config = config;

        init(this).then(() => {
            this._isOnload = true;
        }).catch(error => console.warn('error', error));
    }

    connectedCallback() {
        if (this.dataset?.servicesPath) {
            onload(this)
                .then(async (self) => {
                    self.dataset.uuid = uuidv();

                    if('init' in self) {
                        await self.init()
                    }

                    const name = self.tagName.toLowerCase();
                    const { actions, controller } = await import(`${self.dataset.servicesPath}${name}/this/index.mjs`);
                    self.controller = await controller(self, await actions(self));
                    await self.controller.addEventListener.init();

                    if (!store.hasOwnProperty(name)) {
                        store[name] = [];
                    }

                    store[name].push({
                        id: self.id,
                        uuid: self.dataset.uuid,
                        self: self,
                        dataset: self.dataset
                    });

                    this._broadcastChannel[0].self.postMessage({
                        isBroadcastChannel: this._isBroadcastChannel,
                        name: this.tagName
                    });

                    if(this._isBroadcastChannel) {
                        this.external
                    }

                })
                .catch(e => console.error('error', e));
        }
    }

    disconnectedCallback() {
        if('terminate' in this) {
            self.init().catch(e => console.error(e))
        }

        this?.controller?.addEventListener?.terminate();

        if (this._broadcastChannel[0].value) {
            this._broadcastChannel[0].self.removeEventListener('message', this._broadcastChannel[0].value.broadcastChannel);
            this._broadcastChannel[0].self.removeEventListener('messageerror', this._broadcastChannel[0].value.messageerror);
        }

        this._broadcastChannel.self.close();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ('attribute' in this) {
            this?.attribute({
                name: name,
                oldValue: oldValue,
                newValue: newValue
            });
        }
    }

    adoptedCallback() {

    }
};

export const Component = (() => {
    return async () => {
       if(!swagger) {
           swagger = await initializeSwagger
       }

        const body = `return ${BaseClass}`;
        const baseComponent = new Function('swagger','config','onMessage', 'eventMessages', 'store', 'uuidv', 'servicePath', 'init', 'onload', body);
        return baseComponent(swagger, config, onMessage, eventMessages, store, uuidv, servicePath, init, onload, body);
    };
})(new URL('./', import.meta.url));
