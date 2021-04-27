// pages/Insurance/Insurance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['单辆车','多辆车','伤亡','盗抢'],
    array:[
      {
        head:'单辆车发生事故',
        msg:'发生交通事故，只有1辆车且没有人员受伤',
        insuranceArray:[
          {
            title:'第一步：拍摄现场',
            describe:'停车开启双闪，确保安全后下车，维护事故现场完整，拍摄事故现场和车辆碰撞受损部位。',
            icon:'paizhao'
          },
          {
            title: '第二步：挪开车辆',
            describe: '在完成拍照后，将车辆移至路旁安全地点并在车后100~150米处放置三角警示牌。',
            icon: 'jinggao'
          },
          {
            title: '第三步：拨打电话报案',
            describe: '',
            isCall:true,
            icon: 'dianhua',
            callList:[
              {
                text:'拨打保险公司电话',
                getcallList:true,
              },
            ]
          },
          {
            title: '第四步：等待处理',
            describe: '等候保险公司理赔人员至现场查勘和协助处理。',
            icon: 'wait'
          },
          {
            title: '第五步：送修车辆',
            describe: '如有投保车损险，将事故车辆送至维修厂或定损中心进行定损和维修。',
            icon: 'leijianzhuxiulix'
          },
          {
            title: '第六步：递交材料',
            describe: '请提交申请理赔的相关材料（行驶证、驾驶证、银行账户信息、事故责任认定书等）给保险公司。',
            icon: 'ziliao'
          },
          {
            title: '第七步：领取赔款',
            describe: '确认收取赔款。',
            icon: 'shoukuanshenqingdan'
          }
        ]
      },
      {
        head: '多辆车发生事故',
        msg: '发生交通事故，2车（含）以上碰撞且没有人员受伤',
        insuranceArray: [
          {
            title: '第一步：拍摄现场',
            describe: '停车开启双闪，确保安全后下车，维护事故现场完整，拍摄事故现场和车辆碰撞受损部位。',
            icon: 'paizhao'
          },
          {
            title: '第二步：挪开车辆',
            describe: '如碰撞轻微，在完成拍照后且双方同意责任，将车辆移至路旁安全地点并在车后100~150米处放置三角警示牌。',
            icon: 'jinggao'
          },
          {
            title: '第三步：拨打电话报案',
            describe: '',
            isCall: true,
            icon: 'dianhua',
            callList: [
              {
                text: '先拨打交警报案电话 122',
                getcallList: false,
                callmobile: '122'
              },
              {
                text: '再拨打保险公司电话',
                getcallList: true,
              }
            ]
          },
          {
            title: '第四步：等待处理',
            describe: '等候交警至现场定责，保险公司理赔人员至现场查勘和协助处理。',
            icon: 'wait'
          },
          {
            title: '第五步：送修车辆',
            describe: '如有投保车损险，将事故车辆送至维修厂或定损中心进行定损和维修。',
            icon: 'leijianzhuxiulix'
          },
          {
            title: '第六步：递交材料',
            describe: '请提交申请理赔的相关材料（行驶证、驾驶证、银行账户信息、事故责任认定书等）给保险公司。',
            icon: 'ziliao'
          },
          {
            title: '第七步：领取赔款',
            describe: '确认收取赔款。',
            icon: 'shoukuanshenqingdan'
          }
        ]
      },
      {
        head: '人员伤亡事故',
        msg: '发生交通事故，有人员受伤或死亡',
        insuranceArray: [
          {
            title: '第一步：拨打电话报案',
            describe: '',
            isCall: true,
            icon: 'dianhua',
            callList: [
              {
                text: '优先拨打急救电话 120',
                getcallList: false,
                callmobile: '120'
              },
              {
                text: '拨打交警报案电话 122',
                getcallList: false,
                callmobile: '122'
              },
              {
                text: '保险公司电话',
                getcallList: true,
              }
            ]
          },
          {
            title: '第二步：确保安全',
            describe: '确保人员安全，并在车后100~150米处放置三角警示牌。',
            icon: 'jinggao'
          },
          {
            title: '第三步：拍摄现场',
            describe: '维护事故现场完整，拍摄事故现场和车辆碰撞受损部位。',
            icon: 'paizhao'
          },
          {
            title: '第四步：等待处理',
            describe: '等候交警至现场定责，保险公司理赔人员至现场查勘和协助处理。',
            icon: 'wait'
          },
          {
            title: '第五步：送修车辆',
            describe: '如有投保车损险，将事故车辆送至维修厂或定损中心进行定损和维修。',
            icon: 'leijianzhuxiulix'
          },
          {
            title: '第六步：赔偿协调',
            describe: '保险公司理赔人员协助赔偿调处。',
            icon: 'shoukuanshenqingdan'
          },
          {
            title: '第七步：递交材料',
            describe: '请提交申请理赔的相关材料（行驶证、驾驶证、银行账户信息、事故责任认定书等）给保险公司。',
            icon: 'ziliao'
          },
          {
            title: '第八步：领取赔款',
            describe: '确认收取赔款。',
            icon: 'shoukuanshenqingdan'
          }
        ]
      },
      {
        head: '发生盗抢',
        msg: '车辆发生盗抢事件（投保盗抢险）',
        insuranceArray: [
          {
            title: '第一步：拨打电话报案',
            describe: '',
            isCall: true,
            icon: 'dianhua',
            callList: [
              {
                text: '拨打交警报案电话 122',
                getcallList: false,
                callmobile:'122'
              },
              {
                text: '再拨打保险公司电话',
                getcallList: true,
              }
            ]
          },
          {
            title: '第二步：立案证明',
            describe: '请交警开盗抢案件立案证明。',
            icon: 'jinggao'
          },
          {
            title: '第三步：协助查勘',
            describe: '协助交警和保险公司理赔人员现场查勘。',
            icon: 'wait'
          },
          {
            title: '第四步：递交材料',
            describe: '请提交申请理赔的相关材料给保险公司。',
            icon: 'shoukuanshenqingdan'
          },
          {
            title: '第五步：领取赔款',
            describe: '确认收取赔款。',
            icon: 'dianhua'
          }
        ]
      },
    ],
    arrayIndex:0,
    insuranceMobileList:[
      {
        name:'平安保险',
        mobile:'95511'
      },
      {
        name: '天安保险',
        mobile: '95505'
      },
      {
        name:'人保财险',
        mobile:'95518'
      },
      {
        name: '大地保险',
        mobile: '95590'
      },
      {
        name: '太平洋产险',
        mobile: '95500'
      },
      {
        name: '安盛天平',
        mobile: '95550'
      },
      {
        name: '中国人寿财险',
        mobile: '95519'
      },
      {
        name: '中华保险',
        mobile: '95585'
      },
      {
        name: '阳光财险',
        mobile: '95510'
      },
      {
        name: '富邦财险',
        mobile: '4008817518'
      },
      {
        name: '众安保险',
        mobile: '1010388'
      },
    ],
    listShow:'none',
    scrollTop:0,
  },
  showList: function () {
    var type = this.data.listShow
    if(type == 'none'){
      this.setData({
        listShow: '',
      })
    }else{
      this.setData({
        listShow: 'none',
      })
    }
  },
  onPageScroll:function(e){
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  tabsNav:function(e){
    this.setData({
      arrayIndex: e.currentTarget.dataset.index,
      scrollTop:0
    }),
    wx.pageScrollTo({
      scrollTop:0
    })
  },
  callMobile:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})