<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContet">
      <van-swipe :loop="false" :width="122" class="my-swiper" :show-indicators="false">
        <van-swipe-item v-for="item in music.musicList" :key="item">
          <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
            <img :src="item.picUrl"/>
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { getMusicList } from "@/request/api/home.js";
export default {
  setup() {
    // let musicList = ref([]);
    const music = reactive({
      musicList: [],
    });
    onMounted(async () => {
      let result = await getMusicList();
      music.musicList = result.result;
    });

    function changeCount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { music, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContet{
    height: 3.6rem;
    width: 100%;
    .my-swiper {
      height: 100%;
      .van-swipe-item{
        margin-right: 0.5rem;
        position: relative;
        width: 2rem !important;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 0.2rem;
        }
        .playCount {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 0.24rem;
          color:antiquewhite;
          display: flex;
          margin-right: .1rem;
          .icon {
            width: 0.3rem;
            height: 0.3rem;
            fill: #fff;
          }
        }
      }
    }
  }
}
</style>
