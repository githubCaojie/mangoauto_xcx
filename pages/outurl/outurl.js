var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outurl: "",
    originUrl: "",
    oldurl: "",
    flag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var src = options.url;
    var web_src = decodeURIComponent(options.url);
    if (options.ShareTitle == '' || options.ShareImg == '' || options.type == '') {
      that.setData({
        shareTitle: options.ShareTitle,
        shareImg: options.ShareImg,
        type: options.type,
      });
    }
    if (options.flag == '1'){
      that.setData({
        flag: options.flag
      });
    }
    that.setData({
      originUrl: web_src,
      outurl: web_src,
      oldurl: options.url
    });
  },
  onShow: function () {
    var that = this;
    var web_src = this.data.originUrl;
    if (this.data.type == 'needLogin') {
      if (app.getIsLogin()) {
        app.getOpenId(function (openid) {
          web_src += ('&openid=' + openid);
          that.setData({
            outurl: web_src
          })
        });
      } else {
        app.showErrorModal('如果您想要参加活动，请先登录哟！', function () {
          wx.navigateTo({
            url: '../login/login'
          })
        });
      }
    } else {
      that.setData({
        outurl: web_src
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this,
      return_url = options.webViewUrl,
      path;

    if (this.data.type == 'needLogin') {
      path = '/pages/outurl/outurl?url=' + encodeURIComponent(this.data.originUrl) + '&type=needLogin';
      if (that.data.shareTitle) {
        path += ('&ShareTitle=' + that.data.shareTitle + '&ShareImg=' + that.data.shareImg);
      }
    } else {
      path = '/pages/outurl/outurl?url=' + encodeURIComponent(return_url)
    }
    return {
      path: path,
      title: that.data.shareTitle ? that.data.shareTitle : '',
      imageUrl: that.data.shareImg ? that.data.shareImg : '',
      success: function (res) {
        that.setData({
          outurl: return_url
        });
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onUnload: function () {
    if(this.data.flag){
      return wx.reLaunch({
        url: '/pages/home/home',
      })
    }
  } 
})

