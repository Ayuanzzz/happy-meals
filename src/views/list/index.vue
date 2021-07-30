<template>
  <div class="app-container">
    <div class="title"></div>
    <h3>阿圆</h3>
    <h3>2021年7月31日</h3>
    <el-tag type="success">泡椒牛肉饭</el-tag>
    <el-tag type="info">蛋挞</el-tag>
    <el-tag type="warning">配可乐</el-tag>
    <div class="btn">
      <el-button type="primary" @click="onSubmit">修改</el-button>
    </div>
  </div>
</template>

<script>
import { addOrder } from "@/api/mealOrder";
</script>
