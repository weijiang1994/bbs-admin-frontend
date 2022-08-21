import request from "@/util/request";

function latestAdminLog() {
  return request({
    url: "/community/latest/admin-log",
    method: "get",
  });
}

function serverStatus() {
  return request({
    url: "/community/server-status",
    method: "get",
  });
}

export { latestAdminLog, serverStatus };
