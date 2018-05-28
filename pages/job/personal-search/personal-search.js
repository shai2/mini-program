// pages/personal-job/personal-job.js
Page({
  data: {
    city:'上海',
    tipArr:['产品','设计师','产品','程序员','产品','销售专员',],
    canTap:false,
  },
  onLoad: function (options) {

  },
  changeActiveTip(e){
    this.setData({
      "activeTip":e.currentTarget.dataset.index
    })
  },
})