let app = getApp()
Component({
  attached(){
    if (!this.data.jobItem.companyLogo) { //没头像给默认头像
      let _logo = 'jobItem.companyLogo'
      this.setData({
        [_logo]:"/img/default-c.png"
      })
    };
    this.chooseStatus()
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
    },
    index:{
      type:Number,
      value:null
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
    chooseStatus(status){
      if(status){
        this.data.jobItem.status = status
      }
      switch(this.data.jobItem.status){
        case 0:
          this.setData({
            statusTxt:'简历未投递'
          })
          break
        case 1:
          this.setData({
            statusTxt:'上传合同领取奖金'
          })
          break
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
    toUploadContract(e){
      if(e.currentTarget.dataset.status === 1){
        this.triggerEvent('uploadContract',{
          jobId:this.data.jobItem.jid,
          index:this.data.index
        })
      }else{
        wx.navigateTo({
          url: "/pages/account/personal-contract/personal-contract?jid=" + this.data.jobItem.jid + "&cid=" + this.data.jobItem.cid
        })
      }
    },
    toInvitingJobDetail(){
      wx.navigateTo({
        url: "/pages/event/inviting/inviting-job-detail/inviting-job-detail?jid=" + this.data.jobItem.jid +"&cid="+ this.data.jobItem.cid
      })
    },
    changeStatus(status){
      this.chooseStatus(status)
    }
  }
})