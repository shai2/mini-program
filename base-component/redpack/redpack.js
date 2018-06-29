Component({
  properties: {
    money:{
      type:Number,
      value:0
    }
  },
  data: {
    rewardShow:false
  },
  methods: {
    hide(){
      this.setData({
        rewardShow:false
      })
    },
    show(){
      this.setData({
        rewardShow:true
      })
    }
  },
})