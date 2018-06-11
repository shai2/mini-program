let app = getApp()
Component({
  attached(){
    if (!this.data.jobItem.companyLogo) { //没头像给默认头像
      let _logo = 'jobItem.companyLogo'
      this.setData({
        [_logo]:"/img/default-c.png"
      })
    };
    switch(this.data.jobItem.status){
      case 2:
        this.setData({
          statusTxt:'审核中'
        })
        break
      case 3:
      case 4:
        this.setData({
          statusTxt:'审核成功'
        })
        break
      case 5:
        this.setData({
          statusTxt:'审核失败'
        })  
        break
    }
  },
  data:{
    statusTxt:'上传合同领取奖金'
  },
  properties: {
    hasBottom:{
      type:Boolean,
      value:true
    },
    hasCopany:{
      type:Boolean,
      value:true
    },
    jobItem:{
      type:Object,
      value:{}
    },
    stateType:{
      type:Number,
      value:0
    },
    exData:{
      type:Object,
      value:{}
    }
  },
  data: {

  },
  methods: {
    toDetail(){
      wx.navigateTo({
        url: "/pages/job/personal-jobdetail/personal-jobdetail?jid=" + this.data.jobItem.jid + "&cid=" + this.data.jobItem.cid + "&pos="+ this.data.jobItem.position
      })
    },
    toUploadContract(){
      wx.navigateTo({
        url: "/pages/account/personal-contract/personal-contract?jid=" + this.data.jobItem.jid + "&cid=" + this.data.jobItem.cid
      })
    },
    toInvitingJobDetail(){
      wx.navigateTo({
        url: "/pages/event/inviting/inviting-job-detail/inviting-job-detail?jid=" + this.data.jobItem.jid +"&cid="+ this.data.jobItem.cid
      })
    }
  }
})