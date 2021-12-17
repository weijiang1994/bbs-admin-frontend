import { Message, MessageBox, Notification } from "element-ui";


function showMessage(msg, type) {
    Message({
        message: msg,
        type: type
    })
}

function showNotice(msg, title, type) {
    Notification({
        message: msg,
        title: title,
        type: type
    })
}


function showConfirm(msg, title, confirmButtonText, cancelButtonText, type) {
    return MessageBox.confirm(msg, title, {
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        type: type
    })
}


export { showMessage, showNotice, showConfirm }
