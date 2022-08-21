import request from "@/util/request";

function login(params) {
  return request({
    url: "/auth/login",
    method: "post",
    data: params,
  });
}

function logout(params) {
  return request({
    url: "/auth/logout",
    method: "post",
    data: params,
  });
}

function getUserInfo(params) {
  return request({
    url: "/auth/userInfo",
    method: "get",
    data: params,
  });
}

export { login, logout, getUserInfo };
