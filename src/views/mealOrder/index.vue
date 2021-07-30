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
          v-model="form.setName"
          @change="currMealChange"
          class="filter-item"
          placeholder="请选择套餐"
        >
          <el-option
            v-for="(item, index) in mealList"
            :key="index"
            :label="item.setName + ' ￥' + item.setPrice"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="小食">
        <el-select
          v-model="form.snackName"
          @change="currSnacksChange"
          class="filter-item"
          placeholder="请选择小食"
        >
          <el-option
            v-for="(item, index) in snacksList"
            :key="index"
            :label="item.snackName + ' ￥' + item.snackPrice"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="备注信息"></el-input>
      </el-form-item>
    </el-form>
    <div class="count">
      <span>金额</span>
      <span>￥{{ calcPrice }}</span>
    </div>
    <div class="order-footer">
      <el-button @click="resetForm">
        重置
      </el-button>
      <el-button type="primary" @click="createOrder">
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
import { getMeal, getSnacks } from "@/api/menu";
import { addOrder } from "@/api/orderMeal";
export default {
  data() {
    return {
      mealList: [],
      snacksList: [],
      form: {
        orderStatus: "1",
        remark: "",
        setId: 0,
        setNum: 1,
        setPrice: 0,
        snackId: 0,
        snackNum: 1,
        snackPrice: 0,
        totalPrice: 0
      },
      message: "Runoob!"
    };
  },
  created() {
    this.getList();
  },
  computed: {
    calcPrice() {
      this.form.totalPrice = this.form.setPrice + this.form.snackPrice;
      return this.form.totalPrice;
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      getMeal().then(res => {
        res.data.shift();
        this.mealList = res.data;
      });
      getSnacks().then(res => {
        res.data.shift();
        this.snacksList = res.data;
      });
    },
    createOrder() {
      addOrder(this.form).then(res => {
        console.log(res);
      });
    },
    currMealChange(val) {
      this.form.setPrice = this.mealList[val].setPrice;
      this.form.setId = this.mealList[val].setId;
    },
    currSnacksChange(val) {
      this.form.snackPrice = this.snacksList[val].snackPrice;
      this.form.snackId = this.mealList[val].snackId;
    },
    resetForm() {
      this.form = {
        orderStatus: "1",
        remark: "",
        setId: 0,
        setNum: 1,
        setPrice: 0,
        snackId: 0,
        snackNum: 1,
        snackPrice: 0,
        totalPrice: 0
      };
    }
  }
};
</script>

<style></style>
