//index.js
//获取应用实例
import {request} from "../../request/index.js";

const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 首页轮播图
        swiperList:[],
        // 导航数据
        catesList:[],
        // 楼层数据
        floorList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSwiperList();
        this.getCatesList();
        this.getFloorList();
    },
    getSwiperList(){
        request({url:"/home/swiperdata"})
        .then(result=>{
            this.setData({
                swiperList:result
            })
        })
    },
    getCatesList(){
        request({url:"/home/catitems"})
        .then(result=>{
            this.setData({
                catesList:result
            })
        })
    },
    getFloorList(){
        request({url:"/home/floordata"})
        .then(result=>{
            this.setData({
                floorList:result
            })
        })
    }
})
