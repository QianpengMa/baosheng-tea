const products=document.querySelector('#products');
const dialog=document.querySelector('#detail');
let trigger;
(window.TEA_PRODUCTS||[]).forEach(tea=>{
  const button=document.createElement('button');button.className='product';
  button.setAttribute('aria-label','查看'+tea.name);
  const art=document.createElement('div');art.className='tea-art '+tea.color;
  const placeholder=document.createElement('span');placeholder.className='placeholder-image';placeholder.textContent='图片：后期补充';art.append(placeholder);
  const title=document.createElement('h3');title.textContent=tea.name;
  const description=document.createElement('p');description.textContent=tea.description;
  const link=document.createElement('span');link.className='product-link';link.textContent='产品介绍 ↗';
  button.append(art,title,description,link);
  button.addEventListener('click',()=>{trigger=button;document.querySelector('#detail-title').textContent=tea.name;document.querySelector('#detail-description').textContent=tea.description;dialog.showModal()});products.append(button);
});
document.querySelector('.close').addEventListener('click',()=>dialog.close());
document.querySelector('#detail-contact').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>trigger?.focus());
