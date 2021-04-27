// pages/financialTool/financialTool.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carName:[],   //车型
    props:'',
    propsArray:[],
    picUrl:'', 
    carPrice: 0,  //车价
    firstPayment: [
      {
        value:20
      },
      {
        value: 30,
        checked: true
      },
      {
        value: 40
      },
      {
        value: 50
      },
      {
        value: 60
      },
      {
        value: 70
      }
    ],    //首付比例arrAy
    firstPaymentVal: 30,//选择的首付比例
    dateNum: [
      {
        value: 12
      },
      {
        value: 24
      },
      {
        value: 36,
        checked: true
      },
      {
        value: 48
      },
      {
        value: 60
      }
    ],    //贷款期限arrAy
    dateNumVal: 36,//选择的贷款期限
    doubtcartaxList:[
      {
        price:120,
        type:'1.0L排量(含)'
      },
      {
        price: 300,
        type: '1.0L-1.6L排量(含)'
      },
      {
        price: 360,
        type: '1.6L-2.0L排量(含)'
      },
      {
        price: 720,
        type: '2.0L-2.5L排量(含)'
      },
      {
        price: 1920,
        type: '2.5L-3.0L排量(含)'
      },
      {
        price: 3120,
        type: '3.0L-4.0L排量(含)'
      },
      {
        price: 4800,
        type: '4.0L以上排量(含)'
      }
    ],    //车船税
    doubtcartaxIndex:1,   //车船税num
    strongList:[
      {
        price:950,
        type:'6座以下车型用车'
      },
      {
        price: 1100,
        type: '6座以上车型用车'
      }
    ],    //交强险
    strongIndex: 0,   //交强险num
    serPurchase: 0,   //购置税
    askType: '',   
    askMain: '',    //提示
    mobile:'',    //手机号码
    openid:'',    //openId
    uid:'',   //uid
  },
  //提示
  askInput:function(e){
    var that = this,
      asktype = e.target.dataset.asktype;
    if (asktype == 'doubtpremium'){
      //上牌费
      that.setData({
        askType:'上牌费',
        askMain:'通常商家提供的一条龙服务收费约500元，个人办理约 373元（工商验证、出库150元、移动证30元、环保 卡3元、拓号费40元、行驶证相片20元、托盘费130元）。'
      })
    }
    if (asktype == 'doubtpurchase') {
      //购置税
      that.setData({
        askType: '购置税',
        askMain:'车辆购置税是对在我国境内购置规定车辆的单位和个人征收的一种税，它由车辆购置附加费演变而来。现行车辆购置税法的基本规范，是从2001年1月1日起实施的《中华人民共和国车辆购置税暂行条例》。车辆购置税的纳税人为购置（包括购买、进口、自产、受赠、获奖或以其他方式取得并自用）应税车辆的单位和个人，征税范围为汽车、摩托车、电车、挂车、农用运输车，税率为10%，应纳税额的计算公式为：应纳税额=计税价格×税率。（从2017年1月1日到2017年12月31日，对购买1.6升及以下排量乘用车实施全新的车辆购置税优惠政策，按7.5%的税率征收车辆购置税。自2018年1月1日起，恢复按10%的法定税率征收车辆购置税。）'
      })
    }
    if (asktype == 'doubtcartax') {
      //车船税
      that.setData({
        askType: '车船税',
        askMain:'车船使用税是对行驶于公共道路的车辆和航行于国内河流、湖泊或领海口岸的船舶,按照其种类(如机动车辆、非机动车辆、载人汽车、载货汽车等)、吨位和规定的税额计算征收的一种使用行为税。各省不统一，以湖南为例(单位/年)：1.0L(含)以下120元；1.0-1.6L(含)300元；1.6-2.0L(含)360元；2.0-2.5L(含)720元；2.5-3.0L(含)1920元；3.0-4.0L(含)3120元；4.0L以上4800元。'
      })

    }
    if (asktype == 'doubtstrong') {
      //交强险
      that.setData({
        askType: '交强险',
        askMain:'机动车交通事故责任强制保险是我国首个由国家法律规定实行的强制保险制度。《机动车交通事故责任强制保险条例》规定：交强险是由保险公司对被保险机动车发生道路交通事故造成受害人(不包括本车人员和被保险人)的人身伤亡、财产损失，在责任限额内予以赔偿的强制性责任保险。家用6座以下950元/年，家用6座及以上1100元/年。'
      })

    }
    if (asktype == 'doubtbusiness') {
      //商业险
      that.setData({
        askType: '商业险',
        askMain:'此金额包括的款项：第三者责任险，车辆损失险，全车盗抢险，玻璃单独破碎险，自燃损失险，不计免赔特约险，无过责任险，车上人员责任险，车身划痕险。具体款项及金额以实际购保时的选择及计算为准。'
      })
    }
  },
  offmask:function(){
    //关闭说明
    this.setData({
      askType:'',
      askMain:''
    })
  },
  //点击搜索
  showPopup() {
    this.selectcartype.showPopup()
  },
  updateCar(name){
    var that = this,
      carnames = name;
    wx.request({
      url: 'https://api.mangoauto.com.cn/Wx/GetPriceInfo.ashx',
      data: {
        props: that.data.props
      },
      success: function (res) {
        var data = res.data.data[0],
          prices = 0,
          secprice = data.price,
          firprice = data.product_price;
        if (secprice > 0) {
          prices = secprice
        } else {
          if (firprice > 0) {
            prices = firprice
          } else {
            return wx.showModal({
              title: '啊喔',
              content: '没有找到这台车，换一台嘛~',
              showCancel: false,
            });
          }
        }
        that.setData({
          carPrice: prices,
          serPurchase: Math.floor(prices / 1.17 * 0.1),
          picUrl: data.picUrl,
          carName: carnames
        })
      }
    })
  },
  chooseCar(event) {
    var that = this,
      prop = '1:' + event.detail.carbrandId + ';2:' + event.detail.carSerieId + ';3:' + event.detail.carTypeId,
      propsArr = [event.detail.carbrandId, event.detail.carSerieId, event.detail.carTypeId],
      name = [event.detail.carbrandName, event.detail.carSerieName, event.detail.carTypeName];
      that.setData({
        props: prop,
        propsArray: propsArr
      })
    that.updateCar(name);
  },
  //选择首付比例
  firstPayRadio:function(e){
    var item = this.data.firstPayment;
    for (var i = 0; i < item.length; i++) {
      item[i].checked = item[i].value == e.detail.value;
    }
    this.setData({
      firstPayment: item,
      firstPaymentVal: e.detail.value,
    })
  },
  //选择贷款期限
  dateNumRadio:function(e){
    var item = this.data.dateNum;
    for (var i = 0; i < item.length; i++) {
      item[i].checked = item[i].value == e.detail.value;
    }
    this.setData({
      dateNum: item,
      dateNumVal: e.detail.value
    })
    console.log(e)
  },
  //选择车船税
  cartaxTab:function(e){
    this.setData({
      doubtcartaxIndex:e.detail.value
    })
  },
  //选择交强险
  strongTab:function(e){
    this.setData({
      strongIndex: e.detail.value
    })
  },
  //输入手机号码
  mobileInput:function(e){
    var that = this,
      mobile = e.detail.value;
    if (mobile.length >= 11){
      let check = new RegExp("^0?(13[0-9]|15[0-9]|18[0-9]|17[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$");
      if (!check.test(mobile)) {
        return wx.showModal({
          title: '请输入正确的电话',
          content: '以方便与您取得联系哦~',
          showCancel: false,
          success:function(){
            that.setData({
              mobile:''
            })
            wx.hideKeyboard()
          }
        });
      }else{
        wx.hideKeyboard()
      }
    }
  },
  //开始计算
  btnOkClient:function(){
    var that = this,
      arrs = that.data,
      cheKuan = arrs.carPrice,    
      shouFus = arrs.carPrice * (arrs.firstPaymentVal / 100),   
      fenQidate = arrs.dateNumVal,    
      daiKuanPrice = (cheKuan - shouFus)/10000,
      wyxss = fenQidate == 12 ? 872 : (fenQidate == 24 ? 455 : (fenQidate == 36 ? 316 : (fenQidate == 48 ? 247 : (fenQidate == 60 ? 206 : 0)))),
      carTax = arrs.doubtcartaxList[arrs.doubtcartaxIndex].price,
      strongSpan = arrs.strongList[arrs.strongIndex].price,
      yueGongs = parseInt(daiKuanPrice * wyxss),
      loanCost = Math.floor(cheKuan - shouFus),
      mustCost = arrs.serPurchase + 125 + strongSpan + carTax,
      loanLimit = parseInt(yueGongs * fenQidate - daiKuanPrice),
      schf = ((shouFus + mustCost+5550)/10000).toFixed(2),
      // cheKuan-车价，shouFus-首付，fenQidate-贷款期限，daiKuanPrice-贷款金额，wyxss-万元指数，carTax-车船税，strongSpan-贷款期限，yueGongs-月供，loanCost-贷款成本，mustCost-必要花费，loanLimit-贷款额度，schf-首次花费
      array = {
        price: arrs.carPrice,
        car_model: arrs.propsArray[2],
        cars: arrs.propsArray[1],
        brand: arrs.propsArray[0],
        brand_name: arrs.carName[0],
        cars_name: arrs.carName[1],
        car_model_name: arrs.carName[2],
        downpayments: arrs.firstPaymentVal,
        datenum: fenQidate,
        phone: arrs.mobile,
        premium: 125,
        purchase: Math.floor(arrs.carPrice/1.17*0.1),
        cartax: carTax,
        strongspan: strongSpan,
        business:5550,
        action_type:'',
        openid: arrs.openid,
        uid: arrs.uid,
        first_payment: shouFus,
        yuegong: yueGongs,
        schf: schf,
        loan_limit: loanLimit,
        loan_cost: loanCost,
        must_cost: mustCost
      };
    if (arrs.carPrice == 0){
      return wx.showModal({
        title: '提示',
        content: '还未选择您心仪的车型哦~',
        showCancel: false,
      });
    } else if (arrs.mobile == ''){
      return wx.showModal({
        title: '提示',
        content: '还未填写您的手机号码',
        showCancel: false,
      });
    } else if (arrs.mobile.length >= 11) {
      let check = new RegExp("^0?(13[0-9]|15[0-9]|18[0-9]|17[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$");
      if (!check.test(arrs.mobile)) {
        return wx.showModal({
          title: '请输入正确的电话',
          content: '以方便与您取得联系哦~',
          showCancel: false,
          success: function () {
            that.setData({
              mobile: ''
            })
            wx.hideKeyboard()
          }
        });
      }

      wx.navigateTo({
        url: 'result?id=' + JSON.stringify(array),
      })
      // wx.request({
      //   method: 'POST',
      //   url: 'https://wx.mangoauto.com.cn//Pages/Ajax/CapitalInfoAdd.ashx?action=Financial',
      //   data:{
      //     array
      //   },
      //   success:function(res){
      //     if (res.data.status == '1') {
      //       wx.navigateTo({
      //         url: 'result?id=' + JSON.stringify(array),
      //       })
      //     }else{
      //       return wx.showModal({
      //         title: '提示',
      //         content: res.data.msg,
      //         showCancel: false,
      //       });
      //     }
      //   }
      // })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = JSON.stringify(options)
    if (type!='{}'){
      console.log(options)
      var url = JSON.parse(options.props);
      var carname = [url.ppname, url.clname, url.cxname],
        props = '1:' + url.pp + ';2:' + url.cl + ';3:' + url.cx;
      this.setData({
        props: props
      })
      this.updateCar(carname);
    }
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
      usermobile = wx.getStorageSync('userInfo').CellPhone,
      useropenid = app.globalData.users.openId,
      userid = app.globalData.users.unionId;
    that.setData({
      mobile: usermobile,
      openid: useropenid,
      uid: userid
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})