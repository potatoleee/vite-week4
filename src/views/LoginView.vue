<template>
  <div class="container">
    <div class="row justify-content-center align-items-center h-100vh">
      <div class="col-lg-6">
        <h1 class="text-center mb-4">後台登入123</h1>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="username"
            placeholder="name@example.com"
            v-model="user.username"
          />
          <label for="userName">請輸入帳號 Email address</label>
        </div>
        <div class="form-floating mb-4">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="user.password"
          />
          <label for="password">請輸入密碼 Password</label>
        </div>
        <button
          class="btn btn-primary w-100 py-2 d-block mx-auto loginBtn"
          type="submit"
          @click="login"
        >
          登入
        </button>
        <!-- <button class="btn btn-primary w-100 py-2 d-block mx-auto loginCheckBtn" type="submit">確認是否登入</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 資料
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  //方法集
  methods: {
    //登入
    login() {
      if (this.user.username == "" || this.user.password == "") {
        alert("請輸入帳號密碼喔！");
        return;
      } else {
        // #1 發送登入 api ，並儲存Token

        console.log(import.meta.env.VITE_URL);
        const api_url = import.meta.env.VITE_URL;
        this.$http
          .post(`${api_url}/admin/signin`, this.user)
          .then((res) => {
            console.log(res.data);
            // 一般寫法
            // const token = res.data.token;
            // const expired = res.data.expired;

            // 解構賦值寫法
            const { token, expired } = res.data;
            //存token ,expired;
            // document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            document.cookie = `week2HexToken=${token}; expires=${new Date(
              expired
            )};`;
            //這邊也都要this.才可以取到

            //跳轉至後台頁面
            this.$router.push("/backStage");
            // location.href = "/vite-week4/backStage";
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
  },
  mounted() {
    console.log(import.meta.env.VITE_TEXT);
  },
};
</script>
