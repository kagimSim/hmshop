// pages/cart/cart.js
import {getSetting,chooseAddress,openSetting} from "../../request/asyncWx.js";

Page({
    data:{
        address:{}
    },
    onShow : function(){
        //第一步 加载本地缓存地址，如果有 则直接显示
        const address = wx.getStorageSync("address");
        if(address){
            this.setData({
                address
            })
        }

    },
   async handleChooseAddress(e){
       try {
            const res = await getSetting();
            const scopeAddress = res.authSetting["scope.address"];
            if(scopeAddress === false){
                await openSetting();
            }
            const address = await chooseAddress();
            wx.setStorageSync("address", address);
       } catch (error) {
           console.log(error)
       }
    }

})