const data=window.TEA_SITE;
const kind=document.body.dataset.page;
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node}
function href(item,type){return (type==='products'?'product.html':'article.html')+'?id='+encodeURIComponent(item.id)}
function itemLink(item,type){const a=el('a','',item.name);a.href=href(item,type);return a}
function fillMenu(id,items,type){const target=document.getElementById(id);items.forEach(item=>target.append(itemLink(item,type)))}
fillMenu('product-menu',data.products,'products');fillMenu('knowledge-menu',data.articles,'articles');
const menus=[...document.querySelectorAll('.nav-group')];
menus.forEach(menu=>menu.addEventListener('toggle',()=>{if(menu.open)menus.forEach(other=>{if(other!==menu)other.open=false})}));
document.addEventListener('click',event=>menus.forEach(menu=>{if(!menu.contains(event.target))menu.open=false}));
document.addEventListener('keydown',event=>{if(event.key==='Escape')menus.forEach(menu=>{if(menu.open){menu.open=false;menu.querySelector('summary').focus()}})});
if(kind==='products'||kind==='knowledge'){
 const items=kind==='products'?data.products:data.articles;
 const list=document.querySelector('#catalog-list'),cards=document.querySelector('#catalog-cards'),search=document.querySelector('#catalog-search');
 function render(){const term=search.value.trim().toLowerCase();const found=items.filter(item=>item.name.toLowerCase().includes(term)||item.id.includes(term));list.replaceChildren();cards.replaceChildren();found.forEach(item=>{list.append(itemLink(item,kind));const card=el('a','catalog-card');card.href=href(item,kind);if(kind==='products'){const picture=el('div','picture-placeholder');picture.append(el('strong','','图片后期填充'));card.append(picture)}else card.append(el('span','article-number',item.id.padStart(2,'0')));card.append(el('h3','',item.name),el('p','',item.description));if(kind==='products')card.append(el('p','price-preview','价格：'+item.price));card.append(el('span','card-more',kind==='products'?'查看产品介绍 ↗':'阅读文章 ↗'));cards.append(card)});document.querySelector('#catalog-count').textContent='共 '+found.length+' 项';document.querySelector('#empty-result').hidden=found.length>0;}
 search.addEventListener('input',render);render();
}
if(kind==='product'||kind==='article'){
 const type=kind==='product'?'products':'knowledge',items=kind==='product'?data.products:data.articles;
 const id=new URLSearchParams(location.search).get('id'),item=items.find(item=>item.id===id),target=document.querySelector('#detail-content');
 const list=document.querySelector('#detail-list');items.forEach(entry=>{const a=itemLink(entry,type);if(entry.id===id){a.classList.add('selected');a.setAttribute('aria-current','page')}list.append(a)});
 if(!item){document.title='内容未找到 · 宝盛茗茶园';document.querySelector('#crumb-title').textContent='内容未找到';target.append(el('h1','','内容未找到'),el('p','','请从左侧目录选择，或返回完整目录。'));const back=el('a','button','返回目录');back.href=type+'.html';target.append(back)}else{
 document.title=item.name+' · 宝盛茗茶园';document.querySelector('#crumb-title').textContent=item.name;
 if(kind==='product'){
 const top=el('div','product-overview'),picture=el('div','picture-placeholder product-picture');picture.append(el('strong','','图片后期填充'));const summary=el('div','product-summary');summary.append(el('p','eyebrow','PRODUCT / '+item.id.padStart(2,'0')),el('h1','',item.name),el('p','detail-price','价格：'+item.price));const dl=el('dl','specs');[['规格',item.specification],['产地',item.origin]].forEach(([label,value])=>{dl.append(el('dt','',label),el('dd','',value))});summary.append(dl);top.append(picture,summary);target.append(top);[['产品介绍',item.description],['冲泡方法',item.brewing]].forEach(([title,text])=>{const section=el('section','detail-section');section.append(el('h2','',title),el('p','',text));target.append(section)});
 }else{target.append(el('p','eyebrow','TEA JOURNAL / '+item.id.padStart(2,'0')),el('h1','',item.name),el('p','article-description',item.description));const section=el('section','detail-section article-body');section.append(el('h2','','正文'),el('p','',item.body));target.append(section)}
 const links=el('nav','detail-pager');links.setAttribute('aria-label','上一项和下一项');const i=items.indexOf(item);if(i>0){const a=itemLink(items[i-1],type);a.textContent='← '+items[i-1].name;links.append(a)}const back=el('a','','返回目录');back.href=type+'.html';links.append(back);if(i<items.length-1){const a=itemLink(items[i+1],type);a.textContent=items[i+1].name+' →';links.append(a)}target.append(links);
 }
}
