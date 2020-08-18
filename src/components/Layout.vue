<template>
    <div class="site-wrapper">
        <div class="content">
            <slot></slot>
        </div>
        <Nav/>
    </div>
</template>

<script>
    export default {
        name: 'Layout'
    }
</script>

<style lang="scss" scoped>
    .site-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .content {
        flex-grow: 1;
        overflow: auto;
    }
</style>