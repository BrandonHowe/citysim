<template>
    <div class="powerBox">
        <Power
            v-for="plant in powerPlants"
            :key="powerPlants.indexOf(plant)"
            :data="plant"
        ></Power>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Power from "@/components/Power.vue";

    @Component({
        components: {Power}
    })
    export default class PowerBox extends Vue {
        @Prop()
        powerPlants: Array<Record<string, any>>
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .powerBox {
        overflow: auto;
        width: 100%;
    }
</style>
