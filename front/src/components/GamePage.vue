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
    @Component({
        components: {CityInfo, ApartmentBox, PowerBox, FarmBox, OfficeBox, Sidebar}
    })
    export default class GamePage extends Vue {
        selected = "City";
        mounted () {
            this.$store.commit("createPeople");
            console.log(this.$store.getters.city.buildings.offices);
            const self = this;
            setInterval(() => {
                self.$store.commit("runDay");
            }, 100)
        }
        changeSidebar (value) {
            this.selected = value;
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
</style>
