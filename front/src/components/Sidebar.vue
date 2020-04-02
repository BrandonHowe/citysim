<template>
    <div class="sidebar">
        <SidebarElement
            v-for="element in elements"
            :key="element"
            :title="element"
            @changeSidebar="changeSidebar"
            :class="{'selected': selected === element}"
        ></SidebarElement>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SidebarElement from "@/components/SidebarElement.vue";
    @Component({
        components: {SidebarElement}
    })
    export default class Sidebar extends Vue {
        @Prop()
        elements: Array<string>;
        @Prop()
        selected: string;
        changeSidebar(value) {
            this.$emit("changeSidebar", value);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .sidebar {
        background-color: #ddd;
    }
    .selected {
        background-color: #ccc;
    }
</style>
