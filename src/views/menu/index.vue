<template>
  <div class="container">
    <div class="meal">
      <h1>套餐</h1>
      <el-table style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"> </el-table-column>
        <el-table-column prop="setMeal" label="套餐" width="180">
        </el-table-column>
      </el-table>
    </div>
    <div class="snacks">
      <h1>小食</h1>
      <el-table style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"> </el-table-column>
        <el-table-column prop="snacks" label="小食" width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {};
</script>
