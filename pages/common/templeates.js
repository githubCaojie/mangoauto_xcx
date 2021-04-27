var app = getApp();
function JumpUrlByType(app, config, typeId, urls) {
    switch (typeId) {
        case 1:
            var id = urls.split("=");
            id = id[id.length - 1];
            wx.request({
                url: app.getUrl("product/GetIsOnLimitBuy"),
                data: {
                    openId: "",
                    productId: id
                },
                success: function(result) {
                    result = result.data;
                    if (result.success) {
                        wx.navigateTo({
                            url: '../countdowndetail/countdowndetail?id=' + result.data.Id
                        })
                    } else {
                        wx.navigateTo({
                            url: '../productdetail/productdetail?id=' + id
                        })
                    }
                },
                error: function() {
                    wx.navigateTo({
                        url: '../productdetail/productdetail?id=' + id
                    })
                }
            });
            break;
        case 10:
            wx.navigateToMiniProgram({
                appId: urls,
                extarData: {},
                envVersion: 'develop',
                success(res) {
                    // 打开成功
                    console.log("小程序跳转成功");
                }
            })
        break;
        //2019.12.6增加小程序的跳转判断
        case 17:
          var urlsMain = urls.split(',');
          var appid = urlsMain[0];
          var path = urlsMain[1];
          if (appid != app.globalData.appId) {
            wx.navigateToMiniProgram({
              appId: appid,
              path: path,
              extraData: {},
              envVersion: 'develop',
              success(res) {
                // 打开成功
                console.log("小程序跳转成功");
              }
            })
          }
          //2019.12.9增加如果是在打开内部小程序页面的话不需要做跳转的判断
          else{
            wx.navigateTo({
              url: '/' + path
            });
          }
            break;
        case 23:
            wx.makePhoneCall({
                phoneNumber: urls //仅为示例，并非真实的电话号码
            })
            break;
        case 7:
            wx.switchTab({
                url: urls
            })
          break;
        case 3:
        case 8:
        case 4:
        case 15:
            if (urls.indexOf('shopregister/step1') >= 0) {
                app.getOpenId(function(openid) {
                    if (openid) {
                        config.httpGet(app.getUrl(app.globalData.loginByOpenId), {
                            openId: openid
                        }, function(res) {
                            if (res.success) {
                                var uu = app.getRequestUrl + '/m-wap/shopregisterjump/smallprogjump?openid=' + openid + '&toUrl=/m-wap/shopregister/step1';
                                wx.navigateTo({
                                    url: "../outurl/outurl?url=" + encodeURIComponent(uu)
                                });
                            } else {
                                wx.redirectTo({
                                    url: '../login/login'
                                });
                            }
                        });
                    } else {
                        wx.redirectTo({
                            url: '../login/login'
                        });
                    }
                }, "home");
            } else {
                var uu = urls;

                if (urls.indexOf('https://') == -1 && urls.indexOf('http://') == -1) {
                    uu = app.getRequestUrl + urls;
                }
                wx.navigateTo({
                    url: "../outurl/outurl?url=" + encodeURIComponent(uu)
                });
            }
            break;
        default:
            wx.navigateTo({
                url: urls
            });
    }
}

module.exports = {
    JumpUrlByType: JumpUrlByType
}