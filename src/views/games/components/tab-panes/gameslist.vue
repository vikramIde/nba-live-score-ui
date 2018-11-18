<template>
  <div>
    <el-row>
      <el-col v-for="o in 3" :key="o" span="8" style="padding:5px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://ngscsports.com/wp-content/uploads/2018/04/download-28.jpg" class="image">
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-row>
                <el-col :span="11" style="font-size:13px">Hot-Dog <strong>VS</strong> Biryani</el-col>
                <el-col :span="8" class="time"> 04/20/2018 | <i :style="{ color: 'green' }" class="el-icon-circle-check" style="color:green">Live </i> </el-col>
                <el-col :span="3"> <el-button type="primary" size="mini" @click="handleUpdate(o)">View</el-button></el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" title="Timeline" width="90%" height="80%">
      <el-form ref="dataForm" :model="formData" label-position="left" label-width="70px" style="width:; margin-left:50px;">
        <el-row class="createPost-main-container">
          <el-col :span="24">
            <div v-if="dialogFormVisible" >
              <div class="container">
                <div class="page-header">
                  <h1 id="timeline">Timeline</h1>
                </div>
                <ul class="timeline">
                  <li>
                    <div class="timeline-badge"><i class="glyphicon glyphicon-check"/></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Mussum ipsum cacilds</h4>
                        <p><small class="text-muted"><i class="glyphicon glyphicon-time"/> 11 hours ago via Twitter</small></p>
                      </div>
                      <div class="timeline-body">
                        <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-inverted">
                    <div class="timeline-badge warning"><i class="glyphicon glyphicon-credit-card"/></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Mussum ipsum cacilds</h4>
                      </div>
                      <div class="timeline-body">
                        <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
                        <p>Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="timeline-badge danger"><i class="glyphicon glyphicon-credit-card"/></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Mussum ipsum cacilds</h4>
                      </div>
                      <div class="timeline-body">
                        <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-inverted">
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Mussum ipsum cacilds</h4>
                      </div>
                      <div class="timeline-body">
                        <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="timeline-badge info"><i class="glyphicon glyphicon-floppy-disk"/></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Mussum ipsum cacilds</h4>
                      </div>
                      <div class="timeline-body">
                        <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
                        <hr>
                        <div class="btn-group">
                          <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                            <i class="glyphicon glyphicon-cog"/> <span class="caret"/>
                          </button>
                          <ul class="dropdown-menu" role="menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li class="divider"/>
                            <li><a href="#">Separated link</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Mussum ipsum cacilds</h4>
                      </div>
                      <div class="timeline-body">
                        <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-inverted">
                    <div class="timeline-badge success"><i class="glyphicon glyphicon-thumbs-up"/></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Mussum ipsum cacilds</h4>
                      </div>
                      <div class="timeline-body">
                        <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer"/>
    </el-dialog>
  </div>
</template>
<script>
// , updateAsset, createAsset
import { fetchAsset } from '@/api/pharma'
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
    // this.getList()
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
      fetchAsset(this.listQuery, 'DoctorPrescription').then(response => {
        this.list = response.data
        this.total = response.data.total
        this.loading = false
      }).catch(err => {
        this.$notify({
          title: 'Error',
          message: err,
          type: 'error'
        })
      })
    },
    handleUpdate(row) {
      this.formData = Object.assign({}, row) // copy obj
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

