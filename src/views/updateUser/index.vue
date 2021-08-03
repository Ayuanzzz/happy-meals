<template>
  <div class="app-container">
    <el-upload
      class="avatar-uploader"
      action="http://47.108.138.115:8080/mealUser/updateUserIcon"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="myHeaders"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button type="primary" @click="updateAvatar">
      确定
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      myHeaders: { satoken: this.$store.getters.token }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isGIFJPG = file.type === "image/gif" || "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isGIFJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isGIF && isLt2M;
    },
    updateAvatar() {
      this.$store.commit("user/SET_AVATAR", this.imageUrl);
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
