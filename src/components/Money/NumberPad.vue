<template>
    <div class="numberPad">
        <div class="output" :style="{fontSize:size+'px'}">
            <div class="operation">{{output}}</div>
            <div class="result">{{result}}</div>
        </div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="inputContent">+</button>
            <button @touchstart.prevent="press" @touchend="uplift">
                <Icon name="delete"/>
            </button>

            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="inputContent">-</button>
            <button @click="equalTo">=</button>

            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="inputContent">×</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>
            <button @click="inputContent">÷</button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch, Prop} from 'vue-property-decorator';
  import regExp from '@/constants/regExp';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) value!: number;
    output = this.value.toString();
    regExp = regExp;
    size = 36;
    timer = 0;

    press() {
      this.timer = setTimeout(() => this.output = '0', 1000);
    }

    uplift() {
      clearTimeout(this.timer);
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }

    equalTo() {
      this.output = this.result;
    }

    get result() {
      const numArr = this.output.split(this.regExp.operator).filter(el => el !== "").map(el => parseFloat(el));
      const strArr = this.output.split(this.regExp.number).filter(el => el.match(this.regExp.operator));
      let result = 0;
      if (numArr.length === 1)
        return numArr[0].toString();

      for (let i = 0; numArr.length > 1;) {
        if (numArr[i + 2] && strArr[i + 1].match(this.regExp.priority)) {
          //高優先級計算
          const j = i + 1;
          result = this.computer(strArr[j], numArr[j], numArr[j + 1]);
          this.shiftItem(strArr, numArr, j, result);
        }

        result = this.computer(strArr[i], numArr[i], numArr[i + 1]);
        this.shiftItem(strArr, numArr, i, result);
      }
      return numArr[0].toString();
    }

    shiftItem(strArr: string [], numArr: number [], j: number, result: number) {
      numArr.splice(j, 2, result);
      strArr.splice(j, 1);
    }

    computer(types: string, beforeItem: number, afterItem: number): number {
      const obj: { [key: string]: number } = {
        '+': beforeItem + afterItem,
        '-': beforeItem - afterItem,
        '×': beforeItem * afterItem,
        '÷': beforeItem / afterItem,
      };
      return obj[types] as number;
    }

    inputContent(event: MouseEvent) {

      const table = '1234567890+-÷×';
      const target = (event.target as HTMLButtonElement);
      const input = target.textContent!;
      const str = this.output[this.output.length - 1];
      // 避免重複的運算符
      if (input.match(this.regExp.operator) && str.match(this.regExp.lastOperator)) {
        this.output = this.output.replace(this.regExp.lastOperator, input);
        return;
      }

      if (input === '.') {
        const arr = [...this.output];
        for (let i = arr.length - 1; i >= 0; i--) {
          if (arr[arr.length - 1].match(this.regExp.operator)) {
            this.output += '0.';
            return;
          }

          if (arr[i] === '.') {
            return;
          }

          if (arr[i].match(this.regExp.operator)) {
            break;
          }
        }

      }

      if (this.output.length >= 16)
        this.size = 34;

      if (this.output === '0') {

        if (input.match(this.regExp.operator))
          return;

        if (table.indexOf(input) >= 0) {
          this.output = input;
        } else if (input === '.') {
          this.output += '.';
        }

      } else {
        this.output += input;
      }

    }

    ok() {
      if (this.output === '0') {
        alert('未输入金额');
        return;
      }
      this.$emit('update:value', parseFloat(this.output));
      this.$emit('submit', parseFloat(this.output));
      this.output = '0';
    }

  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/helper.scss';

    .numberPad {
        > .output {
            @extend %clearFix;
            @extend %innerShadow;

            background: #fff;
            font-family: Consolas, monospace;
            min-height: 98px;
            padding: 0 16px;
            text-align: right;
            position: relative;

            > .operation {
                font-size: 1 rm;
                top: 5px;
                overflow: hidden;
                white-space: nowrap;
            }

            > * {
                position: absolute;
                right: 16px;
            }

            > .result {
                bottom: 5px;
                font-size: 24px;
                color: rgba(0, 0, 0, 0.4);
            }
        }

        > .buttons {
            @extend %clearFix;

            > button {
                font-size: 20px;
                float: left;
                $h: 56px;
                height: $h;
                background: transparent;
                width: 20%;
                border: none;

                &.zero {
                    width: 40%;
                }

                &.ok {
                    float: right;
                    height: $h*2;
                }

                $bg: #f2f2f2;

                &:nth-child(1) {
                    background: $bg;
                }

                &:nth-child(2), &:nth-child(6) {
                    background: darken($bg, 4%);
                }

                &:nth-child(3), &:nth-child(7), &:nth-child(11) {
                    background: darken($bg, 4%*2);
                }

                &:nth-child(4), &:nth-child(8), &:nth-child(12) {
                    background: darken($bg, 4%*3);
                }

                &:nth-child(5), &:nth-child(9), &:nth-child(13), &:nth-child(16) {
                    background: darken($bg, 4%*4);
                }

                &:nth-child(10), &:nth-child(14), &:nth-child(17) {
                    background: darken($bg, 4%*5);
                }

                &:nth-child(18) {
                    background: darken($bg, 4%*6);
                }

                &:nth-child(15) {
                    background: darken($bg, 4%*7);
                }
            }
        }
    }
</style>