<template>
<div class="itemMusicList">
    <div class="itemListTop">
        <div class="itemLeft" @click="playMusic">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <span>
                播放全部<span>(共{{musicList.length}}首)</span>
            </span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiahao"></use>
            </svg>
            <span>收藏({{subscribedCount}})</span>
        </div>
    </div>
    <div class="itemList">
        <div class="item" v-for="(item, i) in musicList" :key="i">
            <div class="itemLeft" @click="playMusic(i)">
                <span class="leftSpan">{{i+1}}</span>
                <div>
                    <p>{{item.name}}</p>
                    <span v-for="(item1, id) in item.ar" :key="id">{{item1.name}}</span><!-- 作者可能有多个 -->
                </div>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true" v-if="item.mv !=0"> <!-- 判断是否显示mv图标 -->
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props:['musicList','subscribedCount'],
    methods:{
        playMusic:function(i){
            this.updatePlayList(this.musicList)
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
    },
    updated(){
        console.log(this.musicList);
        console.log(this.subscribedCount);
    }

}
</script>

<style lang="less" scoped>
.itemMusicList{
    width: 100%;
    height: 10rem;
    background-color: #fff;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    .itemListTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemLeft{
            width: 3rem;
            height: 100%;
            display: flex;
            align-items: center;
            span{
                margin-left: .1rem;
                font-weight: 900;
                span{
                    font-size: .24rem;
                    font-weight: 300;
                }
            }
        }
        .itemRight{
            height: 0.8rem;
            display: flex;
            align-items: center;
            background-color: red;
            border-radius: .5rem;
            color: white;
            margin-top: .2rem;
            margin-right: .2rem;
            padding: 0 0.1rem;
            // margin: 0.2rem 0;  //不生效
            
        }
    }
    .itemList{
        width: 100%;
        // display: flex;
        // flex-direction: column;
        margin-top: .3rem;
        padding-left: 0.1rem;
        padding-right: 0.3rem;
        padding-bottom: 1.2rem;
        .item{
            display: flex;
            justify-content: space-between;
            margin-top: .3rem;
            .itemLeft{ 
                display: flex;
                align-items: center;
                font-size: .28rem;
                // width: calc(itemList - itemRight);
                width: 5rem;
                .leftSpan{
                    margin-right: .2rem;
                }
                div{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    p {
                        font-weight: 900;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    span {
                        color: gray;
                        font-size: .24rem;
                        margin-right: .1rem;

                    }
                }
            }
            .itemRight{
                display: flex;
                .icon{
                    margin-left: .3rem;
                }
            }
        }
    }
}
</style>