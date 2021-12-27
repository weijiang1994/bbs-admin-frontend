import request from '@/util/request'


function commentList(params) {
    return request({
        url: '/comment/list',
        method: 'get',
        params: params
    })
}

function deleteComment(params) {
    return request({
        url: '/comment/delete',
        method: 'post',
        data: params
    })
}

function releaseComment(params) {
    return request({
        url: '/comment/release',
        method: 'post',
        data: params
    })
}

function deleteBatchComment(params) {
    return request({
        url: '/comment/batch/delete',
        method: 'post',
        data: params
    })
}

function releaseBatchComment(params) {
    return request({
        url: '/comment/batch/release',
        method: 'post',
        data: params
    })
}

function searchComment(params) {
    return request({
        url: '/comment/search',
        method: 'post',
        data: params
    })
}
export {
    commentList,
    deleteComment,
    releaseComment,
    deleteBatchComment,
    releaseBatchComment,
    searchComment
}