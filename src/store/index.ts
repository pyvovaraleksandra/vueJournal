import Vue from "vue";
import Vuex from "vuex";

import auth, { AuthState } from "./auth";

Vue.use(Vuex);

export interface RootState {
    auth: AuthState;
}

export default new Vuex.Store<any>({
    modules: {
        auth,
    },
});
