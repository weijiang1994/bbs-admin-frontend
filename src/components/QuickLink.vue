<template>
  <div id="quick-link" class="quick-link">
    <div class="link-icon" @click="openPage()">
      <a><i :class="icon"></i></a>
    </div>
    <p>{{ title }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    icon: { type: String, default: "" },
    title: { type: String, default: "" },
    router: { type: String, default: "" },
  },
  methods: {
    openPage() {
      this.$router.push(this.router);
    },
  },
};
</script>
<style scoped>
.link-icon {
  display: flex;
  background: #eeeeee;
  border-radius: 5px;
  padding: 8px;
  justify-content: center;
}
.link-icon:hover {
  background: cornflowerblue;
}
.quick-link {
  text-align: center;
  margin: 8px;
  width: 100px;
}
</style>