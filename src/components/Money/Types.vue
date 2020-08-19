<template>
    <div>
        <ul class="types">
            <li
                    :class="type==='+'&&'selected'"
                    @click="selectedType('+')"
            >收入
            </li>
            <li
                    :class="type==='-'&&'selected'"
                    @click="selectedType('-')"
            >支出
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class Types extends Vue{
      type= '+';
      selectedType(type: string) {
        if (type !== '-' && type !== '+')
          throw new Error('type is unknown ');
        this.type = type;
      }

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