import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/home",
        name: "Home",
        component: () => import('../page/Home.vue'),
    },
    {
        path: "/game",
        name: "Game",
        component: () => import('../page/Game.vue'),
    },
    {
        path: "/settlement",
        name: "Settlement",
        component: () => import('../page/Settlement.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
    if (to.path !== '/home' && to.path !== '/game' && to.path !== '/settlement') {
        console.log("拦截");
        next('/home');
    }
    next();
})

export default router;