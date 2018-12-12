<template>
    <div class="Group">
        <form class="Group__form" @submit.prevent="">
            <div
                class="row Group__question"
                :class="{'is-text': question.type === 'text'}"
                v-for="(question, index) in questions"
            >
                <div class="Module__question-index">{{ index+1 }}.</div>
                <!-- TITLE -->
                <div class="Group__question-row">
                    <div class="Group__question-label">Текст вопроса:</div>
                    <div class="input-field Group__question-value text">
                        <input id="text" type="text" :value="question.text">
                    </div>
                </div>
                <!-- KIND -->
                <div class="Group__question-row">
                    <div class="Group__question-label">Тип вопроса:</div>
                    <div class="Group__question-value">
                        <label class="Group__question-valueLabel">
                            <input name="kind" type="radio" :value="text" :checked="question.kind === 'texx'"/>
                            <span> открытый </span>
                        </label>
                        <label class="Group__question-valueLabel">
                            <input name="kind" type="radio" :value="one" :checked="question.kind === 'one'"/>
                            <span> один враиант ответв </span>
                        </label>
                        <label class="Group__question-valueLabel">
                            <input name="kind" type="radio" value="many" :checked="question.kind === 'many'"/>
                            <span> несколько вариантов ответа </span>
                        </label>
                    </div>
                </div>
                <!-- VARIANTS -->
                <div class="Group__question-row" v-if="question.kind !== 'text' && newKind !== 'text'">
                    <div class="Group__question-label">Варианты ответов:</div>
                    <div class="Group__question-value" v-if="question.kind !== 'text'">
                        <label class="Group__question-valueLabel" v-for="variant in question.variants">
                            <input name="variants" :type="question.type" value="many" :checked="question.kind === 'many'"/>
                            <span> {{ variant }} </span>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import spinner from "../../public/spinner.svg";
    import BaseCollapse from "../components/BaseCollapse";
    import modal from "../components/BaseModal";

    export default {
        name: "QuestionsGroup",
        components: {
            spinner,
            BaseCollapse,
            modal
        },
        data() {
            return {
                id: this.$route.params.groupId,
                newKind: ''
            }
        },
        computed: {
            ...mapState({
                questions: state => state.group.questions,
            }),
            modules() {
                const modules = [];

                for (let discipline of this.disciplines) {
                    const disciplineName = discipline.name;

                    for (let module of discipline.modules) {
                        modules.push({
                            title: module.title,
                            id: module.id,
                            discipline: disciplineName
                        });
                    }
                }

                return modules;
            }
        },
        methods: {
            ...mapActions(["getQuestionList"]),
        },
        mounted() {
            this.getQuestionList(this.id);
        }
    }
</script>

<style lang="scss" scoped>
    .Group {
        min-height: 100vh;
        background: #efefef;

        &__form {
            background: #fff;
            width: 50%;
            margin: 0 auto;
            padding: 1rem 2rem;
        }

        &__question {
            &-row {
                display: flex;
                margin-bottom: 1rem;
            }

            &-label {
                width: 23%;
                flex-shrink: 0;
            }

            &-value {
                flex-grow: 1;

                &.text {
                    margin-top: -10px;
                    margin-bottom: 0;
                }

                &Label {
                    display: block;
                }
            }
        }
    }
</style>