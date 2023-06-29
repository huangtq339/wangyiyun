<template>
    <div class="userTop">
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuijinbofang"></use>
            </svg>
            <p>最近播放</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai2"></use>
            </svg>
            <p>本地下载</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yunpanlogo-_huabanfuben"></use>
            </svg>
            <p>云盘</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yigoushuliang"></use>
            </svg>
            <p>已购</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wodehaoyou"></use>
            </svg>
            <p>我的好友</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoucang"></use>
            </svg>
            <p>收藏和赞</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Sharingwuxianlanyagongxiang10"></use>
            </svg>
            <p>我的播客</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yejianmoshi"></use>
            </svg>
            <p>助眠解压</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-y-"></use>
            </svg>
            <p>音乐罐子</p>
        </div>
        <div class="itemApp">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_tianjia"></use>
            </svg>
            <p>音乐应用</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.userTop{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color:  rgb(243, 240, 255);
    width: 330px;
    margin: 25px auto 0 auto;
    .itemApp{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80px;
        height: 60px;
        margin-top: 20px;
        .icon{
            width: 30px;
            height: 30px;
        }
        p{
            font-size: 0.1rem;
        }
    }
}
</style>