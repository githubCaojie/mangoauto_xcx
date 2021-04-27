// pages/mgLiveSign/mgLiveSign.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carAllName: '',
    userName: '',
    userMobile: '',
    action: '',
    url: '',
    carArray : [
      {
        name: '凯迪拉克 XT4 2021款 28T 两驱领先型',
        price: '289700',
        img: '../../images/signImages/xt4.jpg',
        id: '3663'
      },
      {
        name: '大众 途观L 2021款 1.4T 风尚型',
        price: '199800',
        img: '../../images/signImages/tuguanl.jpg',
        id: '3754'
      },
      {
        name: '日产 逍客 2021款 2.0L CVT智享版',
        price: '154900',
        img: '../../images/signImages/xiaoke.jpg',
        id: '3592'
      },
      {
        name: '大众 朗逸plus 2021款 1.5L 自动舒适版',
        price: '139900',
        img: '../../images/signImages/langyip.jpg',
        id: '3616'
      },
      {
        name: '凯迪拉克 XT5 2020款 28T 豪华型',
        price: '349700',
        img: '../../images/signImages/xt5.jpg',
        id: '2212'
      },
      {
        name: '凯迪拉克 CT5 2020款 改款 28T 豪华型',
        price: '299700',
        img: '../../images/signImages/ct5.jpg',
        id: '3555'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      action: options.action,
      url: options.url
    });
  },
  goCarPd(e) {
    let toUrl = '../productdetail/productdetail?id=' + e.currentTarget.dataset.id;
    wx.navigateTo({
      url: toUrl,
    })
  },
  //意向车型
  showPopup(e) {
    this.setData({
      carAllName: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      userMobile: e.detail.value
    })
  },
  okSubmitBtn() {
    var that = this;
    if (that.data.userName == ''){
      return wx.showModal({
        title: '提示',
        content: '请输入您的姓名',
        showCancel: false,
      });
    }
    if (that.data.userMobile == ''){
      return wx.showModal({
        title: '提示',
        content: '请输入您的联系方式',
        showCancel: false,
      });
    }
    if (that.data.carAllName == ''){
      return wx.showModal({
        title: '提示',
        content: '请选择您的意向车型',
        showCancel: false,
      });
    }
    if (that.data.userMobile != '') {
      let check = new RegExp("^0?(13[0-9]|15[0-9]|18[0-9]|17[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$");
      if (!check.test(that.data.userMobile)){
        return wx.showModal({
          title: '提示',
          content: '请输入正确的联系方式',
          showCancel: false,
        });
      }else{
        wx.request({
          url: 'https://api.mangoauto.com.cn/Wx/Fs.ashx',
          data: {
            user_name: that.data.userName,
            user_mobile: that.data.userMobile,
            remark: that.data.carAllName,
            action: 'dobmsss',
            type: that.data.action,
            remark1: 'WX',
            openid: '',
            actions: that.data.action,
            union_id: ''
          },
          dataType: 'json',
          cache: false,
          success: function (res) {
            wx.navigateTo({
              url: '/pages/outurl/outurl?url=' + that.data.url + '&flag=1',
            })
          }
        })
      }
    }
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