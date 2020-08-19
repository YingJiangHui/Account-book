<template>
    <div class="tags">
        <ul class="current">
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
        </ul>
        <div class="new">
            <button>新增标签</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Tags'
    }
</script>

<style lang="scss" scoped>
    .tags {
        font-size: 14px;
        padding: 16px;

        > * {
            margin-top: 16px;
            margin-bottom: 16px;

        }

        > .current {
            display: flex;

            > li {
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                background: #d9d9d9;
                padding: 0 16px;
                margin-right: 8px;
            }
        }

        .new {
            button {
                color: #999;
                border: none;
                border-bottom: 1px solid;
                background: transparent;
            }
        }
    }

</style>