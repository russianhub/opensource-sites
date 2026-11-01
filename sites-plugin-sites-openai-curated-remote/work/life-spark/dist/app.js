const ideas=[
{id:0,title:'给自己开一家安静咖啡馆',icon:'☕',type:'rest',time:15,cost:0,desc:'用家里的饮品，把一小段时间留给自己。',steps:['泡一杯已有的茶、咖啡或温水。','把手机放远，找一个舒服的角落。','慢慢喝完，写下今天最想感谢的一件小事。']},
{id:1,title:'寻找街角的三种颜色',icon:'🌿',type:'explore',time:60,cost:0,desc:'不赶路，带着新的眼光走一段熟悉的路。',steps:['选一条熟悉且方便步行的路线。','寻找蓝、绿、黄三种颜色，各拍一张照片。','回来选出最喜欢的一张，为它取一个名字。']},
{id:2,title:'交换一首今天的歌',icon:'🎧',type:'connect',time:15,cost:0,desc:'用一首歌，打开一段轻松的对话。',steps:['选一首能代表今天心情的歌。','发给一位朋友，说说为什么想分享。','邀请对方也分享一首；不用催促回复。']},
{id:3,title:'整理一个能呼吸的角落',icon:'🪴',type:'rest',time:60,cost:0,desc:'不用整理整个家，只改变眼前的一小块。',steps:['选桌面或床头的一小块区域。','移开不需要的物品，把常用的东西放顺手。','坐下来感受变化，给新角落拍张照片。']},
{id:4,title:'做一本附近探索手册',icon:'🧭',type:'explore',time:120,cost:0,desc:'把附近值得再来的地方，变成你的私人地图。',steps:['走访两个方便到达的公共空间。','记录开放提示、坐下休息的地方和喜欢的细节。','整理成一页笔记，下次邀请朋友一起去。']},
{id:5,title:'举办一场纸笔小游戏',icon:'🎲',type:'connect',time:60,cost:0,desc:'不买道具，用纸笔让聚会多一点笑声。',steps:['邀请朋友，准备几张纸和笔。','轮流画一个日常物品，其他人猜答案。','最后一起给最有趣的画取个名字。']},
{id:6,title:'买一束小花送给自己',icon:'🌷',type:'rest',time:60,cost:50,desc:'一点小钱，换一整天的好心情。',steps:['找一家顺路的花店或小花摊。','挑一束最让你心动的，不追求名贵。','带回家摆在喜欢的角落，拍一张照。']},
{id:7,title:'去小店坐一坐',icon:'🍵',type:'explore',time:60,cost:50,desc:'换个屋檐，看看别人怎么生活。',steps:['选一家没去过的咖啡店或茶铺。','点一杯想喝的，不用着急走。','记下店里你最喜欢的一个细节。']},
{id:8,title:'看一场随机的电影',icon:'🎬',type:'connect',time:120,cost:150,desc:'不看预告，把两个小时交给运气。',steps:['约一位朋友，一个人去也很好。','随机选一部正在上映的片子。','散场后聊聊彼此最喜欢的一刻。']}
];

