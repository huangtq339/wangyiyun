<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" :placeholder=showWord v-model="searchKey" @keydown.enter="enterKey"/>
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="updateIndex(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.artists" :key="index">
              {{item1.name}}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
            <use xlink:href="#icon-zhibo"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
</template>
<script>
import { getSearchMusic } from "@/request/api/home.js";
export default {
  data() {
    return {
      keyWorldList: [], //历史列表
      searchKey: "",  //关键字
      searchList: [], //搜索歌曲的列表
      showWord : '陈奕迅'
    };
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList")) ? JSON.parse(localStorage.getItem("keyWorldList")): [];
  },
  methods: {
    enterKey: async function () {
      let res = ''
      /* 如果关键词不为空，则压入数组并进行去重 */
      if (this.searchKey !== "") {
        this.keyWorldList.unshift(this.searchKey);
        res = await getSearchMusic(this.searchKey); // 请求搜索的歌曲信息列表
        // console.log(res,"1111111")
      }else{
        this.keyWorldList.unshift(this.showWord);
        res = await getSearchMusic(this.showWord); // 请求搜索的歌曲信息列表
        // console.log(res,"2222222")
      }
      // 去重
      this.keyWorldList = [...new Set(this.keyWorldList)];
      // 固定长度，如果数组长度大于，则splice方法删除数组最后一个
      if (this.keyWorldList.length > 10) {
        this.keyWorldList.splice(this.keyWorldList.length - 1, 1); 
      }
      localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
      // let res = await getSearchMusic(this.searchKey); // 请求搜索的歌曲信息列表
      this.searchList = res.result.songs;
      if(!res.result.songs){
        alert("没有版权哦~")
      }
      console.log(this.searchList,"!!!")
      this.searchKey = "";

    },
    delHistory: function () {
      localStorage.removeItem("keyWorldList");
      this.keyWorldList = [];
      this.searchList = [];
    },
    searchHistory:async function (item) {
      let res = await getSearchMusic(item);
      this.searchList = res.result.songs;
      if(!res.result.songs){
        alert("没有版权哦~")
      }
    },
    updateIndex:function(item){
        item.al = item.album // 歌曲的新息发生改变了
        item.al.picUrl=item.album.artist.img1v1Url // 歌曲的新息发生改变了
        this.$store.commit("pushPlayList",item)
        this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        
    }
  },
};
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
 .itemList {
    width: 100%;
    padding: 0.2rem;
    padding-bottom: 1rem;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span{
            font-weight: 400;
            font-size: .24rem;
            color: #999;
            margin-right: .1rem;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
        }
        .bofang{
            position: absolute;
            left: 0;
          }
        .liebiao{
            position: absolute;
            right: 0;
          }
      }
    }
  }
</style>