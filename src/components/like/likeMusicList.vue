<template>
  <div class="likeMusicList">
    <div class="likeListTop">
      <div class="likeLeft" @click="playMusic">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>
          播放全部<span>(共{{ userLikeMusicList.ids.length }}首)</span>
        </span>
      </div>
      <div class="iconRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai3"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gf-playlistMusic5"></use>
        </svg>
      </div>
    </div>
    <div class="likeList">
      <div class="item" v-for="(item, i) in userLikeMusic.songs" :key="i">
        <div class="likeLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, id) in item.ar" :key="id">{{item1.name}}</span><!-- 作者可能有多个 -->
            <span>- {{ item.name }} </span>
            <span v-if="item.originSongSimpleData">
              <span v-for="p in item.originSongSimpleData.artists" key="index">| 原唱:{{p.name}}</span>
            </span>
          </div>
        </div>
        <div class="likeRight">
          <svg class="icon" aria-hidden="true" v-if="item.mv != 0"><!-- 判断是否显示mv图标 -->
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
import { mapMutations } from "vuex";
export default {

  methods: {
    playMusic: function (i) {
      this.updatePlayList(this.userLikeMusic.songs);
      this.updatePlayListIndex(i);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
  computed: {
    userLikeMusicList: function () {
      return JSON.parse(localStorage.getItem("userLikeMusicList"))
        ? JSON.parse(localStorage.getItem("userLikeMusicList"))
        : this.$store.userLikeMusicList;
    },
    userLikeMusic:function(){
      return JSON.parse(localStorage.getItem("userLikeMusic"))
        ? JSON.parse(localStorage.getItem("userLikeMusic"))
        : this.$store.userLikeMusic;
    },
  },
};
</script>
    
<style lang="less" scoped>
.likeMusicList {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .likeListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .likeLeft {
      width: 3rem;
      height: 100%;
      display: flex;
      align-items: center;
      span {
        margin-left: 0.1rem;
        font-weight: 900;
        span {
          font-size: 0.24rem;
          font-weight: 300;
        }
      }
    }
    .iconRight {
      width: 2.4rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      
    }
  }
  .likeList {
    width: 100%;
    // display: flex;
    // flex-direction: column;
    margin-top: 0.2rem;
    padding-left: 0.1rem;
    padding-right: 0.3rem;
    padding-bottom: 1.25rem;
    .item {
      display: flex;
      justify-content: space-between;
      margin-top: 0.25rem;
      .likeLeft {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        // width: calc(itemList - itemRight);
        width: 5rem;
        .leftSpan {
          margin-right: 0.2rem;
        }
        div {
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
            font-size: 0.24rem;
            margin-right: 0.1rem;
          }
        }
      }
      .likeRight {
        display: flex;
        .icon {
          margin-left: 0.3rem;
        }
      }
    }
  }
}
</style>