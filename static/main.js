const Qs = [
  {q:"What time do you typically wake up?",opts:["After 9am, feeling refreshed","8am, like a functional human","6am with mild dread","4am because sleep is a lie"],s:[0,1,2,4]},
  {q:"When someone says 'Have a great day!', you think:",opts:["Thanks, you too!","Mild smile, carry on","They're performing for society","Great for who? On what timeline?"],s:[0,1,3,5]},
  {q:"Your ideal weekend activity:",opts:["Brunch with friends, afternoon hike","Netflix and a good meal","Reading alone, minimal contact","Sitting in dim light contemplating entropy"],s:[0,1,3,5]},
  {q:"How do you feel about the future?",opts:["Genuinely optimistic","Cautiously hopeful","Deep unease, but managing","It won't exist by then, so irrelevant"],s:[0,1,3,5]},
  {q:"How many energy drinks have you had today?",opts:["Zero, I drink water","One, for a meeting","Two, getting through it","I've lost count. They're structural."],s:[0,1,3,5]},
  {q:"Your go-to music when alone:",opts:["Pop, something upbeat","Indie, pretty chill","Post-punk, shoegaze, slow decay","Drone ambient at 3am while staring at the ceiling"],s:[0,1,3,5]},
  {q:"What's on your mug right now?",opts:["'World's Okayest Person'","A nice plain mug","Something ironic and dark","COPIUM – Extra Strong"],s:[0,1,3,5]},
  {q:"You see someone laughing loudly in public. Your reaction:",opts:["Smile, it's contagious","Neutral, no strong feeling","Mild irritation","They'll understand eventually"],s:[0,1,2,4]},
  {q:"When did you last feel genuine excitement about something?",opts:["This week","This month","This year, maybe","I have to check the archives"],s:[0,2,3,5]},
  {q:"A friend invites you to a party. You:",opts:["Show up early and stay late","Go, leave at a reasonable hour","Agree, then cancel at 7:30pm","Reply three days later saying 'maybe'"],s:[0,1,3,5]},
  {q:"Your diet could best be described as:",opts:["Balanced, intentional, seasonal","Whatever's convenient","Coffee + cigarettes + protein","Whey + energy drink + ambient regret"],s:[0,1,3,5]},
  {q:"What do you think about going to the gym?",opts:["Love it, community and health","Good habit, nothing more","Going to look better (no one cares)","Temporary illusion of control before oblivion"],s:[0,1,3,5]},
  {q:"What's written on the wall above your bed (metaphorically)?",opts:["Motivational quote, goals","Nothing, I prefer blank walls","Something vaguely ominous I hung ironically","THE BEST MEMORIES ARE ALREADY BEHIND YOU"],s:[0,1,3,5]},
  {q:"Your relationship with your cat:",opts:["Pure joy, they complete me","Love them, great company","They understand me like no human can","The only entity I trust. We have an agreement."],s:[0,1,3,5]},
  {q:"What's your relationship with nostalgia?",opts:["I enjoy the present too much to dwell","Nice to remember, but forward-looking","The past was better in many concrete ways","It was better back then. I have a framed photo."],s:[0,1,3,5]},
  {q:"How do you feel when you open the news?",opts:["Informed and engaged","Mild concern, I manage it","Grim confirmation of existing fears","A ritual of punishment I perform daily"],s:[0,1,3,5]},
  {q:"Pick your philosophy reading:",opts:["Man's Search for Meaning – Frankl","Meditations – Marcus Aurelius","Being and Nothingness – Sartre","The Denial of Happiness – E. Nihlism"],s:[0,1,3,5]},
  {q:"Someone says 'everything happens for a reason.' You:",opts:["Agree, it's comforting","Understand the sentiment","Politely disagree, citing causality","Leave the room before you say something bleak"],s:[0,1,3,5]},
  {q:"What do you think about when you can't sleep?",opts:["Nothing much, I sleep fine","Work stuff, the usual","The accelerating complexity of suffering","The heat death of the universe and whether that's even bad"],s:[0,1,3,5]},
  {q:"You find a note: 'Reasons to keep going:' — you write:",opts:["A long list, immediately","A few solid things","One or two, after thinking","NONE. (I already have this note.)"],s:[0,2,3,5]}
];

const Cats = [
  {min:0,max:20,icon:"☀️",title:"Obliviously Functional",desc:"You're doing suspiciously well. Either you've found genuine peace, you're not paying attention, or you're dissociating in a very effective way. Either way, stay hydrated. The rest of us resent you mildly but wish you well.",q:{t:"I have decided to be happy because it is good for my health.",c:"— Voltaire"}},
  {min:21,max:40,icon:"🌧️",title:"Mild Doomer",desc:"You have doomer tendencies but you're managing. You know things are bleak but you've developed coping mechanisms — gym, a podcast habit, perhaps a plant. The existential dread is there; you've just put it in a drawer labeled 'later'.",q:{t:"In the middle of winter, I at last discovered that there was in me an invincible summer.",c:"— Albert Camus"}},
  {min:41,max:60,icon:"🌑",title:"Seasoned Doomer",desc:"You're deep in it. The hoodie is non-negotiable. The cigarettes are a breakfast food. You go to the gym because you should, not because you believe in the premise. You have a cat. The cat understands. This is fine.",q:{t:"Nothing matters very much, and few things matter at all.",c:"— Arthur Balfour"}},
  {min:61,max:80,icon:"💀",title:"Terminal Doomer",desc:"You've achieved full terminal doomer status. The schedule ends with 'repeat until death'. Your mug says COPIUM. Your book is by E. Nihlism. The best memories are already behind you and you've framed that fact. Somehow you're still here — which, honestly, is impressive.",q:{t:"It is not death that a man should fear, but he should fear never beginning to live.",c:"— Marcus Aurelius"}},
  {min:81,max:100,icon:"⚰️",title:"Born to Rot",desc:"You are the meme. You are the figure on the bench in the dark hoodie. No Future. Born to Rot. The cat stays anyway. The cigarette never goes out. Somewhere there is a framed photo saying 'it was better back then' and you put it there. We see you. We nod.",q:{t:"I exist, that is all, and I find it nauseating.",c:"— Jean-Paul Sartre, Being and Nothingness"}}
];