const legacySites=[
{cat:'web',key:'zhihu',name:'知乎',desc:'问答社区，找生活经验',url:'https://www.zhihu.com',ico:'zhihu.png'},
{cat:'web',key:'sspai',name:'少数派',desc:'高效工作与品质生活',url:'https://sspai.com',ico:'sspai.png',tag:'推荐'},
{cat:'web',key:'xiachufang',name:'下厨房',desc:'家常菜谱与烘焙灵感',url:'https://www.xiachufang.com',ico:'xiachufang.png'},
{cat:'web',key:'wikihow',name:'WikiHow 中文',desc:'生活百科与实用技巧',url:'https://zh.wikihow.com',ico:'wikihow.png'},
{cat:'web',key:'icourse',name:'中国大学 MOOC',desc:'名校免费公开课',url:'https://www.icourse163.org',ico:'icourse.png'},
{cat:'web',key:'bilibili',name:'哔哩哔哩',desc:'学习、兴趣与纪录片视频',url:'https://www.bilibili.com',ico:'bilibili.png',tag:'推荐'},
{cat:'web',key:'zcool',name:'站酷',desc:'设计与创意灵感社区',url:'https://www.zcool.com.cn',ico:'zcool.png'},
{cat:'web',key:'qyer',name:'穷游网',desc:'旅行攻略与游记',url:'https://www.qyer.com',ico:'qyer.png'},
{cat:'web',key:'guokr',name:'果壳',desc:'科学趣闻与生活科普',url:'https://www.guokr.com',ico:'guokr.png'},
{cat:'web',key:'hupu',name:'虎扑',desc:'体育资讯与步行街社区',url:'https://www.hupu.com',ico:'hupu.png'},
{cat:'app',key:'xiaoyuzhou',name:'小宇宙',desc:'中文播客，通勤好伴侣',url:'https://www.xiaoyuzhoufm.com',ico:'xiaoyuzhou.png',tag:'推荐'},
{cat:'app',key:'tide',name:'潮汐',desc:'睡眠、专注与冥想声音',url:'https://tide.fm',ico:'tide.png'},
{cat:'app',key:'duolingo',name:'多邻国',desc:'游戏化学外语，每天几分钟',url:'https://www.duolingo.com',ico:'duolingo.png'},
{cat:'app',key:'keep',name:'Keep',desc:'在家就能开始的训练',url:'https://keep.com',ico:'keep.png',tag:'推荐'},
{cat:'app',key:'mubu',name:'幕布',desc:'大纲式笔记与思维导图',url:'https://mubu.com',ico:'mubu.png'},
{cat:'app',key:'xingse',name:'形色',desc:'拍照识花，认识身边的植物',url:'https://www.xingseapp.com',ico:'xingse.png'},
{cat:'app',key:'dida',name:'滴答清单',desc:'待办清单与日程管理',url:'https://www.dida365.com',ico:'dida.png'},
{cat:'app',key:'baimiao',name:'白描',desc:'图片文字识别与扫描',url:'https://baimiaoapp.com',ico:'baimiao.png'},
{cat:'app',key:'feishu',name:'飞书',desc:'在线文档与协作办公',url:'https://www.feishu.cn',ico:'feishu.png'},
{cat:'app',key:'boohee',name:'薄荷健康',desc:'饮食记录与健康管理',url:'https://www.boohee.com',ico:'boohee.png'},
{cat:'tool',key:'canva',name:'Canva 可画',desc:'海报与社媒图片设计',url:'https://www.canva.cn',ico:'canva.png',tag:'推荐'},
{cat:'tool',key:'deepl',name:'DeepL',desc:'高质量机器翻译',url:'https://www.deepl.com',ico:'deepl.png'},
{cat:'tool',key:'tinypng',name:'TinyPNG',desc:'在线图片压缩',url:'https://tinypng.com',ico:'tinypng.png',tag:'推荐'},
{cat:'tool',key:'shimo',name:'石墨文档',desc:'在线协作文档与表格',url:'https://shimo.im',ico:'shimo.png'},
{cat:'tool',key:'photopea',name:'Photopea',desc:'浏览器里的免费 Photoshop',url:'https://www.photopea.com',ico:'photopea.png'},
{cat:'tool',key:'removebg',name:'Remove.bg',desc:'一键抠图去背景',url:'https://www.remove.bg',ico:'removebg.png'},
{cat:'tool',key:'convertio',name:'Convertio',desc:'文件格式在线转换',url:'https://convertio.co',ico:'convertio.png'},
{cat:'tool',key:'cliim',name:'草料二维码',desc:'二维码生成器',url:'https://cli.im',ico:'cliim.png'},
{cat:'tool',key:'wenshushu',name:'文叔叔',desc:'大文件传输',url:'https://www.wenshushu.cn',ico:'wenshushu.png'},
{cat:'tool',key:'xiezuocat',name:'秘塔写作猫',desc:'AI 写作助手',url:'https://xiezuocat.com',ico:'xiezuocat.png'},
{cat:'media',key:'doubanbook',name:'豆瓣读书',desc:'找书、评分与书评',url:'https://book.douban.com',ico:'doubanbook.png',tag:'推荐'},
{cat:'media',key:'doubanmovie',name:'豆瓣电影',desc:'电影评分与影评',url:'https://movie.douban.com',ico:'doubanmovie.png',tag:'推荐'},
{cat:'media',key:'weread',name:'微信读书',desc:'手机阅读与听书',url:'https://weread.qq.com',ico:'weread.png'},
{cat:'media',key:'music163',name:'网易云音乐',desc:'音乐与歌单',url:'https://music.163.com',ico:'music163.png'},
{cat:'media',key:'maoyan',name:'猫眼电影',desc:'电影资讯与购票',url:'https://www.maoyan.com',ico:'maoyan.png'},
{cat:'media',key:'ximalaya',name:'喜马拉雅',desc:'音频、播客与有声书',url:'https://www.ximalaya.com',ico:'ximalaya.png'},
{cat:'media',key:'dedao',name:'得到',desc:'知识课程与听书',url:'https://www.dedao.cn',ico:'dedao.png'},
{cat:'media',key:'yqq',name:'QQ 音乐',desc:'在线音乐与歌单',url:'https://y.qq.com',ico:'yqq.png'},
{cat:'media',key:'iqiyi',name:'爱奇艺',desc:'热门剧集、综艺与电影',url:'https://www.iqiyi.com',ico:'iqiyi.png'},
{cat:'media',key:'tencentvideo',name:'腾讯视频',desc:'剧集、综艺与纪录片',url:'https://v.qq.com',ico:'tencentvideo.png'},
{cat:'shop',key:'taobao',name:'淘宝',desc:'综合网购，百货一站买齐',url:'https://www.taobao.com',ico:'taobao.png'},
{cat:'shop',key:'jd',name:'京东',desc:'家电数码，自营物流快',url:'https://www.jd.com',ico:'jd.png'},
{cat:'shop',key:'pinduoduo',name:'拼多多',desc:'好货便宜，百亿补贴',url:'https://www.pinduoduo.com',ico:'pinduoduo.png'},
{cat:'shop',key:'meituan',name:'美团',desc:'外卖、美食与酒店团购',url:'https://www.meituan.com',ico:'meituan.png'},
{cat:'shop',key:'vip',name:'唯品会',desc:'品牌特卖，折扣正品',url:'https://www.vip.com',ico:'vip.png'},
{cat:'shop',key:'smzdm',name:'什么值得买',desc:'消费决策社区，值不值先看看',url:'https://www.smzdm.com',ico:'smzdm.png',tag:'推荐'},
{cat:'shop',key:'goofish',name:'闲鱼',desc:'二手闲置，捡漏与回血',url:'https://www.goofish.com',ico:'goofish.png'},
{cat:'shop',key:'eleme',name:'饿了么',desc:'点外卖，送药送菜上门',url:'https://www.ele.me',ico:'eleme.png'},
{cat:'shop',key:'ali1688',name:'1688',desc:'批发源头，工厂价进货',url:'https://www.1688.com',ico:'ali1688.png'},
{cat:'shop',key:'dewu',name:'得物',desc:'潮流单品，先鉴定后发货',url:'https://www.dewu.com',ico:'dewu.png'},
{cat:'core',key:'weixin',name:'微信',desc:'聊天、朋友圈与公众号',url:'https://weixin.qq.com',ico:'weixin.png'},
{cat:'core',key:'alipay',name:'支付宝',desc:'支付与生活服务',url:'https://www.alipay.com',ico:'alipay.png'},
{cat:'core',key:'douyin',name:'抖音',desc:'短视频记录生活',url:'https://www.douyin.com',ico:'douyin.png'},
{cat:'core',key:'qq',name:'QQ',desc:'老牌即时通讯',url:'https://im.qq.com',ico:'qq.png'},
{cat:'core',key:'amap',name:'高德地图',desc:'导航出行与路线规划',url:'https://www.amap.com',ico:'amap.png'},
{cat:'core',key:'baidumap',name:'百度地图',desc:'导航与地点查询',url:'https://map.baidu.com',ico:'baidumap.png'},
{cat:'core',key:'weibo',name:'微博',desc:'热点吃瓜第一线',url:'https://weibo.com',ico:'weibo.png'},
{cat:'core',key:'baidu',name:'百度',desc:'中文搜索入口',url:'https://www.baidu.com',ico:'baidu.png'},
{cat:'core',key:'xiaohongshu',name:'小红书',desc:'生活方式种草社区',url:'https://www.xiaohongshu.com',ico:'xiaohongshu.png',tag:'推荐'},
{cat:'core',key:'news163',name:'网易新闻',desc:'有态度的新闻资讯',url:'https://www.163.com',ico:'news163.png'},
{cat:'ai',key:'deepseek',name:'DeepSeek',desc:'深度思考的国产大模型',url:'https://www.deepseek.com',ico:'deepseek.png',tag:'推荐'},
{cat:'ai',key:'doubao',name:'豆包',desc:'字节跳动的 AI 助手',url:'https://www.doubao.com',ico:'doubao.png'},
{cat:'ai',key:'kimi',name:'Kimi',desc:'长文本阅读与写作',url:'https://kimi.moonshot.cn',ico:'kimi.png'},
{cat:'ai',key:'tongyi',name:'通义千问',desc:'阿里的全能 AI 助手',url:'https://tongyi.aliyun.com',ico:'tongyi.png'},
{cat:'ai',key:'nano',name:'纳米 AI 搜索',desc:'360 的 AI 搜索',url:'https://www.n.cn',ico:'nano.png'},
{cat:'ai',key:'yiyan',name:'文心一言',desc:'百度的 AI 助手',url:'https://yiyan.baidu.com',ico:'yiyan.png'},
{cat:'ai',key:'chatglm',name:'智谱清言',desc:'清华系的 AI 助手',url:'https://chatglm.cn',ico:'chatglm.png'},
{cat:'ai',key:'yuanbao',name:'腾讯元宝',desc:'腾讯的 AI 助手',url:'https://yuanbao.tencent.com',ico:'yuanbao.png'},
{cat:'ai',key:'xinghuo',name:'讯飞星火',desc:'语音与认知大模型',url:'https://xinghuo.xfyun.cn',ico:'xinghuo.png'},
{cat:'ai',key:'metaso',name:'秘塔 AI 搜索',desc:'学术级 AI 搜索',url:'https://metaso.cn',ico:'metaso.png'}
];
const sites=window.RUSSIAN_SITES||legacySites;

