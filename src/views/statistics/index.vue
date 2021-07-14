<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" align="center" width="80">
        <template v-slot="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="100">
        <template v-slot="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="temp" label="套餐" align="center" width="200">
        <template v-slot="{ row }">
          <span>{{ row.setmeal }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="temp" label="小食" align="center" width="200">
        <template v-slot="{ row }">
          <span>{{ row.snacks }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="temp" label="备注" align="center" width="200">
        <template v-slot="{ row }">
          <span>{{ row.remarks }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="temp" label="订餐时间" align="center" width="150">
        <template v-slot="{ row }">
          <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template v-slot="{ row, $index }">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableKey: 0,
      list: [
        {
          id: 1,
          name: "Peter",
          setmeal: "泡椒牛肉",
          snacks: "蒸蛋",
          remarks: "配可乐",
          timestamp: "437796585338"
        },
        {
          id: 2,
          name: "Sugar",
          setmeal: "小炒肉",
          snacks: "蛋挞",
          remarks: "配可乐",
          timestamp: "437796585338"
        }
      ],
      listLoading: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = false;
    },
    handleDelete(row, index) {
      this.$notify({
        title: "操作成功",
        message: "已删除",
        type: "success",
        duration: 2000
      });
      this.list.splice(index, 1);
    }
  }
};
</script>
