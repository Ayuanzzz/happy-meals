<template>
  <div class="app-container">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="temp"
      label-position="left"
      label-width="70px"
      style="width: 400px; margin-left:50px;"
    >
      <el-form-item label="套餐" prop="setmeal">
        <el-select
          v-model="temp.setmeal"
          class="filter-item"
          placeholder="Please select"
        >
          <el-option
            v-for="item in calendarTypeOptions"
            :key="item.key"
            :label="item.display_name"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        取消
      </el-button>
      <el-button
        type="primary"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
