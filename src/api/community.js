import request from '@/util/request'

function unreadReport(params) {
    return request({
        url: '/community/report/unread',
        params: params,
        method: 'get'
    })
}


export {
    unreadReport
}