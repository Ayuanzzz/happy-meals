<template>
  <div class="app-container">
    <el-form
      :model="form"
      label-position="left"
      label-width="70px"
      style="width: 400px; margin-left:50px;"
    >
      <el-form-item label="套餐">
        <el-select
          v-model="form.setId"
          class="filter-item"
          placeholder="请选择套餐"
        >
          <el-option
            ref="myref"
            v-for="item in mealList"
            :key="item.id"
            :label="item.setName + ' ￥' + item.setPrice"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="小食">
        <el-select
          v-model="form.snackId"
          class="filter-item"
          placeholder="请选择小食"
        >
          <el-option
            v-for="item in snacksList"
            :key="item.id"
            :label="item.snackName + ' ￥' + item.snackPrice"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="备注信息"></el-input>
      </el-form-item>
    </el-form>
    <div class="order-footer">
      <el-button @click="dialogFormVisible = false">
        重置
      </el-button>
      <el-button type="primary" @click="createOrder">
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
import { getMeal } from "@/api/menu";
import { getSnacks } from "@/api/menu";
export default {
  data() {
    return {
      mealList: [],
      snacksList: [],
      form: {
        setId: null,
        snackId: null,
        remark: ""
      }
    };
  },
  created() {
    this.getList();
  },
  computed: {
    calcPrice() {
      console.log("ref---", this.$refs.myref);
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      getMeal().then(res => {
        console.log(res);
        this.mealList = res.data;
      });
      getSnacks().then(res => {
        console.log(res);
        this.snacksList = res.data;
      });
    },
    createOrder() {
      console.log("this.form---", this.form);
    }
  }
};
</script>

<style></style>
