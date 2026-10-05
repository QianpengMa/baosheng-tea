# 宝盛茗茶园 · 网站框架预览

纯 HTML / CSS / JavaScript 静态网站，可直接本地修改测试。当前联系电话：139 2808 0437。

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

## 在线预览
https://qianpengma.github.io/baosheng-tea/

## 页面结构
- index.html：首页、门店介绍、门店环境与联系信息。
- products.html：可搜索产品目录。
- product.html?id=1：产品详情，预留介绍、价格、规格、产地和冲泡方法。
- knowledge.html：可搜索茶叶知识目录。
- article.html?id=1：茶叶知识详情。
- content.js：统一维护产品与文章条目，使用唯一固定 id。当前各六项为框架占位。

导航点击展开编号列表，点击条目进入独立详情页。价格均为占位，不提供交易。
