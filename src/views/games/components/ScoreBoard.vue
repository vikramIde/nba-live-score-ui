<template>
  <div style="margin:15px;">
    <div v-if="gameData !={}" :shadow="true" class="wallet-header">
      <el-row>
        <el-col :span="10">
          <ul style="" class="top-pannel">
            <li>
              <svg-icon icon-class="international" style="width: 50px;height: 50px"/>
            </li>
            <li>
              <div class="wallet-amount">{{ gameData.team1.name }}</div>
              <div style="padding: 5px">Total Score :  {{ totalScoreTeam1 }}</div>
              <div style="padding: 5px">Attack Count : {{ gameData.attack_count }}</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="4">
          <el-tag v-if="gameData.status==2" type="success">Live</el-tag>
          <el-tag v-if="gameData.status==1" type="info">Not Started</el-tag>
          <el-tag v-if="gameData.status==3" type="warning">Finished</el-tag>
        </el-col>
        <el-col :span="10">
          <ul class="top-pannel right" style="float:right">
            <li>
              <div class="wallet-amount">{{ gameData.team2.name }}</div>
              <div style="padding: 5px">Tota Score : {{ totalScoreTeam2 }}</div>
              <div style="padding: 5px">Attack Count : {{ gameData.attack_count1 || 0 }}</div>
            </li>
            <li>
              <svg-icon icon-class="international" style="width: 50px;height: 50px"/>
            </li>
          </ul>
        </el-col>

      </el-row>

    </div>

    <el-row class="createPost-main-container">
      <el-col :span="12">
        <div >
          <div class="container">
            <div class="page-header">
              <h3 id="timeline">Timeline</h3>
            </div>
            <ul class="timeline" >
              <template v-for="(score,index) in reversedList" >
                <li v-if="(index)%2==0" :key="score">
                  <div class="timeline-badge"><i class="glyphicon glyphicon-check"/></div>
                  <div class="timeline-panel">
                    <div class="timeline-heading">
                      <h4 class="timeline-title">{{ score.rules.name }}</h4>
                      <p><small class="text-muted"><i class="glyphicon glyphicon-time"/> {{ score.updated_at }}</small></p>
                    </div>
                    <div class="timeline-body">
                      <p>
                        <b>{{ score.players.name }} {{ score.players.surname }}</b>
                        did
                        <b>{{ score.rules.name }}</b>
                        for team
                        <b>{{ score.games_id }}</b>
                      </p>
                      <p/>
                    </div>
                  </div>
                </li>
                <li v-if="(index)%2 >0" :key="score" class="timeline-inverted">
                  <div class="timeline-badge warning"><i class="glyphicon glyphicon-check"/></div>
                  <div class="timeline-panel">
                    <div class="timeline-heading">
                      <h4 class="timeline-title">{{ score.rules.name }}</h4>
                      <p><small class="text-muted"><i class="glyphicon glyphicon-time"/> {{ score.updated_at }}</small></p>
                    </div>
                    <div class="timeline-body">
                      <p>
                        <strong>{{ score.players.name }}</strong>
                        did
                        <strong>{{ score.rules.name }}</strong>
                        for team
                        <strong>{{ score.games_id }}</strong>
                      </p>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div >
          <div class="container">
            <div class="page-header">
              <h3 id="timeline">Assist</h3>
              <el-select v-model="selectedTeam" filterable placeholder="Select Team" @change="getPlayer()" >
                <el-option
                  v-for="(item,num) in Teams"
                  :key="num"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </div>
            <el-row>
              <h2>Players</h2>

              <el-col v-for="(o,num) in PlayerList" :key="num" :span="6" style="padding:2px">
                <el-card :body-style="{ padding: '2px' }" style="min-height: 73px;text-align: center;">
                  <el-button @click="getScoreByPlayerId(o.id)">{{ o.name }} {{ o.surname }}</el-button>
                </el-card >
              </el-col>
            </el-row>
            <el-row>
              <h2>Details</h2>
              <el-table
                :data="playerScore"
                style="width: 100%">
                <el-table-column
                  prop="rules.name"
                  label="Rules Name"
                  width="180"/>
                <el-table-column
                  prop="rules.value"
                  label="Score"
                  width="180"/>
              </el-table>
            </el-row>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
