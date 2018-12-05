import Vue from "vue";
import Vuex from "vuex";

import welcome, { AuthState } from "./welcome";

Vue.use(Vuex);

export interface RootState {
    welcome: AuthState;
}

export default new Vuex.Store<any>({
    modules: {
        welcome,
    },
});
