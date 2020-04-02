<template>
    <div class="sidebarElement" @click="$emit('changeSidebar', title)">
        <span>{{ title }}</span>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class SidebarElement extends Vue {
        @Prop({default: "Blah"})
        title: string;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .sidebarElement {
        padding: 10px 0 10px 0;
        transition: background-color 0.3s;
    }
    .sidebarElement:hover {
        background-color: #ccc;
    }
    h3 {
        margin: 0;
        padding: 0;
    }
</style>
