<template>
    <div class="Layout">
        <div class="TeacherDisciplines__you">
            <div>
                Вы зашли под именем
                <span  class="TeacherDisciplines__you-name">Коба Сергей</span>
            </div>
            <div class="">Выйти</div>
        </div>

        <div class="TeacherDisciplines container">
            <div class="TeacherDisciplines__title">Создать модуль для дисциплины</div>
            <div class="TeacherDisciplines__wrap" >
                <spinner class="TeacherDisciplines__spinner" v-if="loading"/>
                <BaseCollapse
                        v-for="(discipline, index) in disciplines"
                        :index="index + 1"
                        :key="index"
                        v-else
                >
                    <div slot="header">
                        <a class="waves-effect waves-light btn TeacherDisciplines__discipline"> {{ discipline.name }} </a>
                    </div>
                    <div slot="content">
                        <a
                            v-for="module in discipline.modules"
                            class="TeacherDisciplines__module"
                            @click="handleShowModule(discipline.id, module.id)"
                        >
                            {{ module.title }}
                        </a>
                        <a class="waves-effect waves-light btn TeacherDisciplines__module-create" @click="handleShowForm(discipline.id)">СОЗДАТЬ НОВЫЙ МОДУЛЬ </a>
                    </div>
                </BaseCollapse>
            </div>
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
                disciplines: state => state.addModule.disciplines,
                loading: state => state.addModule.fetchStatus === "init" ||
                         state.addModule.fetchStatus === "loading",
            }),
        },
        methods: {
            ...mapActions(["getDisciplinesList"]),
            handleShowForm(disciplineId) {
                this.$router.push(`/teacher-disciplines/${disciplineId}/create-module`);
            }
        },
        mounted() {
            this.getDisciplinesList();
        },
    }
</script>

<style lang="scss" scoped>
    .Layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: url("../assets/AddModule-bg.jpg") center;
        background-size: cover;
    }

    .TeacherDisciplines {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        background: rgba(74, 74, 74, 0.6);
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, .7);
        border: 2px solid #4e4e4e;
        max-height: 80vh;

        &__you {
            width: 70%;
            color: #fff;
            text-shadow: -5px 1px 15px black;
            margin-bottom: 4px;
            background: rgba(74, 74, 74, 0.6);
            box-shadow: 0 0 8px 0 rgba(0, 0, 0, .7);
            border: 2px solid #4e4e4e;
            padding-left: 1rem;
            padding-right: 1rem;
            display: flex;
            justify-content: space-between;

            &-name {
                font-weight: 600;
                text-shadow: 0 0 20px black;
            }
        }

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
            text-shadow: 0 6px 12px black;
            transition: transform .3s;

            &:hover {
                transform: translateY(-1px);
                cursor: pointer;
                text-shadow: 0 9px 12px black;
            }

            &-create {
                font-size: 11px;
                height: 30px;
                background: rgba(36, 166, 154, .31);
                min-height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
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

        &__input {

        }
    }
</style>
