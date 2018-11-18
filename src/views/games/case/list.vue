<template>
  <div class="app-container">
    <gamesList />kjkj
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'

import gamesList from '../components/tab-panes/gameslist'

// ddd

export default {
  name: 'MedicineList',
  components: { gamesList },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tabMapOptions: [
        { label: 'Case List', key: 'ML' },
        { label: 'User Notification List', key: 'NL' }
      ],
      activeName: 'ML',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {

  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
