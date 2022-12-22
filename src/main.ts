import "./styles/main.scss";
import App from "./App.vue";
import router from "./router";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";

import ToastPlugin from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-sugar.css";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(ToastPlugin, { position: "top" });
app.use(vuetify);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
