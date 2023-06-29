<!-- <template>
    <div class="login">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="loginTop">欢迎登录</div>
        <div class="loginContent">
            <input type="text" name="phone" class="phone" v-model="phone" placeholder="请输入手机号码"/>
            <input type="password" name="passworld" class="passworld" v-model="password" placeholder="请输入密码"/>
            <button class="btn" @click="Login">登录</button>
        </div>
    </div>
</template>
<script>
import {getLoginUser} from '@/request/api/home.js'
export default {
    data(){
        return{
            phone:'',
            password:''
        }
    },
    methods:{
        Login:async function(){
            let res= await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
            console.log(res);
            if(res.data.code===200){//如果返回的code等于200，说明登录成功，就跳转个人中心页面
                this.$store.commit('updateIsLogin',true)
                this.$store.commit('updateToken',res.data.token) //登录成功，保存token
                let result = await getLoginUser(res.data.account.id) //登录成功，获取该用户详情的页面
                // console.log(result);
                this.$store.commit('updateUser',result)
                this.$router.push('/infoUser')
            }else{
                alert("手机号码或者密码错误")
                this.password=''
            }
        }
    }

}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .icon{
    align-self: flex-start;
    fill: #fff;

  }
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn{
        width: 2rem;
        height: .6rem;
    }
  }
}
</style> -->


<template>
<div class="login">
    <header>
        <span>网易云音乐</span>
        <div class="rightIconList">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shezhi"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shanchu1" @click="$router.push('/')"></use>
            </svg>
        </div>
    </header>
    <div class="code">
        <span>扫码登录</span>
        <span>使用网易云APP</span>
        <div class="picture">
            <img :src="state.codePic">
        </div>
    </div>
    <footer>
        <div class="topIconList">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-QQ"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weibo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wangyiyunyinle"></use>
            </svg>
        </div>
        <p>登录遇到问题</p>
    </footer>
</div>


</template>

<script>
import {getLoginKey, getLoginCode, getLoginState} from '@/request/api/login.js'
import {getUserDeatail, getUserAccount, getUserIsmd, getUserLevel} from '@/request/api/user.js'
import { onMounted, onUnmounted, reactive } from 'vue';
import { computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup(){
        const store = useStore()
        const router = useRouter();
        let timeId = ''
        const state = reactive({
            codePic:{},
            loginState:{}
        })
        onMounted(async ()=>{
            let time = new Date().getTime()
            let res = await getLoginKey(time)
            let base64Code = await getLoginCode(res.data.unikey,time)
            state.codePic = base64Code.data.qrimg
            getLginState(res,time)
        })
        function getLginState(res,time){
            timeId = setInterval(async ()=>{
                let result_state = await getLoginState(res.data.unikey,time)
                console.log(result_state)
                state.loginState = result_state
                if(result_state.code == 803){ // 状态码为803，表示授权登录成功
                    clearInterval(timeId)
                    // sessionStorage.setItem("cookie",JSON.stringify(result_state.cookie))
                    store.commit('updateIsLogin',true)
                    store.commit('updateCookie',result_state.cookie) //登录成功，保存cookie
                    let userDetail = await getUserDeatail() // 获取用户详情
                    store.commit('updateUser',userDetail)
                    console.log(userDetail,"!!!")
                    let userIsmd = await getUserIsmd() // 获取用户信息 , 歌单，收藏，mv, dj 数量 
                    console.log(userIsmd,"###")
                    router.push('/infoUser')
                }
            },1000)
        }
        onUnmounted(()=>{
            clearInterval(timeId)
        })
        return {state} 
    }
}
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    header{
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        span{
            color: gray;
            margin-left: 0.3rem;
            font-size: .36rem;
        }
        .rightIconList{
            .icon{
                width: 0.4rem;
                height: 0.4rem;
                margin-right: .2rem;
                fill: gray;
                &:first-child{
                    margin-right: 0.8rem;
                }
                &:last-child{
                    width: 0.5rem;
                    height: 0.5rem;
                }
            }
        }  
    }
    .code{
        width: 4rem;
        height: 5.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        span{
            color:green;
            font-size: .50rem;
        }
        .picture{
            img{
                width: 4rem;
                height: 4rem;
            }   
        }
    }
    footer{
        width: 4rem;
        height: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-top: 1rem;
        .topIconList{
            width: 100%;
            display: flex;
            justify-content: space-around;
            .icon{
                width: 0.6rem;
                height: 0.6rem;
                &:last-child{
                border-radius: 50%;
                }
            }
        }
        p{
            color: gray;
            font-size: 0.3rem;
        }
    }
}
</style>