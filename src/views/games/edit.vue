<template>
  <score-board :is-edit="true"/>
</template>

<script>
import ScoreBoard from './components/ScoreBoard'
//
export default {
  name: 'Edit',
  components: { ScoreBoard }
}
</script>

