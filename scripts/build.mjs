import{mkdir,copyFile,rm}from 'node:fs/promises';
const root=new URL('../',import.meta.url),out=new URL('dist/',root);
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const f of ['index.html','app.js','admin.html','survey.js'])await copyFile(new URL(f,root),new URL(f,out));
