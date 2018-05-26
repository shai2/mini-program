var app = getApp()
Component({
  properties: {
  },
  data: {

  },
  onLoad: function (options) {

  },
  methods:{
    toJobDetail(){
      wx.navigateTo({
        url:"/pages/mine/job/personal-jobdetail/personal-jobdetail"
      })
    }
  }
})