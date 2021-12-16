import request from '@/util/request'


function getUserList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params: params
    })
}


function banUser(params){
    return request({
        url: '/user/ban',
        method: 'post',
        data: params
    })
}


function batchBanUser(params){
    return request({
        url: '/user/batch-ban',
        method: 'post',
        data: params
    })
}


function unbanUser(params){
    return request({
        url: '/user/unban',
        method: 'post',
        data: params
    })
}


function queryUser(params){
    return request({
        url: '/user/query',
        method: 'post',
        data: params
    })
}


function editUser(params){
    return request({
        url: '/user/edit',
        method: 'post',
        data: params
    })
}

export { getUserList, banUser, unbanUser, queryUser, batchBanUser, editUser }
