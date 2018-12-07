import { Module } from "vuex";
import { email, Form, required } from "./lib/vuex-form";
import api from "./lib/api";

type FetchStatus = "init" | "loading" | "ok" | "error";

export interface AuthState {
    fetchStatus: FetchStatus;
}

const module: Module<AuthState, {}> = {
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
            async onSubmit({ commit, getters }, { heading }) {
                console.log("SUBMIT!");

                const body = {
                    email : getters['field']("email"),
                    password : getters['field']("password"),
                };

                // const body = {
                //     "email": "admin@journal.com", "password": "12345678"
                // };

                const response = await api.postSignIn({body});

                console.log(response);
            },
        }),
    }
};

export default module;
