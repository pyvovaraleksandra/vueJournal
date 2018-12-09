<template>
    <div class="Disciplines container">
        <div class="Disciplines__title">Выберите дисциплину: {{name}}</div>
        <div class="Disciplines__wrap" >
            <spinner class="Disciplines__spinner" v-if="loading"/>
            <BaseCollapse
                    v-for="(discipline, index) in disciplines"
                    :index="index + 1"
                    :key="index"
                    v-else
            >
                <div slot="header">
                    <a class="waves-effect waves-light btn Disciplines__discipline"> {{ discipline.name }} </a>
                </div>
                <div slot="content">
                    <a
                        v-for="moduleName in discipline.modules"
                        class="Disciplines__module"
                    >
                        {{ moduleName }}
                    </a>
                </div>
            </BaseCollapse>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import spinner from "../../public/spinner.svg";
    import BaseCollapse from "../components/BaseCollapse";

    export default {
        name: 'Discipline',
        data() {
            return {
                showModals: false,
            }
        },
        components: {
            spinner,
            BaseCollapse,
        },
        computed: {
            ...mapState({
                email: state => state.auth.email,
                name: state => state.auth.name,
                disciplines: state => state.disciplines.disciplines,
                loading: state => state.disciplines.fetchStatus === "init" ||
                         state.disciplines.fetchStatus === "loading",
            }),
        },
        methods: {
            ...mapActions(["getDisciplines"]),
        },
        mounted() {
            this.getDisciplines();
        },
    }
</script>

<style lang="scss" scoped>
    .Disciplines {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        background: rgba(74, 74, 74, 0.6);
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, .7);
        border: 2px solid #4e4e4e;
        max-height: 80vh;

        &__title {
            font-size: 17px;
            font-weight: 500;
            color: #fff;
            text-shadow: -2px 5px 8px black;
            margin-top: 5px;
            margin-bottom: 2rem;
        }

        &__spinner {
            align-self: center;
        }

        &__discipline {
            min-height: 36px;
            width: 100%;
        }

        &__module {
            padding: 5px;
            color: #fff;
            display: block;
            text-shadow: 0px 6px 12px black;
        }

        &__wrap {
            display: flex;
            flex-direction: column;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            }

            &::-webkit-scrollbar-thumb {
                background-color: darkgrey;
                outline: 1px solid slategrey;
            }
        }
    }

</style>

<style lang="scss">
    #app {
        display: flex;
        align-items: center;
        height: 100vh;
        background: url("../assets/Disciplines-bg.jpg") center;
        background-size: cover;
    }
</style>