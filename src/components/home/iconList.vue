<template>
    <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-meirituijian"></use>
            </svg>
            <span class="day">{{day}}</span>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouyinji"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
    setup(){
        let day = ref(1)
        function getDay(){
            day.value =  new Date().getDate()
        }
        setInterval(()=>{
            getDay()
        },1000)
        onMounted(()=>{
            getDay()
        })
        return{ day }
    }
}
</script>

<style lang="less" scoped>
.iconList{
    width: 100%;
    height: 1.2rem;
    margin-top: .2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconItem{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .icon{
            width: 1rem;
            height: 1rem;
        }
        .day{
            position: absolute;
            right: 38px;
            top: 18px;
            color:rgb(255, 0, 0);
            font-size: .30rem;
        }
    }
}
</style>