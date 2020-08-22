<template>
    <div class="layout-wrapper" :style="{minHeight:getScreenHeight+'px'}" :class=" classPrefix && classPrefix+'-layout' ">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot></slot>
        </div>
        <Nav/>
    </div>
</template>

<script>
    export default {
        name: 'Layout',
        props:['classPrefix'],
        data(){
            return {
                screenHeight:document.body.clientHeight
            }
        },
        computed:{
            getScreenHeight(){
                return this.screenHeight
            }
        },
        mounted(){
            setTimeout(()=>{
                this.screenHeight = document.body.clientHeight
            },1)
        }

    }
</script>

<style lang="scss" scoped>
    .layout-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .content {
        overflow: auto;
        flex-grow: 1;
    }
</style>