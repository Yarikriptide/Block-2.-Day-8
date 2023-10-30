import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import store from './store'; 
import App from './components/App.vue';
import Students from './components/Students.vue';
import StudentInfo from './components/StudentInfo.vue';
import Login from "./components/Login.vue";

import axios from "axios" 
import VueAxios from 'vue-axios';

const routes = [ 
  {path: "/", component: Students,  meta: { requiresAuth: true }}, 
  {path: "/student-info/:id", component: StudentInfo, props:true,  meta: { requiresAuth: true }}, 
  {path: '/login', component: Login}, 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.requiresAuth)) { 
      if(store.getters.getUser === null) { 
          next({ 
              path: '/login', 
              query: { redirect: to.fullPath } 
          }) 
      } else { 
          next() 
      } 
  } else { 
      next() 
  } 
})

const app = createApp(App); 
app.use(VueAxios, axios); 
app.use(router); 
app.use(store); 
app.mount("#app");
