<template>
    <div>
        <ul class="types">
            <li class="selected">收入</li>
            <li>支出</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Types'
    }
</script>

<style lang="scss" scoped>
    .types {
        display: flex;

        > li {
            font-size: 22px;
            background: #c4c4c4;
            padding: 10px;
            text-align: center;
            flex: 1;
        }

        .selected {
            border-bottom: 3px solid #000;
        }
    }
</style>