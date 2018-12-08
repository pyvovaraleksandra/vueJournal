import auth from "./pages/Auth.vue";
import disciplines from "./pages/Disciplines.vue";
const logined = localStorage.getItem('LOGINED');

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
        component: disciplines
    }
];

export default routes;