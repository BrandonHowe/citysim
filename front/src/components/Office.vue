<template>
    <div class="office">
        <h4>{{data.name}}</h4>
        <h5>${{Number(data.money.toFixed(5))}}</h5>
        <h6>{{data.employed.length}} employees</h6>
        <h6>Wage: ${{data.pay}} per day</h6>
        <h5>Project: {{data.currentProduct.name}}</h5>
        <h6>Release date: {{ data.currentProduct.releaseDay }}</h6>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Office extends Vue {
        @Prop()
        data: Record<string, any>;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h4 {
        margin: 5px;
    }
    h5 {
        margin: 5px;
    }
    h6 {
        margin: 5px;
    }
    .office {
        display: inline-block;
        width: 33%;
        height: 20%;
    }
    .office:nth-child(even) {
        background-color: #e4e4e4;
    }
    .office:nth-child(odd) {
        background-color: #eee;
    }
</style>
