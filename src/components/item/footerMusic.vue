<template>
    <div class="footerMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <span class="music-name">{{playList[playListIndex].name}}</span>
                <span class="sub"></span>
                <span class="autor-name" v-for="(item,index) in playList[playListIndex].artists" :key="index">
                    {{item.name}}
                </span>
            </div>
        </div>
        <div class="footerRight">
            <!-- 暂停 -->
            <svg class="icon" ariahidden="true" @click="play" v-if="isBtnShow">
                <use xlink:href="#icon-bofang" ></use>
            </svg>
            <!-- 播放 -->
            <svg class="icon" ariahidden="true" @click="play" v-else>
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-todo_list"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <!-- 右侧弹出 -->
        <van-popup v-model:show="detailShow" position="right" :style="{ width: '100%', height: '100%' }" >
            <musicDetail 
                :musicList="playList[playListIndex]"
                :play="play"
                :isBtnShow="isBtnShow"
                :addDuration="addDuration">
            </musicDetail>
        </van-popup>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import musicDetail from '@/components/item/musicDetail.vue'
export default {
    data() {
        return {
            interVal: 0,
        };
    },
    components:{musicDetail},
    computed:{
        ...mapState(['playList','playListIndex', 'isBtnShow', 'detailShow'])
    },
    mounted(){
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
        this.updateTime()  // 底部播放的时候，歌词就要开始轮动了
        // console.log(this.playListIndex)
        console.log(this.playList)
    },
    updated() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
        this.addDuration()
    },
    methods:{
        play:function(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                this.updateTime(); //播放就调用函数进行传值
            }else{
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                clearInterval(this.interVal); //暂停清除定时器
            }
            
        },
        addDuration:function(){ 
            //为歌曲进度条传入歌曲总时长
            // 解决播放器进度条没有加载完，获取总时长为NaN（用延迟定时器）
            setTimeout(()=>{
                this.updateDuration(this.$refs.audio.duration)
            },500)
        },
        updateTime: function () {
            this.interVal = setInterval(() => {
            this.updateCurrentTime(this.$refs.audio.currentTime);
            }, 1000);
        },
        ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime','updateDuration'])
    },
    watch:{
        playListIndex:function(){ //监听如果歌曲下标发生了变化，即自动播放音乐
            this.$refs.audio.autoplay = true
            if(this.$refs.audio.paused){ //如果是暂停状态,播放音乐需要改变图标
                this.updateIsbtnShow(false)
            }
        },
        playList:function(){ //防止刷新时，歌曲下标没有改变仍为0，点击无法播放问题
            if(this.isBtnShow){  //当前默认是暂停时，让它自动播放并改变图标
                this.$refs.audio.autoplay = true
                this.updateIsbtnShow(false)
            }
        }

    }
}
</script>

<style lang="less" scoped>
.footerMusic{
    width: 100%;
    height: 1.2rem;
    background-color: #fff;
    position: fixed;
    bottom:0;
    z-index: 99;
    border-top: 1px solid #999;
    display: flex;
    padding: .1rem;
    justify-content: space-between;
    .footerLeft{
        width: 60%;
        height: 100%;
        // display: flex;
        // justify-content: space-evenly;
        // align-items: center;
        font-size: .28rem;
        
        position: relative;
        img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            }
        div{
            // display: flex;
            // justify-content: center;
            // align-items: center;
            width: 100%;
            position: absolute;
            left: 1rem;
            top: 0.2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .music-name{
                font-weight: 500;
            }
            .sub{
                margin: 0 .1rem;
                border-top: 1px solid black;
                display: inline-block;
                width: .1rem;
                position: absolute;
                top: .2rem;
            }
            .autor-name{
                margin-left: .3rem;
                color:gray;
            }
        }
        
    }
    .footerRight{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            width: .5rem;
            height: .5rem;
        }
    }
}
</style>