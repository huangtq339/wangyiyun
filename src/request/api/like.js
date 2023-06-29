import request from '..'

const uid = 1288905357 //由于二维码登录不返回uid，这里使用自己真实的uid

/* 获取用户歌单 */
export function getUserSongList(data){
    data = uid 
    return request({
        method:'GET',
        url:`/user/playlist?uid=${data}`
    })
}

//获取音乐的url  /song/url?id=33894312 /song/url?id=405998841,33894312
export function getMusicUrl(data){
    return request({
        method:"GET",
        url:`/song/url?id=${data}`
    })
}
