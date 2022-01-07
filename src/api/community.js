import request from '@/util/request'

function unreadReport(params) {
    return request({
        url: '/community/report/unread',
        params: params,
        method: 'get'
    })
}

function readReport(params) {
    return request({
        url: '/community/report/read',
        method: 'get',
        params: params
    })
}

export {
    unreadReport,
    readReport,
}