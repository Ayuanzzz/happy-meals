<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        placeholder="姓名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.setName"
        placeholder="套餐"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in mealList"
          :key="item.key"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.snackName"
        placeholder="小食"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in snacksList"
          :key="item.key"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查询
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        prop="id"
        label="序号"
        type="index"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="150">
        <template v-slot="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="temp" label="套餐" align="center">
        <template v-slot="{ row }">
          <span>{{ row.setName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="temp" label="小食" align="center" width="200">
        <template v-slot="{ row }">
          <span>{{ row.snackName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="temp" label="备注" align="center" width="200">
        <template v-slot="{ row }">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="temp" label="订餐时间" align="center" width="150">
        <template v-slot="{ row }">
          <span>{{ row.orderTime }}</span>
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
import { getOrder } from "@/api/mealOrder";
export default {
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: true,
      listQuery: {
        setName: undefined,
        snackName: undefined
      },
      mealList: [],
      snacksList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getOrder(this.listQuery).then(res => {
        this.listLoading = false;
        console.log(res);
        this.list = res.data.records;
        for (const item of this.list) {
          this.mealList.push(item.setName);
          this.snacksList.push(item.snackName);
        }
      });
    },
    handleDelete(row, index) {
      this.$notify({
        title: "操作成功",
        message: "已删除",
        type: "success",
        duration: 2000
      });
      this.list.splice(index, 1);
    },
    handleFilter() {
      console.log(this.listQuery);
      this.getList();
    }
  }
};
</script>
