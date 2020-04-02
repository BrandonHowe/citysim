<template>
    <div class="helpPage">
        <h2>Help</h2>
        <h3>What even is this?</h3>
        <p>This is a city simulator. It's very crude and rudimentary, and the economy is far from developed. It's a
            simple city simulator I made for a school project focused on building a sustainable city. It features a
            dynamic economy with a bizarre mix of ultracapitalism and communism. Offices will raise or lower their pay
            on a day to day basis to gouge out as much money as they can from their current workers, or try to make
            their wages seem attractive to people willing to switch jobs. However, food and other items are
            collectivized by the (non-existent) government. It's a weird economy and I'm sure that you'll find it just
            as confusing as I do.</p>
        <h3>How do I play?</h3>
        <p>Well, if you want, you don't have to play at all. The game is set such that your administrators will
            automatically build and raze buildings for you. They might not build the most sustainable city, but it'll
            stand. However, you can disable their auto-building by heading to the city tab, which lets you make your own
            decisions on what to build and what to destroy.</p>
        <h3>What does everything do?</h3>
        <p>Every building has a specific role to play.</p>
        <ul>
            <li>
                Your apartments are the simplest building, they merely house your citizens. Homeless citizens won't
                provide any detriment to your city other than lowering your sustainability score. Citizens will
                automatically switch apartments if they feel the rent change is a good enough decrease, and apartments
                will dynamically update their rent prices to either gouge as much money out of their tenants as possible
                or to make their prices attractive to potential buyers.
            </li>
            <li>
                Your offices are the capitalist powerhouse of this tiny city. Software engineers and accountants will
                work at offices and get paid by the day. After a few months (depending on the amount of employees) the
                company will release a software product that will be put on the global market. People who live outside
                the city will purchase copies of the software which will pour back into the company. If an office can't
                make enough money over the course of a whole year, it will close down. Offices follow the same "dynamic
                pricing" as other buildings, changing their prices every day to maximize profit.
            </li>
            <li>
                Farms are an essential component of your city and are the food production source. While not strictly
                necessary, having a food production that supports your whole city benefits your sustainability score.
                Farms plant and harvest and sell their excess food to the world. All values are based off of corn
                (everyone who lives in the city is ultravegan) so the planting and harvesting cycle becomes consistent.
            </li>
            <li>
                The last building is the Power Plant. There are three types; Coal, Wind, and Solar. Coal plants are the
                most efficient as one plant can meet the power need of thousands of people, an as such your
                administrators will automatically build coal plants when given the option. While this is great for
                efficiency, the type of power source you use factors into 20% of your sustainability score, so it's
                quite important. An alternative if you are focused on a purely office-based city would be to have no
                energy production, however producing 100% of your energy needed factors into 15% of your sustainability
                score.
            </li>
        </ul>
        <h3>
            Citizens
        </h3>
        <p>
            Citizens are the basic unit of your city. You start out with 1000; more can come when people see you have
            achieved economic success. Citizens can be administrators, software engineers, accountants, maintainers, and
            farmers. Administrators can found new buildings, software engineers and accountants work at offices,
            maintainers keep your city from falling apart, and farmers work to provide food for your city. Food is
            distributed to your citizens by the central government, which will import food in the case of a shortage.
            There is no viewing for citizens due to the fact that thousands would have to be rendered and the lag would
            be immense, as the game already lags at around 3000 citizens.
        </p>
        <h3>
            What else have you made?
        </h3>
        <p>Glad you asked. You can check out my other projects at my <a href="https://github.com/xWafl">Github</a>. If
            you could star this project, or better yet, follow me, that would be great! I'm always open for a pull
            request if someone wants to submit one for this project.</p>
        <h2>Thanks for playing!</h2>
    </div>
</template>
con
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class HelpPage extends Vue {

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .helpPage {
        padding-left: 1%;
        overflow: auto;
    }
</style>
