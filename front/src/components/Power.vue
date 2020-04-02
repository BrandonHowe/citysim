<template>
    <div class="power">
        <h4>{{data.name}}</h4>
        <h5>Type: {{data.type}}</h5>
        <h5>Size: {{data.dims.sizePerFloor}}</h5>
        <h6>Production: {{data.prodPerDay}} per day</h6>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Power extends Vue {
        @Prop()
        data: Record<string, any>;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h4, h5, h6 {
        margin: 5px;
    }
    .power {
        display: inline-block;
        width: 33%;
        height: 20%;
    }
    .power:nth-child(even) {
        background-color: #e4e4e4;
    }
    .power:nth-child(odd) {
        background-color: #eee;
    }
</style>
