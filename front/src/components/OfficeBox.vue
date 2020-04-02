<template>
    <div class="officeBox">
        <Office
            v-for="office in offices"
            :key="offices.indexOf(office)"
            :data="office"
        >
        </Office>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Office from "@/components/Office.vue";
    @Component({
        components: {Office}
    })
    export default class OfficeBox extends Vue {
        @Prop()
        offices: Array<Record<string, any>>
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .officeBox {
        overflow: auto;
    }
</style>
