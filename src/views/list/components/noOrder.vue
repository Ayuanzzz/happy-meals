<template>
  <div>
    <img :src="pic" />
    <span>无订单</span>
  </div>
</template>

<script>
export default {
  name: "noOrder",
  data() {
    return {
      pic: "https://media.giphy.com/media/hQUuJv4ZTz0THjciOH/giphy.gif"
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
