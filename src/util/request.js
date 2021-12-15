import axios from "axios";
import { MessageBox, Message } from 'element-ui'
import { getToken, removeToken } from '@/util/token'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_BACKEND_URL,
    timeout: 5000
})

service.defaults.baseURL = process.env.VUE_APP_BASE_BACKEND_URL
service.defaults.headers['Content-Type'] = 'application/json'

// 请求拦截器
service.interceptors.request.use(
    config => {
        config.headers['Access-Token'] = getToken('Access-Token')
        return config
    }, error => {
        console.log(error);
        Promise.reject(error)
    }
)


// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 后端返回code不为200显示错误提示信息
        if (res.code !== 200) {
            Message({
                message: res.msg || '发生了错误!',
                type: 'error',
                duration: 3 * 1000
            })
            // 4003无效的token 4004已过期的token
            if (res.code === 4003 || res.code === 4004) {
                MessageBox.confirm('你的Token已过期或其他原因导致失效了,请重新登录!', '退出登录', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // TODO 重置状态
                    removeToken('Access-Token')
                    location.reload()
                })
            }
            return Promise.reject()
        } else {
            return res
        }

    }, error => {
        console.log(error);
    }
)

// 暴露封装的axios
export default service
