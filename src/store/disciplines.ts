import { Module } from "vuex";
import { email, Form, required } from "./lib/vuex-form";
import api from "./lib/api";
import router from "../main";

type FetchStatus = "init" | "loading" | "ok" | "error";

export interface DisciplinesState {
    fetchStatus: FetchStatus;
    disciplines: String[];
}

const module: Module<DisciplinesState, {}> = {
    state: {
        fetchStatus: "init",
        disciplines: []
    },
    mutations: {
        setFetchStatus(state, status: FetchStatus) {
            state.fetchStatus = status;
        },
        setDisciplines(state, disciplines) {
            state.disciplines = disciplines;
        }
    },
    actions: {
        async getDisciplines({ commit }) {
            commit("setFetchStatus", "loading");

            const {status, response, errors} = await api.getRelationships();

            if (status !== 0) {
                console.error(errors);
            }

            const disciplines = response.map(item => item.discipline.title);

            commit("setDisciplines", disciplines);
            commit("setFetchStatus", "ok");
        }
    },
};

export default module;
