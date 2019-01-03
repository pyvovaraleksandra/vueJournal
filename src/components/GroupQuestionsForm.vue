<template>
    <form
        class="row Group__question"
    >
        <!-- TITLE -->
        <div class="Group__question-row">
            <div class="Group__question-label">Текст вопроса:</div>
            <div class="input-field Group__question-value text">
                <input type="text" v-model="text">
            </div>
            <!-- delete -->
            <i class="material-icons Group__question-delete">close</i>
        </div>
        <!-- KIND -->
        <div class="Group__question-row">
            <div class="Group__question-label">Тип вопроса:</div>
            <div class="Group__question-value">
                <label class="Group__question-valueLabel">
                    <input type="radio" value="text"/>
                    <span> открытый </span>
                </label>
                <label class="Group__question-valueLabel">
                    <input type="radio" value="one"/>
                    <span> один вариант ответа </span>
                </label>
                <label class="Group__question-valueLabel">
                    <input type="radio" value="many"/>
                    <span> несколько вариантов ответа </span>
                </label>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapState, mapMutations, mapActions } from "vuex";

    export default {
        name: "GroupQuestionsForm",
        props: {
            question: {
                type: Object,
                default: {}
            }
        },
        computed: {
            ...mapState({
                field(_, getters) {
                    return getters[`${this.formName}/field`];
                },
            }),
            formName() {
                return `questionForm-${this.question.index}`
            },
            text: {
                get() {
                    return this.field("text");
                },
                set(value) {
                    this.changeField({ field: "text", value });
                },
            },
        },
        methods: {
            // ...mapMutations(["removeMember"]),
            ...mapActions({
                submit(dispatch, payload) {
                    return dispatch(
                        `${this.formName}/submit`,
                        payload
                    );
                },
                changeField(dispatch, payload) {
                    return dispatch(
                        `${this.formName}/changeField`,
                        payload
                    );
                },
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .Group__question {
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
</style>