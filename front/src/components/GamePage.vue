<template>
    <div class="gamepage">
        <Sidebar
            class="sidebar"
            :elements="['City', 'Offices', 'Farms', 'Apartments', 'Power', 'Help']"
            :selected="selected"
            @changeSidebar="changeSidebar"
        ></Sidebar>
        <CityInfo
            v-if="selected === 'City'"
            :data="$store.getters.city"
            class="cityInfo"
            @changeSpeed="changeSpeed"
            :speed="currentSpeed"
        ></CityInfo>
        <OfficeBox
            class="officeBox"
            :offices="$store.getters.city.buildings.offices"
            v-if="selected === 'Offices'"
        ></OfficeBox>
        <FarmBox
            class="farmBox"
            :farms="$store.getters.city.buildings.farms"
            v-if="selected === 'Farms'"
        ></FarmBox>
        <PowerBox
            v-if="selected === 'Power'"
            :powerPlants="$store.getters.city.buildings.power"
            class="powerBox"
        ></PowerBox>
        <ApartmentBox
            v-if="selected === 'Apartments'"
            :apartments="$store.getters.city.buildings.apartments"
            class="apartments"
        ></ApartmentBox>
        <HelpPage
            v-if="selected === 'Help'"
            class="help"
        ></HelpPage>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { Component, Vue } from 'vue-property-decorator';
    import Sidebar from "@/components/Sidebar.vue";
    import OfficeBox from "@/components/OfficeBox.vue";
    import FarmBox from "@/components/FarmBox.vue";
    import PowerBox from "@/components/PowerBox.vue";
    import ApartmentBox from "@/components/ApartmentBox.vue";
    import CityInfo from "@/components/CityInfo.vue";
    import HelpPage from "@/components/HelpPage.vue";
    @Component({
        components: {HelpPage, CityInfo, ApartmentBox, PowerBox, FarmBox, OfficeBox, Sidebar}
    })
    export default class GamePage extends Vue {
        selected = "City";
        speeds = [5000, 1000, 500, 100];
        currentSpeed = 2;
        mounted () {
            this.$store.commit("createPeople");
            console.log(this.$store.getters.city.buildings.offices);
            this.runDay();
        }
        runDay() {
            this.$store.commit("runDay");
            setTimeout(this.runDay, this.speeds[this.currentSpeed]);
        }
        changeSidebar (value) {
            this.selected = value;
        }
        changeSpeed (value) {
            this.currentSpeed = value;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .gamepage {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        grid-template-rows: repeat(20, 1fr);
    }
    .sidebar {
        grid-column: 1 / 4;
        grid-row: 1 / 21;
    }
    .officeBox {
        grid-column: 4 / 21;
        grid-row: 1 / 21;
    }
    .farmBox {
        grid-column: 4 / 21;
        grid-row: 1 / 21;
    }
    .powerBox {
        grid-column: 4 / 21;
        grid-row: 1 / 21;
    }
    .apartments {
        grid-column: 4 / 21;
        grid-row: 1 / 21;
    }
    .cityInfo {
        grid-column: 4 / 21;
        grid-row: 1 / 21;
    }
    .help {
        grid-column: 4 / 21;
        grid-row: 1 / 21;
        text-align: left;
    }
</style>