const Dims = [
  {label:"Social Withdrawal",qs:[2,9]},
  {label:"Temporal Despair",qs:[3,14]},
  {label:"Morning Dread",qs:[0,15]},
  {label:"Nihilism Depth",qs:[16,19]},
  {label:"Sensory Numbing",qs:[5,10]}
];

let cur=0, ans=new Array(20).fill(null);

function startQuiz(){
  document.getElementById('cover').classList.remove('active');
  document.getElementById('quiz').classList.add('active');
  renderQ();
}

function renderQ(){
  const q=Qs[cur];
  document.getElementById('q-text').textContent=(cur+1)+'. '+q.q;
  document.getElementById('q-counter').textContent=(cur+1)+' / 20';
  document.getElementById('prog').style.width=((cur+1)/20*100)+'%';
  const lbls=['A','B','C','D'];
  const grid=document.getElementById('opts');
  grid.innerHTML='';
  q.opts.forEach((o,i)=>{
    const b=document.createElement('button');
    b.className='opt-btn'+(ans[cur]===i?' sel':'');
    b.innerHTML='<span class="opt-lbl">'+lbls[i]+'</span>'+o;
    b.onclick=()=>pick(i);
    grid.appendChild(b);
  });
  document.getElementById('btn-back').disabled=cur===0;
  document.getElementById('btn-next').disabled=ans[cur]===null;
  document.getElementById('btn-next').textContent=cur===19?'SEE RESULTS →':'NEXT →';
}

function pick(i){
  ans[cur]=i;
  document.querySelectorAll('.opt-btn').forEach((b,idx)=>b.classList.toggle('sel',idx===i));
  document.getElementById('btn-next').disabled=false;
}

function nextQ(){if(ans[cur]===null)return;if(cur<19){cur++;renderQ();}else showResults();}
function prevQ(){if(cur>0){cur--;renderQ();}}

async function showResults(){
  let tot=0;
  let breakdown = [];
  ans.forEach((a,i)=>{
    if(a!==null) {
        tot+=Qs[i].s[a];
        breakdown.push({
            question: Qs[i].q,
            selected: Qs[i].opts[a],
            points: Qs[i].s[a]
        });
    }
  });
  const mx=Qs.reduce((s,q)=>s+Math.max(...q.s),0);
  const pct=Math.round((tot/mx)*100);
  const cat=Cats.find(c=>pct>=c.min&&pct<=c.max)||Cats[Cats.length-1];

  // Send results to backend
  const userName = document.getElementById('user-name').value;
  const userEmail = document.getElementById('user-email').value;

  try {
      const response = await fetch('/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: userName,
              email: userEmail,
              score: pct,
              category: cat.title,
              answers: breakdown
          })
      });
      const data = await response.json();
      document.getElementById('submit-msg').textContent = "Results saved successfully.";
  } catch(e) {
      console.error(e);
      document.getElementById('submit-msg').textContent = "Failed to save results to server.";
  }

  document.getElementById('quiz').classList.remove('active');
  document.getElementById('results').classList.add('active');
  document.getElementById('r-icon').textContent=cat.icon;
  document.getElementById('r-title').textContent=cat.title;
  document.getElementById('r-score').textContent=pct;
  document.getElementById('r-desc').textContent=cat.desc;

  const sr=document.getElementById('r-skulls');sr.innerHTML='';
  const n=Math.ceil(pct/20);
  for(let i=0;i<5;i++){const s=document.createElement('div');s.className='skull'+(i<n?' lit':'');sr.appendChild(s);}

  const be=document.getElementById('r-bars');be.innerHTML='';
  Dims.forEach(d=>{
    let ds=0,dm=0;
    d.qs.forEach(qi=>{if(ans[qi]!==null)ds+=Qs[qi].s[ans[qi]];dm+=Math.max(...Qs[qi].s);});
    const dp=Math.round((ds/dm)*100);
    be.innerHTML+='<div class="bar-row"><span class="bar-lbl">'+d.label+'</span><div class="bar-track"><div class="bar-fill" style="width:'+dp+'%"></div></div><span class="bar-val">'+dp+'</span></div>';
  });

  document.getElementById('r-quote').innerHTML='<p>'+cat.q.t+'</p><cite>'+cat.q.c+'</cite>';
}

function restart(){
    cur=0;
    ans=new Array(20).fill(null);
    document.getElementById('results').classList.remove('active');
    document.getElementById('cover').classList.add('active');
    document.getElementById('submit-msg').textContent = "";
}
