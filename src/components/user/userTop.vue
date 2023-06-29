<template>
    <div class="userTop">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-danlieliebiao"></use>
            </svg>
        </div>
        <input @change="editStatus" placeholder="+添加状态" v-model.trim="status">
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            status:''
        }
    },
    methods:{
        editStatus:function(){
            this.$store.commit('updateUserStatus',this.status)
        }

    },
}
</script>

<style lang="less" scoped>
.userTop{
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    input{
        border-radius: 20px;
        width: 75px;
        height: 25px;
        text-align: center;
        font-size: 14px;
        background-color: rgb(235, 222, 222);
        transform: scale(0.7,0.7);
        border: none;
    }
}
</style>