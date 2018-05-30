let app = getApp()
Component({
  properties: {
    jobItem:{
      type:Object,
      value:{}
    }
  },
  data: {

  },
  ready(options) {
    console.log(this.data)
  },
  methods:{
    toJobDetail(){
      wx.navigateTo({
        url:"/pages/job/personal-jobdetail/personal-jobdetail"
      })
    }
  }
})