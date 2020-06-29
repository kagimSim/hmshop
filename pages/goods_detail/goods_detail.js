// pages/goods_detail/goods_detail.js
import {request} from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodDetail:{}
    },
    params:{
        goods_id:""
    },
    goodsInfo:{},
    goodDetail:{},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let {goods_id} = options;
        this.getGoodsDetail(goods_id);
    },

    async getGoodsDetail(goods_id){
        let goodDetail = await request({url:"/goods/detail",data:{goods_id}});
        this.goodsInfo = goodDetail
        // console.log(goodDetail)
        this.setData({
            goodDetail:{
                goods_id:goodDetail.goods_id,
                goods_name:goodDetail.goods_name,
                goods_price:goodDetail.goods_price,
                pics:goodDetail.pics,
                goods_introduce:goodDetail.goods_introduce.replace(/\.webp/g,".jpg")
            }
        })
    },
    // 点击图片放大预览
    handlePreviewImage(e){
        const {url} = getApp().getDataset(e);
        const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
        wx.previewImage({
            current: url,
            urls
        });
    },
    handleCartAdd(){
        this.goodDetail = this.data.goodDetail;
        let cart = wx.getStorageSync("cart") || [];
        let index=cart.findIndex(v=>v.goods_id===this.goodDetail.goods_id);
        if(index===-1){
            // 不存在 第一次添加
            this.goodDetail.num=1;
            cart.push(this.goodDetail);
        }else{
            // 存在 更改商品数量
            cart[index].num ++;
        }

        wx.setStorageSync("cart", cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        });
    }
})