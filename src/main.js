import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueMaterialSlider from 'vue-material-slider'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import Restaurants from "./components/Restaurants.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue";
import RestaurantMenu from "./components/RestaurantMenu.vue";
import HelloWorld from "./components/HelloWorld.vue";

// configs...
Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMaterialSlider)

// config du router :
const router = new VueRouter({
  routes:[
    { 
      path: '/', 
      component: HelloWorld, 
      props:{
        msg:"Restaurants website"
      } 
    },
    { 
      path: '/restaurants', 
      component: Restaurants 
    },
    { 
      path: '/restaurant/:id', 
      component: RestaurantDetail 
    },

    { 
      path: '/restaurant/:id/menu', 
      component: RestaurantMenu 
    },
  ],
  mode:'history'
});

new Vue({
  router,
  render: h => h(App), // si router pas de rendu de composant
}).$mount('#app')
