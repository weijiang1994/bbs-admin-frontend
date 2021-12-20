import request from "@/util/request";
function reviewPostList(params) {
    return request({
        url: '/post/review/list',
        method: 'get',
        params: params
    })
}


function reviewBatchPass(params) {
    return request({
        url: '/post/review/batch/pass',
        method: 'post',
        data: params
    })
}


function reviewBatchFail(params) {
    return request({
        url: '/post/review/batch/fail',
        method: 'post',
        data: params
    })
}

function postDetail(params) {
    return request({
        url: `/post/detail/${params}`,
        method: 'get'
    })
}

function postReviewPass(params) {
    return request({
        url: '/post/review/pass',
        method: 'post',
        data: params
    })
}

function postReviewFail(params) {
    return request({
        url: '/post/review/fail',
        method: 'post',
        data: params
    })
}

export { reviewPostList, reviewBatchPass, reviewBatchFail, postDetail, postReviewPass, postReviewFail }
