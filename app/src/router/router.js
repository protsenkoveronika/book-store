import { createRouter, createWebHistory } from 'vue-router';
import Books from '../components/Books.vue';

const routes = [
    { path: '/', name: 'Books', component: Books, },
    // { path: '/login', component: LogIn },
    // { path: '/addBook', component: Add },
    // { path: '/updateBook', component: Update,
    //     children: [
    //         {
    //             path: 'book/:id',
    //             components: {
    //                 updateComp: UpdateBook,
    //             },
    //             props: {
    //                 updateComp: route => ({ id: route.params.id }),
    //             },
    //         },
    //     ],
    // },
    // { path: '/books', component: Books }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;