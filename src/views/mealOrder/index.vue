<template>
  <div class="app-container">
    <el-form
      ref="temp"
      :model="temp"
      :rules="rules"
      label-position="left"
      label-width="70px"
      style="width: 400px; margin-left:50px;"
    >
      <el-form-item label="套餐" prop="setIndex">
        <el-select
          v-model="temp.setIndex"
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
          v-model="temp.snackIndex"
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
      <el-button @click="resetForm" :disabled="disabled">
        重置
      </el-button>
      <el-button type="primary" @click="createOrder" :disabled="disabled">
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getMeal, getSnacks } from "@/api/menu";
import { addOrder } from "@/api/mealOrder";
export default {
  name: "mealOrder",
  data() {
    const validatesetIndex = (rule, value, callback) => {
      console.log("value", value);
      if (value === null) {
        callback(new Error("请选择套餐"));
      } else {
        callback();
      }
    };
    return {
      mealList: [],
      snacksList: [],
      disabled: false,
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
      temp: {
        setIndex: null,
        snackIndex: null,
        setName: "",
        snackName: ""
      },
      message: "Runoob!",
      commitTime: "",
      rules: {
        setIndex: [{ required: true, message: "请选择套餐", trigger: "change" }]
      }
    };
  },
  created() {
    if (this.mealName) {
      this.$message({
        message: "今日已订餐",
        type: "warning"
      });
      this.disabled = true;
    }
    this.getList();
  },
  computed: {
    ...mapGetters(["mealName"]),
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
      this.$refs.temp.validate(valid => {
        if (valid) {
          addOrder(this.form).then(res => {
            const timestamp = new Date().getTime();
            this.temp.setName = this.mealList[this.temp.setIndex].setName;
            this.temp.snackName = this.snacksList[
              this.temp.snackIndex
            ].snackName;
            const { setName, snackName } = this.temp;
            const { remark, totalPrice } = this.form;
            this.$store.commit("order/SET_MEAL", setName);
            this.$store.commit("order/SET_SNACKS", snackName);
            this.$store.commit("order/SET_REMARK", remark);
            this.$store.commit("order/SET_TOTALPRICE", totalPrice);
            this.$store.commit("order/SET_TIMESTAMP", timestamp);
            this.$router.push({
              path: "/list/index"
            });
          });
        } else {
          return false;
        }
      });
    },
    currMealChange(val) {
      this.form.setPrice = this.mealList[val].setPrice;
      this.form.setId = this.mealList[val].id;
    },
    currSnacksChange(val) {
      this.form.snackPrice = this.snacksList[val].snackPrice;
      this.form.snackId = this.snacksList[val].id;
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
      this.temp = {
        setIndex: null,
        snackIndex: null,
        setName: "",
        snackName: ""
      };
    }
  }
};
</script>

<style></style>
