const data=window.TEA_SITE||{products:[],articles:[]};
const kind=document.body.dataset.page;
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node}
function productImage(item,cls){const box=el('div',cls);if(item.image){const img=el('img','');img.src=item.image;img.alt=item.name+'实拍';img.loading='lazy';box.append(img)}else{box.classList.add('picture-placeholder');box.append(el('span','','BAOSHENG TEA'),el('strong','',item.name),el('small','','图片后期补充'))}return box}
function href(item,type){return (type==='products'?'product.html':'article.html')+'?id='+encodeURIComponent(item.id)}
function itemLink(item,type){const a=el('a','',item.name);a.href=href(item,type);return a}
function fillMenu(id,items,type){const target=document.getElementById(id);if(!target)return;items.forEach(item=>target.append(itemLink(item,type)))}
function uniq(values){return [...new Set(values.filter(Boolean))]}
function metaLine(item){return [item.category,item.year&&item.year!=='年份待补充'?item.year+'年':item.year,item.region].filter(Boolean).join(' · ')}
function productCard(item,featured=false){
  const card=el('a',featured?'featured-card':'catalog-card');card.href=href(item,'products');
  card.append(productImage(item,featured?'featured-photo':'catalog-photo'));
  const meta=el('p','product-meta',metaLine(item));card.append(meta,el('h3','',item.name),el('p','',item.description));
  if(!featured)card.append(el('p','price-preview','价格：'+item.price));
  card.append(el('span','card-more','查看产品介绍 ↗'));return card;
}
fillMenu('product-menu',data.products,'products');fillMenu('knowledge-menu',data.articles,'articles');

const menus=[...document.querySelectorAll('.nav-group')];
menus.forEach(menu=>menu.addEventListener('toggle',()=>{if(menu.open)menus.forEach(other=>{if(other!==menu)other.open=false})}));
document.addEventListener('click',event=>menus.forEach(menu=>{if(!menu.contains(event.target))menu.open=false}));
document.addEventListener('keydown',event=>{if(event.key==='Escape')menus.forEach(menu=>{if(menu.open){menu.open=false;menu.querySelector('summary').focus()}})});

if(kind==='home'){
  const target=document.getElementById('featured-products');
  if(target)data.products.filter(item=>item.featured).slice(0,6).forEach(item=>target.append(productCard(item,true)));
}

if(kind==='products'){
  const items=data.products;
  const list=document.getElementById('catalog-list'),cards=document.getElementById('catalog-cards'),search=document.getElementById('catalog-search');
  const categoryBox=document.getElementById('category-filters'),yearBox=document.getElementById('year-filters'),regionBox=document.getElementById('region-filters');
  const yearBlock=document.getElementById('year-filter-block'),regionBlock=document.getElementById('region-filter-block'),clear=document.getElementById('clear-filters'),title=document.getElementById('catalog-title');
  const state={category:'全部',year:'全部',region:'全部'};
  const urlCategory=new URLSearchParams(location.search).get('category');
  if(urlCategory&&uniq(items.map(x=>x.category)).includes(urlCategory))state.category=urlCategory;

  function chip(label,active,onClick){const b=el('button','filter-chip'+(active?' active':''),label);b.type='button';b.setAttribute('aria-pressed',active?'true':'false');b.addEventListener('click',onClick);return b}
  function renderFilterControls(){
    categoryBox.replaceChildren();
    ['全部',...uniq(items.map(x=>x.category))].forEach(value=>categoryBox.append(chip(value,state.category===value,()=>{state.category=value;state.year='全部';state.region='全部';render()})));
    const isChenpi=state.category==='新会陈皮';yearBlock.hidden=!isChenpi;regionBlock.hidden=!isChenpi;
    yearBox.replaceChildren();regionBox.replaceChildren();
    if(isChenpi){
      const chenpi=items.filter(x=>x.category==='新会陈皮');
      const years=['全部',...uniq(chenpi.map(x=>x.year))];
      years.forEach(value=>yearBox.append(chip(value,state.year===value,()=>{state.year=value;state.region='全部';render()})));
      const regions=['全部',...uniq(chenpi.filter(x=>state.year==='全部'||x.year===state.year).map(x=>x.region))];
      regions.forEach(value=>regionBox.append(chip(value,state.region===value,()=>{state.region=value;render()})));
    }
  }
  function render(){
    renderFilterControls();
    const term=search.value.trim().toLowerCase();
    const found=items.filter(item=>{
      const text=[item.name,item.id,item.category,item.year,item.region,item.origin].join(' ').toLowerCase();
      return (!term||text.includes(term)) &&
        (state.category==='全部'||item.category===state.category) &&
        (state.year==='全部'||item.year===state.year) &&
        (state.region==='全部'||item.region===state.region);
    });
    list.replaceChildren();cards.replaceChildren();
    found.forEach(item=>{list.append(itemLink(item,'products'));cards.append(productCard(item,false))});
    document.getElementById('catalog-count').textContent='共 '+found.length+' 项';
    document.getElementById('empty-result').hidden=found.length>0;
    title.textContent=state.category==='全部'?'全部产品':state.category+(state.year!=='全部'?' · '+state.year:'');
  }
  search.addEventListener('input',render);
  clear.addEventListener('click',()=>{state.category='全部';state.year='全部';state.region='全部';search.value='';history.replaceState(null,'',location.pathname);render()});
  render();
}

