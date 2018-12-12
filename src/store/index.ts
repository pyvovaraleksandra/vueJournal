import Vue from "vue";
import Vuex from "vuex";

import auth, { AuthState } from "./auth";
import disciplines, { DisciplinesState } from "./disciplines";
import module, { ModuleState } from "./module";
import addModule, { AddModuleState } from "./addModule";
import questionsGroup, { QuestionsGroupState } from "./questionsGroup";

Vue.use(Vuex);

export interface RootState {
    auth: AuthState;
    disciplines: DisciplinesState;
    module: ModuleState;
    addModule: AddModuleState;
    questionsGroup: QuestionsGroupState;
}

export default new Vuex.Store<any>({
    modules: {
        auth,
        disciplines,
        module,
        addModule,
        questionsGroup,
    },
});
