import { createStore } from 'vuex'
import { getMusicItemList, getMusicList, getMusicLyric} from "@/request/api/item.js"
// import {getPhoneLogin} from "@/request/api/home.js"
import {getUserSongList} from "@/request/api/like.js"
export default createStore({
  state: {
    /* 播放列表 */
    playList:[{
      al:{
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      ar:[{name:'杨丞琳'}],
      name: "雨爱（抖音版）",
      id:1446137141
    }],
    playListIndex: 0, /* 默认播放下标为0 */
    isBtnShow: true, /* 暂停按钮的显示 */
    detailShow: false, /* 歌曲详情页的显示 */
    lyricList: {},//歌词
    currentTime: 0,//当前时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooterMusic: true,//判断底部组件是否需要显示
    token: "",
    cookie:'',
    user: {},//用户信息
    userStatus:'',//用户状态
    userLikeMusicList:{}, //用户喜欢音乐列表（id）
    userSongList:{}, //用户歌单
    userLikeMusic:{}, //用户喜欢的音乐(所有歌曲)
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isBtnShow = value
      // console.log(state.isBtnShow,11111)
    },
    updatePlayList:function(state,value){
      state.playList = value
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    updateDetailShow:function(state){
      state.detailShow = !state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updateCurrentTime:function(state,value){
      state.currentTime=value
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updateIsLogin:function(state,value){
      state.isLogin=value
    },
    updateToken:function(state,value){
      state.token=value
      localStorage.setItem('token',state.token)
    },
    updateCookie:function(state,value){
      state.cookie=value
      localStorage.setItem('cookie',state.cookie)
    },
    updateUser:function(state,value){
      state.user=value
      localStorage.setItem('userInfo',JSON.stringify(state.user))
    },
    updateUserStatus:function(state,value){
      state.userStatus=value
      localStorage.setItem('userStatus',state.userStatus)
    },
    updateUserLikeMusicList:function(state,value){
      console.log(value)
      state.userLikeMusicList = value
      localStorage.setItem('userLikeMusicList',JSON.stringify(state.userLikeMusicList))
    },
    updateUserLikeMusic:function(state,value){
      state.userLikeMusic = value
      localStorage.setItem('userLikeMusic',JSON.stringify(state.userLikeMusic))
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      context.commit("updateLyricList",res.lrc)
    },
    // getLogin:async function(context,value){
    //   let res = await getPhoneLogin(value);
    //   // console.log(res);
    //   return res
    // }
    getLikeMusic:async function(context){
      let musicIds =  JSON.parse(localStorage.getItem('userLikeMusicList')).ids
      console.log(musicIds)
      let userSongList = await getUserSongList()
      console.log(userSongList)
      // console.log(userSongList.playlist[0])
      localStorage.setItem('userSongList',JSON.stringify(userSongList))
      let userLikeMusic = await getMusicList(userSongList.playlist[0].id)
      console.log(userLikeMusic)
      context.commit("updateUserLikeMusic",userLikeMusic)
    }
  },
  modules: {
  }
})
