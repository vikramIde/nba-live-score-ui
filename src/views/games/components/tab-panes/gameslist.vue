<template>
  <div>
    <el-row>
      <el-col v-for="o in list" :key="o" :span="6" style="padding:5px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://ngscsports.com/wp-content/uploads/2018/04/download-28.jpg" class="image">
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-row>
                <el-col :span="11" style="font-size:13px">
                  <el-row style="text-align:center">{{ o.team1.name }} </el-row>
                  <el-row style="text-align:center"><strong>VS</strong></el-row>
                  <el-row style="text-align:center">{{ o.team2.name }}</el-row>
                </el-col>
                <el-col :span="8" class="time">
                  <i v-if="o.status==1" :style="{ color: 'grey' }" size="small">Not Started</i>
                  <i v-if="o.status==2" :style="{ color: 'green' }" size="small">Live</i>
                  <i v-if="o.status==3" :style="{ color: 'blue' }" size="small">Finished</i>
                </el-col>
                <el-col :span="3">
                  <router-link :to="'/games/view/'+o.id">
                    <el-button type="primary" size="small" >View</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" title="Timeline" width="90%" height="80%">
      <el-form ref="dataForm" :model="formData" label-position="left" label-width="70px" style="width:; margin-left:50px;">
        <el-row class="createPost-main-container"/>
      </el-form>
      <div slot="footer" class="dialog-footer"/>
    </el-dialog>
  </div>
</template>
<script>
// , updateAsset, createAsset
import { fetchAsset } from '@/api/asset'
// const CryptoJS = require('crypto-js')
export default {

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
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      formData: {},
      currentDate: '04/20/2019',
      isParticipantSelected: true,
      dialogFormVisible: false,
      list: [
        {
          team1: 'Some Name',
          team2: 'Some Name1'

        }
      ],
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false,
      total: 0
    }
  },
  computed: {

  },
  created() {
    this.getList()
  },
  methods: {
    getCommaSepMeds(medsList) {
      let commaSepMeds = ''
      if (medsList && medsList.length > 0) {
        medsList.forEach((elm) => {
          commaSepMeds = commaSepMeds + elm.data.MedName + ','
        })
      } else {
        console.log(`ERROR : No meds prescribed.`)
      }
      return commaSepMeds
    },
    getList() {
      this.loading = true
      fetchAsset(this.listQuery, 'v1/games').then(response => {
        this.list = response.data
        this.total = response.data.total
        this.loading = false
        console.log(response.data)
      }).catch(err => {
        console.log(err)
        this.$notify({
          title: 'Error',
          message: err,
          type: 'error'
        })
      })
    },
    handleUpdate(row) {
      this.formData = Object.assign({}, row) // copy obj
      this.$router.push('')
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // decrypt

    }

  }
}
</script>

