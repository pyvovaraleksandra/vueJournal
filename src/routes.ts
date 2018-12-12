import auth from "./pages/Auth.vue";
import disciplines from "./pages/Disciplines.vue";
import module from "./pages/Module.vue";
import result from "./pages/Result.vue";
import addModule from "./pages/AddModule.vue";
import createModuleForm from "./pages/CreateModuleForm.vue";

import router from "./main";

const logined = localStorage.getItem('logined');

const routes = [
    {
        path: '/auth',
        component: auth,
        beforeEnter: (to, from, next) => {
            next(logined ? "/disciplines" : undefined);
        }
    },
    {
        path: "/disciplines",
        component: disciplines,
        meta: { requiresAuth: true }
    },
    {
        path: `/disciplines/:disciplineId/modules/:id`,
        component: module,
        meta: { requiresAuth: true }
    },
    {
        path: `/result`,
        component: result,
        meta: { requiresAuth: true }
    },
    {
        path: `/teacher-disciplines`,
        component: addModule,
        meta: { requiresAuth: true }
    },
    {
        path: `/teacher-disciplines/:disciplineId/create-module`,
        component: createModuleForm,
        meta: { requiresAuth: true }
    }
];



export default routes;