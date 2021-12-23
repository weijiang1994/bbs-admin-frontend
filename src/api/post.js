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


function postList(params) {
    return request({
        url: '/post/list',
        method: 'get',
        params: params
    })
}

function postSearch(params) {
    return request({
        url: '/post/search',
        method: 'post',
        data: params
    })
}

function postBatchBlock(params) {
    return request({
        url: '/post/batch-block',
        method: 'post',
        data: params
    })
}

function postBatchUnblock(params) {
    return request({
        url: '/post/batch-unblock',
        method: 'post',
        data: params
    })
}

function postCategoryList(params) {
    return request({
        url: '/post/category/list',
        method: 'get',
        params: params
    })
}


function searchCategory(params) {
    return request({
        url: '/post/category/search',
        method: 'post',
        data: params
    })
}


function categoryDetail(params) {
    return request({
        url: '/post/category/detail',
        method: 'post',
        data: params
    })
}


function editCategory(params) {
    return request({
        url: '/post/category/edit',
        method: 'post',
        data: params
    })
}

function postTopicList(params) {
    return request({
        url: '/post/topic/list',
        method: 'get',
        params: params
    })
}

function addTopic(params) {
    return request({
        url: '/post/topic/new',
        method: 'post',
        data: params
    })
}


function editTopic(params) {
    return request({
        url: '/post/topic/edit',
        method: 'post',
        data: params
    })
}

function searchTopic(params) {
    return request({
        url: '/post/topic/search',
        method: 'post',
        data: params
    })
}


function allTopic() {
    return request({
        url: '/post/topic/all',
        method: 'get'
    })
}

export {
    reviewPostList,
    reviewBatchPass,
    reviewBatchFail,
    postDetail,
    postReviewPass,
    postReviewFail,
    postList,
    postSearch,
    postBatchBlock,
    postBatchUnblock,
    postCategoryList,
    searchCategory,
    categoryDetail,
    editCategory,
    postTopicList,
    addTopic,
    editTopic,
    searchTopic,
    allTopic
}
