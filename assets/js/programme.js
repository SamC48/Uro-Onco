/* Uro-Onco 2027 – standalone programme interactions */
(()=>{
  "use strict";
  const root=document.querySelector('[data-uo-programme]');
  if(!root) return;
  const PROGRAMME=[{"day": "Friday", "date": "28 May 2027", "short": "FRI 28", "items": [{"start": "14:00", "end": "18:00", "title": "Exhibition Setup", "type": "exhibition", "description": "Exhibition setup period."}]}, {"day": "Saturday", "date": "29 May 2027", "short": "SAT 29", "items": [{"start": "07:30", "end": "", "title": "Registration Opens", "type": "registration", "description": "Delegate registration opens."}, {"start": "08:00", "end": "09:00", "title": "Breakfast Networking", "type": "networking", "description": "Breakfast networking."}, {"start": "09:00", "end": "12:00", "title": "Conference", "type": "conference", "description": "Morning conference session."}, {"start": "12:00", "end": "13:00", "title": "Networking Lunch", "type": "networking", "description": "Networking lunch."}, {"start": "13:00", "end": "17:15", "title": "Conference", "type": "conference", "description": "Afternoon conference session."}, {"start": "17:15", "end": "18:00", "title": "Pre-dinner Refreshments", "type": "networking", "description": "Pre-dinner refreshments."}, {"start": "18:00", "end": "21:30", "title": "Casual Networking Dinner", "type": "networking", "description": "Casual networking dinner."}]}, {"day": "Sunday", "date": "30 May 2027", "short": "SUN 30", "items": [{"start": "07:45", "end": "", "title": "Registration Opens", "type": "registration", "description": "Delegate registration opens."}, {"start": "08:00", "end": "09:00", "title": "Breakfast Networking", "type": "networking", "description": "Breakfast networking."}, {"start": "09:00", "end": "12:20", "title": "Conference", "type": "conference", "description": "Conference session."}, {"start": "12:20", "end": "12:30", "title": "Conference Close", "type": "conference", "description": "Conference close."}]}];

  const filters=root.querySelector('[data-programme-filters]');
  const feed=root.querySelector('[data-programme-feed]');
  const count=root.querySelector('[data-programme-count]');
  const kinds=[['all','All events'],['conference','Scientific programme'],['networking','Networking'],['registration','Registration'],['exhibition','Exhibition']];
  let active='all';
  function render(){
    filters.replaceChildren();
    kinds.forEach(([id,label])=>{
      const btn=document.createElement('button');
      btn.type='button'; btn.className='filter-btn'+(active===id?' active':'');
      btn.setAttribute('aria-pressed',String(active===id));
      btn.textContent=label;
      btn.addEventListener('click',()=>{active=id;render();});
      filters.append(btn);
    });
    feed.replaceChildren();
    let total=0;
    PROGRAMME.forEach(day=>{
      const items=day.items.filter(e=>active==='all'||e.type===active);
      if(!items.length)return;
      total+=items.length;
      const section=document.createElement('section');section.className='rail-wrap';
      const heading=document.createElement('h2');heading.className='date-title';
      const dayName=document.createElement('span');dayName.textContent=day.day;
      heading.append(dayName,document.createTextNode(day.date));section.append(heading);
      const entries=document.createElement('div');
      items.forEach(e=>{
        const entry=document.createElement('div');entry.className='rail-entry';
        const time=document.createElement('div');time.className='rail-time';time.textContent=e.start;
        const rail=document.createElement('div');rail.className='rail-line';rail.setAttribute('aria-hidden','true');
        const btn=document.createElement('button');btn.type='button';btn.className='rail-card clickcard';
        btn.setAttribute('aria-expanded','false');
        const header=document.createElement('div');header.className='d-flex justify-content-between gap-3';
        const info=document.createElement('div');
        const pill=document.createElement('span');pill.className='pill '+e.type;pill.textContent=e.type;
        const title=document.createElement('h3');title.className='mt-3 mb-1';title.textContent=e.title;
        const duration=document.createElement('div');duration.className='rail-sub';duration.textContent=e.end?`${e.start} – ${e.end}`:`From ${e.start}`;
        info.append(pill,title,duration);
        const plus=document.createElement('i');plus.className='bi bi-plus-lg plus';plus.setAttribute('aria-hidden','true');
        header.append(info,plus);
        const details=document.createElement('div');details.className='details';details.hidden=true;details.textContent=e.description;
        btn.append(header,details);
        btn.addEventListener('click',()=>{const expanded=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!expanded));details.hidden=expanded;});
        entry.append(time,rail,btn);entries.append(entry);
      });
      section.append(entries);feed.append(section);
    });
    if(total===0){const empty=document.createElement('div');empty.className='empty';empty.textContent='No events match this filter.';feed.append(empty);}
    count.textContent=`${total} programme item${total===1?'':'s'}`;
  }
  render();
})();
