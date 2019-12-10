// const Vue = require("vue")
// 引用 path 模块
const path = require("path")
// 创建一个 express 应用
const server = require("express")()
// 引用 vue 服务端渲染包
// 1.const vueServerRender = require("vue-server-renderer").createRenderer()
const vueServerRender = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync(
    path.join(__dirname, "./index.html"),
    "utf-8"
  )
})

// const vueApp = require("./src/app.js")
const vueApp = require("./server/index.js")

// 1.创建一个 Vue 实例
// const vueApp = new Vue({
//   data: {
//     msg: "Hello Vue SSR"
//   },
//   template: `<div>{{msg}}</div>`
// })

// 设置路由，"*" 表示任意路由都可以访问它
/**
 * ! 所渲染的这个网页并不完整，没有文档声明，head等等等，当然使用es6的模板字符串做拼接就好了。
 * ! 确实，这样也是行的通的，但是这个仍是饮鸩止渴不能彻底的解决问题，
 * ! 如果做过传统MVC开发的话，就应该知道，MVC开发模式全是基于模板的，
 * ! 现在这种与MVC有些相似的地方，同理也是可以使用模板的
 */
server.get("*", async (req, res) => {
  res.status(200)
  res.setHeader("Content-Type", "text/html;charset-utf-8;")
  let { url } = req;
  // 这里可以传递一些参数给vue实例
  const vm = await vueApp({ url })
  // 将vue的实例转换成html的形式
  // vueServerRender
  //   .renderToString(vueApp)
  //   .then(html => {
  //     res.end(html)
  //   })
  //   .catch(error => console.log(error))
  vueServerRender
    .renderToString(vm)
    .then(html => {
      res.end(html)
    })
    .catch(error => console.log(error))
})

// 启动服务并监听从8888端口进入的所有连接请求
server.listen(8888, () => {
  console.log("施主，莫急，老衲来也！！！")
})
