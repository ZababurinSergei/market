export const onMessage = async function(self, data) {

    console.log('@@@@@@@@@@@@@@@@@@@ onMessage @@@@@@@@@@@@@@@@@@@', {
        this: this,
        component: self,
        data: data
    })
}

export default {
    description:'events for base-nk'
}