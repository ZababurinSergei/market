const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let nkMocha = null
let nkMemory = null
describe('Service', async function () {
    this.timeout(10000);
    before(async function () {
        await delay(5000)
        nkMocha = window.document.body.querySelector('nk-mocha')
        nkMemory = window.document.body.querySelector('nk-memory')
    });
    describe('NK-GIT', async function () {
        it('Получить кнопки и лейблы для компонента', function () {
            return new Promise(async (resolve, reject) => {
                const html = (nkMemory.store)['nk-git'][0].self.html
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('NK-OPFS', async function () {
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('FER-SELECT', async function () {
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('MSS-INPUT', async function () {
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
})