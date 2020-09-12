<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
        <ul class="current">
            <li
                    @click="toggle(tag.name)"
                    v-for="(tag) in tagList" :key="tag.id"
                    :class="{selected:exist(tag.name)>=0}"
            >{{tag.name}}
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
  import {Component, Watch} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/tagHelper';

  @Component
  export default class Tags extends mixins(TagHelper) {
    selectedList: string[] = [];

    get tagList() {
      return this.$store.state.tagsList;
    }

    @Watch('selectedList')
    onSelectedListChanged(value: string[]) {
      this.$emit('update:value', value);
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
      const commitState = this.$store.state.currentState;
      if (commitState === 'success') {
        alert('添加成功');
      } else if (commitState === 'duplicated') {
        alert('存在重複標簽');
      }
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
            $gb: #000;

            > li {
                color: #ffb200;
                border: 1px solid #ffb200;
                cursor: pointer;
                margin-top: 10px;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                background: #fff;
                padding: 0 16px;
                margin-right: 8px;

                &.selected {
                    background: #ffb200;
                    color: #fff;
                }
            }

        }

        .new {
            button {
                color: #ffb200;
                border: none;
                border-bottom: 1px solid;
                background: transparent;
            }
        }
    }

</style>