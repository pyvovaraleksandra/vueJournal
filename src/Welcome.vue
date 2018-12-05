<template>
    <div class="Welcome container">
        <form action="" class="center-align">
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
                <a class="waves-effect waves-light btn">Submit</a>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Welcome',
        data() {
            return {
                email: "",
                password: "",
            }
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