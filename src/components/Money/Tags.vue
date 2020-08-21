<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
        <ul class="current">
            <li
                    @click="toggle(tag.name)"
                    v-for="(tag) in dataSource" :key="tag.id"
                    :class="{selected:exist(tag.name)>=0}"
            >{{tag.name}}
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop(Array) dataSource: string[] | undefined;

    selectedList: string[] = [];

    @Watch('selectedList')
    onSelectedListChanged(value: string[]) {
         this.$emit('update:value',value);
    }

    exist(tag: string): number {
      return this.selectedList.indexOf(tag);
    }

    toggle(tag: string) {
      const index = this.exist(tag);
      if (index >= 0) {
        this.selectedList.splice(index, 1);
      } else {
        this.selectedList.push(tag);
      }
    }

    createTag() {
      const name = window.prompt('输入标签名');
      if (!name) { return; }
      window.store.createTag(name);
    }
  }
</script>

<style lang="scss" scoped>
    .tags {
        flex-grow: 1;
        background: #fff;
        font-size: 14px;
        padding: 16px;
        display: flex;
        flex-direction: column-reverse;

        > * {
            margin-top: 16px;
        }

        > .current {
            display: flex;
            flex-wrap: wrap-reverse;
            $gb: #d9d9d9;

            > li {
                margin-top: 10px;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                background: $gb;
                padding: 0 16px;
                margin-right: 8px;

                &.selected {
                    background: darken($gb, 50%);
                    color: #fff;
                }
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