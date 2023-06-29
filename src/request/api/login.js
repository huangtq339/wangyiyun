import request from '..'

/* 二维码key生成接口 */
export function getLoginKey(time){
    return request({
        method:'GET',
        url:`/login/qr/key?time=${time}`
    })
}

/* 二维码生成接口 */
export function getLoginCode(data,time){
    return request({
        method:'GET',
        url:`/login/qr/create?key=${data}&qrimg=qr&time=${time}`
    })
}

/* 二维码检测状态接口 */
export function getLoginState(data,time){
    return request({
        method:'GET',
        url:`/login/qr/check?key=${data}&time=${time}`
    })
}

/* 刷新登录状态,返回内容包含新的cookie(不支持刷新二维码登录的cookie) */
export function getLoginRefresh(){
    return request({
        method:'GET',
        url:`/login/refresh`
    })
}


/* 调用此接口,可获取登录状态 */
export function getLoginStatus(){
    return request({
        method:'GET',
        url:`/login/status`
    })
}
