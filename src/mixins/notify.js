
import Pusher from 'pusher-js' // import Pusher

export const notify = {

  created() {
    const that = this
    this.pusher = new Pusher('d93ee93dcb3df9469893', {
      cluster: 'ap2',
      encrypted: true })

    this.pusher.logToConsole = true

    this.channel = this.pusher.subscribe('my-channel')

    this.channel.bind('update-matches', function(data) {
      that.$emit('incoming_update_matches', data)
    })

    this.channel.bind('update-scores', function(data) {
      that.$emit('incoming_update_scores', data)
    })
  },
  data() {
    return {
      pusher: null,
      channel: null,
      syncData: null,
      tokenDataMap: {}
    }
  },
  methods: {

  }
}
