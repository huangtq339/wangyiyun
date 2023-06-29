import request from '..'

const uid = 1288905357 //由于二维码登录不返回uid，这里使用自己真实的uid

/* 获取用户详情 */
export function getUserDeatail(data){
    data = uid 
    return request({
        method:'GET',
        url:`/user/detail?uid=${data}`
    })
}

/* 获取账号信息 */
export function getUserAccount(){
    return request({
        method:'GET',
        url:`/user/account`
    })
}

/* 获取用户信息 , 歌单，收藏，mv, dj 数量 */
export function getUserIsmd(){
    return request({
        method:'GET',
        url:`/user/subcount`
    })
}

/* 获取用户等级信息 */
export function getUserLevel(){
    return request({
        method:'GET',
        url:`/user/level`
    })
}

/* 获取用户绑定信息 */
export function getUserBindInfo(data){
    data = uid
    return request({
        method:'GET',
        url:`/user/binding?uid=${data}`
    })
}

/* 获取喜欢音乐列表 */
export function getUserLikeMusicList(data){
    data = uid
    return request({
        method:'GET',
        url:`/likelist?uid=${data}`
    })
}