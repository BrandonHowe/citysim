<template>
    <div class="apartment">
        <h4>{{data.name}}</h4>
        <h5>{{data.renters.length}}/{{data.totalApartments}} tenants</h5>
        <h6>Rent: ${{data.rentPrice}}</h6>
        <h6>Total money: {{data.money}}</h6>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Apartment extends Vue {
        @Prop()
        data: Record<string, any>
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h4, h5, h6 {
        margin: 5px;
    }
    .apartment {
        display: inline-block;
        width: 33%;
        height: 20%;
    }
    .apartment:nth-child(even) {
        background-color: #e4e4e4;
    }
    .apartment:nth-child(odd) {
        background-color: #eee;
    }
</style>
