
import NotFound from '@/views/price-query/404.vue'
import Search from '@/views/price-query/search.vue'
import Detail from '@/views/price-query/detail.vue'
import index from '@/views/layout/index.vue'
import excel from '@/components/excel-demo/exportExcel.vue'
import Upload from '@/views/price-query/upload.vue'
import demo from '@/views/demo/avue-crud-demo-page.vue'
// let routes = [
//     {
//         path: '/404',
//         component: NotFound,
//         name: '',
//         hidden: true
//     },
//     {
//         path: '/home',
//         name: 'home',
//         component: Home,
//     },
//     {
//         path: '/upload',
//         name: 'upload',
//         component: Upload,
//     },
//     {
//         path: '/excel',
//         name: 'excel',
//         component: excel,
//     },
//     {
//         path: '/search',
//         name: 'search',
//         component: Search,
//     },
//     {
//         path: '/',
//         redirect:"/search",
//         // name: 'home',
//         // component: Home,
//     },
//     {
//         path: '/detail',
//         name: 'detail',
//         component: Detail,
//     },
//     {
//         path: '*',
//         hidden: true,
//         redirect: {
//             path: '/404'
//         }
//     }
// ];

let routes = [
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        children: [
            
            {
                path: '/demo',
                name: 'demo',
                component: demo,
            },
            {
                path: '/upload',
                name: 'upload',
                component: Upload,
            },
           
            {
                path: '/search',
                name: 'search',
                component: Search,
            },
            {
                path: '/detail',
                name: 'detail',
                component: Detail,
            },
          ]
    },
    {
        path: '/excel',
        name: 'excel',
        component: excel,
    },
    {
        path: '/',
        redirect:"/demo",
        // name: 'home',
        // component: Home,
    },
    
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;