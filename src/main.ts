import { createApp } from 'vue';
import './style.css';
import router from "./router";
import store from "./store";
import App from './App.vue';

createApp(App).use(store).use(router).mount('#app');