let saved=[];
try{saved=JSON.parse(localStorage.getItem('sparkSaved')||'[]');if(!Array.isArray(saved))saved=[]}catch{}

let filter='all',last=null;
const $=s=>document.querySelector(s);
let timer;

function arrangeHomepage(){
  const main=$('#main-content');
  if(!main)return;
  const selectors=['#navs','#nav-isu','#pangyi','#nav-web','#nav-app','#nav-tool','#nav-media','#nav-russia','#nav-job','#nav-parttime','#nav-shop','#nav-save','#nav-core','#nav-ai','#study-desk','.hero','.user-test-callout'];
  const fragment=document.createDocumentFragment();
  selectors.forEach(selector=>{const node=main.querySelector(selector);if(node)fragment.appendChild(node)});
  main.insertBefore(fragment,main.firstChild);
}
arrangeHomepage();

const timeText=i=>i.time===120?'半天':i.time+' 分钟';
const costText=i=>i.cost?('约 '+i.cost+' 元以内'):'无需额外花费';

function toast(t){
  $('#toast').textContent=t;
  $('#toast').hidden=false;
  clearTimeout(timer);
  timer=setTimeout(()=>$('#toast').hidden=true,2800);
}

function save(id){
  saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
  try{localStorage.setItem('sparkSaved',JSON.stringify(saved))}catch{toast('浏览器未允许保存，收藏仅在本次访问保留')}
  render();
  if(last)show(last);
}

