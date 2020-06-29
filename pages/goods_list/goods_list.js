// pages/goods_list/goods_list.js
import {request} from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isActive:true
            },
            {
                id:1,
                value:"销量",
                isActive:false
            },
            {
                id:2,
                value:"价格",
                isActive:false
            }
        ],
        goodsList:[]
    },
    QueryParams:{
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },
    // 总页数
    totalPages:1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid
        this.getGoodsItem();
    },
    handleItemTab(e){
        console.log(e)
        let {index} = e.detail; // 从子组件传来的数据在 e.detail 里面
        const tabs = this.data.tabs;

        // tabs.forEach(element => {
        //     element.isActive = false;
        // });
        // tabs[index].isActive = true;
        tabs.forEach((e,i) => {i===index?e.isActive=true:e.isActive=false});

        this.setData({
            tabs
        })
    },
    async getGoodsItem(){
        let res = await request({url:"/goods/search",data:this.QueryParams});
        const total = res.total;
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
        this.setData({
            goodsList : [...this.data.goodsList,...res.goods]
        })
    },
    onReachBottom(){
        if(this.QueryParams.pagenum>this.totalPages){
            // 没有下一页数据了
            // console.log("%c"+"没有下一页数据了","color:red;font-size:45px;")
            wx.showToast({title: '没有下一页数据啦'});
        }else{
            // 还有下一页数据
            this.QueryParams.pagenum++;
            this.getGoodsItem();
            // console.log("%c"+"还有一页数据了","color:red;font-size:280px;")
        }
    },
    onPullDownRefresh(){
        this.QueryParams.pagenum = 1;
        this.setData({
            goodsList:[]
        })
        this.getGoodsItem();
        wx.stopPullDownRefresh();
    }
})