let app = getApp()
Component({
  properties: {
    hasBottom:{
      type:Boolean,
      value:true
    },
    jobItem:{
      type:Object,
      value:{}
    }
  },
  data: {

  },
  methods: {
    toDetail(){
      wx.navigateTo({
        url: "/pages/job/personal-jobdetail/personal-jobdetail?jid=" + this.data.jobItem.jid
      })
    }
  }
})