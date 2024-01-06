/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import router from "../router";
import { createPinia } from "pinia";

import { i18n } from "./locale";

export function registerPlugins(app) {
  const pinia = createPinia();

  app.use(i18n).use(vuetify).use(router).use(pinia);
}
