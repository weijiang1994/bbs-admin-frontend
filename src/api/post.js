import request from "@/util/request";
function reviewPostList(params) {
    return request({
        url: '/post/review/list',
        method: 'get',
        params: params
    })
}


function reviewBatchPass(params){
    return request({
        url: '/post/review/batch/pass',
        method: 'post',
        data: params
    })
}


function reviewBatchFail(params){
    return request({
        url: '/post/review/batch/fail',
        method: 'post',
        data: params
    })
}

export { reviewPostList, reviewBatchPass, reviewBatchFail }