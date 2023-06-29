import axios from 'axios'

let request = axios.create({
    baseURL:"http://localhost:3000",
    timeout:3000,
    withCredentials: true,
})

//请求拦截器
request.interceptors.request.use((config)=>{
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    // 如果有游客uuid则在请求头中进行设置
    // if(store.state.detail.uuid_token){
        // config.headers.userTempId = store.state.detail.uuid_token
    // }
    //如果有token字段，表示用户已登录，需要传给服务器，用来获取首页展示的用户信息
    // if(store.state.user.token){
        // config.headers.token = store.state.user.token
    // }

    //进度条开始
    // nprogress.start()
    return config
})

//响应拦截器,成功回调，失败回调
request.interceptors.response.use((res)=>{
    //进度条结束
    // nprogress.done()
    //成功回调
    // console.log(res,"123@@@")
    return res.data
},(err)=>{
    //失败回调
    return Promise.reject(new Error('faile'))
})

export default request