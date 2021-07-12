<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="套餐">
        <el-select v-model="form.meal" placeholder="请选择套餐">
          <el-option label="泡椒牛肉饭" value="beef" />
          <el-option label="川式小炒肉" value="pig" />
        </el-select>
      </el-form-item>
      <el-form-item label="小食">
        <el-select v-model="form.snacks" placeholder="请选择小食">
          <el-option label="蛋挞" value="cake" />
          <el-option label="蒸蛋" value="egg" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="配可乐" name="type" />
          <el-checkbox label="无需餐具" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        meal: "",
        snacks: "",
        type: []
      }
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onReset() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
