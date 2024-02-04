import { registerPlugins } from "@/plugins";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import mitt from "mitt";

// Components
import App from "./App.vue";

const app = createApp(App);

// Emitter
const emitter = mitt();
app.config.globalProperties.emitter = emitter;

// Store
const pinia = createPinia();
app.use(pinia);

// Router
app.use(router);

registerPlugins(app);

app.mount("#app");
