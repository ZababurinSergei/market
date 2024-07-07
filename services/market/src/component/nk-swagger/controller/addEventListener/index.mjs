import {store, loader} from '../../../../this/index.mjs';
import {swagger} from '../../this/index.mjs'

// let tests = Symbol.for("tests");
// let api = Symbol.for("api");

export default async (self, actions) => {
    const urlSwagger = new URL('../../this/mjs/api/swagger-ui-bundle.js', import.meta.url)
    const urlSwaggerStandalone = new URL('../../this/mjs/api/swagger-ui-standalone-preset.js', import.meta.url)
    const urlYaml = new URL('../../this/openapi/openapi.yaml', import.meta.url)

    await loader(urlSwagger.pathname, '')
    await loader(urlSwaggerStandalone.pathname, '')

    self.ui = SwaggerUIBundle({
        url: urlYaml.pathname,
        dom_id: '#swagger-ui',
        deepLinking: false,
        docExpansion: 'none',
        validatorUrl: 'http://localhost:8080',
        requestInterceptor: (req) => {
            const authorization = store.get('authorization')
            if (authorization) {
                req.headers.Authorization = `Bearer ${authorization.token.access}`
            }
            return req
        },
        api: swagger,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: 'StandaloneLayout'
    });


    (self.ui).initOAuth({
        clientId: 'client-id',
        clientSecret: 'your-client-secret-if-required',
        realm: 'your-realms',
        appName: 'Home market',
        scopeSeparator: ' ',
        scopes: 'openid profile email phone address',
        additionalQueryStringParams: {},
        useBasicAuthenticationWithAccessCodeGrant: false,
        usePkceWithAuthorizationCodeGrant: false
    });


    // const swaggerApi = self.querySelector('#describe')
    // const swaggerSave = self.querySelector('.swagger-save')

    // swaggerApi.addEventListener('input', (event) => {
    //     store.set('describe', `describe('${event.currentTarget.value}', async function () {
    //       this.timeout(10000);`)
    // })

    // function save(filename, data) {
    //     const blob = new Blob([data], {type: 'text/txt'});
    //     if(window.navigator.msSaveOrOpenBlob) {
    //         window.navigator.msSaveBlob(blob, filename);
    //     }
    //     else{
    //         const elem = window.document.createElement('a');
    //         elem.href = window.URL.createObjectURL(blob);
    //         elem.download = filename;
    //         document.body.appendChild(elem);
    //         elem.click();
    //         document.body.removeChild(elem);
    //     }
    // }

    // swaggerSave.addEventListener('click', (event) => {
    //     let result = store.get('describe')
    //
    //     result = result.trim() + store.get('it').trim()
    //
    //     result = result + "\n})"
    //
    //     if(!swaggerApi.value) {
    //        alert('Введите название блока describe')
    //     } else {
    //         save(swaggerApi.value, result)
    //     }
    // })

    // const swaggerReset = document.querySelector('.swagger-reset')
    // swaggerReset.addEventListener('click', (event) => {
    //         console.clear()
    //         store.set('it', '')
    // })

    return {
        init: async () => {
            // self.html.button.add.addEventListener('click', actions.button.add)
            // self.html.button.remove.addEventListener('click', actions.button.remove)
        },
        terminate: async () => {
            // self.html.button.add.removeEventListener('click', actions.button.add)
            // self.html.button.remove.removeEventListener('click', actions.button.remove)
        }
    }
}