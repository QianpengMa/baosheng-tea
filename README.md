# 宝盛茗茶园 · 网站框架预览

纯 HTML / CSS / JavaScript 静态设计预览，无登录、支付、订单、用户数据收集或在线编辑后台。
品牌名已确定，其余内容以“后期补充”占位。茶器插画为装饰，不是门店或真实商品照片。
https://qianpengma.github.io/baosheng-tea/

## 本地查看
双击 index.html，或在文件目录执行 `python -m http.server 8000` 后打开 http://localhost:8000。

## 修改内容
- `index.html`：介绍、地址、微信、营业时间等文字。
- `content.js`：产品名称与介绍。
- `style.css`：页面外观与手机布局。
- `app.js`：产品详情弹窗。

## GitHub Pages
将以上文件置于仓库根目录，在 Settings → Pages 选择 Deploy from a branch、main、/(root)。
全部资源均为相对路径，无需构建，兼容项目子路径；.nojekyll 跳过 Jekyll。
发布后的地址以 GitHub Pages 设置返回值为准。

这是无交易的框架预览项目。GitHub Pages 不适合作为未来的网购商城托管方案，正式经营及交易功能应另行评估平台规则并迁移。
https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
