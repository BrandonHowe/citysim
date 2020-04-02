<template>
    <div class="farm" @click="destroyFarm(data)">
        <h4>{{data.name}}</h4>
        <h5>${{Number(data.money.toFixed(5))}}</h5>
        <h6>{{data.employed.length}} employees</h6>
        <h6>Wage: ${{data.pay}} per day</h6>
        <h6>Harvesting day: {{data.plantingDay + 80}}</h6>
        <h6>Efficiency: {{data.administrationEff}}</h6>
        {{data.employed.length / data.maxEmployed}}
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Farm extends Vue {
        @Prop()
        data: Record<string, any>;
        destroyFarm(farm: Record<string, any>) {
            this.$store.getters.city.buildings.farms.splice(this.$store.getters.city.buildings.farms.indexOf(farm), 1);
            farm.destroyCompany();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h4, h5, h6 {
        margin: 5px;
    }
    .farm {
        display: inline-block;
        width: 33%;
        height: 20%;
    }
    .farm:nth-child(even) {
        background-color: #e4e4e4;
    }
    .farm:nth-child(odd) {
        background-color: #eee;
    }
</style>
