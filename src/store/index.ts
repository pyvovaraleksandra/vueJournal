import Vue from "vue";
import Vuex from "vuex";

import auth, { AuthState } from "./auth";
import disciplines, { DisciplinesState } from "./disciplines";
import module, { ModuleState } from "./module";

Vue.use(Vuex);

export interface RootState {
    auth: AuthState;
    disciplines: DisciplinesState;
    module: ModuleState;
}

export default new Vuex.Store<any>({
    modules: {
        auth,
        disciplines,
        module,
    },
});
