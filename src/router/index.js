import Vue from "vue";
import Router from "vue-router";

// 引入组件
// import login from "@/components/login";
// import index from "@/components/index";

// 异步加载：懒加载
const login = () => import("@/components/login");
const index = () => import("@/components/index");
const userList = () => import("@/components/userList");
const vipUsers = () => import("@/components/vipUsers");
const home = () => import("@/components/home");
const passwordEdit = () => import("@/components/passwordEdit");

// 注册路由
Vue.use(Router);

// 导出路由
const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/",
      name: "index",
      component: index,
      children: [
        {
          path: "/",
          name: "home",
          component: home
          // 路由独享守卫
          // beforeEnter: (to, from, next) => {
          //   console.log("路由独享守卫", localStorage.getItem("userInfo"));
          //   // to: Route: 即将要进入的目标 路由对象
          //   // from: Route: 当前导航正要离开的路由
          //   //如果next为空则路由正常进行跳转，如果next不为空，则进行跳转时，会中断

          //   // const nextRoute = ["home", "userList", "vipUsers", "passwordEdit"];
          //   let isLogin = localStorage.getItem("userInfo"); // 是否登录，一般从storage中读取
          //   // 未登录状态；当路由到nextRoute指定页时，跳转至login
          //   if (to.name === "home") {
          //     if (!isLogin) {
          //       console.log("what fuck");
          //       router.push({ name: "login" });
          //     }
          //   }
          //   // 已登录状态；当路由到login时，如果已经登录过，则跳转至home
          //   if (to.name === "login") {
          //     if (isLogin) {
          //       router.push({ name: "home" });
          //     }
          //   }
          //   next();
          // }
        },
        {
          path: "/userList",
          name: "userList",
          component: userList
        },
        {
          path: "/vipUsers",
          name: "vipUsers",
          component: vipUsers
        },
        {
          path: "/passwordEdit",
          name: "passwordEdit",
          component: passwordEdit
        }
      ]
    }
  ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log(localStorage.getItem("userInfo"));
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由对象
  //如果next为空则路由正常进行跳转，如果next不为空，则进行跳转时，会中断

  const nextRoute = ["home", "userList", "vipUsers", "passwordEdit"];
  let isLogin = localStorage.getItem("userInfo"); // 是否登录，一般从storage中读取
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {
    console.log(to.name);
    if (!isLogin) {
      console.log("what fuck");
      router.push({ name: "login" });
    }
  }
  // 已登录状态；当路由到login时，如果已经登录过，则跳转至home
  if (to.name === "login") {
    if (isLogin) {
      router.push({ name: "home" });
    }
  }
  next();
});

export default router;
