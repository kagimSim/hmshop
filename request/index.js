let ajaxTimes = 0;
export const request=(params)=>{
    ajaxTimes++;
    wx.showLoading({
        title: "看得到我吗",
        mask: true,
    });
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            // 结构参数 例如 url,data,等
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                const res = result.data.message
                resolve(res); // 返回经过promise处理后的返回值
            },
            fail:(err)=>{
                reject(err)
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    wx.hideLoading();
                }
            }
        });
    })
}


