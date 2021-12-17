<template>
  <div class="mb">
    <el-button
      :icon="iconName"
      @click="collaspLefeMenu()"
      size="mini"
    ></el-button>
    <div class="breadcrumb-div">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>

        <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: [],
      iconName: "el-icon-s-unfold",
      isCollaspe: false,
    };
  },
  methods: {
    getBreadList() {
      if (this.$route.matched.length >= 2) {
        let matched = this.$route.matched;
        if (matched[matched.length - 1].name === "Centre") {
          return;
        }
        this.breadList = { title: matched[matched.length - 1].meta.title };
      }
    },
    collaspLefeMenu() {
      this.isCollaspe = !this.isCollaspe;
      this.$emit("collapse-left", this.isCollaspe);
    },
  },
  created() {
    this.getBreadList();
  },
  watch:{
    $route(){
      console.log(this.$route);
      this.getBreadList()
    }
  }
};
</script>

<style scoped>
.mb {
  padding-bottom: 5px;
  margin-bottom: 6px;
  display: flex;
  border-bottom: 1px solid #cccccc;
}
.breadcrumb-div {
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>