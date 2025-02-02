// import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Importer Bootstrap CSS et JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

app.use(router);

app.mount("#app");
