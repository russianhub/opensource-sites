(function(){
  const LANGS=['zh','en','ru'];
  const HTML_LANG={zh:'zh-CN',en:'en',ru:'ru'};
  const OG_LOCALE={zh:'zh_CN',en:'en_US',ru:'ru_RU'};
  const STORAGE='sparkLang';
  const dict=(window.SPARK_I18N)||{en:{},ru:{}};
  const extra={
    en:{
      '俄语学习,俄语词典,俄语翻译,俄语入门,俄语资源,找语伴,旁译输入法':'Russian learning, Russian dictionaries, Russian translation, beginner Russian, Russian resources, language partners, Pangyi input',
      '俄语星球：171 个精选俄语学习与留学资源，每条都有推荐理由和评级':'Russian Hub: 171 picked resources for learning Russian and studying in Russia, each with a reason and a rating',
      '下载旁译':'Download Pangyi',
      '备用下载':'Backup download',
      '开源仓库':'Source code',
      '更新于':'Updated',
      '输入法本体完全离线、不联网。更新提醒由独立更新程序完成，只查询版本清单，可在设置中关闭。':'The input method itself is fully offline and does not connect to the network. Update reminders are done by a separate updater, which only checks the version manifest and can be turned off in Settings.',
      '首次运行若出现 SmartScreen 提示，点「更多信息」→「仍要运行」（个人开发者，暂未购买代码签名证书）。安装后重启已打开的软件，按 Win + 空格 切换到「旁译」。':'On first launch SmartScreen may show a warning — click “More info” → “Run anyway” (independent developer, no code-signing certificate yet). After installing, restart open apps and press Win + Space to switch to Pangyi.'
    },
    ru:{
      '俄语学习,俄语词典,俄语翻译,俄语入门,俄语资源,找语伴,旁译输入法':'изучение русского, словари, перевод, русский для начинающих, ресурсы, языковые партнёры, ввод Pangyi',
      '俄语星球：171 个精选俄语学习与留学资源，每条都有推荐理由和评级':'Русская планета: 171 отобранных ресурсов для изучения русского и учёбы в России, и у каждого есть причина и оценка',
      '171 个入口，分成学语言、在俄生活、软件和资料。打开的是各网站自己的页面。':'171 записей: изучение языка, жизнь в России, программы и материалы. Каждая ссылка открывает страницу самого сайта.',
      '下载旁译':'Скачать Pangyi',
      '备用下载':'Запасная загрузка',
      '开源仓库':'Исходный код',
      '更新于':'Обновлено',
      '输入法本体完全离线、不联网。更新提醒由独立更新程序完成，只查询版本清单，可在设置中关闭。':'Сам метод ввода полностью офлайн и не выходит в сеть. Напоминания об обновлении делает отдельная программа: она только проверяет список версий, и это можно отключить в настройках.',
      '首次运行若出现 SmartScreen 提示，点「更多信息」→「仍要运行」（个人开发者，暂未购买代码签名证书）。安装后重启已打开的软件，按 Win + 空格 切换到「旁译」。':'При первом запуске SmartScreen может показать предупреждение — нажмите «Подробнее» → «Выполнить в любом случае» (независимый разработчик, сертификата подписи кода пока нет). После установки перезапустите открытые программы и нажмите Win + Пробел, чтобы переключиться на Pangyi.'
    }
  };
  for(const code of ['en','ru']) Object.assign(dict[code]||(dict[code]={}), extra[code]);
  const keys={};
  const patterns={
    en:[
      [/^收藏中 (\d+) 个入口$/,(_,n)=>`Favorites · ${n}`],
      [/^(\d+) 个入口$/,(_,n)=>`${n} entries`],
      [/^(\d+) 个$/,(_,n)=>String(n)],
      [/^连续 (\d+) 天$/,(_,n)=>`${n}-day streak`],
      [/^第 (\d+) \/ (\d+) 题$/,(_,n,total)=>`Question ${n} of ${total}`],
      [/^约 (\d+) 元以内$/,(_,n)=>`About ¥${n} or less`],
      [/^(\d+) 分钟$/,(_,n)=>`${n} min`],
      [/^(.+?) · 基础核验 (\d{4}-\d{2}-\d{2})$/,(_,host,date)=>`${host} · Reviewed ${date}`],
      [/^基础核验 (\d{4}-\d{2}-\d{2})$/,(_,date)=>`Reviewed ${date}`],
      [/^推荐 (\d+) 分。$/,(_,n)=>`Rated ${n} of 5. `],
      [/^今天已完成 (\d+) 项，还剩 (\d+) 项轻量学习任务。$/,(_,done,left)=>`${done} of today’s tasks done, ${left} light tasks left.`],
      [/^最佳 (\d+) \/ (\d+)$/,(_,score,total)=>`Best ${score} / ${total}`],
      [/^从 ([A-C][12]) 附近的语法开始，用6道题检查理解。$/,(_,level)=>`Start near ${level} grammar and check it with 6 questions.`],
      [/^删除“(.+)”吗？$/,(_,term)=>`Delete “${term}”?`],
      [/^下次：(.+)$/,(_,when)=>`Next: ${when}`],
      [/^正在打开：(.+)$/,(_,name)=>`Opening: ${tr(name)}`],
      [/^收藏 (.+)$/,(_,name)=>`Save ${tr(name)}`],
      [/^取消收藏 (.+)$/,(_,name)=>`Unsave ${tr(name)}`],
      [/^报告 (.+) 链接失效$/,(_,name)=>`Report a broken link: ${tr(name)}`],
      [/^(.+) 图标$/,(_,name)=>`${tr(name)} icon`]
    ],
    ru:[
      [/^收藏中 (\d+) 个入口$/,(_,n)=>`В избранном · ${ruCount(n)}`],
      [/^(\d+) 个入口$/,(_,n)=>ruCount(n)],
      [/^(\d+) 个$/,(_,n)=>String(n)],
      [/^连续 (\d+) 天$/,(_,n)=>`${n} дн. подряд`],
      [/^第 (\d+) \/ (\d+) 题$/,(_,n,total)=>`Вопрос ${n} из ${total}`],
      [/^约 (\d+) 元以内$/,(_,n)=>`Примерно до ${n} юаней`],
      [/^(\d+) 分钟$/,(_,n)=>`${n} мин`],
      [/^(.+?) · 基础核验 (\d{4}-\d{2}-\d{2})$/,(_,host,date)=>`${host} · Проверено ${date}`],
      [/^基础核验 (\d{4}-\d{2}-\d{2})$/,(_,date)=>`Проверено ${date}`],
      [/^推荐 (\d+) 分。$/,(_,n)=>`Оценка ${n} из 5. `],
      [/^今天已完成 (\d+) 项，还剩 (\d+) 项轻量学习任务。$/,(_,done,left)=>`Сегодня готово ${done}, осталось ${left} коротких заданий.`],
      [/^最佳 (\d+) \/ (\d+)$/,(_,score,total)=>`Лучший результат ${score} / ${total}`],
      [/^从 ([A-C][12]) 附近的语法开始，用6道题检查理解。$/,(_,level)=>`Начните с грамматики около ${level} и проверьте её 6 вопросами.`],
      [/^删除“(.+)”吗？$/,(_,term)=>`Удалить «${term}»?`],
      [/^下次：(.+)$/,(_,when)=>`Дальше: ${when}`],
      [/^正在打开：(.+)$/,(_,name)=>`Открываю: ${tr(name)}`],
      [/^收藏 (.+)$/,(_,name)=>`Сохранить ${tr(name)}`],
      [/^取消收藏 (.+)$/,(_,name)=>`Убрать ${tr(name)}`],
      [/^报告 (.+) 链接失效$/,(_,name)=>`Сообщить о битой ссылке: ${tr(name)}`],
      [/^(.+) 图标$/,(_,name)=>`Значок ${tr(name)}`]
    ]
  };

  function ruCount(value){
    const n=Number(value);
    const mod10=n%10, mod100=n%100;
    if(mod10===1&&mod100!==11) return `${n} запись`;
    if(mod10>=2&&mod10<=4&&(mod100<12||mod100>14)) return `${n} записи`;
    return `${n} записей`;
  }

  let lang=readLang();

  function readLang(){
    const query=new URLSearchParams(location.search).get('lang');
    if(LANGS.includes(query)){
      try{localStorage.setItem(STORAGE,query)}catch(error){}
      return query;
    }
    try{
      const saved=localStorage.getItem(STORAGE);
      if(LANGS.includes(saved)) return saved;
    }catch(error){}
    return 'zh';
  }

  function table(){return dict[lang]||{}}

  function phraseKeys(){
    if(!keys[lang]) keys[lang]=Object.keys(table()).filter(key=>key.length>=2).sort((a,b)=>b.length-a.length);
    return keys[lang];
  }

  function applyPattern(text){
    for(const [pattern,replace] of patterns[lang]||[]){
      if(!pattern.test(text)) continue;
      return text.replace(pattern,replace);
    }
    return null;
  }

  function phraseReplace(text){
    let next=text;
    for(const key of phraseKeys()){
      if(next.includes(key)) next=next.split(key).join(table()[key]);
    }
    return next;
  }

  function tr(text){
    const value=String(text??'');
    if(!value||lang==='zh') return value;
    let next=value;
    if(Object.prototype.hasOwnProperty.call(table(),value)) next=table()[value];
    else{
      const patterned=applyPattern(value);
      next=patterned!=null?patterned:(/[\u4e00-\u9fff]/.test(value)?phraseReplace(value):value);
    }
    if(/[，。：、]|[\u4e00-\u9fff]|\d+\s*分/.test(next)) next=cleanup(next);
    if(/[：:]$/.test(value) && next && !/\s$/.test(next)) next+=' ';
    return next;
  }

  function cleanup(text){
    return text
      .replace(/(\d+)\s*分/g,'$1/5')
      .replace(/，/g,', ')
      .replace(/。/g,'. ')
      .replace(/：/g,': ')
      .replace(/、/g,', ')
      .replace(/[ \t]{2,}/g,' ')
      .trim();
  }

  function trAll(text){
    const value=String(text??'');
    const found=new Set([value]);
    const current=lang;
    for(const code of ['en','ru']){
      lang=code;
      found.add(tr(value));
    }
    lang=current;
    return [...found];
  }

  const SKIP=new Set(['SCRIPT','STYLE']);
  const originalText=new WeakMap();
  const originalAttr=new WeakMap();
  let applying=false;
  let job=0;
  let pending=false;

  function skipped(element){
    return !element||SKIP.has(element.tagName)||element.closest('[data-i18n-skip]');
  }

  function sourceAttr(element,attr){
    let bag=originalAttr.get(element);
    if(!bag) originalAttr.set(element,bag={});
    if(!Object.prototype.hasOwnProperty.call(bag,attr)) bag[attr]=element.getAttribute(attr);
    return bag[attr];
  }

  function translateText(node){
    const parent=node.parentElement;
    if(skipped(parent)) return;
    if(!originalText.has(node)){
      const raw=node.nodeValue;
      if(!raw||!/[\u4e00-\u9fff]/.test(raw)) return;
      originalText.set(node,raw);
    }
    const source=originalText.get(node);
    const lead=source.match(/^\s*/)[0];
    const trail=source.match(/\s*$/)[0];
    const value=lead+tr(source.trim())+trail;
    if(node.nodeValue===value) return;
    node.nodeValue=value;
  }

  function translateElement(element){
    if(!element||skipped(element)) return;
    for(const attr of ['placeholder','aria-label','aria-description','alt','title']){
      if(!element.hasAttribute(attr)) continue;
      const source=sourceAttr(element,attr);
      if(source==null) continue;
      const next=tr(source);
      if(element.getAttribute(attr)===next) continue;
      element.setAttribute(attr,next);
    }
    if(element.tagName==='META'){
      const name=(element.getAttribute('name')||element.getAttribute('property')||'');
      if(/description|title|alt|keywords|og:|twitter:/.test(name)&&name!=='og:locale'&&element.hasAttribute('content')){
        const source=sourceAttr(element,'content');
        const next=tr(source);
        if(element.getAttribute('content')!==next) element.setAttribute('content',next);
      }
    }
  }

  function collectPage(){
    const items=[];
    const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{
      acceptNode(node){
        if(node.nodeType===3) return skipped(node.parentElement)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
        if(SKIP.has(node.tagName)||node.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    items.push(document.documentElement);
    while(walker.nextNode()) items.push(walker.currentNode);
    return items;
  }

  function scheduleTranslate(){
    const token=++job;
    const items=collectPage();
    let index=0;
    function step(){
      if(token!==job) return;
      const end=Math.min(items.length,index+40);
      applying=true;
      for(;index<end;index++){
        const node=items[index];
        if(node.nodeType===3) translateText(node);
        else translateElement(node);
      }
      requestAnimationFrame(()=>{
        if(token!==job) return;
        applying=false;
        if(index<items.length) step();
        else {
          polishInitials(document);
          if(pending){pending=false;scheduleTranslate()}
        }
      });
    }
    step();
  }

  function polishInitials(root){
    if(lang==='zh'||!root||!root.querySelectorAll) return;
    root.querySelectorAll('.site-icon > b, .hap-ico > b').forEach(node=>{
      if(node.closest('[data-i18n-skip]')) return;
      const img=node.parentElement&&node.parentElement.querySelector('img');
      if(!img) return;
      const alt=(img.getAttribute('alt')||'').replace(/\s+icon$/i,'').replace(/^Значок\s+/,'');
      const letter=(alt.trim()[0]||'').toUpperCase();
      if(!letter||/[\u4e00-\u9fff]/.test(letter)||node.textContent===letter) return;
      applying=true;
      node.textContent=letter;
      applying=false;
    });
  }

  function mountSwitch(nav){
    if(!nav||nav.querySelector('.lang-switch')) return;
    const group=document.createElement('div');
    group.className='lang-switch';
    group.setAttribute('data-i18n-skip','');
    group.setAttribute('role','group');
    group.setAttribute('aria-label',tr('语言'));
    const names={zh:'中文',en:'EN',ru:'RU'};
    for(const code of LANGS){
      const button=document.createElement('button');
      button.type='button';
      button.dataset.lang=code;
      button.textContent=names[code];
      button.setAttribute('aria-pressed',String(code===lang));
      button.addEventListener('click',()=>{
        if(code===lang) return;
        const url=new URL(location.href);
        if(code==='zh') url.searchParams.delete('lang');
        else url.searchParams.set('lang',code);
        history.replaceState(null,'',url);
        applyLanguage(code);
      });
      group.append(button);
    }
    const right=nav.querySelector(':scope > .nav-top .nav-right')||nav.querySelector('.nav-right');
    if(right) right.prepend(group);
    else {
      const top=nav.querySelector('.nav-top')||nav;
      top.append(group);
    }
  }

  function tuneBrand(){
    document.querySelectorAll('.brand small').forEach(node=>{
      node.setAttribute('data-i18n-skip','');
      node.textContent=lang==='en'?'Learn Russian':'Russian Hub';
    });
  }

  function refreshDynamic(){
    const search=document.querySelector('#search');
    if(typeof renderSites==='function') renderSites(search?search.value:'');
    if(typeof renderHeroCats==='function') renderHeroCats();
  }

  function applyLanguage(code){
    if(!LANGS.includes(code)||code===lang) return;
    lang=code;
    try{localStorage.setItem(STORAGE,code)}catch(error){}
    document.documentElement.lang=HTML_LANG[lang];
    document.documentElement.dataset.lang=lang;
    const locale=document.querySelector('meta[property="og:locale"]');
    if(locale) locale.setAttribute('content',OG_LOCALE[lang]);
    document.querySelectorAll('.lang-switch button').forEach(button=>{
      button.setAttribute('aria-pressed',String(button.dataset.lang===lang));
    });
    tuneBrand();
    refreshDynamic();
    scheduleTranslate();
  }

  function walkAdded(root){
    if(!root||skipped(root)) return;
    applying=true;
    if(root.nodeType===3) translateText(root);
    else{
      translateElement(root);
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{
        acceptNode(node){
          if(node.nodeType===3) return skipped(node.parentElement)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
          if(SKIP.has(node.tagName)||node.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      while(walker.nextNode()){
        const node=walker.currentNode;
        if(node.nodeType===3) translateText(node);
        else translateElement(node);
      }
    }
    applying=false;
  }

  window.sparkTr=tr;
  window.sparkTrAll=trAll;
  window.sparkLang=()=>lang;
  document.querySelectorAll('[id^="tiles-"], #heroApplist').forEach(element=>element.setAttribute('data-i18n-skip',''));
  document.documentElement.lang=HTML_LANG[lang];
  document.documentElement.dataset.lang=lang;
  const locale=document.querySelector('meta[property="og:locale"]');
  if(locale) locale.setAttribute('content',OG_LOCALE[lang]);
  mountSwitch(document.querySelector('nav'));
  tuneBrand();
  if(lang!=='zh'){
    refreshDynamic();
    scheduleTranslate();
  }

  const observer=new MutationObserver(records=>{
    if(applying){pending=true;return}
    if(lang==='zh') return;
    for(const record of records){
      if(record.type==='characterData') translateText(record.target);
      else if(record.type==='attributes') translateElement(record.target);
      else record.addedNodes.forEach(node=>{
        if(node.nodeType===3) translateText(node);
        else if(node.nodeType===1) walkAdded(node);
      });
    }
  });
  observer.observe(document.documentElement,{
    subtree:true,
    childList:true,
    characterData:true,
    attributes:true,
    attributeFilter:['placeholder','aria-label','aria-description','alt','title','content']
  });

})();
