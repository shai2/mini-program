let app = getApp()
Component({
  properties: {
    hasBottom:{
      type:Boolean,
      value:true
    },
    companyItem:{
      type:Object,
      value:{}
    }
  },
  data: {

  },
  methods: {
    toDetail(){
      wx.navigateTo({
        url: "/pages/job/personal-jobdetail/personal-jobdetail?cid=" + this.data.companyItem.cvid
      })
    }
  },
})