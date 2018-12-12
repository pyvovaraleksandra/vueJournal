import { Module } from "vuex";
import api from "./lib/api";
import { Form, required } from "./lib/vuex-form/index";
import router from "../main";

export interface QuestionsGroupState {
    fetchGroupsStatus: FetchStatus;
    groups: String[];
}

const module: Module<QuestionsGroupState, {}> = {
    state: {
        fetchGroupsStatus: "init",
        groups: []
    },
    mutations: {
        setGroupsFetchStatus(state, status: FetchStatus) {
            state.fetchGroupsStatus = status;
        },
        setQuestionGroups(state, groups) {
            state.groups = groups;
        }
    },
    actions: {
        async getGroupList({ commit, dispatch }, moduleId) {
            commit("setGroupsFetchStatus", "loading");

            const {status, response, errors} = await api.getQuestionGroups(moduleId);

            if (status !== 0) {
                console.error(errors);
            }

            const groups = response.map(group => ({
                disciplineModuleId: group.discipline_module_id,
                id: group.id,
                points: group.points,
                position: group.position,
                title: group.title
            }));

            commit("setQuestionGroups", groups);
            commit("setGroupsFetchStatus", "ok");
        },
    },
    modules: {

    }
};

export default module;