function render(){
  const list=ideas.filter(i=>filter==='all'||(filter==='saved'?saved.includes(i.id):i.type===filter));
  const count=$('#count');if(count)count.textContent=saved.length;
  $('#cards').innerHTML=list.length?list.map(i=>`<article class="tile"><div class="tile-icon" aria-hidden="true"><div class="tile-badges"><b>${timeText(i)}</b><b>${costText(i)}</b></div>${ideaArt(i.id)}</div><div class="tile-body"><h3>${i.title}</h3><p>${i.desc}</p><div class="actions"><button class="save" data-view="${i.id}">查看行动清单 ↗</button><button class="save" data-save="${i.id}" aria-pressed="${saved.includes(i.id)}">${saved.includes(i.id)?'♥ 已收藏':'♡ 收藏'}</button></div></div></article>`).join(''):'<p class="empty">还没有收藏。先在灵感卡片上点一下“收藏”，以后可以回来找。</p>';
  document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
}

function show(i){
  last=i;
  $('#result').hidden=false;
  $('#result').className='result';
  $('#result').innerHTML=`<span class="meta">你的今日行动清单 · ${timeText(i)} · ${costText(i)}</span><h3>${i.icon} ${i.title}</h3><p>${i.desc}</p><ol>${i.steps.map(s=>`<li>${s}</li>`).join('')}</ol><p class="notice">${i.cost?('这份计划预计花费约 '+i.cost+' 元以内。'):'用已有物品就能开始，无需购物。'}</p><div class="actions"><button class="primary" id="saveResult">${saved.includes(i.id)?'取消收藏':'收藏这个计划'}</button><button class="secondary" id="shareResult">分享计划</button><button class="secondary" id="download">下载灵感卡</button></div>`;
  $('#saveResult').onclick=()=>save(i.id);
  $('#shareResult').onclick=()=>share(`${i.title}\n${i.steps.map((s,n)=>`${n+1}. ${s}`).join('\n')}`);
  $('#download').onclick=()=>download(i);
}

async function share(text){
  const full=text+'\n来自生活灵感实验室\n'+location.href.split('#')[0];
  try{
    if(navigator.share){await navigator.share({title:'生活灵感实验室',text,url:location.href.split('#')[0]});return}
    await navigator.clipboard.writeText(full);
    toast('已复制，粘贴给朋友就能分享');
  }catch(e){
    if(e.name==='AbortError')return;
    const a=document.createElement('textarea');
    a.value=full;
    document.body.append(a);
    a.select();
    const ok=document.execCommand('copy');
    a.remove();
    toast(ok?'已复制分享内容':'复制不可用，请下载灵感卡后分享');
  }
}

function download(i){
  const c=document.createElement('canvas');
  c.width=1080;c.height=1350;
  const x=c.getContext('2d');
  x.fillStyle='#faf8f3';x.fillRect(0,0,1080,1350);
  x.fillStyle='#3f6ff0';x.fillRect(0,0,1080,120);
  x.fillStyle='#fff';x.font='bold 40px sans-serif';x.fillText('生活灵感实验室',90,80);
  x.fillStyle='#26222e';x.font='bold 44px sans-serif';x.fillText(i.title,90,205);
  const finish=()=>{
    x.fillStyle='#575165';x.font='28px sans-serif';
    let y=850;
    i.steps.forEach((s,n)=>{y=wrap(`${n+1}. ${s}`,90,y,880,50)+36});
    x.fillStyle='#8a8496';x.font='24px sans-serif';
    x.fillText(timeText(i)+' · '+costText(i),90,y+30);
    x.fillText('用一件小事，给今天一点新鲜感。',90,y+78);
    const a=document.createElement('a');
    a.download='今日灵感 · '+i.title+'.png';
    a.href=c.toDataURL('image/png');
    a.click();
  };
  const img=new Image();
  img.onload=()=>{
    x.fillStyle='#eef3ff';x.fillRect(90,250,900,520);
    x.drawImage(img,100,260,880,500);
    finish();
  };
  img.onerror=finish;
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(ideaArt(i.id));
  function wrap(t,px,py,max,line){
    let s='';
    for(const ch of t){
      if(x.measureText(s+ch).width>max){x.fillText(s,px,py);py+=line;s=ch}
      else s+=ch;
    }
    x.fillText(s,px,py);
    return py+line;
  }
}

