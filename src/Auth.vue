<template>
    <div class="Welcome container">
        <form
            class="center-align"
            novalidate
            @submit.prevent="submit({payload: {heading}, meta: {validateOnly}})"
        >
            <div class="row">
                <div class="input-field col s6 offset-s3 Welcome__input">
                    <input id="email" type="text" v-model="email">
                    <label for="email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6 offset-s3 Welcome__input">
                    <input id="password" type="password" v-model="password">
                    <label for="password">Password</label>
                </div>
            </div>
            <div class="row">
                <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import { mapFieldsToComputed } from "./store/lib/vuex-form";

    export default {
        name: 'Auth',
        data() {
            return {
                formKey: "authForm",
            }
        },
        computed: {
            ...mapFieldsToComputed("authForm", [
                "email",
                "password",
            ])
        },
        methods: {
            ...mapActions("authForm", ["submit", "changeField"]),
        }
    }
</script>

<style lang="scss" scoped>
    .Welcome {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &__input {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
</style>