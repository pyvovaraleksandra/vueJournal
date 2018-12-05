import { Module } from "vuex";
import { email, Form, required } from "./lib/vuex-form";
//import api from "@/lib/api";

type FetchStatus = "init" | "loading" | "ok" | "error";

export interface FaqState {
    fetchStatus: FetchStatus;
}

const module: Module<FaqState, {}> = {
    namespaced: true,
    state: {
        fetchStatus: "init",
    },
    mutations: {
        setFetchStatus(state, status: FetchStatus) {
            state.fetchStatus = status;
        },
    },
    actions: {
    },
    modules: {
        authForm: new Form({
            throttle: 300,
            fields: {
                email: {
                    type: String,
                    validators: [
                        required(),
                        email(),
                    ],
                },
                password: {
                    type: String,
                    validators: [
                        required(),
                    ],
                },
            },
            async onSubmit({ commit, dispatch }, { heading }) {
                console.log("SUBMIT!");
            },
        }),
    }
};

export default module;
