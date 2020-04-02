<template>
  <div class="home">
    <GamePage></GamePage>
  </div>
</template>

<script>
// @ is an alias to /src
import GamePage from '@/components/GamePage.vue'

export default {
  name: 'Home',
  components: {
    GamePage
  }
}
</script>