if(kind==='knowledge'){
  const items=data.articles;
  const list=document.getElementById('catalog-list'),cards=document.getElementById('catalog-cards'),search=document.getElementById('catalog-search');
  function render(){const term=search.value.trim().toLowerCase();const found=items.filter(item=>(item.name+' '+item.description).toLowerCase().includes(term)||item.id.includes(term));list.replaceChildren();cards.replaceChildren();found.forEach(item=>{list.append(itemLink(item,'knowledge'));const card=el('a','catalog-card');card.href=href(item,'knowledge');card.append(el('span','article-number',item.id.padStart(2,'0')),el('h3','',item.name),el('p','',item.description),el('span','card-more','阅读文章 ↗'));cards.append(card)});document.getElementById('catalog-count').textContent='共 '+found.length+' 项';document.getElementById('empty-result').hidden=found.length>0}
  search.addEventListener('input',render);render();
}

if(kind==='product'||kind==='article'){
  const type=kind==='product'?'products':'knowledge',items=kind==='product'?data.products:data.articles;
  const id=new URLSearchParams(location.search).get('id'),item=items.find(x=>x.id===id),target=document.getElementById('detail-content'),list=document.getElementById('detail-list');
  items.forEach(entry=>{const a=itemLink(entry,type);if(entry.id===id){a.classList.add('selected');a.setAttribute('aria-current','page')}list.append(a)});
  if(!item){document.title='内容未找到 · 宝盛茗茶园';document.getElementById('crumb-title').textContent='内容未找到';target.append(el('h1','','内容未找到'),el('p','','请从左侧目录选择，或返回完整目录。'));const back=el('a','button','返回目录');back.href=type+'.html';target.append(back)}
  else{
    document.title=item.name+' · 宝盛茗茶园';document.getElementById('crumb-title').textContent=item.name;
    if(kind==='product'){
      const top=el('div','product-overview'),picture=productImage(item,'product-picture'),summary=el('div','product-summary');
      summary.append(el('p','eyebrow','PRODUCT / '+item.id.padStart(2,'0')),el('p','product-meta',metaLine(item)),el('h1','',item.name),el('p','detail-price','价格：'+item.price));
      const dl=el('dl','specs');
      [['分类',item.category],['年份',item.year||'—'],['产区',item.region||item.origin||'后期补充'],['规格',item.specification]].forEach(([label,value])=>{dl.append(el('dt','',label),el('dd','',value))});
      summary.append(dl);top.append(picture,summary);target.append(top);
      if(item.gallery&&item.gallery.length){const gallery=el('div','product-gallery');item.gallery.forEach((src,i)=>{const img=el('img','');img.src=src;img.alt=item.name+'补充实拍 '+(i+1);img.loading='lazy';gallery.append(img)});target.append(gallery)}
      [['产品介绍',item.description],['冲泡 / 使用说明',item.brewing]].forEach(([sectionTitle,copy])=>{const section=el('section','detail-section');section.append(el('h2','',sectionTitle),el('p','',copy));target.append(section)});
    }else{
      target.append(el('p','eyebrow','TEA JOURNAL / '+item.id.padStart(2,'0')),el('h1','',item.name),el('p','article-description',item.description));
      const section=el('section','detail-section article-body');section.append(el('h2','','正文'),el('p','',item.body));target.append(section);
    }
    const links=el('nav','detail-pager');links.setAttribute('aria-label','上一项和下一项');const i=items.indexOf(item);
    if(i>0){const a=itemLink(items[i-1],type);a.textContent='← '+items[i-1].name;links.append(a)}
    const back=el('a','','返回目录');back.href=type+'.html';links.append(back);
    if(i<items.length-1){const a=itemLink(items[i+1],type);a.textContent=items[i+1].name+' →';links.append(a)}
    target.append(links);
  }
}