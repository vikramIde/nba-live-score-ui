<template>
  <div>
    <el-table v-loading="loading" :data="caseList" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Case Id" >
        <template slot-scope="scope">
          <span>{{ scope.row.caseId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Patient" >
        <template slot-scope="scope">
          <span>{{ scope.row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Doctor" >
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Drugs" >
        <template slot-scope="scope">
          <span>{{ scope.row.drugs }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Comment" >
        <template slot-scope="scope">
          <span>{{ scope.row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status" >
        <template slot-scope="scope">
          <span>{{ scope.row.transferStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">View</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="View / Sign Case Details">
      <el-form ref="dataForm" :model="formData" label-position="left" label-width="70px" style="width: ; margin-left:50px;">
        <el-row class="createPost-main-container">
          <el-col :span="12">
            <div v-if="dialogFormVisible" >
              <el-form-item label="CaseId" >
                <el-input v-model="formData.caseId" disabled="disabled"/>
              </el-form-item>
              <el-form-item label="Status" >
                <el-input v-model="formData.transferStatus" disabled="disabled"/>
              </el-form-item>
              <!-- <el-form-item label="CaseDate">
                <el-input v-model="formData.caseDate" disabled="disabled">
                </el-input>
              </el-form-item> -->
              <el-form-item label="Patient">
                <el-input v-model="formData.patientName" disabled="disabled"/>
              </el-form-item>
              <el-form-item label="Doctor">
                <el-input v-model="formData.doctorName" disabled="disabled" placeholder="Example resource:org.example.iqvia.Pharma#glx@email.com"/>
              </el-form-item>
              <el-form-item label="Drugs">
                <el-input v-model="formData.drugs" disabled="disabled" placeholder="Comma separated drug ids"/>
              </el-form-item>
              <el-form-item label="Comment">
                <el-input v-model="formData.comment" disabled="disabled" type="textarea" placeholder="Case's comment"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="dialogFormVisible" >
              <el-card :body-style="{'background-color':'#fce38a'}" shadow="never">
                If you are Okay with the details please click on the sign button bellow.
                Other wise reject the prescription
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" icon="el-icon-delete" @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        // <el-button type="success" icon="el-icon-check" @click="updateData()" >Sign</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
  .el-col-12 {
    padding: 10px !important;
  }
</style>
<script>
import { fetchAsset, createAsset } from '@/api/pharma'
import { patientSignatureData } from '../../core/form-data'
const CryptoJS = require('crypto-js')
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
      isParticipantSelected: true,
      dialogFormVisible: false,
      list: null,
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
    caseList() {
      const caseL = []
      this.list.forEach(element => {
        const cypherBytes = CryptoJS.AES.decrypt(element.comments, 'secret key 123')
        try {
          const caseObj = JSON.parse(cypherBytes.toString(CryptoJS.enc.Utf8))
          caseL.push({
            caseId: element.prescriptionId,
            patientName: caseObj.patientDetail.email,
            transferStatus: element.TransferStatus,
            doctorName: caseObj.doctorDetail.email,
            comment: caseObj.comment,
            // caseDate : element.timestamp ,
            drugs: this.getCommaSepMeds(caseObj.rxList).trim(),
            data: element.comments
          })
        } catch (e) {
          console.log(`ERROR : could not decryt comment, ${element.comments}`)
        }
      })
      return caseL
    }
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
      fetchAsset(this.listQuery, 'PatientNotification').then(response => {
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
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    updateData() {
      patientSignatureData.patAsset = patientSignatureData.patAsset + this.formData.caseId
      debugger
      createAsset(patientSignatureData, 'SignPatientPrescription').then((e) => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Status',
          message: 'Signed Sucessfully',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
