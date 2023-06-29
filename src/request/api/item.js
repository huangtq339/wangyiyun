import request from '..'

/* 获取歌单详情页的数据 */
export function getMusicItemList(data){
    return request({
        method:'GET',
        url:`/playlist/detail?id=${data}`
    })
}

/* 获取歌单,展示列表 */
export function getMusicList(data){
    return request({
        method:'GET',
        url:`/playlist/track/all?id=${data}`
    })
}


//获取歌曲的歌词
export function getMusicLyric(data){
    return request({
        method:"GET",
        url:`/lyric?id=${data}`
    })
}

//获取歌曲的详情  /song/detail?ids=347230,/song/detail?ids=347230,347231
export function getMusicDetail(data){
    return request({
        method:"GET",
        url:`/song/detail?ids=${data}`
    })
}


