import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

export default {
    state(){
        return {
            userId: null,
            token: null,
            tokenExpiration: null
        }
    },
    mutations,
    actions,
    getters
}