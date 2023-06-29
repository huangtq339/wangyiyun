<template>
    <userTopVue></userTopVue>
    <div class="infoUserTop">
        <img :src=avatarUrl class="profileimg" />
        <div class="userDetail">
            <div class="name">{{ nickname }}</div>
            <span class="vip">CVIP•贰</span>
        </div>
        <p class="fans">
            <span>{{ follows }}关注</span>  
            <span>{{ followeds }}粉丝</span>
            <span>Lv.{{ level }}</span>
        </p>
    </div>
    <userApp></userApp>
    <div class="infoMessage">
        <img :src=backgroundUrl>
        与你预定这个夏日的同频快乐
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shanchu1"></use>
        </svg>
    </div>
    <userLikeMusic :userLikeMusicList="userLikeMusicList"></userLikeMusic>
</template>

<script>
import userTopVue from '@/components/user/userTop.vue';
import userApp from '@/components/user/userApp.vue';
import userLikeMusic from '@/components/user/userLikeMusic.vue';
import { mapState } from "vuex";
import {getUserLikeMusicList} from '@/request/api/user.js'
export default {
    components:{userTopVue,userApp,userLikeMusic},
    computed: {
        ...mapState(["user"]),
        avatarUrl:function(){
            return JSON.parse(localStorage.getItem('userInfo')).profile.avatarUrl ? JSON.parse(localStorage.getItem('userInfo')).profile.avatarUrl : this.user.profile.avatarUrl
        },
        nickname:function(){
            return JSON.parse(localStorage.getItem('userInfo')).profile.nickname ? JSON.parse(localStorage.getItem('userInfo')).profile.nickname : this.user.profile.nickname
        },
        follows:function(){
            return JSON.parse(localStorage.getItem('userInfo')).profile.follows ? JSON.parse(localStorage.getItem('userInfo')).profile.follows : this.user.profile.follows
        },
        followeds:function(){
            return JSON.parse(localStorage.getItem('userInfo')).profile.followeds ? JSON.parse(localStorage.getItem('userInfo')).profile.followeds : this.user.profile.followeds
        },
        level:function(){
            return JSON.parse(localStorage.getItem('userInfo')).level ? JSON.parse(localStorage.getItem('userInfo')).level : this.user.level
        },
        backgroundUrl:function(){
            return JSON.parse(localStorage.getItem('userInfo')).profile.backgroundUrl ? JSON.parse(localStorage.getItem('userInfo')).profile.backgroundUrl : this.user.profile.backgroundUrl
        },
        userLikeMusicList:function(){
            return JSON.parse(localStorage.getItem('userLikeMusicList'))? JSON.parse(localStorage.getItem('userLikeMusicList')): this.$store.userLikeMusicList
        }
    },
    
    mounted:async function() {
        console.log("------");
        console.log(this.user);
        let userLikeMusicList = await getUserLikeMusicList()
        this.$store.commit('updateUserLikeMusicList',userLikeMusicList)
    },
};
</script>

<style lang="less" scoped>
.infoUserTop {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: -15px;
    .profileimg {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: relative;
        z-index: 9;
    }
    .userDetail{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(243, 240, 255);
        border-radius: 10px;
        margin-top: -20px;
        width: 330px;
        height: 100px;
        .name{
            font-weight: 700;
            font-size: .3rem;
        }
        .vip{
            width: 55px;
            text-align: center;
            font-size: 0.2rem;
            color: gold;
            border-radius: 10px;
            background-color: black;
            margin-left: 5px;
        }
    }
    .fans{
        margin-top: 10px;
        margin-top: -30px;
        span{
            
            font-size: 0.2rem;
            font-weight: 300;
            color: grey;
            margin-right: 15px;
        } 
    }
}
.infoMessage{
    display: flex;
    align-items: center;
    background-color: rgb(243, 240, 255);
    width: 330px;
    margin: 0 auto;
    border: 1px solid rgb(232, 230, 230);
    height: 40px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 0.2rem;
    img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0 10px;
    }
    .icon{
        width: 20px;
        height: 20px;
        margin-left: 90px;
    }
}
</style>