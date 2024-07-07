export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        function debounce(func, timeout = 600){
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
        }

        async function saveInput() {
            if(self.disabled) {
                return
            }

            const value = self.shadowRoot.querySelector('input').value

            self.task = {
                id: 'mss-input',
                uuid: null,
                component: 'nk-git',
                type: 'self',
                action: 'button',
                value: value,
                message: {
                    id: '',
                    type: 'active.button.mount',
                    phase: 'start'
                }
            }

            console.log('-------------------------- input -------------------------- ', value )
        }

        const processChange = debounce(() => saveInput());

        resolve({
            broadcastChannel: async (event) => {
                self.external;
            },
            messageerror: async (event) => {
                console.log('ddddddddddddddddddddddddddddd BROADCAST messageerror ddddddddddddddddddddddddddddd', event);
            },
            input: processChange,
            click: (event) => {
                event.currentTarget.setAttribute('disabled', '')
            }
        })
    })
}

export default {
    description: 'action'
}