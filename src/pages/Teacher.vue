<template>
    <div class="Layout">
        <div class="Teacher__you">
            <div>
                Вы зашли под именем
                <span  class="Teacher__you-name">Коба Сергей</span>
            </div>
            <div class="">Выйти</div>
        </div>
        <modules/>
        <div class="Teacher__row">
            <groups/>
            <groups/>
        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import modules from "../components/TeacherModules";
    import groups from "../components/QuestionsGroup";

    export default {
        name: 'Teacher',
        components: {
            modules,
            groups
        },
        computed: {
            ...mapState({
                email: state => state.auth.email,
                name: state => state.auth.name,
            }),
        },
        methods: {
            ...mapActions(["getDisciplinesList"]),
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
        min-height: 100vh;
        background: url("../assets/AddModule-bg.jpg") center;
        background-size: cover;
    }

    .Teacher {
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

        &__row {
            display: flex;
            width: 70%;
            margin-top: 1rem;
        }
    }
</style>

<style lang="scss">
    .Teacher {
        &__modules {
            width: 100%;
        }
        &__groups {
            width: 50%;
        }
    }
</style>
