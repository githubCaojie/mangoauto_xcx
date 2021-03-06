var config = require("../../utils/config.js");
var mta = require('../../utils/mta_analysis.js')
var app = getApp();

var islogin = true;
var distributorId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    outurl: "",
    originUrl: "",
    type: "",
    login_code: "",
    login_iv: "",
    encrypte: "",
    openid: "",
    unionid: "",
    action:"",
    isShowGetPhone:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      web_src = decodeURIComponent(options.url),
      userInfo = wx.getStorageSync("userInfo"),
      wxusers = app.globalData.wxUserInfo,
      openid = wx.getStorageSync('outUrlOpenId');
    if (options.ShareTitle == '' || options.ShareImg == '' || options.type == ''){
      that.setData({
        shareTitle: options.ShareTitle,
        shareImg: options.ShareImg,
        type: options.type
      });
    } 
    that.setData({
      originUrl: web_src,
      action: options.action
    });
    wx.login({
      success(res) {
        that.setData({
          login_code: res.code
        })
      },
      fail(e) {
      }
    });
    // 判断是否有openid、unionid、phone的缓存
    if (openid != "") {
      return wx.request({
        url: 'https://api.mangoauto.com.cn/Wx/Fs.ashx',
        data: {
          user_name: '',
          user_mobile: openid.phone,
          remark: '',
          action: 'dobmsss',
          type: that.data.action,
          remark1: 'WX',
          openid: openid.openid,
          actions: that.data.action,
          union_id: openid.unionid
        },
        dataType: 'json',
        cache: false,
        success: function (res) {
          that.addAccessStat(openid.openid, '660', '00', '')
          if (that.data.originUrl.substring(0, 6) == 'pages/') {
            wx.reLaunch({
              url: `/${that.data.originUrl}`,
            })
          }else{
            wx.navigateTo({
              url: 'outurl?url=' + that.data.originUrl + '&flag=1',
            })
          }
        }
      })
    }
    // 判断用户在后台是否已经有手机号码
    if (userInfo.CellPhone != undefined){
      return wx.login({ 
        success(res) {
          wx.request({
            url: app.getUrl('login/GetOpenId'),
            data: {
              appid: app.globalData.appId,
              secret: app.globalData.secret,
              js_code: res.code
            },
            success:function(res){
              console.log(res)
              var openData = res.data;
              wx.request({
                url: 'https://api.mangoauto.com.cn/Wx/Fs.ashx',
                data: {
                  user_name: userInfo.Nick,
                  user_mobile: userInfo.CellPhone,
                  remark: '',
                  action: 'dobmsss',
                  type: that.data.action,
                  remark1: 'WX',
                  openid: openData.openid,
                  actions: that.data.action,
                  union_id: openData.unionid
                },
                dataType: 'json',
                cache: false,
                success: function (res) {
                  if (that.data.originUrl.substring(0, 6) == 'pages/') {
                    wx.reLaunch({
                      url: `/${that.data.originUrl}`,
                    })
                  }else{
                    wx.navigateTo({
                      url: 'outurl?url=' + that.data.originUrl + '&flag=1',
                    })
                  }
                }
              })
            }
          })
        }
      })
    }
    that.setData({
      isShowGetPhone:true
    })
    that.addAccessStat('', '660', '00', '')
  },
  // 数据统计
  addAccessStat: function (openid, pages, even, param) {
    wx.request({
      url: 'https://wx.mangoauto.com.cn/Pages/Ajax/AccessStatHandle.ashx?action=' + 'addAccess' + '&openid=' + openid + '&pages=' + pages + '&even=' + even + '&param=' + param,
      data: {},
      dataType: 'json',
      method: "GET",
      cache: false,
      headers: { formData: { action: 'addAccess' } },
      success(data) {
        if (data.state == "1") {
        } else {
        }
      }
    })
  },
  getlogon: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var that = this;
    wx.checkSession({
      success(obj) {
        that.decodePhone()
      }, fail(err) {
        that.decodePhone()
      }
    })
  },
// 授权
  decodePhone: function (){
    var that = this;
    wx.login({
      success(res) {
        wx.request({
          url: app.getUrl('login/GetOpenId'),
          data: {
            appid: app.globalData.appId,
            secret: app.globalData.secret,
            js_code: res.code
          },
          success: function (result) {
            console.log(result)
            if (result.data.success) {
              that.setData({
                openid: result.data.data.openid,
                unionid: result.data.data.unionid
              })
              wx.request({
                url: app.getUrl("Login/GetWxMobile"),
                data: {
                  encrypteddata: that.data.encrypte,
                  session_key: result.data.data.session_key,
                  iv: that.data.login_iv,
                  unionid: that.data.unionid
                },
                success(res) {
                  if (res.data.data.success == false) {
                  } else {
                    that.setData({
                      phone: res.data.data.data.phoneNumber
                    })
                    if (res.statusCode == 200) {
                      wx.request({
                        url: 'https://api.mangoauto.com.cn/Wx/Fs.ashx',
                        data: {
                          user_name: '',
                          user_mobile: that.data.phone,
                          remark: '',
                          action: 'dobmsss',
                          type: that.data.action,
                          remark1: 'WX',
                          openid: that.data.openid,
                          actions: that.data.action,
                          union_id: result.data.data.unionid
                        },
                        dataType: 'json',
                        cache: false,
                        success: function (res) {
                          wx.hideLoading()
                          that.addAccessStat(that.data.openid, '660', '00', '')
                          var outUrlUserM = {
                            openid : that.data.openid,
                            phone: that.data.phone,
                            unionid: that.data.unionid
                          }
                          wx.setStorageSync('outUrlOpenId', outUrlUserM);
                          if (that.data.originUrl.substring(0, 6) == 'pages/') {
                            wx.reLaunch({
                              url: `/${that.data.originUrl}`,
                            })
                          }else{
                            wx.navigateTo({
                              url: 'outurl?url=' + that.data.originUrl + '&flag=1',
                            })
                          }
                        }
                      })
                    }
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  // 点击获取手机号码
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg == 'getPhoneNumber:fail:user deny') {
      wx.showToast({
        title: '授权手机号才能让销售更好的服务于您',
        icon: 'none',
        duration: 2000
      })
        }
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      that.setData({
        encrypte: e.detail.encryptedData,
        login_iv: e.detail.iv
      })
      that.getlogon()
    }
  },


  bindGetUserInfo: function (e) {
    var type = e.currentTarget.dataset.type;
    if (type == 'byuser') {
      this.loginbyUser();
    } else {
      islogin = true;
      this.quickLogin();
    }
  },
  onShow: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
  }
})