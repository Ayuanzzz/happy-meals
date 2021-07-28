<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="小食"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width:50%"
    >
      <el-table-column
        prop="id"
        label="序号"
        type="index"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="name" label="小食" align="center">
        <template v-slot="{ row }">
          <span>{{ row.setName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" width="150">
        <template v-slot="{ row }">
          <span>{{ row.setPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template v-slot="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
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
    <!-- 弹出框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="小食名" prop="setName">
          <el-input
            v-model="temp.setName"
            class="filter-item"
            placeholder="请输入小食名"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="价格" prop="setPrice">
          <el-input
            v-model="temp.setPrice"
            class="filter-item"
            placeholder="请输入价格"
          >
          </el-input>
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
    </el-dialog>
  </div>
</template>
<script>
import { getSnacks, addSnacks, updateSnacks, deleteSnacks } from "@/api/menu";
export default {
  name: "snacks",
  data() {
    const validate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      tableKey: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        setmeal: undefined
      },
      temp: {
        setName: "",
        setPrice: null,
        limitSet: 6,
        remainSet: 5
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      rules: {
        setName: [{ required: true, trigger: "blur", validator: validate }],
        setPrice: [{ required: true, trigger: "blur", validator: validate }]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getSnacks().then(res => {
        this.list = res.data;
        this.listLoading = false;
      });
    },
    handleDelete(row, index) {
      console.log("row.id---", row.id);
      deleteSnacks(row.id).then(() => {
        this.list.splice(index, 1);
        this.dialogFormVisible = false;
        this.$notify({
          title: "操作成功",
          message: "已删除",
          type: "success",
          duration: 2000
        });
      });

      this.list.splice(index, 1);
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    resetTemp() {
      this.temp = {
        setName: "",
        setPrice: null,
        limitSet: 6,
        remainSet: 5
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          console.log(this.temp);
          addSnacks(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "已添加",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          console.log("tempData", tempData);
          updateSnacks(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "已修改",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    }
  }
};
</script>
