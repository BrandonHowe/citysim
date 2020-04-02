<template>
    <div class="apartmentBox">
        <Apartment
            v-for="apartment in apartments"
            :key="apartments.indexOf(apartment)"
            :data="apartment"
        ></Apartment>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Apartment from "@/components/Apartment.vue";
    @Component({
        components: {Apartment}
    })
    export default class ApartmentBox extends Vue {
        @Prop()
        apartments: Array<Record<string, any>>
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .apartmentBox {
        overflow: auto;
        width: 100%;
    }
</style>
