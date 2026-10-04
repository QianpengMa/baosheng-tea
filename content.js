// 所有条目均为占位示例。增加产品/文章时，复制一条并使用唯一、固定的 id。
// name、description、price、specification、origin、brewing、body 可由茶庄确认后填写。
window.TEA_SITE = {
  products: Array.from({length: 6}, (_, i) => ({
    id: String(i + 1), name: '产品' + (i + 1), description: '后期补充',
    price: '后期补充', specification: '后期补充', origin: '后期补充', brewing: '后期补充'
  })),
  articles: Array.from({length: 6}, (_, i) => ({
    id: String(i + 1), name: '茶叶知识' + (i + 1), description: '后期补充', body: '后期补充'
  }))
};
