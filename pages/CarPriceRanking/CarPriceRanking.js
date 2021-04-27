// pages/CarPriceRanking/CarPriceRanking.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count: 10,    //初始显示list数量
    start: 0,     //增加的list数量
    orderby: 0,   //排序：（0：最新）（1：变幅大）（2：销量大）（3：价格低）
    up_down: 'down',    //降价榜与涨价榜
    loadtipArray:'',   //底部按钮
    cardata:[],    //listArray,
    chooseCarname:'',   //变价的车型
    chooseCarimg:'',    //变价的图片
    changeprice: 1000,   //变价的幅度
    mobile: '',    //变价的通知电话
  },

  /**
   * 更新车辆方法
   */
  updateCarArray: function (type) {
    wx.showLoading({
      title: '加载中',
    })
    var thistype = type,
        that = this;
    wx.request({
      url: 'https://wx.mangoauto.com.cn/Activity/CarPrice_Ranking/GetCarInfo.ashx',
      data: {
        count: that.data.count,
        start: that.data.start,
        orderby: that.data.orderby,
        up_down: that.data.up_down
      },
      success: function (res) {
        var arr = res.data;
        wx.hideLoading();
        if (thistype == 'reset') {
          that.setData({
            cardata: arr,
            loadtipArray: ''
          })
          if (arr.length < 10){
            that.setData({
              loadtipArray: '没有更多内容加载了'
            })
          }
        }
        if (thistype == 'add'){
          if (arr==''){
            that.setData({
              loadtipArray:'没有更多内容加载了'
            })
          } else {
            that.setData({
              cardata: that.data.cardata.concat(arr),
            })
          }
        }
      }
    })
  },

  //点击nav
  navUpdate:function(e){
    var that = this;
    var nav = e.currentTarget.dataset.navid;
    that.setData({
      up_down: nav,
      count:10,
      start:0
    })
    that.updateCarArray('reset')
  },
  //点击sort
  sortBind:function(e){
    var that = this;
    var sort = e.currentTarget.dataset.sortid;
    that.setData({
      orderby: sort,
      count: 10,
      start:0
    })
    that.updateCarArray('reset')
  },
  //变价通知
  valence:function(e){
    var that = this,
        type = e.currentTarget.dataset.type;
    if (type == 'on'){
      that.setData({
        chooseCarname: e.currentTarget.dataset.carname,
        chooseCarimg: e.currentTarget.dataset.carimg,
      })
    }
    if(type == 'off'){
      that.setData({
        chooseCarname: '',
      })
    }
  },
  //填写电话号码
  mobileInput:function(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  //选择降价幅度
  slider4change: function (e) {
    var that = this,
        change = e.detail.value;
    //获取滑动后的值
    that.setData({
      changeprice: change
    });
  },
  //留资按钮
  btnOkClient:function(e){
    var that = this,
      mobile = that.data.mobile,
      downprice = that.data.changeprice,
      carname = that.data.chooseCarname,
      updown = that.data.up_down;
    if (mobile==''){
      return wx.showModal({
        title: '提示',
        content: '请输入您的联系电话',
        showCancel: false,
      });
    } else if (mobile!=''){
      let check = new RegExp("^0?(13[0-9]|15[0-9]|18[0-9]|17[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$");
      if (!check.test(mobile)){
        return wx.showModal({
          title: '提示',
          content: '请输入正确的联系电话',
          showCancel: false,
          success:function(){
            that.setData({
              mobile: ''
            })
          }
        });
      }
    }
    wx.request({
      url: 'https://api.mangoauto.com.cn/Wx/Fs.ashx',
      data:{
        user_mobule: mobile,
        remark: carname,
        type:'2268',
        remark1: updown,
        action:'dobms',
        openid:'',
        actions:'automome'
      },
      success:function(res){
        var type = res.data;
        if (type.status=='200'){
          return wx.showModal({
            title: '收到啦！',
            content: '等我的降价消息哟~',
            showCancel: false,
            success:function(){
              that.setData({
                chooseCarname: ''
              })
            }
          });
        }else if(type.status == '400'){
          return wx.showModal({
            title: '保存失败',
            content: '再刷新试试~',
            showCancel: false,
          });
        }else{
          return wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
          });
        }
      } 
    })
  },
  //点击搜索
  showPopup() {
    this.selectcartype.showPopup()
  },
  chooseCar(event){
    var that = this,
      prop = '1:' + event.detail.carbrandId + ';2:' + event.detail.carSerieId + ';3:' + event.detail.carTypeId+';';
    wx.request({
      url: 'http://wx.mangoauto.com.cn/Activity/CarPrice_Ranking/GetCarPropsInfo.ashx',
      data:{
        props: prop
      },
      success:function(res){
        if (res.data==''){
          return wx.showModal({
            title: '抱歉',
            content: '没有找到您心仪的车型~',
            showCancel: false,
          });
        }else{
          that.setData({
            cardata: res.data,
            up_down: res.data[0].up_down
          })
        }
      }
    })
  },
  counter: function(e){
    var prop = {
      pp: e.currentTarget.dataset.pp,
      cl: e.currentTarget.dataset.cl,
      cx: e.currentTarget.dataset.cx,
      ppname: e.currentTarget.dataset.ppname,
      clname: e.currentTarget.dataset.clname,
      cxname: e.currentTarget.dataset.cxname,
    };
    wx.navigateTo({
      url: '../financialTool/financialTool?props=' + JSON.stringify(prop),
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
    //获得popup组件
    this.selectcartype = this.selectComponent("#selectcartype");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this,
      usermobile = wx.getStorageSync('userInfo').CellPhone;
    that.updateCarArray('reset')
    that.setData({
      mobile: usermobile
    })
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
    var that = this,
        upstart = that.data.start+10;   //每次加载10条数据
    that.setData({
      start: upstart
    })
    that.updateCarArray('add')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})