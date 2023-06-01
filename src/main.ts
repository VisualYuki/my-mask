import { createApp } from "vue";
import App from "./App.vue";
import { vMyMask } from "./directive";
import { vMaska } from "maska";

let app = createApp(App);

app.directive("my-mask", vMyMask);
app.directive("maska", vMaska);

app.mount("#app");

import { Mask } from "./mask";

let mask = new Mask({
  mask: "**.##",
  placeholder: true,
});

console.log(mask.mask("d1"));

//console.log("masked" + mask.masked("123-123"));
//console.log("unmasked" + mask.unmasked("123-123"));
//console.log("completed" + mask.completed("123-123"));