$('#generate').onclick=()=>{
  const t=+$('#time').value,b=+$('#budget').value,m=$('#mood').value;
  let pool=ideas.filter(i=>i.type===m&&i.time<=t&&i.cost<=b);
  if(!pool.length)pool=ideas.filter(i=>i.time<=t&&i.cost<=b);
  if(!pool.length)pool=ideas.filter(i=>i.time<=t);
  if(!pool.length)pool=ideas;
  show(pool[Math.floor(Math.random()*pool.length)]);
};

const reduceMotion=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollToSection=element=>element.scrollIntoView({behavior:reduceMotion()?'auto':'smooth',block:'start'});

$('#start').onclick=()=>{scrollToSection($('#navs'));$('#search').focus({preventScroll:true})};

$('#shuffle').onclick=()=>{show(ideas[Math.floor(Math.random()*ideas.length)]);scrollToSection($('#planner'))};

$('#cards').onclick=e=>{
  const s=e.target.closest('[data-save]'),v=e.target.closest('[data-view]');
  if(s)save(+s.dataset.save);
  if(v){show(ideas[+v.dataset.view]);scrollToSection($('#planner'))}
};

document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render()});

const savedLink=$('#savedLink');if(savedLink)savedLink.onclick=()=>{filter='saved';render()};

const syncModeToggle=()=>{const dark=document.documentElement.dataset.mode==='dark';$('#modeToggle').setAttribute('aria-pressed',String(dark));$('#modeToggle').setAttribute('aria-label',dark?'切换到浅色模式':'切换到深色模式')};
syncModeToggle();
$('#modeToggle').onclick=()=>{
  const next=document.documentElement.dataset.mode==='dark'?'light':'dark';
  document.documentElement.dataset.mode=next;
  try{localStorage.setItem('sparkMode',next)}catch{}
  syncModeToggle();
};

const questions=['突然多出一小时，你更想……','什么时刻让你觉得今天很值得？','下个周末，你想给自己安排……'];
const answers=[['一个人慢慢喝杯茶','走一条没走过的小路','找朋友聊聊天'],['终于安静地做完一件小事','发现一个以前没注意的细节','和喜欢的人一起笑了'],['舒服的独处时光','没有目的地的小探索','一场轻松的小聚会']];
let q=0,scores=[0,0,0];

function quiz(){
  if(q===3){
    const m=Math.max(...scores);
    const tied=scores.map((s,i)=>s===m?i:-1).filter(i=>i>=0);
    const n=tied[Math.floor(Math.random()*tied.length)];
    const names=['蓝色 · 温柔充电家','黄色 · 日常探险家','绿色 · 快乐连接者'];
    const texts=['你的灵感往往来自放慢一点。给自己留一小块安静的时间。','你喜欢从熟悉的地方发现新意。带着好奇心，今天也有新风景。','你享受人与人之间的连接。从分享一首歌开始，让快乐流动。'];
    $('#quizbox').innerHTML=`<h3>${names[n]}</h3><p>${texts[n]}</p><p class="notice">结果来自本次选择，仅供娱乐。</p><div class="actions"><button class="primary" id="quizshare">分享我的颜色</button><button class="secondary" id="retry">再测一次</button></div>`;
    $('#quizshare').onclick=()=>share('我的生活灵感颜色是：'+names[n]+'。'+texts[n]);
    $('#retry').onclick=()=>{q=0;scores=[0,0,0];quiz()};
    return;
  }
  $('#quizbox').innerHTML=`<span class="meta">第 ${q+1} / 3 题</span><h3>${questions[q]}</h3><div class="quizopts">${answers[q].map((a,n)=>`<button data-answer="${n}">${a}</button>`).join('')}</div>`;
  document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{scores[+b.dataset.answer]++;q++;quiz()});
}

