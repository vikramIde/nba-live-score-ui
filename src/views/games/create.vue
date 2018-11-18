<template>
  <case-detail :is-edit="false"/>
</template>

<script>
import CaseDetail from './components/CaseDetail'

export default {
  name: 'CreateForm',
  components: { CaseDetail }
}
</script>

