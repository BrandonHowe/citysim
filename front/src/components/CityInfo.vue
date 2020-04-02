<template>
    <div class="cityInfo">
        <h2>Welcome to my city!</h2>
        <h3>Current day: {{data.day}}</h3>
        <h3>City population: {{data.citizens.length}}</h3>
        <ul>
            <li>Administrators: {{data.citizens.filter(l => l.skill === "administration").length}}</li>
            <li>Software Engineers: {{data.citizens.filter(l => l.skill === "software").length}}</li>
            <li>Accountants: {{data.citizens.filter(l => l.skill === "accounting").length}}</li>
            <li>Farmers: {{data.citizens.filter(l => l.skill === "farming").length}}</li>
            <li>Maintenance Workers: {{data.citizens.filter(l => l.skill === "maintenance").length}}</li>
        </ul>
        <h4>Unemployment: {{Math.floor(data.unemploymentInCity / data.citizens.length)}}%</h4>
        <h4>Homelessness: {{Math.round(data.citizens.filter(l => !l.residence).length / data.citizens.length)}}%</h4>
        <h4>Power generation: {{data.powerGenerationInCity}} / {{data.powerNeeded}} / {{Math.floor(data.powerGenerationInCity / data.powerNeeded * 100)}}%</h4>
        <h3>Sustainability score: {{data.sustainabilityScore}}</h3>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CityInfo extends Vue {
        @Prop()
        data: Record<string, any>;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .cityInfo {
        padding-left: 1%;
        text-align: left;
    }
</style>