const SITE_CATS={web:['#tiles-web','#nav-web'],app:['#tiles-app','#nav-app'],tool:['#tiles-tool','#nav-tool'],media:['#tiles-media','#nav-media'],russia:['#tiles-russia','#nav-russia'],isu:['#tiles-isu','#nav-isu'],job:['#tiles-job','#nav-job'],parttime:['#tiles-parttime','#nav-parttime'],shop:['#tiles-shop','#nav-shop'],core:['#tiles-core','#nav-core'],ai:['#tiles-ai','#nav-ai']};
const hotMap=(()=>{try{return JSON.parse(localStorage.getItem('sparkHot')||'{}')}catch{return {}}})();
const favoriteKeys=new Set((()=>{try{const value=JSON.parse(localStorage.getItem('russianFavorites')||'[]');return Array.isArray(value)?value:[]}catch{return []}})());
const RESOURCE_GROUP_STATE={russia:'all',isu:'all'};
let favoritesOnly=false;
const RESOURCE_REVIEW_DATE='2026-10-28';
const hotCount=s=>hotMap[s.key]||0;
const siteHost=s=>{try{return new URL(s.url).hostname.replace(/^www\./,'')}catch{return ''}};
const siteIcon=(s,className='site-icon')=>{
  const host=siteHost(s);
  const initial=(s.name.trim()[0]||'·').toUpperCase();
  if(!host)return `<span class="${className}"><b>${initial}</b></span>`;
  const remote=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
  const origin=`https://${host}/favicon.ico`;
  const local=`assets/resource-icons/${s.key}.png`;
  const icon=local;
  const fallback=remote;
  const last=origin;
  return `<span class="${className}"><b>${initial}</b><img src="${icon}" alt="" loading="lazy" decoding="async" data-fallback="${fallback}" data-last="${last}" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;delete this.dataset.fallback}else if(this.dataset.last){this.src=this.dataset.last;delete this.dataset.last}else{this.remove()}"></span>`;
};
const siteTile=s=>{
  const c=hotCount(s);
  const favored=favoriteKeys.has(s.key);
  const host=siteHost(s);
  return `<article class="site${c>=2?' hot':''}${favored?' is-favorite':''}"><a class="site-main" href="${s.url}" target="_blank" rel="noopener" data-site="${s.key}" aria-label="${s.name}：${s.desc}。来源 ${host}，基础核验 ${RESOURCE_REVIEW_DATE}，在新窗口打开">${siteIcon(s)}${c>=2?'<span class="site-hot">常逛</span>':''}<span class="site-text"><b class="site-name">${s.name}</b>${s.tag?`<em class="site-badge">${s.tag}</em>`:''}<i class="site-desc">${s.desc}</i><small class="site-meta"><span>${host}</span><time datetime="${RESOURCE_REVIEW_DATE}">基础核验 ${RESOURCE_REVIEW_DATE}</time></small></span><span class="site-go" aria-hidden="true">↗</span></a><span class="site-actions"><button class="site-favorite" type="button" data-favorite="${s.key}" aria-label="${favored?'取消收藏':'收藏'} ${s.name}" aria-pressed="${favored}"><span aria-hidden="true">★</span></button><button class="site-report" type="button" data-report="${s.key}" aria-label="报告 ${s.name} 链接失效"><span aria-hidden="true">!</span></button></span></article>`;
};

function renderSites(q){
  q=(q||'').trim().toLowerCase();
  let total=0;
  for(const cat in SITE_CATS){
    const group=RESOURCE_GROUP_STATE[cat]||'all';
    const list=sites.filter(s=>s.cat===cat&&(group==='all'||s.group===group)&&(!favoritesOnly||favoriteKeys.has(s.key))&&(!q||(s.name+s.desc).toLowerCase().includes(q)));
    const [el,panel]=SITE_CATS[cat];
    $(el).innerHTML=list.map(siteTile).join('');
    $(panel).hidden=!list.length;
    total+=list.length;
  }
  $('#noHit').hidden=total>0;
  $('#noHit').textContent=favoritesOnly?'还没有收藏资源。点击资源右侧的星标，就能在这里快速找到。':'没找到相关条目，换个词试试？';
  $('#favoriteCount').textContent=favoriteKeys.size;
  $('#favoriteToggle').classList.toggle('active',favoritesOnly);
  $('#favoriteToggle').setAttribute('aria-pressed',String(favoritesOnly));
  $('#resourceStatus').textContent=`${favoritesOnly?'收藏中 ':''}${total} 个入口`;
}

function renderHeroCats(){
  $('#heroApplist').innerHTML=[['isu','伊尔库茨克国立大学','#nav-isu'],['web','系统课程','#nav-web'],['app','词典翻译','#nav-app'],['tool','听说输入','#nav-tool'],['media','语言交流','#nav-media'],['russia','俄罗斯留学必备','#nav-russia'],['job','俄语求职','#nav-job'],['parttime','留学兼职','#nav-parttime'],['shop','全球社交','#nav-shop'],['core','公开资料','#nav-core'],['ai','学习工具','#nav-ai']].map(([c,n,h])=>{
    const s=sites.find(x=>x.cat===c);
    return `<a class="hap" href="${h}">${siteIcon(s,'hap-ico')}<b>${n}</b><i>${sites.filter(x=>x.cat===c).length} 个入口</i></a>`;
  }).join('');
}

