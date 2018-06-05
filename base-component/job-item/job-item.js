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
    },
    hasState:{
      type:Boolean,
      value:true
    }
  },
  data: {

  },
  methods: {
    toDetail(){
      wx.navigateTo({
        url: "/pages/job/personal-jobdetail/personal-jobdetail?jid=" + this.data.jobItem.jid +"&cid="+ this.data.jobItem.cid
      })
    },
    toUploadContract(){
      wx.navigateTo({
        url: "/pages/account/personal-contract/personal-contract?jid=" + this.data.jobItem.jid +"&cid="+ this.data.jobItem.cid
      })
    }
  }
})