import { Module } from "vuex";
import api from "./lib/api";
import { Form, required } from "./lib/vuex-form/index";
import router from "../main";

export interface GroupState {
    fetchGroupStatus: FetchStatus;
    questions: String[];
}

const module: Module<GroupState, {}> = {
    state: {
        fetchGroupStatus: "init",
        questions: []
    },
    mutations: {
        setGroupFetchStatus(state, status: FetchStatus) {
            state.fetchGroupStatus = status;
        },
        setQuestions(state, questions) {
            state.questions = questions;
        }
    },
    actions: {
        initGroup({ rootState, commit, dispatch }) {
            const groupId = JSON.parse(localStorage.getItem("selectedGroup")).groupId;

            const group = rootState["questionsGroup"].groups[groupId];

            commit("groupForm/setData", {fields: {
                title: group.title,
                position: group.position,
                points: group.points
            }});

            dispatch("getQuestionList", groupId);
        },
        async getQuestionList({ commit, dispatch }, groupId) {
            commit("setGroupFetchStatus", "loading");

            const {status, response, errors} = await api.getGroupQuestions(groupId);

            if (status !== 0) {
                console.error(errors);
            }

            const questions = response.map(q => {
                const answer = q.kind === "text"
                                ? ""
                                : q.kind === "one"
                                    ? q.answer
                                    : q.answer.slice(1, -1).split(",").map(a => +a);
                return {
                    text: q.description,
                    id: q.id,
                    questionGroupId: q.question_group_id,
                    kind: q.kind,
                    type: q.kind === "text"
                        ? "text"
                        : q.kind === "one"
                            ? "radio"
                            : "checkbox",
                    variants: q.variants,
                    answer
                };
            });

            commit("setQuestions", questions);
            commit("setGroupFetchStatus", "ok");
        },
    },
    modules: {
        groupForm: new Form({
            throttle: 300,
            fields: {
                title: {
                    type: String,
                    validators: [
                        required(),
                    ],
                },
                position: {
                    type: String,
                    validators: [
                        required(),
                    ],
                },
                points: {
                    type: String,
                    validators: [
                        required(),
                    ],
                },
            },
            async onSubmit({ commit, getters }, { disciplineModuleId, id }) {
                const params = {  disciplineModuleId, id };

                const body = {
                    title : getters['field']("title"),
                    position : getters['field']("position"),
                    points : getters['field']("points"),
                };

                const { errors } = await api.postUpdateGroup({ params, body });

                if (errors) {
                    console.error(errors);
                    return
                }

                router.push(`/teacher`);
            },
        }),
    }
};

export default module;
