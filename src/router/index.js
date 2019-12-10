const Vue = require("vue");
const vueRouter = require("vue-router");

Vue.use(vueRouter);

module.exports = () => {
    return new vueRouter({
        mode:"history",
        routes:[
            {
                path:"/",
                component:{
                    template:`<h1>这里是首页</h1>`
                },
                name:"home"
            },
            {
                path:"/about",
                component:{
                    template:`<h1>这里是关于我</h1>`
                },
                name:"about"
            }
        ]
    })
}