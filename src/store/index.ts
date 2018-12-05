import Vue from "vue";
import Vuex from "vuex";

// import chat, { ChatState } from "./chat";

Vue.use(Vuex);

export interface RootState {
    // chat: ChatState;
}

export default new Vuex.Store<any>({
    modules: {
        // chat,
    },
});
