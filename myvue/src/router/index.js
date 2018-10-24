import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '../pages/index'
import OrderListPage from '../pages/orderList'

import detail from '../pages/detail'
import analysis from '../pages/detail/analysis'
import count from '../pages/detail/count'
import forecast from '../pages/detail/forecast'
import publish from '../pages/detail/publish'


Vue.use(VueRouter);


var router = new VueRouter({
    mode: 'history',       //去掉哈希
    routes: [
        {
            path: '/',
            component: IndexPage
        },
        {
            path: '/orderList',
            component: OrderListPage
        },
        {
            path: '/detail',
            component: detail,
            redirect: '/detail/analysis',
            children: [
                {
                    name: 'count',
                    path: 'count',
                    component: count
                },
                {
                    name: 'analysis',
                    path: 'analysis',
                    component: analysis
                },

                {
                    name: 'forecast',
                    path: 'forecast',
                    component: forecast
                },
                {
                    name: 'publish',
                    path: 'publish',
                    component: publish
                }
            ]
        }
     
    ]
})
export default router;