function hot(s){hotMap[s.key]=(hotMap[s.key]||0)+1;try{localStorage.setItem('sparkHot',JSON.stringify(hotMap))}catch{}}
document.addEventListener('click',e=>{
  const resourceFilter=e.target.closest('[data-resource-filter]');
  if(resourceFilter){
    const cat=resourceFilter.dataset.resourceFilter;
    if(!(cat in RESOURCE_GROUP_STATE))return;
    RESOURCE_GROUP_STATE[cat]=resourceFilter.dataset.resourceGroup||'all';
    document.querySelectorAll(`[data-resource-filter="${cat}"]`).forEach(button=>{
      const active=button===resourceFilter;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    renderSites($('#search').value);
    return;
  }
  const report=e.target.closest('[data-report]');
  if(report){
    const s=sites.find(item=>item.key===report.dataset.report);
    if(s){
      const title=`[失效资源] ${s.name}`;
      const body=`资源名称：${s.name}\n当前地址：${s.url}\n发现日期：\n问题说明：`;
      window.open(`https://github.com/russianhub/opensource-sites/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`,'_blank','noopener');
    }
    return;
  }
  const favorite=e.target.closest('[data-favorite]');
  if(favorite){
    const key=favorite.dataset.favorite;
    favoriteKeys.has(key)?favoriteKeys.delete(key):favoriteKeys.add(key);
    try{localStorage.setItem('russianFavorites',JSON.stringify([...favoriteKeys]))}catch{}
    renderSites($('#search').value);
    toast(favoriteKeys.has(key)?'已加入我的收藏':'已取消收藏');
    return;
  }
  const t=e.target.closest('[data-site]');
  if(t){
    const s=sites.find(x=>x.key===t.dataset.site);
    if(s){
      hot(s);
      if(hotCount(s)>=2){
        t.classList.add('hot');
        if(!t.querySelector('.site-hot'))t.querySelector('.site-icon').insertAdjacentHTML('afterend','<span class="site-hot">常逛</span>');
      }
    }
  }
});

renderSites();
renderHeroCats();
const alignHashTarget=()=>{
  const raw=location.hash.slice(1);
  let id=raw;
  try{id=decodeURIComponent(raw)}catch{}
  const target=id&&document.getElementById(id);
  if(target)target.scrollIntoView({behavior:'auto',block:'start'});
};
if(location.hash)requestAnimationFrame(alignHashTarget);
window.addEventListener('hashchange',alignHashTarget);
$('#favoriteToggle').onclick=()=>{favoritesOnly=!favoritesOnly;renderSites($('#search').value)};
$('#search').oninput=e=>{const v=e.target.value;$('#searchClear').hidden=!v;renderSites(v)};
$('#searchClear').onclick=()=>{$('#search').value='';$('#searchClear').hidden=true;renderSites('');$('#search').focus()};
const ENGINES={baidu:'https://www.baidu.com/s?wd=',bing:'https://cn.bing.com/search?q=',yandex:'https://yandex.com/search/?text=',google:'https://www.google.com/search?q=',youtube:'https://www.youtube.com/results?search_query='};
let curEngine='baidu';
document.querySelectorAll('.engine-chip').forEach(b=>{b.setAttribute('aria-pressed',String(b.classList.contains('active')));b.onclick=()=>{curEngine=b.dataset.engine;document.querySelectorAll('.engine-chip').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))})}});
$('#superForm').onsubmit=e=>{e.preventDefault();const q=$('#superQ').value.trim();if(!q)return;window.open(ENGINES[curEngine]+encodeURIComponent(q),'_blank','noopener')};
$('#randSite').onclick=()=>{
  const s=sites[Math.floor(Math.random()*sites.length)];
  hot(s);
  toast('正在打开：'+s.name);
  window.open(s.url,'_blank','noopener');
};
document.querySelectorAll('.cchip').forEach(b=>b.onclick=()=>scrollToSection(document.getElementById(b.dataset.target)));
const spy=new IntersectionObserver(es=>{
  es.forEach(en=>{
    if(!en.isIntersecting)return;
    document.querySelectorAll('.cchip').forEach(b=>{const active=b.dataset.target===en.target.id;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
  });
},{rootMargin:'-35% 0px -55% 0px'});
['navs','nav-web','nav-app','nav-tool','nav-media','nav-russia','nav-isu','nav-job','nav-parttime','nav-shop','nav-core','nav-ai'].forEach(id=>spy.observe(document.getElementById(id)));

const DAILY_PHRASES=[
  {ru:'Маленький шаг — тоже движение.',zh:'一小步，也是在前进。',note:'适合提醒自己：语言学习不需要一次完成很多。'},
  {ru:'Я учусь говорить свободнее.',zh:'我正在学习说得更自如。',note:'учусь + 动词不定式：表示“正在学习做某事”。'},
  {ru:'Ошибки помогают мне расти.',zh:'错误帮助我成长。',note:'ошибка 是“错误”，复数主格是 ошибки。'},
  {ru:'Давайте говорить по-русски.',zh:'让我们说俄语吧。',note:'Давайте + 动词不定式：一起做某事的常用邀请。'},
  {ru:'Сегодня я узнаю что-то новое.',zh:'今天我会学到一点新东西。',note:'что-то 表示“某个东西、某件事”。'},
  {ru:'Повторение — мать учения.',zh:'重复是学习之母。',note:'常见俄语谚语，强调复习的重要性。'},
  {ru:'Не бойтесь задавать вопросы.',zh:'不要害怕提问题。',note:'не бойтесь 是礼貌或复数形式的“不要害怕”。'}
];
const studyNow=new Date();
const studyDay=[studyNow.getFullYear(),String(studyNow.getMonth()+1).padStart(2,'0'),String(studyNow.getDate()).padStart(2,'0')].join('-');
const studyKey='russianStudy:'+studyDay;
const studyHistoryKey='russianStudyHistory';
let phraseOffset=0;
let studyDone=[];
let studyHistory=[];
try{studyDone=JSON.parse(localStorage.getItem(studyKey)||'[]');if(!Array.isArray(studyDone))studyDone=[]}catch{}
try{studyHistory=JSON.parse(localStorage.getItem(studyHistoryKey)||'[]');if(!Array.isArray(studyHistory))studyHistory=[]}catch{}
const localDay=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
function studyStreak(){
  const done=new Set(studyHistory);
  const cursor=new Date();
  if(!done.has(localDay(cursor)))cursor.setDate(cursor.getDate()-1);
  let count=0;
  while(done.has(localDay(cursor))){count++;cursor.setDate(cursor.getDate()-1)}
  return count;
}
function renderPhrase(){
  const base=Math.floor(new Date(studyDay+'T00:00:00Z').getTime()/86400000);
  const p=DAILY_PHRASES[(base+phraseOffset)%DAILY_PHRASES.length];
  $('#study-title').textContent=p.ru;$('#phraseZh').textContent=p.zh;$('#phraseNote').textContent=p.note;
}
function renderStudy(){
  if(studyDone.length===4&&!studyHistory.includes(studyDay)){
    studyHistory=[...studyHistory,studyDay].slice(-366);
    try{localStorage.setItem(studyHistoryKey,JSON.stringify(studyHistory))}catch{}
  }
  document.querySelectorAll('[data-study-task]').forEach(b=>{const on=studyDone.includes(b.dataset.studyTask);b.classList.toggle('done',on);b.setAttribute('aria-pressed',on)});
  $('#studyProgress').textContent=`${studyDone.length} / 4`;
  $('#studyStreak').textContent=`连续 ${studyStreak()} 天`;
  $('#studyMeter').style.width=(studyDone.length*25)+'%';
  $('#studySaved').textContent=studyDone.length===4?'今天的学习完成了。做得很好，明天再继续。':'完成情况只保存在当前浏览器。';
}
document.querySelectorAll('[data-study-task]').forEach(b=>b.onclick=()=>{
  const k=b.dataset.studyTask;studyDone=studyDone.includes(k)?studyDone.filter(x=>x!==k):[...studyDone,k];
  try{localStorage.setItem(studyKey,JSON.stringify(studyDone))}catch{}renderStudy();
});
$('#nextPhrase').onclick=()=>{phraseOffset=(phraseOffset+1)%DAILY_PHRASES.length;renderPhrase()};
$('#speakPhrase').onclick=()=>{
  if(!('speechSynthesis' in window)){toast('当前浏览器不支持语音朗读');return}
  window.speechSynthesis.cancel();const u=new window.SpeechSynthesisUtterance($('#study-title').textContent);u.lang='ru-RU';u.rate=.82;window.speechSynthesis.speak(u);
};
$('#sharePhrase').onclick=async()=>{
  const ru=$('#study-title').textContent;
  const zh=$('#phraseZh').textContent;
  const text=`今日俄语：${ru}\n${zh}\n\n和我一起在俄语星球每天学一点。`;
  const url='https://russianhub.github.io/opensource-sites/#study-desk';
  try{
    if(navigator.share){await navigator.share({title:'俄语星球 · 今日俄语',text,url});return}
    await navigator.clipboard.writeText(`${text}\n${url}`);toast('今日俄语已复制，可以分享给朋友');
  }catch(e){if(e.name!=='AbortError')window.prompt('复制下面的内容分享给朋友',`${text}\n${url}`)}
};

let installPrompt;
const installButton=$('#installApp');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButton.hidden=false});
installButton.onclick=async()=>{
  if(!installPrompt)return;
  installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true;
};
window.addEventListener('appinstalled',()=>{installButton.hidden=true;toast('俄语星球已安装到设备')});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

render();
quiz();
renderPhrase();
renderStudy();
