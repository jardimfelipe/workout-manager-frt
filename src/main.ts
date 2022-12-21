import "./styles/main.scss";
import App from "./App.vue";
import router from "./router";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
