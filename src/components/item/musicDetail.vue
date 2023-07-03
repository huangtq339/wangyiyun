<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color: #fff">{{ musicList.name }}</Vue3Marquee>
        <span v-for="item in musicList.ar || musicList.artists" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" class="img_needle" :class="{ img_needle_active: !isBtnShow }"/>
    <img src="@/assets/cd.png" class="img_cd" />
    <img :src="musicList.al.picUrl" class="img_ar" @click="isLyricShow = true" :class="{ img_ar_active: !isBtnShow, img_ar_pauesd: isBtnShow }"/>
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=!isLyricShow">
    
    <p v-for="item in lyric" :key="item" v-show="item.lrc !=''" :class="{active: currentTime * 1000 >= item.time && currentTime * 1000 < item.pre}">
      {{ item.lrc}}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop" v-show="!isLyricShow">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dianzan"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dengyu"></use>
      </svg>
    </div>
    <div class="videoTop" v-show="isLyricShow">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shipin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </div>
    <div class="footerContent">
      <span class="songTime">{{currentTime >0 ? Number(currentTime).toFixed(2) : '00:00'}}</span> 
      <!-- 歌曲进度条 -->
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05"/>
      <span class="songTime">{{Number(duration).toFixed(2)}}</span> 
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-if="isBtnShow" @click="play">
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-huaban6"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState(["lyricList","currentTime","playListIndex","playList","duration"]),
    lyric: function () {
      let arr;
      // console.log(this.lyricList)
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => { //正则：以换行进行切分
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length); //歌词内容
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {  //处理毫秒问题： 000 或  53]  
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 10000000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      //   console.log(arr);
      return arr;
    },
  },
  mounted() {
    // console.log(this.musicList);
    // console.log(this.lyricList.lyric);
    this.addDuration();
  },
  props: ["musicList", "isBtnShow", "play", "addDuration"],
  methods: {
    backHome: function () {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  watch: { 
    currentTime: function (newValue) {
    /* 监听currentTime变化，让歌词一直在中间显示 */
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      /* 如果当前歌曲时间等于歌曲总时长，即播放完了，自动播放下一首 */
      if (newValue === this.duration) {
        /* 如果为最后一首了，就回到第一首歌 */
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play(); //传入索引0，列表和默认索引都没变，监听没有改变，因此需要手动进行播放
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
      // console.log([this.$refs.musicLyric])
    },
  },
  components: {
    Vue3Marquee,
  },
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(1rem);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #e2dfdf;
      span {
        color: #e2dfdf;
      }
      .icon {
        width: 0.2rem;
        height: 0.2rem;
        fill: #e2dfdf;
      }
    }
  }
  .detailTopRight{
    .icon{
      fill: #fff;
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: white;
    margin-bottom: 0.3rem;
    text-align: center;
  }
  .active {
    color: gold;
    font-size: 0.32rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .videoTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
    .icon{
      fill: rgb(245, 234, 234);
      &:first-child{
        border-radius: 0.1rem;
      }
    }
  }
  .footerContent{
    display: flex;
    align-items: center;
    .songTime{
      color: white;
      margin: 0 .2rem;
    }
    .range {
    width: 100%;
    height: 0.06rem;
    }
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(255, 255, 255);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
