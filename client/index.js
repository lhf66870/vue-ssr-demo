const createApp = require("../src/app.js")
let { app, router } = createApp({})

router.onReady(() => {
  app.$mount("#app")
})
