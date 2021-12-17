<template>
  <div class="mb">
    <el-button
      :icon="iconName"
      @click="collapseLeftMenu"
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
      isCollapse: false,
    };
  },
  methods: {
    getBreadList() {
      if (this.$route.name === 'Centre') this.breadList = {}
      else this.breadList = {title: this.$route.meta.title}
    },
    collapseLeftMenu() {
      this.isCollapse = !this.isCollapse;
      this.$emit("collapse-left", this.isCollapse);
    },
  },
  created() {
    this.getBreadList();
  },
  watch:{
    $route(){
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