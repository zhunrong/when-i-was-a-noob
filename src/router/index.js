import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('../pages/Home.vue');
const PushBox = () => import('../pages/PushBox.vue');
Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/pushbox',
        name: 'PushBox',
        component: PushBox
    }]
})