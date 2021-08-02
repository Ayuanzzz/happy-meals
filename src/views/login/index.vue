<template>
  <div class="container">
    <div class="title-container">
      <span
        class="title"
        :style="{ color: registerColor }"
        @click="toggleRegister"
        >注册</span
      >
      <span class="title">|</span>
      <span class="title" :style="{ color: loginColor }" @click="toggleLogin"
        >登录</span
      >
    </div>
    <!-- register -->
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      class="form"
      autocomplete="on"
      label-position="left"
      v-show="showRegister"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="大写锁定已开启"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="checkPass">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="registerForm.checkPass"
            :type="passwordType"
            placeholder="请再次输入密码"
            name="checkPass"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
        >注册</el-button
      >
    </el-form>
    <!-- login -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      class="form"
      autocomplete="on"
      label-position="left"
      v-show="showLogin"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login-Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log("value", value);
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerColor: null,
      loginColor: "#409eff",
      registerForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      loginForm: {
        username: "mealpeter",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        checkPass: [
          { required: true, trigger: "blur", validator: validatePassword2 }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      showRegister: false,
      showLogin: true
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          console.log("this.redirect", this.redirect);
          this.otherQuery = this.getOtherQuery(query);
          console.log("this.otherQuery", this.otherQuery);
        }
      },
      immediate: true
    }
  },

  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },

  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        console.log(valid);
        if (valid) {
          this.loading = true;
          this.$store.dispatch("user/register", this.registerForm).then(() => {
            this.$store
              .dispatch("user/login", this.registerForm)
              .then(() => {
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery
                });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    showForm() {
      this.showLogin = !this.showLogin;
      this.showRegister = !this.showRegister;
    },
    toggleRegister() {
      this.showLogin = false;
      this.showRegister = true;
      this.loginColor = null;
      this.registerColor = "#409eff";
    },
    toggleLogin() {
      this.showRegister = false;
      this.showLogin = true;
      this.registerColor = null;
      this.loginColor = "#409eff";
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .container .el-input input {
    color: $cursor;
  }
}

.showForm {
  display: block;
  color: #409eff;
}
/* reset element-ui css */
.container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .title-container {
    position: relative;
    width: 520px;
    padding: 130px 35px 0;
    margin: 0 auto;
    text-align: center;
    .title {
      font-size: 26px;
      padding: 0 10px;
      color: $light_gray;
      text-align: center;
      font-weight: bold;
    }
  }
  .form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
