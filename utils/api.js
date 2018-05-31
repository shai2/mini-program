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
  queryCompanyDetail : baseUrl + "/app/company/queryCompanyDetail", //公司详情
  getCompanyJobList : baseUrl + "/app/company/getCompanyJobList", //公司再招岗位
  updateUserInfo : baseUrl + "/app/user/v1/updateUserInfo", //更新用户基本信息（账号）
  getUserInfo : baseUrl + "/app/user/v1/userInfo", //获取用户基本信息（账号）
  avatarUpload : baseUrl + "/common/upload", //上传头像
  countJobStatus : baseUrl + "/app/job/countJobStatus", //已投递、已沟通，待面试数量

}