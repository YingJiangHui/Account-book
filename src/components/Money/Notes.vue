<template>
    <div class="notes">
        <label>
            <span>备注</span>
            <input v-model="value" type="text" placeholder="在这里添加标签">
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator'
    @Component
    export default class Notes extends Vue {
        value='';
    }
</script>

<style lang="scss" scoped>
    .notes {
        background: rgb(245, 245, 245);
        padding: 20px 18px;
        font-size: 14px;

        span {
        }

        input[type=text] {
            font-weight: 100;
            background: transparent;
            padding: 0 16px;
            border: none;
            color: rgb(153, 153, 153);
        }
    }
</style>