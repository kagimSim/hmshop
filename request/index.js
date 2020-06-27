export const request=(params)=>{
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            // 结构参数 例如 url,data,等
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err)
            }
        });
    })
}