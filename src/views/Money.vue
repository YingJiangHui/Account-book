<template>
    <Layout classPrefix="money">
        <NumberPad />
        <Types xxx="hi"/>
        <Notes />
        <Tags/>
    </Layout>
</template>

<script>
    import Notes from '@/components/Money/Notes.vue'
    import NumberPad from '@/components/Money/NumberPad.vue'
    import Types from '@/components/Money/Types.vue'
    import Tags from '@/components/Money/Tags.vue'

    export default {
        name: 'Money',
        components:{
            Notes,
            NumberPad,
            Types,
            Tags
        }
    }
</script>
<style lang="scss">
    .money-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>
<style lang="scss" scoped>
</style>