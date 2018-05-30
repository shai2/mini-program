const baseUrl = "http://wxapitest.wnzx.com/credit"
module.exports = {
  login : baseUrl + "/wx/v1/login", //登录
  getAreaList : baseUrl + "/app/dict/getAreaList", //地区字典
  bindMobile : baseUrl + "/wx/v1/bindMobile",  //手机绑定
  authorize : baseUrl + "/wx/v1/authorize",  //用户授权
  getJobListByType : baseUrl + "/app/job/getJobListByType", //查询职位
  getResume : baseUrl + "/app/resume/get", //获取简历
  getHotJobAndCompany : baseUrl + "/app/dict/getHotJobAndCompany", //获取热门职位和热门公司
  updateJobIntention : baseUrl + "/app/job/updateJobIntention", //登录第一次填写后存到求职意向
  getHotJobList : baseUrl + "/app/job/getHotJobList", //职位详情下边的热门推荐
  queryJobDetail : baseUrl + "/app/job/queryJobDetail", //职位详情
}