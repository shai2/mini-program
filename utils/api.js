const baseUrl = "https://wxapitest.wnzx.com/credit"  //徐秦

module.exports = {
  login : baseUrl + "/wx/v1/login", //登录
  getAreaList : baseUrl + "/app/dict/getAreaList", //地区字典
  bindMobile : baseUrl + "/wx/v1/bindMobile",  //手机绑定
  authorize : baseUrl + "/wx/v1/authorize",  //用户授权
  getJobListByType : baseUrl + "/app/job/getJobListByType", //查询职位
  getResume : baseUrl + "/app/resume/get", //获取简历
  getHotJobAndCompany : baseUrl + "/app/dict/getHotJobAndCompany", //获取热门职位和热门公司
  updateJobIntention : baseUrl + "/app/job/v1/intention/update", //登录第一次填写后存到求职意向
  getHotJobList : baseUrl + "/app/job/getHotJobList", //职位详情下边的热门推荐
  queryJobDetail : baseUrl + "/app/job/queryJobDetail", //职位详情
  queryCompanyDetail : baseUrl + "/app/company/queryCompanyDetail", //公司详情
  getCompanyJobList : baseUrl + "/app/company/getCompanyJobList", //公司在招职位
  updateUserInfo : baseUrl + "/app/user/v1/updateUserInfo", //更新用户基本信息（账号）
  getUserInfo : baseUrl + "/app/user/v1/userInfo", //获取用户基本信息（账号）
  avatarUpload : baseUrl + "/common/upload", //上传头像
  countJobStatus : baseUrl + "/app/job/countJobStatus", //已投递、已沟通，待面试数量
  getJobListByStatus : baseUrl + "/app/job/getJobListByStatus", //列表 - 已投递、已沟通、待面试
  jobSaveList : baseUrl + "/app/job/favorite/jobList", //职位收藏
  whoFocus : baseUrl + "/app/resume/queryRecords", //谁看过我
  feedback : baseUrl + "/user/feedback", //反馈
  getSalaryList : baseUrl + "/app/dict/getSalaryList", //字典-薪资
  getScaleList : baseUrl + "/app/dict/getScaleList", //字典-公司规模
  getJobStateList : baseUrl + "/app/dict/getTargetcurrList", //字典-求职状态
  getIndustryList : baseUrl + "/app/dict/getIndustryList", //字典-行业
  getPositionList : baseUrl + "/app/dict/getPositionList", //字典-职位
  getExperienceList : baseUrl + "/app/dict/getExperienceList", //字典-工作经验
  getWorkStartList : baseUrl + "/app/dict/getWorkStartList", //字典-到岗时间
  getIntention : baseUrl + "/app/job/v1/intention/get", //单独获取求职意向
  intentionUpdate : baseUrl + "/app/job/v1/intention/update", //单独更新求职意向
  resumeUpdate : baseUrl + "/app/resume/update", //更新简历
  sendResume : baseUrl + "/app/job/sendResume", //投递简历
  getSendResumeStatus : baseUrl + "/app/job/getSendResumeStatus", //是否投递简历
  jobSave : baseUrl + "/app/job/favorite", //职位收藏
  jobSaveFlag : baseUrl + "/app/job/favorite/exist", //是否职位收藏
  jobSaveNo : baseUrl + "/app/job/unFavorite", //取消职位收藏
  getCvDegree : baseUrl + "/app/resume/getCvDegree", //简历完善度
  invitingJob : baseUrl + "/app/invite_recommend/v1/Recommend-Job-list", //查询我的推荐职位
  invitingRegister : baseUrl + "/app/invite_recommend/v1/Recommend-Job-user-list", //查询我的推荐职位详情
  myInvitingList : baseUrl + "/app/invite_recommend/v1/invite-list", //查询我的邀请人列表
  myInvitings: baseUrl + "/app/invite_recommend/v1/sum", //查询我的邀请和推荐的数量
  shareJobDetail: baseUrl + "/app/share/getShareJobDetail", //获取分享职位详情
  getUserMsg: baseUrl + "/app/userAccount/getAccountInfo", //获取用户账户信息
  getRewardStatus: baseUrl + "/app/resume/getResumeRewardStatus", //获取红包状态
  registMoney: baseUrl + "/app/invite_recommend/v1/regist-money", //完善简历领红包
  inviteMoney: baseUrl + "/app/invite_recommend/v1/invite-money/id", //邀请人领红包
  userFlowingWater: baseUrl + "/app/userAccount/getAccountRecordListByType", //根据类型查询账户流水（全部、邀请注册、推荐岗位、历史提现）
  jobListInterviewed: baseUrl + "/app/job/jobList-interviewed", //待面试职位（包含判断合同状态字段）
  contractpath: baseUrl + "/app/contract/v1/contractpath", //获取合同状态
  uploadContract: baseUrl + "/app/contract/v1/contract", //上传合同
  recommonedApply: baseUrl + "/app/job/recommend/apply", //收藏推荐岗位
  
}