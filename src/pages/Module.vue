<template>
    <div class="Layout">
        <div class="Module container">
            <div class="Module__title">
                <div class="Module__title-discipline">{{ discipline }}</div>
                <div class="Module__title-module">{{ module }}</div>
            </div>
            <div class="Module__spinner" v-if="loading">
                <spinner class="Disciplines__spinner"/>
            </div>

            <form
                    v-else
                    class="Module__form"
                    novalidate
            >
                <div
                        class="row Module__question"
                        :class="{'is-text': question.kind === 'text'}"
                        v-for="(question, index) in questions"
                >
                    <div class="Module__question-index"> {{ index+1 }}. </div>

                    <div class="input-field Module__question-text" v-if="question.kind === 'text'">
                        <input id="question" type="text">
                        <label for="question">{{ question.text }}</label>
                    </div>
                    <div v-else class="Module__question-text">
                        {{ question.text }}:
                        <p v-for="variant in question.variants">
                            <label>
                                <input :name="question.id" :type="question.kind" />
                                <span>{{ variant }}</span>
                            </label>
                        </p>
                    </div>
                </div>
                <div class="row Module__buttons">
                    <button
                            class="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                    >
                        ЗАВЕРШИТЬ
                    </button>
                    <button
                            class="btn waves-effect waves-light Module__buttons-back"
                            type="button"
                            name="action"
                            @click="handleBack()"
                    >
                        Назад
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import spinner from "../../public/spinner.svg";

    export default {
        name: "Module",
        data() {
            return {
                id: this.$route.params.id,
                disciplineId: this.$route.params.disciplineId,
            }
        },
        components: {
            spinner,
        },
        computed: {
            ...mapState({
                loading: state => state.module.fetchStatus === "init" ||
                         state.module.fetchStatus === "loading",
                questions: state => state.module.questions,
                discipline: state => state.module.discipline,
                module: state => state.module.module,
            }),
        },
        methods: {
            ...mapActions(["getModule"]),
            handleBack() {
                this.$router.push(`/disciplines/`);
            }
        },
        mounted() {
            this.getModule({disciplineId: this.disciplineId, moduleId: this.id});
        }
    }
</script>

<style lang="scss" scoped>
    .Layout {
        min-height: 100vh;
        background: rgba(162, 181, 179, .1);
        display: block;
    }

    .Module {
        padding: 2rem 0;

        &__title {
            text-align: center;

            &-discipline {
                font-weight: 500;
                font-size: 18px;
                margin-bottom: .5rem;
            }

            &-module {
                font-weight: 500;
                font-size: 20px;
                margin-bottom: 2rem;
            }
        }

        &__spinner {
            text-align: center;
        }

        &__form {
            width: 70%;
            margin: 0 auto;
            box-shadow: 0 0 8px #d0c8c8;
            padding: .7rem 2rem;
            background: #fff;
        }

        &__question {
            display: flex;
            align-items: flex-start;

            &.is-text {
                align-items: center;
            }

            &-index {
                width: 30px;
            }

            &-text {
                flex-grow: 1;
                margin-top: 0;
            }
        }

        &__buttons {
            display: flex;
            flex-direction: column;

            &-back {
                margin-top: 1rem;
                background-color: #aebbba;
            }
        }
    }
</style>