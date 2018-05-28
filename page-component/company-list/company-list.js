var app = getApp()
Component({
  properties: {
  },
  data: {

  },
  onLoad: function (options) {

  },
  methods:{
    toCompanyDetail(){
      wx.navigateTo({
        url:"/pages/job/personal-companydetail/personal-companydetail"
      })
    }
  }
})