<template>
  <div class="container">
    <div class="tabs-container">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="temp">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tabs-container {
  border: 1px solid red;
  width: 500px;
  height: 470px;
}
.temp {
  margin-left: 50px;
}
</style>
