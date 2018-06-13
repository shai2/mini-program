Component({
  properties: {
    money:{
      type:Number,
      value:0
    },
    rewardShow:{
      type:Boolean,
      value:true
    }
  },
  data: {

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