// , updateAsset, createAsset
import { fetchAsset } from '@/api/asset'
import { notify } from '../../../mixins/notify.js'
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
  mixins: [notify],
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
      selectedTeam: { value: 'Select', id: 0 },
      gameData: {},
      PlayerList: [],
      playerScore: [],
      selectedPlayer: 0,
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
    reversedList() {
      const x = this.list
      return x.reverse()
    },
    totalScoreTeam2() {
      let x = 0
      this.list.forEach(score => {
        if (score.players.team_id === this.gameData.team2_id) { x = x + score.rules.value }
      })

      return x
    },
    totalScoreTeam1() {
      let x = 0
      this.list.forEach(score => {
        if (score.players.team_id === this.gameData.team1_id) { x = x + score.rules.value }
      })

      return x
    },
    Teams() {
      const teamList = []
      teamList.push(this.gameData.team1)
      // teamList.push({name:'Select')
      teamList.push(this.gameData.team2)
      return teamList
    }

  },
  created() {
    this.getList()
    this.getGame()
    var audio = new Audio(require('../core/beep.mp3'))
    var audio1 = new Audio(require('../core/beep-02.mp3'))
    this.$on('incoming_update_matches', function(tokenMessage) {
      this.getGame()
      audio1.play()
    })
    this.$on('incoming_update_scores', function(tokenMessage) {
      this.getList()
      audio.play()
    })
  },
  methods: {
    getPlayer() {
      const PlayerList = []
      fetchAsset(this.listQuery, 'v1/teams', this.selectedTeam).then(response => {
        this.PlayerList = response.data.players
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })

      return PlayerList
    },
    getScoreByPlayerId(id) {
      this.playerScore = []
      this.list.forEach(score => {
        if (score.players_id === id) { this.playerScore.push(score) }
      })
    },
    getList() {
      this.loading = true
      fetchAsset(this.listQuery, 'v1/scores/game', this.$route.params.id).then(response => {
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
    getGame() {
      fetchAsset(this.listQuery, 'v1/games', this.$route.params.id).then(response => {
        this.gameData = response.data
        this.total = response.data.total
        // console.log(response.data)
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
<style type="text/css">

  .timeline {
  list-style: none;
  padding: 20px 0 20px;
  position: relative;
  max-height: 536px;
  overflow-y: scroll;
}
.timeline:before {
  top: 0;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  background-color: #eeeeee;
  left: 50%;
  margin-left: -1.5px;
}
.timeline > li {
  margin-bottom: 20px;
  position: relative;
}
.timeline > li:before,
.timeline > li:after {
  content: " ";
  display: table;
}
.timeline > li:after {
  clear: both;
}
.timeline > li:before,
.timeline > li:after {
  content: " ";
  display: table;
}
.timeline > li:after {
  clear: both;
}
.timeline > li > .timeline-panel {
  width: 46%;
  float: left;
  border: 1px solid #d4d4d4;
  border-radius: 2px;
  padding: 20px;
  position: relative;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
}
.timeline > li > .timeline-panel:before {
  position: absolute;
  top: 26px;
  right: -15px;
  display: inline-block;
  border-top: 15px solid transparent;
  border-left: 15px solid #ccc;
  border-right: 0 solid #ccc;
  border-bottom: 15px solid transparent;
  content: " ";
}
.timeline > li > .timeline-panel:after {
  position: absolute;
  top: 27px;
  right: -14px;
  display: inline-block;
  border-top: 14px solid transparent;
  border-left: 14px solid #fff;
  border-right: 0 solid #fff;
  border-bottom: 14px solid transparent;
  content: " ";
}
.timeline > li > .timeline-badge {
  color: #fff;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 1.4em;
  text-align: center;
  position: absolute;
  top: 16px;
  left: 50%;
  margin-left: -25px;
  background-color: #999999;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
.timeline > li.timeline-inverted > .timeline-panel {
  float: right;
}
.timeline > li.timeline-inverted > .timeline-panel:before {
  border-left-width: 0;
  border-right-width: 15px;
  left: -15px;
  right: auto;
}
.timeline > li.timeline-inverted > .timeline-panel:after {
  border-left-width: 0;
  border-right-width: 14px;
  left: -14px;
  right: auto;
}
.timeline-badge.primary {
  background-color: #2e6da4 !important;
}
.timeline-badge.success {
  background-color: #3f903f !important;
}
.timeline-badge.warning {
  background-color: #f0ad4e !important;
}
.timeline-badge.danger {
  background-color: #d9534f !important;
}
.timeline-badge.info {
  background-color: #5bc0de !important;
}
.timeline-title {
  margin-top: 0;
  color: inherit;
}
.timeline-body{
  min-width:200px;
}
.timeline-body > p,
.timeline-body > ul {
  margin-bottom: 0;
}
.timeline-body > p + p {
  margin-top: 5px;
}
.wallet-header{
    background: #eef1f6;
    padding:10px;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
 .wallet-transaction-container{
    margin-top: 35px;
    padding:10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .wallet-amount{
    font-size: 18px;
    padding: 5px;
    font-weight: 600;
    display: block;
  }
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
.top-pannel {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.top-pannel > li {
    float: left;
    padding-left: 5px;
    font-size: 12px;
    font-weight: 400;
}
.top-pannel > li a {
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload{
        border: #999 1px dotted !important;
  }
</style>
