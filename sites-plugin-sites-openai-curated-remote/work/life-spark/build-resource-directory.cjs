const fs=require('fs');
const path=require('path');
const vm=require('vm');

const root=__dirname;
const source=fs.readFileSync(path.join(root,'dist/russian-data.js'),'utf8');
const sandbox={window:{}};
vm.createContext(sandbox);
vm.runInContext(source,sandbox);
const sites=sandbox.window.RUSSIAN_SITES;
const target=path.join(root,'dist/resources.html');
const reviewed='2026-10-28';
const categories=[
  ['isu','伊尔库茨克国立大学'],['russia','留学与在俄生活'],['job','俄语求职'],['parttime','留学生兼职'],
  ['web','俄语课程'],['app','词典与翻译'],['tool','听读材料'],['media','找语伴'],
  ['shop','社群'],['core','网盘与馆藏'],['ai','学习工具']
];
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const host=url=>new URL(url).hostname.replace(/^www\./,'');
const sections=categories.map(([key,label])=>{
  const list=sites.filter(site=>site.cat===key);
  return `<section class="directory-section" id="${key}"><div class="directory-heading"><h2>${label}</h2><span>${list.length} 个</span></div><ul>${list.map(site=>`<li><a href="${escapeHtml(site.url)}" target="_blank" rel="noopener"><strong>${escapeHtml(site.name)}</strong><span>${escapeHtml(site.desc)}</span><small>${escapeHtml(host(site.url))} · 基础核验 ${reviewed}</small></a></li>`).join('')}</ul></section>`;
}).join('');
const itemList={
  '@context':'https://schema.org','@type':'ItemList',name:'俄语星球资源目录',numberOfItems:sites.length,
  itemListElement:sites.map((site,index)=>({'@type':'ListItem',position:index+1,name:site.name,url:site.url}))
};
const directoryUrl='https://russianhub.github.io/opensource-sites/resources.html';
const directoryDescription=`${sites.length} 个俄语学习与留俄入口，按课程、词典、听读材料、找语伴、留学与在俄生活、伊尔库茨克国立大学、求职兼职、社群和网盘馆藏分类。每条都有推荐理由和评级。`;
const webPage={
  '@context':'https://schema.org','@type':'WebPage',name:'俄语学习与留俄资源目录',url:directoryUrl,inLanguage:'zh-CN',
  description:directoryDescription,
  isPartOf:{'@type':'WebSite',name:'俄语星球',url:'https://russianhub.github.io/opensource-sites/'},
  breadcrumb:{'@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'俄语星球',item:'https://russianhub.github.io/opensource-sites/'},
    {'@type':'ListItem',position:2,name:'资源目录',item:directoryUrl}
  ]}
};
const html=`<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#F8F2E8">
<meta name="description" content="${directoryDescription}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="referrer" content="strict-origin-when-cross-origin">
<link rel="canonical" href="https://russianhub.github.io/opensource-sites/resources.html">
<title>俄语学习与留俄资源目录 · 俄语星球</title>
<link rel="icon" href="favicon.svg?v=44" type="image/svg+xml"><link rel="icon" href="favicon-32.png?v=44" sizes="32x32"><link rel="apple-touch-icon" href="favicon-180.png?v=44">
<link rel="stylesheet" href="style.css?v=52">
<meta property="og:type" content="website">
<meta property="og:site_name" content="俄语星球">
<meta property="og:title" content="俄语学习与留俄资源目录 · 俄语星球">
<meta property="og:description" content="${directoryDescription}">
<meta property="og:url" content="https://russianhub.github.io/opensource-sites/resources.html">
<meta property="og:image" content="https://russianhub.github.io/opensource-sites/og-image.jpg?v=50">
<meta property="og:image:alt" content="俄语星球：171 个精选俄语学习与留学资源，每条都有推荐理由和评级">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="俄语学习与留俄资源目录 · 俄语星球">
<meta name="twitter:description" content="${directoryDescription}">
<meta name="twitter:image" content="https://russianhub.github.io/opensource-sites/og-image.jpg?v=50">
<script type="application/ld+json">${JSON.stringify(itemList).replace(/</g,'\\u003c')}</script>
<script type="application/ld+json">${JSON.stringify(webPage).replace(/</g,'\\u003c')}</script>
</head>
<body class="directory-page">
<a class="skip-link" href="#directory-main">跳到资源目录</a>
<div class="window">
<nav aria-label="目录导航"><div class="nav-top"><a class="brand" href="./"><img class="brand-mark" src="favicon.svg?v=44" alt="俄语星球标志" width="38" height="38"><div><b>俄语星球</b><small>Russian Hub</small></div></a></div><div class="links"><a href="./">返回首页</a><a href="submit.html">推荐资源</a></div></nav>
<main class="wrap directory-main" id="directory-main" tabindex="-1">
<header class="directory-hero"><p>不需要 JavaScript 也能看的完整目录</p><h1>${sites.length} 个入口，<br>按目标分开。</h1><div class="directory-jumps" aria-label="跳转到资源分类">${categories.map(([key,label])=>`<a href="#${key}">${label}</a>`).join('')}</div><small>目录基础核验日期：<time datetime="${reviewed}">${reviewed}</time>。核验范围为来源域名、HTTPS 与重复项，不代表平台始终可用或为本站背书。</small></header>
${sections}
</main>
<footer><div class="footer-bottom"><span>俄语星球 · 开放资源目录</span><a href="https://github.com/russianhub/opensource-sites/issues/new" target="_blank" rel="noopener">报告失效资源</a></div></footer>
</div>
<a class="mascot-dock" href="agent.html" aria-label="小星 AI 学习助理，可拖动，点击打开对话" title="拖动小星到任意位置，点击打开 AI 助理">
  <span class="mascot-bubble" aria-hidden="true"><b>小星 · AI 学习助理</b><span>有俄语问题？来问我</span></span>
  <span class="mascot-figure"><img src="assets/mascot.svg?v=1" alt="小星 AI 学习助理形象" width="64" height="64" decoding="async" draggable="false"></span>
</a>
<script src="mascot.js?v=1"></script>
</body>
</html>
`;

if(process.argv.includes('--check')){
  if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==html){
    console.error('dist/resources.html is out of date; run node build-resource-directory.cjs');
    process.exit(1);
  }
  console.log(`Resource directory is current: ${sites.length} entries.`);
}else{
  fs.writeFileSync(target,html,'utf8');
  console.log(`Generated dist/resources.html with ${sites.length} entries.`);
}
