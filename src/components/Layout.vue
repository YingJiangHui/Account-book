<template>
    <div class="layout-wrapper" :class=" classPrefix && classPrefix+'-layout' ">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot></slot>
        </div>
        <Nav/>
    </div>
</template>

<script>
    export default {
        name: 'Layout',
        props:['classPrefix']
    }
</script>

<style lang="scss" scoped>
    .layout-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .content {
        overflow: auto;
        flex-grow: 1;
    }
</style>