<template>
    <div class="numberPad">
        <div class="output">
            <div class="operation">{{output}}</div>
            <div class="result">{{operation}}</div>
        </div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="add">+</button>

            <button @click="equalTo">=</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="subtraction">-</button>
            <button @touchstart.prevent="press" @touchend="uplift">删除</button>

            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>

            <button @click="multiplication">×</button>

            <button @click="ok" class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>
            <button @click="division">÷</button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) value!: number;
    output = this.value.toString();
    operation = '0';
    type = 0;
    lastTime: string | undefined;

    ok() {
      this.$emit('update:value',parseFloat(this.output));
      this.$emit('submit', parseFloat(this.output));
      this.output = '0';
    }

    add() {
      this.type = 1;
    }

    subtraction() {
      this.type = 2;
    }

    multiplication() {
      this.type = 3;
    }

    division() {
      this.type = 4;
    }

    equalTo() {
      console.log('=');
    }

    press() {
      this.lastTime = this.getDate();
    }

    getDate() {
      return Date.parse(new Date().toString()).toString();
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

    inputContent(event: MouseEvent) {
      const target = (event.target as HTMLButtonElement);
      const input = target.textContent!;

      if (this.output.indexOf('.') >= 0)
        if (input === '.')
          return;

      if (this.output.length >= 16)
        return;

      if (this.output === '0') {
        if ('1234567890'.indexOf(input) >= 0) {
          this.output = input;
        } else if (input === '.') {
          this.output += '.';
        }
      } else {
        this.output += input;
      }
    }


  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/helper.scss';

    .numberPad {
        > .output {
            @extend %clearFix;
            @extend %innerShadow;
            font-family: Consolas, monospace;
            padding: 9px 16px;
            text-align: right;

            > .operation {
                font-size: 36px;
            }

            > .result {
                font-size: 24px;
                color: rgba(0, 0, 0, 0.4);
            }
        }

        > .buttons {
            @extend %clearFix;

            > button {
                float: left;
                $h: 8vh;
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