import request from '..'

// 获取首页轮播图的数据
export function getBanner(){
    return request({
        method:'GET',
        url:"/banner?type=2"
    })
}

//获取发现好歌单
export function getMusicList(){
    return request({
        method:'GET',
        url:'/personalized?limit=10'
    })
}

//搜索
export function getSearchMusic(data){
    return request({
        method:"GET",
        url:`/search?keywords=${data}`
    })
}


