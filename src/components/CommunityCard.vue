<template>
  <div>
    <el-skeleton animated :loading="loading">
      <template slot="template">
        <div class="community-card">
          <div class="d-flex">
            <el-skeleton-item
              variant="p mr-2"
              style="width: 50%"
            ></el-skeleton-item>
            <div
              style="display: flex; flex-grow: 1; flex-direction: row-reverse"
            >
              <el-skeleton-item
                variant="p"
                style="width: 30%"
              ></el-skeleton-item>
            </div>
          </div>
          <el-skeleton-item variant="p mt-2" style="width: 40%"></el-skeleton-item>
          <el-skeleton-item variant="p"></el-skeleton-item>
        </div>
      </template>
    </el-skeleton>
    <template>
      <div class="community-card">
        <div class="d-flex">
          <p>{{ infos.title }}</p>
          <div style="flex-grow: 1; display: flex; flex-direction: row-reverse">
            <p class="badge-info">实时</p>
          </div>
        </div>
        <p class="count-detail">{{ infos.count }}</p>
        <p class="community-rooter">{{ infos.rooter }}</p>
      </div>
    </template>
  </div>
</template>
<script>
import request from "@/util/request";
export default {
  name: "CommunityCard",
  data() {
    return {
      loading: true,
      infos: {
        title: "",
        count: "",
        rooter: "",
      },
    };
  },
  props: {
    apiUrl: { type: String, default: "/community/user" },
  },
  created() {
    request({
      url: this.apiUrl,
      method: "get",
    })
      .then((res) => {
        this.infos = res.data;
        this.loading = false;
      })
      .catch(() => {});
  },
};
</script>
<style scoped>
.community-card {
  background: #f1effd;
  padding: 15px;
  border-radius: 5px;
  font-size: 12px;
}
.d-flex {
  display: flex;
}
.count-detail {
  font-size: 28px;
  font-weight: bold;
}
.badge-info-div {
  flex-grow: 1;
  text-align: end;
}
.badge-info {
  border-radius: 2px;
  background: #1e9fff;
  font-size: 12px;
  padding: 1px;
  color: white;
}
</style>