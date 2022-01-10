<template>
  <div id="report">
    <el-button-group>
      <el-button
        :type="select ? 'primary' : ''"
        size="mini"
        @click="changeTab(true)"
        >未读</el-button
      >
      <el-button
        :type="!select ? 'primary' : ''"
        size="mini"
        @click="changeTab(false)"
        >已读</el-button
      >
    </el-button-group>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      select: true,
    };
  },
  methods: {
    changeTab(tag) {
      this.select = tag;
      if (this.select) {
        this.$router.push("/report/unread").catch((err) => {});
      } else this.$router.push("/report/readed").catch((err) => {});
    },
  },
};
</script>
<style scoped>
#report /deep/ .is-disabled {
  backdrop-filter: #409eff;
  color: white;
}
</style>