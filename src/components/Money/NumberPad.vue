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
  import {Component, Watch,Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) value!: number;
    output = this.value.toString();
    operation = '0';
    type = 0;
    lastTime: string | undefined;
    regxAny = /\+|-|÷|×/g;
    regxPriority = /÷|×/g;

    regxLast = /(\+|-|÷|×)$/;
    regxNum = /[0-9]\d*/;
    size = 36;
    result = '0';
    getDate() {
      return Date.parse(new Date().toString()).toString();
    }

    press() {
      this.lastTime = this.getDate();
    }

    uplift() {
      const currentTime = Date.parse(new Date().toString()).toString();
      if (this.lastTime && parseInt(currentTime) - parseInt(this.lastTime) >= 100) {
        this.output = '0';
      } else {
        if (this.output.length === 1) {
          this.output = '0';
        } else {
          this.output = this.output.slice(0, -1);
        }
      }
    }

    existStr(string: string, char: string) {
      if (string.indexOf(char) >= 0) {
        return true;
      } else {
        return false;
      }
    }
    equalTo(){
      this.output = this.result
    }
    popChar(str: string) {
      return str.slice(0, -1);
    }
    @Watch('output')
    onOutPutChanged(){
      console.log(this.output)
      const numArr = this.output.split(this.regxAny).filter(el => el !== "").map(el => parseFloat(el));
      const strArr = this.output.split(this.regxNum).filter(el => el.match(this.regxAny));

      if (numArr.length === 1)
        return numArr[0];
      let result = 0;
      for (let i = 0; numArr.length > 1;) {
        if (numArr[i + 2] && strArr[i + 1].match(this.regxPriority)) {
          //  乘除
          const j = i + 1;
          result = this.computer(strArr[j], numArr[j], numArr[j + 1]);
          numArr.splice(j, 2, result);
          strArr.splice(j, 1);
        }

        result = this.computer(strArr[i], numArr[i], numArr[i + 1]);
        numArr.splice(i, 2, result);
        strArr.splice(i, 1);
      }
      this.result = numArr[0].toString();
    }



    computer(types: string, beforeItem: number, afterItem: number): number {
      const obj = {
        '+': beforeItem + afterItem,
        '-': beforeItem - afterItem,
        '×': beforeItem * afterItem,
        '÷': beforeItem / afterItem,
      };

      return obj[types] as number;
    }

    inputContent(event: MouseEvent) {

      const table = ['1234567890+-÷×', '+-÷×'];
      const target = (event.target as HTMLButtonElement);
      const input = target.textContent!;
      const str = this.output[this.output.length - 1];
      if (input.match(this.regxAny) && str.match(this.regxLast)) {
        this.output = this.output.replace(this.regxLast, input);
        return;
      }

      if (input === '.') {
        const arr = [...this.output];
        const count = 1;
        for (let i = arr.length - 1; i >= 0; i--) {
          if (arr[i] === '.') {
            return;
          }
          if (arr[i].match(this.regxAny)) {
            break;
          }
        }
      }

      if (this.output.length >= 16)
        this.size = 30

      if (this.output === '0') {

        if (input.match(this.regxAny))
          return;

        if (table[0].indexOf(input) >= 0) {
          this.output = input;
        } else if (input === '.') {
          this.output += '.';
        }

      } else {
        this.output += input;
      }

    }

    ok() {
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
                font-size: 1rm;
                top: 5px;
                overflow: hidden;
            }
            >* {
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
                $h: 15vw;
                height: $h;
                background: transparent;
                width: 20%;
                border: none;

                &.zero {
                    width: 40vw;
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