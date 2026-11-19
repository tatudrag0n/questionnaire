const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const EVENTS=new Set(['view','start']);
export async function onRequest({request,env}){
  if(request.method!=='POST')return json({error:'Method not allowed'},405);
  if(request.headers.get('Origin')!==new URL(request.url).origin)return json({error:'送信元を確認できません。'},403);
  let body;
  try{
    const reader=request.body?.getReader();
    if(!reader)return json({error:'形式が不正です。'},400);
    let length=0,chunks=[];
    while(true){
      const {done,value}=await reader.read();
      if(done)break;
      length+=value.byteLength;
      if(length>1000){await reader.cancel();return json({error:'形式が不正です。'},400);}
      chunks.push(value);
    }
    const bytes=new Uint8Array(length);
    let offset=0;
    for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
    body=JSON.parse(new TextDecoder().decode(bytes));
  }catch{return json({error:'形式が不正です。'},400);}
  if(!body||!EVENTS.has(body.event))return json({error:'形式が不正です。'},400);
  // 個人を特定しない日別（JST）の合計カウンタ。statsテーブルが未作成でも回答画面は止めません。
  if(env.DB){
    try{
      const day=new Date(Date.now()+9*3600*1000).toISOString().slice(0,10);
      await env.DB.prepare('INSERT INTO stats (day,event,count) VALUES (?,?,1) ON CONFLICT(day,event) DO UPDATE SET count=count+1').bind(day,body.event).run();
    }catch{}
  }
  return json({ok:true});
}
