<template>
    <div>
        <ul class="types">
            <li
                    :class="value==='-'&&'selected'"
                    @click="selectedType('-')"
            >支出
            </li>
            <li
                    :class="value==='+'&&'selected'"
                    @click="selectedType('+')"
            >收入
            </li>

        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Types extends Vue{
      @Prop(String) value!: string;

      selectedType(type: string) {
        if (type !== '-' && type !== '+')
          throw new Error('type is unknown ');
        this.$emit('update:value',type)
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