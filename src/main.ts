import { createApp } from "vue";
import App from "./App.vue";
import { vMyMask } from "./directive";

let app = createApp(App);

app.directive("my-mask", vMyMask);

app.mount("#app");
