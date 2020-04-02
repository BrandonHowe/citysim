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
        <h4>Unemployment: {{(100 - (data.unemploymentInCity * 100 / data.citizens.length)).toFixed(1)}}%</h4>
        <h4>Homelessness: {{(100 * data.citizens.filter(l => !l.residence).length / data.citizens.length).toFixed(1)}}%</h4>
        <h4>Power generation: {{data.powerGenerationInCity}} / {{data.powerNeeded}} / {{Math.floor(data.powerGenerationInCity / data.powerNeeded * 100)}}%</h4>
        <h3>Sustainability score: {{data.sustainabilityScore}}</h3>
        <br>
        <h3>Build a new building!</h3>
        <div
            v-for="option in createOptions"
            :key="option"
            class="create"
            @click="$store.getters.city.create(option)"
        >
            {{option[0].toUpperCase() + option.slice(1)}}
        </div>
        <div
            class="speedChange"
            @click="toggleSpeed"
        >
            Toggle Speed (Currently {{speed + 1}}/4)
        </div>
        <div
            class="speedChange"
            @click="toggleAutomation"
        >
            Toggle automation (Currently {{$store.getters.city.administratorsEnabled === true ? "enabled" : "disabled"}})
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CityInfo extends Vue {
        @Prop()
        data: Record<string, any>;
        @Prop()
        speed: number;
        createOptions = {
            "apartment": "Apartments",
            "office": "Office",
            "farm": "Farm",
            "coal": "Coal Plant",
            "wind": "Wind Farm",
            "solar": "Solar Field"
        };
        toggleSpeed () {
            this.$emit("changeSpeed", (this.speed === 3 ? 0 : this.speed + 1));
        }
        toggleAutomation () {
            this.$store.getters.city.administratorsEnabled === true ? this.$store.getters.city.administratorsEnabled = false : this.$store.getters.city.administratorsEnabled = true;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .cityInfo {
        padding-left: 1%;
        text-align: left;
    }
    .create {
        width: 100px;
        line-height: 100px;
        height: 100px;
        text-align: center;
        background-color: #ddd;
        display: inline-block;
        margin: 5px;
        user-select: none;
        transition: background-color 0.3s;
    }
    .create:hover {
        background-color: #ccc;
    }
    .speedChange {
        width: 320px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-color: #ddd;
        transition: background-color 0.3s;
        margin: 5px;
        cursor: pointer;
        display: inline-block;
    }
    .speedChange:hover {
        background-color: #ccc;
    }
</style>
