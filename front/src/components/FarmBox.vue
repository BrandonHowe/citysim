<template>
    <div class="farmBox">
        <Farm
            v-for="farm in farms"
            :key="farms.indexOf(farm)"
            :data="farm"
        ></Farm>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Farm from "@/components/Farm.vue";
    @Component({
        components: {Farm}
    })
    export default class FarmBox extends Vue {
        @Prop()
        farms: Array<Record<string, any>>;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .farmBox {
        overflow: auto;
    }
</style>
