Component({
  properties: {
    money:{
        type:Number,
        value:0
    }
  },
  data: {

  },
  methods: {
    closeShadow(){
      this.setData({
        rewardShow:false
      })
    },
  },
})