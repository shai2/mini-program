let app = getApp()
Component({
  properties: {
    title:{
      type:String,
      value:"热门推荐"
    },
    noBack:{
      type:Boolean,
      value:'',
    },
    type:{
      type:Number,
      value:1
    }
  },
  data: {
    backIcon:"/img/arrow-left.png",
    backIcon2:"/img/arrow-left2.png",
  },
  methods: {
    back(){
      wx.navigateBack({
        delta: 1
      })
    }
  },
})