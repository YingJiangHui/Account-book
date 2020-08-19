<template>
    <div>
        <ul class="types">
            <li :class="type==='+'&&'selected'" @click="modifyType('+')">收入</li>
            <li :class="type==='-'&&'selected'" @click="modifyType('-')">支出</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Types',
        props:['xxx'],
        mounted(){
            console.log(this.xxx)
        },
        data(){
            return{
                type:'+'
            }
        },
        methods:{
            modifyType(type){
                if(type!=='-'&&type!=='+')
                    throw new Error("type is unknown ")
                this.type = type
            }
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