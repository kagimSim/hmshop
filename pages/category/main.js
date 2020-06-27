// pages/category/category.js
import {request} from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧菜单数据
        leftMenuList:[],
        // 右侧菜单数据 [大]
        rightContent:[],
        // 选中的左侧索引
        currentIndex:0,
        //重置右侧滚动条位置
        scrollTop:0

    },
    // 从接口里拿到的第一手数据
    Cates:[],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /**
         * 进入方法前,首先判断本地储存是否具有数据
         */
        const Cates = wx.getStorageSync("cates");
        if(!Cates){
            this.getCates();
        }else if(Date.now() - Cates.time > 1000*10){
            this.getCates();
        }else{
            console.log("use data")
            this.Cates = Cates.data;

            let leftMenuList = this.Cates.map(v=>v.cat_name);
            let rightContent = this.Cates[0].children;
            this.setData({
                leftMenuList,
                rightContent
            })
        }
    },
    async getCates(){
        // request({
        //     url:"/categories"
        // }).then(res=>{
        //     this.Cates = res.data.message;
        //     const Cates = wx.setStorageSync("cates",{
        //         time:Date.now(), // 当前时间戳
        //         data:this.Cates
        //     });
        //     let leftMenuList = this.Cates.map(v=>v.cat_name);
        //     let rightContent = this.Cates[0].children;
             
        //     this.setData({
        //         leftMenuList,
        //         rightContent
        //     })
        // })
        const res = await request({url:"/categories"});
        this.Cates = res.data.message;
        const Cates = wx.setStorageSync("cates",{
            time:Date.now(), // 当前时间戳
            data:this.Cates
        });
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
            
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    menuItemChange(e){
        
        const {index} = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex:index,
            rightContent,
            // 重设右侧滚动条位置
            scrollTop:0
        })
    }
})