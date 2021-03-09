//引入vue
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// 注册vuex
Vue.use(Vuex);

// 状态
const state = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
  userList: []
};

// mutations 主要用来操作 state
const mutations = {
  // 保存用户数据
  SAVE_USERINFO(state, userInfo) {
    console.log("函数被触发", state, userInfo);
    // 先把数据存入本地存储
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log("state中userInfo数据：", state.userInfo);

    // 有必要再赋值吗？
    // 再更新数据
    state.userInfo = userInfo;
    console.log("赋值后的用户信息", state.userInfo);
  },
  // 获取全局的用户数据
  GET_USERLIST(state, userList) {
    state.userList = userList;
  }
};

// 定义action 异步的 主要是 commit mutations 由mutations来改变状态
const actions = {
  GET_USERLIST1({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("/api/getuserlist").then(response => {
        // console.log("获取用户数据列表：", response.data);
        commit("GET_USERLIST", response.data);
        resolve();
      });
    });
  }
};
// 定义全局共享属性 getters
const getters = {
  vipUsers: state => state.userList.filter(v => v.age > 9)
};
// 创建store仓库暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
