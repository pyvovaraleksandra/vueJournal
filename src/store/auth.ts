import { Module } from "vuex";
import { email, Form, required } from "./lib/vuex-form";
import api from "./lib/api";
import router from "../main";

type FetchStatus = "init" | "loading" | "ok" | "error";

export interface AuthState {
    fetchStatus: FetchStatus;
    email: string;
    name: string;
}

const module: Module<AuthState, {}> = {
    state: {
        fetchStatus: "init",
        email: "",
        name: "",
    },
    mutations: {
        setFetchStatus(state, status: FetchStatus) {
            state.fetchStatus = status;
        },
        setUserData(state, {email, name}) {
            state.email = email;
            state.name = name;
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
            async onSubmit({ commit, getters }) {
                commit("setFetchStatus", "loading");

                const body = {
                    email : getters['field']("email"),
                    password : getters['field']("password"),
                };
                const  { status, response, errors }  = await api.postSignIn({body});

                if (status !== 0) {
                    console.error(errors.body);
                    commit("setErrors", {errors: errors.body});
                    return;
                }

                window.TOCKEN = response.api_token;
                localStorage.setItem('token', response.api_token);
                localStorage.setItem('LOGINED', "true");

                commit("authForm/setUserData", {email: response.email, name: response.name});

                router.push({
                    path: "/disciplines"
                });

                commit("setFetchStatus", "ok");
            },
        }),
    }
};

export default module;
