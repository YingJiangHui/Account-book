<template>
    <nav>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label"></Icon>
            标签
        </router-link>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"></Icon>
            记一笔
        </router-link>

        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics"></Icon>
            统计
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: 'Nav'
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/helper.scss';
    nav {
        @extend %outShadow;
        display: flex;
        flex-direction: row;
        font-size: 12px;

        > .item {
            padding: 2px 0;
            width: 33.33333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .icon{
                width: 32px;
                height: 32px;
            }
        }

        > .item.selected {
            color: #ffb200;
        }
    }
</style>