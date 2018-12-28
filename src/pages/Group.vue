<template>
    <div class="Group">
        <form class="Group__form" @submit.prevent="submit({payload: {disciplineModuleId, id}, meta: {}})">
            <div class="Group__title">
                <div class="Group__title-discipline">Web technologies and web design</div>
            </div>
            <div class="Group__info">
                <div class="Group__info-row">
                    <div class="Group__info-label">Название группы</div>
                    <div class="flex-grow-1">
                        <input type="text" v-model="title" class="Group__info-value">
                        <validation
                            formKey="groupForm"
                            field="title"
                        />
                    </div>
                </div>
                <div class="Group__info-row">
                    <div class="Group__info-label">Позиция</div>
                    <div class="flex-grow-1">
                        <input type="text" v-model="position" class="Group__info-value">
                        <validation
                            formKey="groupForm"
                            field="position"
                        />
                    </div>
                </div>
                <div class="Group__info-row">
                    <div class="Group__info-label">Количество баллов</div>
                    <div class="flex-grow-1">
                        <input type="text" v-model="points" class="Group__info-value">
                        <validation
                            formKey="groupForm"
                            field="points"
                        />
                    </div>
                </div>
            </div>
            <div class="Group__title-questions">Список вопросов: </div>
            <div
                class="row Group__question"
                :class="{'is-text': question.type === 'text'}"
                v-for="(question, index) in questions"
            >
                <!-- TITLE -->
                <div class="Group__question-row">
                    <div class="Group__question-label">Текст вопроса:</div>
                    <div class="input-field Group__question-value text">
                        <input id="text" type="text" :value="question.text">
                    </div>
                    <!-- delete -->
                    <i class="material-icons Group__question-delete">close</i>
                </div>
                <!-- KIND -->
                <div class="Group__question-row">
                    <div class="Group__question-label">Тип вопроса:</div>
                    <div class="Group__question-value">
                        <label class="Group__question-valueLabel">
                            <input :name="'kind-'+index" type="radio" value="text" :checked="question.kind === 'text'"/>
                            <span> открытый </span>
                        </label>
                        <label class="Group__question-valueLabel">
                            <input :name="'kind-'+index" type="radio" value="one" :checked="question.kind === 'one'"/>
                            <span> один вариант ответа </span>
                        </label>
                        <label class="Group__question-valueLabel">
                            <input :name="'kind-'+index" type="radio" value="many" :checked="question.kind === 'many'"/>
                            <span> несколько вариантов ответа </span>
                        </label>
                    </div>
                </div>
                <!-- VARIANTS -->
                <div class="Group__question-row" v-if="question.kind !== 'text' && newKind !== 'text'">
                    <div class="Group__question-label">Варианты ответов:</div>
                    <div class="Group__question-value" v-if="question.kind !== 'text'">
                        <label class="Group__question-valueLabel kind" v-for="(variant, indexVariant) in question.variants">
                            <div>
                                <input :name="'variants-'+index" :type="question.type" :value="indexVariant" :checked="question.answer.includes(indexVariant)"/>
                                <span> {{ variant }} </span>
                            </div>
                            <i class="material-icons Group__question-remove">close</i>
                        </label>
                        <button class="btn waves-effect waves-light Group__question-add">добавить вариант</button>
                    </div>
                </div>
            </div>
            <!-- SUBMIIT -->
            <div class="Group__buttons">
                <button class="btn waves-effect waves-light Group__question-add question">добавить еще один вопрос</button>
                <button class="btn waves-effect waves-light" type="submit" name="action">СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                <button
                    class="btn waves-effect waves-light Group__buttons-back"
                    type="button"
                    name="action"
                    @click="handleBack()"
                >
                    Назад
                </button>
            </div>

        </form>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import spinner from "../../public/spinner.svg";
    import BaseCollapse from "../components/BaseCollapse";
    import modal from "../components/BaseModalWindow";
    import validation from "../components/BaseValidationError";
    import { mapFieldsToComputed } from "../store/lib/vuex-form/index";

    export default {
        name: "Group",
        components: {
            spinner,
            BaseCollapse,
            modal,
            validation
        },
        data() {
            return {
                id: this.$route.params.groupId,
                newKind: '',
                disciplineModuleId: JSON.parse(localStorage.getItem("selectedGroup")).disciplineModuleId
            }
        },
        computed: {
            ...mapState({
                groups: state => state.questionsGroup.groups,
                questions: state => state.group.questions,
            }),
            // position() {
            //     if (this.groups.length) {
            //         return this.groups[this.id-1].position
            //     }
            // },
            // points() {
            //     if (this.groups.length) {
            //         return this.groups[this.id-1].points
            //     }
            // },
            ...mapFieldsToComputed("groupForm", [
                "title",
                "position",
                "points",
            ]),
        },
        methods: {
            ...mapActions(["initGroup"]),
            ...mapActions("groupForm", ["submit"]),
            handleBack() {
                this.$router.push(`/teacher`);
            },
        },
        mounted() {
            this.initGroup();
        }
    }
</script>

<style lang="scss" scoped>
    .flex-grow-1 {
        flex-grow: 1;
    }

    .Group {
        min-height: 100vh;
        background: #efefef;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &__info {
            border-bottom: 2px solid #827f7f;
            padding: 10px 20px;
            margin-top: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 0 1px #4e4e4e;

            &-row {
                display: flex;
                margin-bottom: 7px;
            }

            &-label {
                width: 30%;
                flex-shrink: 0;
            }

            &-value {
                flex-grow: 1;
                margin-top: -4px !important;
                height: 2rem !important;
                border-bottom: 1px solid #cacaca !important;
            }
        }

        &__title {
            text-align: center;

            &-discipline {
                font-weight: 500;
                font-size: 18px;
                margin-bottom: .5rem;
            }

            &-questions {
                font-weight: 500;
                font-size: 16px;
                margin-bottom: 3rem;
                text-transform: uppercase;
                text-align: center;
            }
        }

        &__form {
            background: #fff;
            box-shadow: 0 0 8px #d0c8c8;
            width: 50%;
            margin: 0 auto;
            padding: 2rem 2rem;
        }

        &__question {
            border-bottom: 1px solid #827f7f;
            padding-bottom: 15px;
            margin-bottom: 35px;

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

                    input {
                        border-bottom: 1px solid #cacaca;
                    }
                }

                &Label {
                    color: rgba(0,0,0,0.87);
                    display: flex;
                    justify-content: space-between;

                    &.kind {
                        width: 45%;
                    }
                }
            }

            &-add {
                margin-top: 12px;
                background: #efefef;
                color: #1e887e;
                font-weight: 600;
                font-size: 14px;
                text-transform: lowercase;

                &.question {
                    max-width: 240px;
                    align-self: center;
                    margin-top: -1rem;
                    margin-bottom: 3rem;
                }
            }

            &-remove {
                color: #d4d4d4;
                transition: .3s;
                transform-origin: center;

                &:hover {
                    cursor: pointer;
                    color: #26a69a;
                    transform: scale(1.1);
                }
            }

            &-delete {
                color: #26a69a;
                transition: transform .3s;
                transform-origin: center;

                &:hover {
                    cursor: pointer;
                    transform: scale(1.1);
                }
            }
        }

        &__buttons {
            display: flex;
            flex-direction: column;
            width: 70%;
            margin: 0 auto;

            &-back {
                margin-top: 1rem;
                background-color: #aebbba;
            }
        }

        .BaseValidationError {
            margin-top: -15px;
        }
    }
</style>