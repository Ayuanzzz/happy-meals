<template>
  <div class="dashboard-container">
    <img :src="pic" />
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      pic: this.$store.getters.avatar,
      name: this.$store.getters.name
    };
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
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
