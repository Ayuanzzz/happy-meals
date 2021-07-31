<template>
  <div>
    <img :src="pic" />
    <span>订单已取消</span>
  </div>
</template>

<script>
export default {
  name: "cancelOrder",
  data() {
    return {
      pic: "https://media.giphy.com/media/ftwmZIEB8RutAg41GE/giphy.gif"
    };
  }
};
</script>

<style lang="scss" scoped>
img {
  float: left;
}
span {
  position: relative;
  top: 100px;
  left: 50px;
  font-size: 60px;
  font-weight: bold;
  color: #409eff;
}
</style>
