import request from "@/util/request";

function uploadImage(params) {
    return request({
        url: '/normal/upload-image',
        method: 'post',
        data: params
    })
}


export { uploadImage }