<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="小食"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
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
      <el-table-column label="序号" align="center" width="80">
        <template v-slot="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="小食" align="center">
        <template v-slot="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="timestamp"
        label="创建日期"
        align="center"
        width="150"
      >
        <template v-slot="{ row }">
          <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="temp.name"
            class="filter-item"
            placeholder="请输入小食名"
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
    </el-dialog> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      info: {},
      tableKey: 0,
      list: [
        {
          id: 1,
          name: "泡椒牛肉饭",
          timestamp: "437796585338"
        },
        {
          id: 2,
          name: "川式小炒肉",
          timestamp: "437796585338"
        }
      ],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        setmeal: undefined
      },
      temp: {
        id: undefined,
        name: "",
        timestamp: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      }
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    // this.tempPost();
    this.tempGet();
  },
  methods: {
    tempGet() {
      axios
        .get("http://192.168.2.97:8080/mealUser/list", {
          params: {
            id: 2
          }
        })

        .then(res => {
          console.log(res);
        });
    },
    tempPost() {
      axios
        .post("http://192.168.2.97:8080/mealUser", {
          userName: "Peter",
          userRole: "user"
        })
        .then(res => {
          console.log(res);
        });
    },
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
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: "",
        timestamp: new Date()
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
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    updateData() {
      console.log("update");
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
