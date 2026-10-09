var cc=Object.defineProperty;var lc=(n,e,t)=>e in n?cc(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Ea=(n,e,t)=>lc(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();class dc{constructor(){this.memoryFallback=new Map,this.isStorageAvailable=this.checkAvailability()}checkAvailability(){try{if(typeof window>"u"||!window.localStorage)return!1;const e="__storage_test__";return window.localStorage.setItem(e,e),window.localStorage.removeItem(e),!0}catch{return!1}}getItem(e,t=null){try{if(this.isStorageAvailable){const i=window.localStorage.getItem(e);return i===null?t:JSON.parse(i)}return this.memoryFallback.has(e)?this.memoryFallback.get(e):t}catch{return t}}setItem(e,t){try{return this.isStorageAvailable?window.localStorage.setItem(e,JSON.stringify(t)):this.memoryFallback.set(e,t),!0}catch(i){return console.warn("Storage setItem failed, falling back to memory:",i),this.memoryFallback.set(e,t),!1}}removeItem(e){try{this.isStorageAvailable&&window.localStorage.removeItem(e),this.memoryFallback.delete(e)}catch{}}}const hi=new dc,uc={language:"en",mode:"auto",timerDuration:10,revealDuration:2.5,selectedCategories:["all"],difficulty:"all",soundEnabled:!0,musicEnabled:!1,soundVolume:.7,vfxQuality:"high",reducedMotion:!1,showName:!0,showCapital:!0,keepAwake:!0,challengeQuestionsCount:10},fi={SETTINGS:"wsq3d_settings",HIGH_SCORE:"wsq3d_highscore",CUSTOM_PEOPLE:"wsq3d_custom_people"};function hc(){const n=hi.getItem(fi.SETTINGS,{}),e={...uc,...n};return n.timerDuration===5&&(e.timerDuration=10),e}function gs(n){return hi.setItem(fi.SETTINGS,n)}function fc(){return hi.getItem(fi.HIGH_SCORE,{bestScore:0,bestStreak:0,gamesPlayed:0,totalCorrect:0})}function pc(n){return hi.setItem(fi.HIGH_SCORE,n)}const pi={IDLE:"idle",COUNTDOWN:"countdown",REVEALED:"revealed",PAUSED:"paused",FINISHED:"finished"};class mc{constructor(){this.status=pi.IDLE,this.currentPerson=null,this.questionNumber=1,this.challengeQuestionIndex=0,this.settings=hc(),this.isPaused=!1,this.statusBeforePause=pi.IDLE}setMode(e){this.settings.mode=e}setPaused(e){e?(this.statusBeforePause=this.status,this.status=pi.PAUSED,this.isPaused=!0):(this.status=this.statusBeforePause||pi.COUNTDOWN,this.isPaused=!1)}}class gc{constructor(e=[],t={}){this.allPeople=e,this.historyWindowSize=t.historyWindowSize??8,this.seed=t.seed??null,this.recentIds=[],this.currentCategories=["all"],this.currentDifficulty="all"}setPeople(e){this.allPeople=Array.isArray(e)?e:[],this.clearHistory()}setCategories(e){this.currentCategories=Array.isArray(e)&&e.length>0?e:["all"],this.clearHistory()}setDifficulty(e){this.currentDifficulty=e||"all",this.clearHistory()}clearHistory(){this.recentIds=[]}nextRandom(){if(this.seed!==null){let e=this.seed+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}return Math.random()}getEligiblePeople(){return this.allPeople.filter(e=>!(!e||e.isActive===!1||!this.currentCategories.includes("all")&&!this.currentCategories.includes(e.category)||this.currentDifficulty!=="all"&&e.difficulty!==this.currentDifficulty))}selectNext(){const e=this.getEligiblePeople();if(e.length===0)return null;if(e.length===1){const o=e[0];return this.recentIds=[o.id],o}const t=Math.min(this.historyWindowSize,e.length-1),i=this.recentIds.slice(-t);let a=e.filter(o=>!i.includes(o.id));if(a.length===0){const o=this.recentIds[this.recentIds.length-1];a=e.filter(c=>c.id!==o),a.length===0&&(a=e)}const r=Math.floor(this.nextRandom()*a.length),s=a[r];return this.recentIds.push(s.id),this.recentIds.length>this.historyWindowSize*2&&this.recentIds.splice(0,this.recentIds.length-this.historyWindowSize),s}}class yc{constructor(e={}){Ea(this,"loop",()=>{if(!this.isRunning||this.isPaused)return;const e=performance.now(),t=e-this.lastTimestamp;this.lastTimestamp=e,this.remainingMs=Math.max(0,this.remainingMs-t);const i=this.totalDurationMs>0?this.remainingMs/this.totalDurationMs:0,a=Math.ceil(this.remainingMs/1e3),r=this.remainingMs<=1500,s=a!==this.lastReportedSec;if(this.lastReportedSec=a,this.onTick({remainingSeconds:a,progress:i,isUrgent:r,didSecondChange:s}),this.remainingMs<=0){this.isRunning=!1,this.onComplete();return}typeof requestAnimationFrame<"u"?this.animFrameId=requestAnimationFrame(this.loop):this.animFrameId=setTimeout(this.loop,16)});this.duration=e.duration??10,this.onTick=e.onTick||(()=>{}),this.onComplete=e.onComplete||(()=>{}),this.remainingMs=this.duration*1e3,this.totalDurationMs=this.duration*1e3,this.isRunning=!1,this.isPaused=!1,this.lastTimestamp=0,this.animFrameId=null,this.lastReportedSec=-1}setDuration(e){this.duration=Number(e)||10,this.totalDurationMs=this.duration*1e3,this.reset()}start(){this.cancelFrame(),this.remainingMs=this.totalDurationMs,this.isRunning=!0,this.isPaused=!1,this.lastTimestamp=performance.now(),this.lastReportedSec=Math.ceil(this.duration),this.onTick({remainingSeconds:Math.ceil(this.duration),progress:1,isUrgent:this.duration<=1}),this.loop()}pause(){!this.isRunning||this.isPaused||(this.isPaused=!0,this.cancelFrame())}resume(){!this.isRunning||!this.isPaused||(this.isPaused=!1,this.lastTimestamp=performance.now(),this.loop())}reset(){this.cancelFrame(),this.isRunning=!1,this.isPaused=!1,this.remainingMs=this.totalDurationMs,this.lastReportedSec=-1,this.onTick({remainingSeconds:Math.ceil(this.duration),progress:1,isUrgent:!1})}stop(){this.cancelFrame(),this.isRunning=!1,this.isPaused=!1}cancelFrame(){this.animFrameId!==null&&(typeof cancelAnimationFrame<"u"?cancelAnimationFrame(this.animFrameId):clearTimeout(this.animFrameId),this.animFrameId=null)}}class vc{constructor(){this.reset()}reset(){this.score=0,this.correctCount=0,this.incorrectCount=0,this.questionsAnswered=0,this.currentStreak=0,this.bestStreak=0}recordAnswer(e,t=0){if(this.questionsAnswered+=1,e){this.correctCount+=1,this.currentStreak+=1,this.currentStreak>this.bestStreak&&(this.bestStreak=this.currentStreak);const i=100,a=Math.round(Math.max(0,t)*50);let r=1;this.currentStreak>=8?r=2:this.currentStreak>=5?r=1.5:this.currentStreak>=3&&(r=1.2);const s=Math.round((i+a)*r);return this.score+=s,{isCorrect:!0,earned:s,score:this.score,currentStreak:this.currentStreak,bestStreak:this.bestStreak}}else return this.incorrectCount+=1,this.currentStreak=0,{isCorrect:!1,earned:0,score:this.score,currentStreak:0,bestStreak:this.bestStreak}}getAccuracy(){return this.questionsAnswered===0?0:Math.round(this.correctCount/this.questionsAnswered*100)}getStats(){return{score:this.score,correctCount:this.correctCount,incorrectCount:this.incorrectCount,questionsAnswered:this.questionsAnswered,accuracy:this.getAccuracy(),currentStreak:this.currentStreak,bestStreak:this.bestStreak}}}class _c{constructor(e=[]){this.countries=e}setCountries(e){this.countries=Array.isArray(e)?e:[]}generateChoices(e,t="en"){if(!e||this.countries.length===0)return[];const i=this.countries.find(c=>c.code===e.countryCode||c.name.toLowerCase()===e.country.toLowerCase())||{code:e.countryCode,name:e.country,nameBn:e.country,flag:e.flag,capital:e.capital},s=[...this.countries.filter(c=>c.code!==i.code&&c.name.toLowerCase()!==i.name.toLowerCase())].sort(()=>Math.random()-.5).slice(0,3);return[{code:i.code,name:t==="bn"?i.nameBn:i.name,flag:i.flag,isCorrect:!0},...s.map(c=>({code:c.code,name:t==="bn"?c.nameBn:c.name,flag:c.flag,isCorrect:!1}))].sort(()=>Math.random()-.5)}evaluateChoice(e,t){return!e||!t?!1:e.isCorrect===!0||e.code===t.countryCode||e.name.toLowerCase()===t.country.toLowerCase()}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $r="174",xc=0,ys=1,Sc=2,So=1,Cc=2,Jt=3,yi=0,_t=1,zt=2,mi=0,nn=1,an=2,vs=3,_s=4,bc=5,Pi=100,Mc=101,Ac=102,Ec=103,wc=104,Tc=200,Rc=201,Pc=202,Lc=203,sr=204,or=205,Dc=206,Ic=207,Uc=208,Bc=209,Nc=210,Fc=211,Oc=212,kc=213,zc=214,cr=0,lr=1,dr=2,cn=3,ur=4,hr=5,fr=6,pr=7,Co=0,Gc=1,Hc=2,gi=0,Vc=1,Wc=2,Yc=3,qc=4,Xc=5,jc=6,Kc=7,bo=300,ln=301,dn=302,mr=303,gr=304,xa=306,yr=1e3,Di=1001,vr=1002,Vt=1003,$c=1004,Nn=1005,Yt=1006,wa=1007,Ii=1008,ii=1009,Mo=1010,Ao=1011,En=1012,Zr=1013,Bi=1014,Qt=1015,Tn=1016,Jr=1017,Qr=1018,un=1020,Eo=35902,wo=1021,To=1022,Ht=1023,Ro=1024,Po=1025,rn=1026,hn=1027,Lo=1028,es=1029,Do=1030,ts=1031,is=1033,oa=33776,ca=33777,la=33778,da=33779,_r=35840,xr=35841,Sr=35842,Cr=35843,br=36196,Mr=37492,Ar=37496,Er=37808,wr=37809,Tr=37810,Rr=37811,Pr=37812,Lr=37813,Dr=37814,Ir=37815,Ur=37816,Br=37817,Nr=37818,Fr=37819,Or=37820,kr=37821,ua=36492,zr=36494,Gr=36495,Io=36283,Hr=36284,Vr=36285,Wr=36286,Zc=3200,Jc=3201,Qc=0,el=1,di="",It="srgb",fn="srgb-linear",fa="linear",je="srgb",Oi=7680,xs=519,tl=512,il=513,nl=514,Uo=515,al=516,rl=517,sl=518,ol=519,Ss=35044,Cs="300 es",ei=2e3,pa=2001;class mn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const r=a.indexOf(t);r!==-1&&a.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,e);e.target=null}}}const ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ta=Math.PI/180,Yr=180/Math.PI;function Rn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ft[n&255]+ft[n>>8&255]+ft[n>>16&255]+ft[n>>24&255]+"-"+ft[e&255]+ft[e>>8&255]+"-"+ft[e>>16&15|64]+ft[e>>24&255]+"-"+ft[t&63|128]+ft[t>>8&255]+"-"+ft[t>>16&255]+ft[t>>24&255]+ft[i&255]+ft[i>>8&255]+ft[i>>16&255]+ft[i>>24&255]).toLowerCase()}function Ie(n,e,t){return Math.max(e,Math.min(t,n))}function cl(n,e){return(n%e+e)%e}function Ra(n,e,t){return(1-t)*n+t*e}function vn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function vt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class We{constructor(e=0,t=0){We.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6],this.y=a[1]*t+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ie(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),a=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*i-s*a+e.x,this.y=r*a+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Re{constructor(e,t,i,a,r,s,o,c,l){Re.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,a,r,s,o,c,l)}set(e,t,i,a,r,s,o,c,l){const u=this.elements;return u[0]=e,u[1]=a,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,r=this.elements,s=i[0],o=i[3],c=i[6],l=i[1],u=i[4],h=i[7],f=i[2],p=i[5],y=i[8],x=a[0],m=a[3],d=a[6],A=a[1],M=a[4],S=a[7],I=a[2],w=a[5],P=a[8];return r[0]=s*x+o*A+c*I,r[3]=s*m+o*M+c*w,r[6]=s*d+o*S+c*P,r[1]=l*x+u*A+h*I,r[4]=l*m+u*M+h*w,r[7]=l*d+u*S+h*P,r[2]=f*x+p*A+y*I,r[5]=f*m+p*M+y*w,r[8]=f*d+p*S+y*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],a=e[2],r=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*o*l-i*r*u+i*o*c+a*r*l-a*s*c}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],r=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*s-o*l,f=o*c-u*r,p=l*r-s*c,y=t*h+i*f+a*p;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/y;return e[0]=h*x,e[1]=(a*l-u*i)*x,e[2]=(o*i-a*s)*x,e[3]=f*x,e[4]=(u*t-a*c)*x,e[5]=(a*r-o*t)*x,e[6]=p*x,e[7]=(i*c-l*t)*x,e[8]=(s*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,a,r,s,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*s+l*o)+s+e,-a*l,a*c,-a*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pa.makeScale(e,t)),this}rotate(e){return this.premultiply(Pa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<9;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pa=new Re;function Bo(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ma(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ll(){const n=ma("canvas");return n.style.display="block",n}const bs={};function wi(n){n in bs||(bs[n]=!0,console.warn(n))}function dl(n,e,t){return new Promise(function(i,a){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:a();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function ul(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function hl(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ms=new Re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),As=new Re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fl(){const n={enabled:!0,workingColorSpace:fn,spaces:{},convert:function(a,r,s){return this.enabled===!1||r===s||!r||!s||(this.spaces[r].transfer===je&&(a.r=ti(a.r),a.g=ti(a.g),a.b=ti(a.b)),this.spaces[r].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[r].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===je&&(a.r=sn(a.r),a.g=sn(a.g),a.b=sn(a.b))),a},fromWorkingColorSpace:function(a,r){return this.convert(a,this.workingColorSpace,r)},toWorkingColorSpace:function(a,r){return this.convert(a,r,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===di?fa:this.spaces[a].transfer},getLuminanceCoefficients:function(a,r=this.workingColorSpace){return a.fromArray(this.spaces[r].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,r,s){return a.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[fn]:{primaries:e,whitePoint:i,transfer:fa,toXYZ:Ms,fromXYZ:As,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:e,whitePoint:i,transfer:je,toXYZ:Ms,fromXYZ:As,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),n}const He=fl();function ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function sn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ki;class pl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ki===void 0&&(ki=ma("canvas")),ki.width=e.width,ki.height=e.height;const i=ki.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ki}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ma("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=ti(r[s]/255)*255;return i.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ti(t[i]/255)*255):t[i]=ti(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ml=0;class ns{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ml++}),this.uuid=Rn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?r.push(La(a[s].image)):r.push(La(a[s]))}else r=La(a);i.url=r}return t||(e.images[this.uuid]=i),i}}function La(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?pl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gl=0;class xt extends mn{constructor(e=xt.DEFAULT_IMAGE,t=xt.DEFAULT_MAPPING,i=Di,a=Di,r=Yt,s=Ii,o=Ht,c=ii,l=xt.DEFAULT_ANISOTROPY,u=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gl++}),this.uuid=Rn(),this.name="",this.source=new ns(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yr:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yr:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}xt.DEFAULT_IMAGE=null;xt.DEFAULT_MAPPING=bo;xt.DEFAULT_ANISOTROPY=1;class Ke{constructor(e=0,t=0,i=0,a=1){Ke.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,a){return this.x=e,this.y=t,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*a+s[12]*r,this.y=s[1]*t+s[5]*i+s[9]*a+s[13]*r,this.z=s[2]*t+s[6]*i+s[10]*a+s[14]*r,this.w=s[3]*t+s[7]*i+s[11]*a+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,a,r;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],p=c[5],y=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(y-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(y+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,S=(p+1)/2,I=(d+1)/2,w=(u+f)/4,P=(h+x)/4,B=(y+m)/4;return M>S&&M>I?M<.01?(i=0,a=.707106781,r=.707106781):(i=Math.sqrt(M),a=w/i,r=P/i):S>I?S<.01?(i=.707106781,a=0,r=.707106781):(a=Math.sqrt(S),i=w/a,r=B/a):I<.01?(i=.707106781,a=.707106781,r=0):(r=Math.sqrt(I),i=P/r,a=B/r),this.set(i,a,r,t),this}let A=Math.sqrt((m-y)*(m-y)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(A)<.001&&(A=1),this.x=(m-y)/A,this.y=(h-x)/A,this.z=(f-u)/A,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this.w=Ie(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this.w=Ie(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yl extends mn{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ke(0,0,e,t),this.scissorTest=!1,this.viewport=new Ke(0,0,e,t);const a={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new xt(a,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const s=i.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new ns(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ni extends yl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class No extends xt{constructor(e=null,t=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class vl extends xt{constructor(e=null,t=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pn{constructor(e=0,t=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=a}static slerpFlat(e,t,i,a,r,s,o){let c=i[a+0],l=i[a+1],u=i[a+2],h=i[a+3];const f=r[s+0],p=r[s+1],y=r[s+2],x=r[s+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=y,e[t+3]=x;return}if(h!==x||c!==f||l!==p||u!==y){let m=1-o;const d=c*f+l*p+u*y+h*x,A=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const I=Math.sqrt(M),w=Math.atan2(I,d*A);m=Math.sin(m*w)/I,o=Math.sin(o*w)/I}const S=o*A;if(c=c*m+f*S,l=l*m+p*S,u=u*m+y*S,h=h*m+x*S,m===1-o){const I=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=I,l*=I,u*=I,h*=I}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,a,r,s){const o=i[a],c=i[a+1],l=i[a+2],u=i[a+3],h=r[s],f=r[s+1],p=r[s+2],y=r[s+3];return e[t]=o*y+u*h+c*p-l*f,e[t+1]=c*y+u*f+l*h-o*p,e[t+2]=l*y+u*p+o*f-c*h,e[t+3]=u*y-o*h-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,a){return this._x=e,this._y=t,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,a=e._y,r=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(a/2),h=o(r/2),f=c(i/2),p=c(a/2),y=c(r/2);switch(s){case"XYZ":this._x=f*u*h+l*p*y,this._y=l*p*h-f*u*y,this._z=l*u*y+f*p*h,this._w=l*u*h-f*p*y;break;case"YXZ":this._x=f*u*h+l*p*y,this._y=l*p*h-f*u*y,this._z=l*u*y-f*p*h,this._w=l*u*h+f*p*y;break;case"ZXY":this._x=f*u*h-l*p*y,this._y=l*p*h+f*u*y,this._z=l*u*y+f*p*h,this._w=l*u*h-f*p*y;break;case"ZYX":this._x=f*u*h-l*p*y,this._y=l*p*h+f*u*y,this._z=l*u*y-f*p*h,this._w=l*u*h+f*p*y;break;case"YZX":this._x=f*u*h+l*p*y,this._y=l*p*h+f*u*y,this._z=l*u*y-f*p*h,this._w=l*u*h-f*p*y;break;case"XZY":this._x=f*u*h-l*p*y,this._y=l*p*h-f*u*y,this._z=l*u*y+f*p*h,this._w=l*u*h+f*p*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],a=t[4],r=t[8],s=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(s-a)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-c)/p,this._x=.25*p,this._y=(a+s)/p,this._z=(r+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(r-l)/p,this._x=(a+s)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(s-a)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ie(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,t/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,a=e._y,r=e._z,s=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+s*o+a*l-r*c,this._y=a*u+s*c+r*o-i*l,this._z=r*u+s*l+i*c-a*o,this._w=s*u-i*o-a*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,a=this._y,r=this._z,s=this._w;let o=s*e._w+i*e._x+a*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=i,this._y=a,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*s+t*this._w,this._x=p*i+t*this._x,this._y=p*a+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=s*h+this._w*f,this._x=i*h+this._x*f,this._y=a*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Es.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Es.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,a=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*a,this.y=r[1]*t+r[4]*i+r[7]*a,this.z=r[2]*t+r[5]*i+r[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,r=e.elements,s=1/(r[3]*t+r[7]*i+r[11]*a+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*a+r[12])*s,this.y=(r[1]*t+r[5]*i+r[9]*a+r[13])*s,this.z=(r[2]*t+r[6]*i+r[10]*a+r[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,a=this.z,r=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*a-o*i),u=2*(o*t-r*a),h=2*(r*i-s*t);return this.x=t+c*l+s*h-o*u,this.y=i+c*u+o*l-r*h,this.z=a+c*h+r*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,a=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*a,this.y=r[1]*t+r[5]*i+r[9]*a,this.z=r[2]*t+r[6]*i+r[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,a=e.y,r=e.z,s=t.x,o=t.y,c=t.z;return this.x=a*c-r*o,this.y=r*s-i*c,this.z=i*o-a*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Da.copy(this).projectOnVector(e),this.sub(Da)}reflect(e){return this.sub(Da.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ie(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return t*t+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const a=Math.sin(t)*e;return this.x=a*Math.sin(i),this.y=Math.cos(t)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Da=new U,Es=new Pn;class Ln{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ft.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ft.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ft.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Ft):Ft.fromBufferAttribute(r,s),Ft.applyMatrix4(e.matrixWorld),this.expandByPoint(Ft);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fn.copy(i.boundingBox)),Fn.applyMatrix4(e.matrixWorld),this.union(Fn)}const a=e.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ft),Ft.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_n),On.subVectors(this.max,_n),zi.subVectors(e.a,_n),Gi.subVectors(e.b,_n),Hi.subVectors(e.c,_n),ai.subVectors(Gi,zi),ri.subVectors(Hi,Gi),Si.subVectors(zi,Hi);let t=[0,-ai.z,ai.y,0,-ri.z,ri.y,0,-Si.z,Si.y,ai.z,0,-ai.x,ri.z,0,-ri.x,Si.z,0,-Si.x,-ai.y,ai.x,0,-ri.y,ri.x,0,-Si.y,Si.x,0];return!Ia(t,zi,Gi,Hi,On)||(t=[1,0,0,0,1,0,0,0,1],!Ia(t,zi,Gi,Hi,On))?!1:(kn.crossVectors(ai,ri),t=[kn.x,kn.y,kn.z],Ia(t,zi,Gi,Hi,On))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ft).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ft).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Xt=[new U,new U,new U,new U,new U,new U,new U,new U],Ft=new U,Fn=new Ln,zi=new U,Gi=new U,Hi=new U,ai=new U,ri=new U,Si=new U,_n=new U,On=new U,kn=new U,Ci=new U;function Ia(n,e,t,i,a){for(let r=0,s=n.length-3;r<=s;r+=3){Ci.fromArray(n,r);const o=a.x*Math.abs(Ci.x)+a.y*Math.abs(Ci.y)+a.z*Math.abs(Ci.z),c=e.dot(Ci),l=t.dot(Ci),u=i.dot(Ci);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const _l=new Ln,xn=new U,Ua=new U;class Sa{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):_l.setFromPoints(e).getCenter(i);let a=0;for(let r=0,s=e.length;r<s;r++)a=Math.max(a,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xn.subVectors(e,this.center);const t=xn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),a=(i-this.radius)*.5;this.center.addScaledVector(xn,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ua.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xn.copy(e.center).add(Ua)),this.expandByPoint(xn.copy(e.center).sub(Ua))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const jt=new U,Ba=new U,zn=new U,si=new U,Na=new U,Gn=new U,Fa=new U;class Fo{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jt.copy(this.origin).addScaledVector(this.direction,t),jt.distanceToSquared(e))}distanceSqToSegment(e,t,i,a){Ba.copy(e).add(t).multiplyScalar(.5),zn.copy(t).sub(e).normalize(),si.copy(this.origin).sub(Ba);const r=e.distanceTo(t)*.5,s=-this.direction.dot(zn),o=si.dot(this.direction),c=-si.dot(zn),l=si.lengthSq(),u=Math.abs(1-s*s);let h,f,p,y;if(u>0)if(h=s*c-o,f=s*o-c,y=r*u,h>=0)if(f>=-y)if(f<=y){const x=1/u;h*=x,f*=x,p=h*(h+s*f+2*o)+f*(s*h+f+2*c)+l}else f=r,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*c)+l;else f<=-y?(h=Math.max(0,-(-s*r+o)),f=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l):f<=y?(h=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(h=Math.max(0,-(s*r+o)),f=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l);else f=s>0?-r:r,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(Ba).addScaledVector(zn,f),p}intersectSphere(e,t){jt.subVectors(e.center,this.origin);const i=jt.dot(this.direction),a=jt.dot(jt)-i*i,r=e.radius*e.radius;if(a>r)return null;const s=Math.sqrt(r-a),o=i-s,c=i+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,a,r,s,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,a=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,a=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,s=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,s=(e.min.y-f.y)*u),i>s||r>a||((r>i||isNaN(i))&&(i=r),(s<a||isNaN(a))&&(a=s),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),i>c||o>a)||((o>i||i!==i)&&(i=o),(c<a||a!==a)&&(a=c),a<0)?null:this.at(i>=0?i:a,t)}intersectsBox(e){return this.intersectBox(e,jt)!==null}intersectTriangle(e,t,i,a,r){Na.subVectors(t,e),Gn.subVectors(i,e),Fa.crossVectors(Na,Gn);let s=this.direction.dot(Fa),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;si.subVectors(this.origin,e);const c=o*this.direction.dot(Gn.crossVectors(si,Gn));if(c<0)return null;const l=o*this.direction.dot(Na.cross(si));if(l<0||c+l>s)return null;const u=-o*si.dot(Fa);return u<0?null:this.at(u/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class et{constructor(e,t,i,a,r,s,o,c,l,u,h,f,p,y,x,m){et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,a,r,s,o,c,l,u,h,f,p,y,x,m)}set(e,t,i,a,r,s,o,c,l,u,h,f,p,y,x,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=a,d[1]=r,d[5]=s,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=y,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new et().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,a=1/Vi.setFromMatrixColumn(e,0).length(),r=1/Vi.setFromMatrixColumn(e,1).length(),s=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*a,t[1]=i[1]*a,t[2]=i[2]*a,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,a=e.y,r=e.z,s=Math.cos(i),o=Math.sin(i),c=Math.cos(a),l=Math.sin(a),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=s*u,p=s*h,y=o*u,x=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+y*l,t[5]=f-x*l,t[9]=-o*c,t[2]=x-f*l,t[6]=y+p*l,t[10]=s*c}else if(e.order==="YXZ"){const f=c*u,p=c*h,y=l*u,x=l*h;t[0]=f+x*o,t[4]=y*o-p,t[8]=s*l,t[1]=s*h,t[5]=s*u,t[9]=-o,t[2]=p*o-y,t[6]=x+f*o,t[10]=s*c}else if(e.order==="ZXY"){const f=c*u,p=c*h,y=l*u,x=l*h;t[0]=f-x*o,t[4]=-s*h,t[8]=y+p*o,t[1]=p+y*o,t[5]=s*u,t[9]=x-f*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const f=s*u,p=s*h,y=o*u,x=o*h;t[0]=c*u,t[4]=y*l-p,t[8]=f*l+x,t[1]=c*h,t[5]=x*l+f,t[9]=p*l-y,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const f=s*c,p=s*l,y=o*c,x=o*l;t[0]=c*u,t[4]=x-f*h,t[8]=y*h+p,t[1]=h,t[5]=s*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*h+y,t[10]=f-x*h}else if(e.order==="XZY"){const f=s*c,p=s*l,y=o*c,x=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+x,t[5]=s*u,t[9]=p*h-y,t[2]=y*h-p,t[6]=o*u,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xl,e,Sl)}lookAt(e,t,i){const a=this.elements;return Ct.subVectors(e,t),Ct.lengthSq()===0&&(Ct.z=1),Ct.normalize(),oi.crossVectors(i,Ct),oi.lengthSq()===0&&(Math.abs(i.z)===1?Ct.x+=1e-4:Ct.z+=1e-4,Ct.normalize(),oi.crossVectors(i,Ct)),oi.normalize(),Hn.crossVectors(Ct,oi),a[0]=oi.x,a[4]=Hn.x,a[8]=Ct.x,a[1]=oi.y,a[5]=Hn.y,a[9]=Ct.y,a[2]=oi.z,a[6]=Hn.z,a[10]=Ct.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,r=this.elements,s=i[0],o=i[4],c=i[8],l=i[12],u=i[1],h=i[5],f=i[9],p=i[13],y=i[2],x=i[6],m=i[10],d=i[14],A=i[3],M=i[7],S=i[11],I=i[15],w=a[0],P=a[4],B=a[8],C=a[12],_=a[1],T=a[5],q=a[9],k=a[13],W=a[2],$=a[6],H=a[10],Q=a[14],G=a[3],ae=a[7],de=a[11],ve=a[15];return r[0]=s*w+o*_+c*W+l*G,r[4]=s*P+o*T+c*$+l*ae,r[8]=s*B+o*q+c*H+l*de,r[12]=s*C+o*k+c*Q+l*ve,r[1]=u*w+h*_+f*W+p*G,r[5]=u*P+h*T+f*$+p*ae,r[9]=u*B+h*q+f*H+p*de,r[13]=u*C+h*k+f*Q+p*ve,r[2]=y*w+x*_+m*W+d*G,r[6]=y*P+x*T+m*$+d*ae,r[10]=y*B+x*q+m*H+d*de,r[14]=y*C+x*k+m*Q+d*ve,r[3]=A*w+M*_+S*W+I*G,r[7]=A*P+M*T+S*$+I*ae,r[11]=A*B+M*q+S*H+I*de,r[15]=A*C+M*k+S*Q+I*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],a=e[8],r=e[12],s=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],p=e[14],y=e[3],x=e[7],m=e[11],d=e[15];return y*(+r*c*h-a*l*h-r*o*f+i*l*f+a*o*p-i*c*p)+x*(+t*c*p-t*l*f+r*s*f-a*s*p+a*l*u-r*c*u)+m*(+t*l*h-t*o*p-r*s*h+i*s*p+r*o*u-i*l*u)+d*(-a*o*u-t*c*h+t*o*f+a*s*h-i*s*f+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],r=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],p=e[11],y=e[12],x=e[13],m=e[14],d=e[15],A=h*m*l-x*f*l+x*c*p-o*m*p-h*c*d+o*f*d,M=y*f*l-u*m*l-y*c*p+s*m*p+u*c*d-s*f*d,S=u*x*l-y*h*l+y*o*p-s*x*p-u*o*d+s*h*d,I=y*h*c-u*x*c-y*o*f+s*x*f+u*o*m-s*h*m,w=t*A+i*M+a*S+r*I;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return e[0]=A*P,e[1]=(x*f*r-h*m*r-x*a*p+i*m*p+h*a*d-i*f*d)*P,e[2]=(o*m*r-x*c*r+x*a*l-i*m*l-o*a*d+i*c*d)*P,e[3]=(h*c*r-o*f*r-h*a*l+i*f*l+o*a*p-i*c*p)*P,e[4]=M*P,e[5]=(u*m*r-y*f*r+y*a*p-t*m*p-u*a*d+t*f*d)*P,e[6]=(y*c*r-s*m*r-y*a*l+t*m*l+s*a*d-t*c*d)*P,e[7]=(s*f*r-u*c*r+u*a*l-t*f*l-s*a*p+t*c*p)*P,e[8]=S*P,e[9]=(y*h*r-u*x*r-y*i*p+t*x*p+u*i*d-t*h*d)*P,e[10]=(s*x*r-y*o*r+y*i*l-t*x*l-s*i*d+t*o*d)*P,e[11]=(u*o*r-s*h*r-u*i*l+t*h*l+s*i*p-t*o*p)*P,e[12]=I*P,e[13]=(u*x*a-y*h*a+y*i*f-t*x*f-u*i*m+t*h*m)*P,e[14]=(y*o*a-s*x*a-y*i*c+t*x*c+s*i*m-t*o*m)*P,e[15]=(s*h*a-u*o*a+u*i*c-t*h*c-s*i*f+t*o*f)*P,this}scale(e){const t=this.elements,i=e.x,a=e.y,r=e.z;return t[0]*=i,t[4]*=a,t[8]*=r,t[1]*=i,t[5]*=a,t[9]*=r,t[2]*=i,t[6]*=a,t[10]*=r,t[3]*=i,t[7]*=a,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,a))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),a=Math.sin(t),r=1-i,s=e.x,o=e.y,c=e.z,l=r*s,u=r*o;return this.set(l*s+i,l*o-a*c,l*c+a*o,0,l*o+a*c,u*o+i,u*c-a*s,0,l*c-a*o,u*c+a*s,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,a,r,s){return this.set(1,i,r,0,e,1,s,0,t,a,1,0,0,0,0,1),this}compose(e,t,i){const a=this.elements,r=t._x,s=t._y,o=t._z,c=t._w,l=r+r,u=s+s,h=o+o,f=r*l,p=r*u,y=r*h,x=s*u,m=s*h,d=o*h,A=c*l,M=c*u,S=c*h,I=i.x,w=i.y,P=i.z;return a[0]=(1-(x+d))*I,a[1]=(p+S)*I,a[2]=(y-M)*I,a[3]=0,a[4]=(p-S)*w,a[5]=(1-(f+d))*w,a[6]=(m+A)*w,a[7]=0,a[8]=(y+M)*P,a[9]=(m-A)*P,a[10]=(1-(f+x))*P,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,i){const a=this.elements;let r=Vi.set(a[0],a[1],a[2]).length();const s=Vi.set(a[4],a[5],a[6]).length(),o=Vi.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),e.x=a[12],e.y=a[13],e.z=a[14],Ot.copy(this);const l=1/r,u=1/s,h=1/o;return Ot.elements[0]*=l,Ot.elements[1]*=l,Ot.elements[2]*=l,Ot.elements[4]*=u,Ot.elements[5]*=u,Ot.elements[6]*=u,Ot.elements[8]*=h,Ot.elements[9]*=h,Ot.elements[10]*=h,t.setFromRotationMatrix(Ot),i.x=r,i.y=s,i.z=o,this}makePerspective(e,t,i,a,r,s,o=ei){const c=this.elements,l=2*r/(t-e),u=2*r/(i-a),h=(t+e)/(t-e),f=(i+a)/(i-a);let p,y;if(o===ei)p=-(s+r)/(s-r),y=-2*s*r/(s-r);else if(o===pa)p=-s/(s-r),y=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,a,r,s,o=ei){const c=this.elements,l=1/(t-e),u=1/(i-a),h=1/(s-r),f=(t+e)*l,p=(i+a)*u;let y,x;if(o===ei)y=(s+r)*h,x=-2*h;else if(o===pa)y=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<16;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Vi=new U,Ot=new et,xl=new U(0,0,0),Sl=new U(1,1,1),oi=new U,Hn=new U,Ct=new U,ws=new et,Ts=new Pn;class ni{constructor(e=0,t=0,i=0,a=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,a=this._order){return this._x=e,this._y=t,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const a=e.elements,r=a[0],s=a[4],o=a[8],c=a[1],l=a[5],u=a[9],h=a[2],f=a[6],p=a[10];switch(t){case"XYZ":this._y=Math.asin(Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(Ie(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ie(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ws.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ws,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ts.setFromEuler(this),this.setFromQuaternion(Ts,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class Oo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Cl=0;const Rs=new U,Wi=new Pn,Kt=new et,Vn=new U,Sn=new U,bl=new U,Ml=new Pn,Ps=new U(1,0,0),Ls=new U(0,1,0),Ds=new U(0,0,1),Is={type:"added"},Al={type:"removed"},Yi={type:"childadded",child:null},Oa={type:"childremoved",child:null};class ut extends mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cl++}),this.uuid=Rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ut.DEFAULT_UP.clone();const e=new U,t=new ni,i=new Pn,a=new U(1,1,1);function r(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new et},normalMatrix:{value:new Re}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(Ps,e)}rotateY(e){return this.rotateOnAxis(Ls,e)}rotateZ(e){return this.rotateOnAxis(Ds,e)}translateOnAxis(e,t){return Rs.copy(e).applyQuaternion(this.quaternion),this.position.add(Rs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ps,e)}translateY(e){return this.translateOnAxis(Ls,e)}translateZ(e){return this.translateOnAxis(Ds,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kt.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Vn.copy(e):Vn.set(e,t,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Sn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kt.lookAt(Sn,Vn,this.up):Kt.lookAt(Vn,Sn,this.up),this.quaternion.setFromRotationMatrix(Kt),a&&(Kt.extractRotation(a.matrixWorld),Wi.setFromRotationMatrix(Kt),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Is),Yi.child=e,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Al),Oa.child=e,this.dispatchEvent(Oa),Oa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Is),Yi.child=e,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,a=this.children.length;i<a;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sn,e,bl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sn,Ml,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));a.material=o}else a.material=r(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];a.animations.push(r(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),h=s(e.shapes),f=s(e.skeletons),p=s(e.animations),y=s(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),y.length>0&&(i.nodes=y)}return i.object=a,i;function s(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}ut.DEFAULT_UP=new U(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kt=new U,$t=new U,ka=new U,Zt=new U,qi=new U,Xi=new U,Us=new U,za=new U,Ga=new U,Ha=new U,Va=new Ke,Wa=new Ke,Ya=new Ke;class Gt{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,a){a.subVectors(i,t),kt.subVectors(e,t),a.cross(kt);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(e,t,i,a,r){kt.subVectors(a,t),$t.subVectors(i,t),ka.subVectors(e,t);const s=kt.dot(kt),o=kt.dot($t),c=kt.dot(ka),l=$t.dot($t),u=$t.dot(ka),h=s*l-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(l*c-o*u)*f,y=(s*u-o*c)*f;return r.set(1-p-y,y,p)}static containsPoint(e,t,i,a){return this.getBarycoord(e,t,i,a,Zt)===null?!1:Zt.x>=0&&Zt.y>=0&&Zt.x+Zt.y<=1}static getInterpolation(e,t,i,a,r,s,o,c){return this.getBarycoord(e,t,i,a,Zt)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zt.x),c.addScaledVector(s,Zt.y),c.addScaledVector(o,Zt.z),c)}static getInterpolatedAttribute(e,t,i,a,r,s){return Va.setScalar(0),Wa.setScalar(0),Ya.setScalar(0),Va.fromBufferAttribute(e,t),Wa.fromBufferAttribute(e,i),Ya.fromBufferAttribute(e,a),s.setScalar(0),s.addScaledVector(Va,r.x),s.addScaledVector(Wa,r.y),s.addScaledVector(Ya,r.z),s}static isFrontFacing(e,t,i,a){return kt.subVectors(i,t),$t.subVectors(e,t),kt.cross($t).dot(a)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,a){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,i,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kt.subVectors(this.c,this.b),$t.subVectors(this.a,this.b),kt.cross($t).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,a,r){return Gt.getInterpolation(e,this.a,this.b,this.c,t,i,a,r)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,a=this.b,r=this.c;let s,o;qi.subVectors(a,i),Xi.subVectors(r,i),za.subVectors(e,i);const c=qi.dot(za),l=Xi.dot(za);if(c<=0&&l<=0)return t.copy(i);Ga.subVectors(e,a);const u=qi.dot(Ga),h=Xi.dot(Ga);if(u>=0&&h<=u)return t.copy(a);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(i).addScaledVector(qi,s);Ha.subVectors(e,r);const p=qi.dot(Ha),y=Xi.dot(Ha);if(y>=0&&p<=y)return t.copy(r);const x=p*l-c*y;if(x<=0&&l>=0&&y<=0)return o=l/(l-y),t.copy(i).addScaledVector(Xi,o);const m=u*y-p*h;if(m<=0&&h-u>=0&&p-y>=0)return Us.subVectors(r,a),o=(h-u)/(h-u+(p-y)),t.copy(a).addScaledVector(Us,o);const d=1/(m+x+f);return s=x*d,o=f*d,t.copy(i).addScaledVector(qi,s).addScaledVector(Xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ko={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},Wn={h:0,s:0,l:0};function qa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ue{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,He.toWorkingColorSpace(this,t),this}setRGB(e,t,i,a=He.workingColorSpace){return this.r=e,this.g=t,this.b=i,He.toWorkingColorSpace(this,a),this}setHSL(e,t,i,a=He.workingColorSpace){if(e=cl(e,1),t=Ie(t,0,1),i=Ie(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,s=2*i-r;this.r=qa(s,r,e+1/3),this.g=qa(s,r,e),this.b=qa(s,r,e-1/3)}return He.toWorkingColorSpace(this,a),this}setStyle(e,t=It){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const i=ko[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=sn(e.r),this.g=sn(e.g),this.b=sn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return He.fromWorkingColorSpace(pt.copy(this),e),Math.round(Ie(pt.r*255,0,255))*65536+Math.round(Ie(pt.g*255,0,255))*256+Math.round(Ie(pt.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=He.workingColorSpace){He.fromWorkingColorSpace(pt.copy(this),t);const i=pt.r,a=pt.g,r=pt.b,s=Math.max(i,a,r),o=Math.min(i,a,r);let c,l;const u=(o+s)/2;if(o===s)c=0,l=0;else{const h=s-o;switch(l=u<=.5?h/(s+o):h/(2-s-o),s){case i:c=(a-r)/h+(a<r?6:0);break;case a:c=(r-i)/h+2;break;case r:c=(i-a)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=He.workingColorSpace){return He.fromWorkingColorSpace(pt.copy(this),t),e.r=pt.r,e.g=pt.g,e.b=pt.b,e}getStyle(e=It){He.fromWorkingColorSpace(pt.copy(this),e);const t=pt.r,i=pt.g,a=pt.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,t,i){return this.getHSL(ci),this.setHSL(ci.h+e,ci.s+t,ci.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ci),e.getHSL(Wn);const i=Ra(ci.h,Wn.h,t),a=Ra(ci.s,Wn.s,t),r=Ra(ci.l,Wn.l,t);return this.setHSL(i,a,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,a=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*a,this.g=r[1]*t+r[4]*i+r[7]*a,this.b=r[2]*t+r[5]*i+r[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const pt=new Ue;Ue.NAMES=ko;let El=0;class Dn extends mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:El++}),this.uuid=Rn(),this.name="",this.type="Material",this.blending=nn,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sr,this.blendDst=or,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=cn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xs,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oi,this.stencilZFail=Oi,this.stencilZPass=Oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==nn&&(i.blending=this.blending),this.side!==yi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sr&&(i.blendSrc=this.blendSrc),this.blendDst!==or&&(i.blendDst=this.blendDst),this.blendEquation!==Pi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xs&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Oi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Oi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(r){const s=[];for(const o in r){const c=r[o];delete c.metadata,s.push(c)}return s}if(t){const r=a(e.textures),s=a(e.images);r.length>0&&(i.textures=r),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const a=t.length;i=new Array(a);for(let r=0;r!==a;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ji extends Dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=Co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const st=new U,Yn=new We;let wl=0;class wt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wl++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ss,this.updateRanges=[],this.gpuType=Qt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[e+a]=t.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Yn.fromBufferAttribute(this,t),Yn.applyMatrix3(e),this.setXY(t,Yn.x,Yn.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)st.fromBufferAttribute(this,t),st.applyMatrix3(e),this.setXYZ(t,st.x,st.y,st.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)st.fromBufferAttribute(this,t),st.applyMatrix4(e),this.setXYZ(t,st.x,st.y,st.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)st.fromBufferAttribute(this,t),st.applyNormalMatrix(e),this.setXYZ(t,st.x,st.y,st.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)st.fromBufferAttribute(this,t),st.transformDirection(e),this.setXYZ(t,st.x,st.y,st.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=vn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,a){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),a=vt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,t,i,a,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),i=vt(i,this.array),a=vt(a,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ss&&(e.usage=this.usage),e}}class zo extends wt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Go extends wt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Tt extends wt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Tl=0;const Dt=new et,Xa=new ut,ji=new U,bt=new Ln,Cn=new Ln,lt=new U;class Ut extends mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tl++}),this.uuid=Rn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bo(e)?Go:zo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Re().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dt.makeRotationFromQuaternion(e),this.applyMatrix4(Dt),this}rotateX(e){return Dt.makeRotationX(e),this.applyMatrix4(Dt),this}rotateY(e){return Dt.makeRotationY(e),this.applyMatrix4(Dt),this}rotateZ(e){return Dt.makeRotationZ(e),this.applyMatrix4(Dt),this}translate(e,t,i){return Dt.makeTranslation(e,t,i),this.applyMatrix4(Dt),this}scale(e,t,i){return Dt.makeScale(e,t,i),this.applyMatrix4(Dt),this}lookAt(e){return Xa.lookAt(e),Xa.updateMatrix(),this.applyMatrix4(Xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let a=0,r=e.length;a<r;a++){const s=e[a];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Tt(i,3))}else{const i=Math.min(e.length,t.count);for(let a=0;a<i;a++){const r=e[a];t.setXYZ(a,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const r=t[i];bt.setFromBufferAttribute(r),this.morphTargetsRelative?(lt.addVectors(this.boundingBox.min,bt.min),this.boundingBox.expandByPoint(lt),lt.addVectors(this.boundingBox.max,bt.max),this.boundingBox.expandByPoint(lt)):(this.boundingBox.expandByPoint(bt.min),this.boundingBox.expandByPoint(bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(bt.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const o=t[r];Cn.setFromBufferAttribute(o),this.morphTargetsRelative?(lt.addVectors(bt.min,Cn.min),bt.expandByPoint(lt),lt.addVectors(bt.max,Cn.max),bt.expandByPoint(lt)):(bt.expandByPoint(Cn.min),bt.expandByPoint(Cn.max))}bt.getCenter(i);let a=0;for(let r=0,s=e.count;r<s;r++)lt.fromBufferAttribute(e,r),a=Math.max(a,i.distanceToSquared(lt));if(t)for(let r=0,s=t.length;r<s;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)lt.fromBufferAttribute(o,l),c&&(ji.fromBufferAttribute(e,l),lt.add(ji)),a=Math.max(a,i.distanceToSquared(lt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,a=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wt(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],c=[];for(let B=0;B<i.count;B++)o[B]=new U,c[B]=new U;const l=new U,u=new U,h=new U,f=new We,p=new We,y=new We,x=new U,m=new U;function d(B,C,_){l.fromBufferAttribute(i,B),u.fromBufferAttribute(i,C),h.fromBufferAttribute(i,_),f.fromBufferAttribute(r,B),p.fromBufferAttribute(r,C),y.fromBufferAttribute(r,_),u.sub(l),h.sub(l),p.sub(f),y.sub(f);const T=1/(p.x*y.y-y.x*p.y);isFinite(T)&&(x.copy(u).multiplyScalar(y.y).addScaledVector(h,-p.y).multiplyScalar(T),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-y.x).multiplyScalar(T),o[B].add(x),o[C].add(x),o[_].add(x),c[B].add(m),c[C].add(m),c[_].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let B=0,C=A.length;B<C;++B){const _=A[B],T=_.start,q=_.count;for(let k=T,W=T+q;k<W;k+=3)d(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const M=new U,S=new U,I=new U,w=new U;function P(B){I.fromBufferAttribute(a,B),w.copy(I);const C=o[B];M.copy(C),M.sub(I.multiplyScalar(I.dot(C))).normalize(),S.crossVectors(w,C);const T=S.dot(c[B])<0?-1:1;s.setXYZW(B,M.x,M.y,M.z,T)}for(let B=0,C=A.length;B<C;++B){const _=A[B],T=_.start,q=_.count;for(let k=T,W=T+q;k<W;k+=3)P(e.getX(k+0)),P(e.getX(k+1)),P(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new wt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const a=new U,r=new U,s=new U,o=new U,c=new U,l=new U,u=new U,h=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){const y=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);a.fromBufferAttribute(t,y),r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),u.subVectors(s,r),h.subVectors(a,r),u.cross(h),o.fromBufferAttribute(i,y),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(y,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)a.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),u.subVectors(s,r),h.subVectors(a,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)lt.fromBufferAttribute(e,t),lt.normalize(),e.setXYZ(t,lt.x,lt.y,lt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u);let p=0,y=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*u;for(let d=0;d<u;d++)f[y++]=l[p++]}return new wt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,i=this.index.array,a=this.attributes;for(const o in a){const c=a[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const f=l[u],p=e(f,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const a={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(a[c]=u,r=!0)}r&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const a=e.attributes;for(const l in a){const u=a[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,u=s.length;l<u;l++){const h=s[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bs=new et,bi=new Fo,qn=new Sa,Ns=new U,Xn=new U,jn=new U,Kn=new U,ja=new U,$n=new U,Fs=new U,Zn=new U;class Et extends ut{constructor(e=new Ut,t=new Ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,a=i.attributes.position,r=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(r&&o){$n.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(ja.fromBufferAttribute(h,e),s?$n.addScaledVector(ja,u):$n.addScaledVector(ja.sub(t),u))}t.add($n)}return t}raycast(e,t){const i=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qn.copy(i.boundingSphere),qn.applyMatrix4(r),bi.copy(e.ray).recast(e.near),!(qn.containsPoint(bi.origin)===!1&&(bi.intersectSphere(qn,Ns)===null||bi.origin.distanceToSquared(Ns)>(e.far-e.near)**2))&&(Bs.copy(r).invert(),bi.copy(e.ray).applyMatrix4(Bs),!(i.boundingBox!==null&&bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,bi)))}_computeIntersections(e,t,i){let a;const r=this.geometry,s=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(s))for(let y=0,x=f.length;y<x;y++){const m=f[y],d=s[m.materialIndex],A=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=A,I=M;S<I;S+=3){const w=o.getX(S),P=o.getX(S+1),B=o.getX(S+2);a=Jn(this,d,e,i,l,u,h,w,P,B),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const y=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=y,d=x;m<d;m+=3){const A=o.getX(m),M=o.getX(m+1),S=o.getX(m+2);a=Jn(this,s,e,i,l,u,h,A,M,S),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(c!==void 0)if(Array.isArray(s))for(let y=0,x=f.length;y<x;y++){const m=f[y],d=s[m.materialIndex],A=Math.max(m.start,p.start),M=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=A,I=M;S<I;S+=3){const w=S,P=S+1,B=S+2;a=Jn(this,d,e,i,l,u,h,w,P,B),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const y=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=y,d=x;m<d;m+=3){const A=m,M=m+1,S=m+2;a=Jn(this,s,e,i,l,u,h,A,M,S),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function Rl(n,e,t,i,a,r,s,o){let c;if(e.side===_t?c=i.intersectTriangle(s,r,a,!0,o):c=i.intersectTriangle(a,r,s,e.side===yi,o),c===null)return null;Zn.copy(o),Zn.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Zn);return l<t.near||l>t.far?null:{distance:l,point:Zn.clone(),object:n}}function Jn(n,e,t,i,a,r,s,o,c,l){n.getVertexPosition(o,Xn),n.getVertexPosition(c,jn),n.getVertexPosition(l,Kn);const u=Rl(n,e,t,i,Xn,jn,Kn,Fs);if(u){const h=new U;Gt.getBarycoord(Fs,Xn,jn,Kn,h),a&&(u.uv=Gt.getInterpolatedAttribute(a,o,c,l,h,new We)),r&&(u.uv1=Gt.getInterpolatedAttribute(r,o,c,l,h,new We)),s&&(u.normal=Gt.getInterpolatedAttribute(s,o,c,l,h,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new U,materialIndex:0};Gt.getNormal(Xn,jn,Kn,f.normal),u.face=f,u.barycoord=h}return u}class In extends Ut{constructor(e=1,t=1,i=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:a,heightSegments:r,depthSegments:s};const o=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);const c=[],l=[],u=[],h=[];let f=0,p=0;y("z","y","x",-1,-1,i,t,e,s,r,0),y("z","y","x",1,-1,i,t,-e,s,r,1),y("x","z","y",1,1,e,i,t,a,s,2),y("x","z","y",1,-1,e,i,-t,a,s,3),y("x","y","z",1,-1,e,t,i,a,r,4),y("x","y","z",-1,-1,e,t,-i,a,r,5),this.setIndex(c),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(h,2));function y(x,m,d,A,M,S,I,w,P,B,C){const _=S/P,T=I/B,q=S/2,k=I/2,W=w/2,$=P+1,H=B+1;let Q=0,G=0;const ae=new U;for(let de=0;de<H;de++){const ve=de*T-k;for(let De=0;De<$;De++){const $e=De*_-q;ae[x]=$e*A,ae[m]=ve*M,ae[d]=W,l.push(ae.x,ae.y,ae.z),ae[x]=0,ae[m]=0,ae[d]=w>0?1:-1,u.push(ae.x,ae.y,ae.z),h.push(De/P),h.push(1-de/B),Q+=1}}for(let de=0;de<B;de++)for(let ve=0;ve<P;ve++){const De=f+ve+$*de,$e=f+ve+$*(de+1),Y=f+(ve+1)+$*(de+1),ee=f+(ve+1)+$*de;c.push(De,$e,ee),c.push($e,Y,ee),G+=6}o.addGroup(p,G,C),p+=G,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new In(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function pn(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const a=n[t][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=a.clone():Array.isArray(a)?e[t][i]=a.slice():e[t][i]=a}}return e}function gt(n){const e={};for(let t=0;t<n.length;t++){const i=pn(n[t]);for(const a in i)e[a]=i[a]}return e}function Pl(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ho(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:He.workingColorSpace}const Ll={clone:pn,merge:gt};var Dl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Il=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vi extends Dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dl,this.fragmentShader=Il,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pn(e.uniforms),this.uniformsGroups=Pl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const s=this.uniforms[a].value;s&&s.isTexture?t.uniforms[a]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[a]={type:"m4",value:s.toArray()}:t.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Vo extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const li=new U,Os=new We,ks=new We;class At extends Vo{constructor(e=50,t=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ta*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yr*2*Math.atan(Math.tan(Ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(li.x,li.y).multiplyScalar(-e/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(li.x,li.y).multiplyScalar(-e/li.z)}getViewSize(e,t){return this.getViewBounds(e,Os,ks),t.subVectors(ks,Os)}setViewOffset(e,t,i,a,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ta*.5*this.fov)/this.zoom,i=2*t,a=this.aspect*i,r=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;r+=s.offsetX*a/c,t-=s.offsetY*i/l,a*=s.width/c,i*=s.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ki=-90,$i=1;class Ul extends ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new At(Ki,$i,e,t);a.layers=this.layers,this.add(a);const r=new At(Ki,$i,e,t);r.layers=this.layers,this.add(r);const s=new At(Ki,$i,e,t);s.layers=this.layers,this.add(s);const o=new At(Ki,$i,e,t);o.layers=this.layers,this.add(o);const c=new At(Ki,$i,e,t);c.layers=this.layers,this.add(c);const l=new At(Ki,$i,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,a,r,s,o,c]=t;for(const l of t)this.remove(l);if(e===ei)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===pa)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(t,r),e.setRenderTarget(i,1,a),e.render(t,s),e.setRenderTarget(i,2,a),e.render(t,o),e.setRenderTarget(i,3,a),e.render(t,c),e.setRenderTarget(i,4,a),e.render(t,l),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,a),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}}class Wo extends xt{constructor(e,t,i,a,r,s,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:ln,super(e,t,i,a,r,s,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Bl extends Ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Wo(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new In(5,5,5),r=new vi({name:"CubemapFromEquirect",uniforms:pn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_t,blending:mi});r.uniforms.tEquirect.value=t;const s=new Et(a,r),o=t.minFilter;return t.minFilter===Ii&&(t.minFilter=Yt),new Ul(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,i,a){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,a);e.setRenderTarget(r)}}class Ui extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nl={type:"move"};class Ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let a=null,r=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,y=.005;l.inputState.pinching&&f>p+y?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-y&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,i),a===null&&r!==null&&(a=r),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Nl)))}return o!==null&&(o.visible=a!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ui;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class as{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ue(e),this.density=t}clone(){return new as(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Fl extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const $a=new U,Ol=new U,kl=new Re;class Ti{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,a){return this.normal.set(e,t,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const a=$a.subVectors(i,t).cross(Ol.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta($a),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||kl.getNormalMatrix(e),a=this.coplanarPoint($a).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new Sa,Qn=new U;class rs{constructor(e=new Ti,t=new Ti,i=new Ti,a=new Ti,r=new Ti,s=new Ti){this.planes=[e,t,i,a,r,s]}set(e,t,i,a,r,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(a),o[4].copy(r),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ei){const i=this.planes,a=e.elements,r=a[0],s=a[1],o=a[2],c=a[3],l=a[4],u=a[5],h=a[6],f=a[7],p=a[8],y=a[9],x=a[10],m=a[11],d=a[12],A=a[13],M=a[14],S=a[15];if(i[0].setComponents(c-r,f-l,m-p,S-d).normalize(),i[1].setComponents(c+r,f+l,m+p,S+d).normalize(),i[2].setComponents(c+s,f+u,m+y,S+A).normalize(),i[3].setComponents(c-s,f-u,m-y,S-A).normalize(),i[4].setComponents(c-o,f-h,m-x,S-M).normalize(),t===ei)i[5].setComponents(c+o,f+h,m+x,S+M).normalize();else if(t===pa)i[5].setComponents(o,h,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){const t=this.planes,i=e.center,a=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const a=t[i];if(Qn.x=a.normal.x>0?e.max.x:e.min.x,Qn.y=a.normal.y>0?e.max.y:e.min.y,Qn.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Qn)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ss extends Dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const zs=new et,qr=new Fo,ea=new Sa,ta=new U;class Yo extends ut{constructor(e=new Ut,t=new ss){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,a=this.matrixWorld,r=e.params.Points.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ea.copy(i.boundingSphere),ea.applyMatrix4(a),ea.radius+=r,e.ray.intersectsSphere(ea)===!1)return;zs.copy(a).invert(),qr.copy(e.ray).applyMatrix4(zs);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,h=i.attributes.position;if(l!==null){const f=Math.max(0,s.start),p=Math.min(l.count,s.start+s.count);for(let y=f,x=p;y<x;y++){const m=l.getX(y);ta.fromBufferAttribute(h,m),Gs(ta,m,c,a,e,t,this)}}else{const f=Math.max(0,s.start),p=Math.min(h.count,s.start+s.count);for(let y=f,x=p;y<x;y++)ta.fromBufferAttribute(h,y),Gs(ta,y,c,a,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Gs(n,e,t,i,a,r,s){const o=qr.distanceSqToPoint(n);if(o<t){const c=new U;qr.closestPointToPoint(n,c),c.applyMatrix4(i);const l=a.ray.origin.distanceTo(c);if(l<a.near||l>a.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class qo extends xt{constructor(e,t,i,a,r,s,o,c,l,u=rn){if(u!==rn&&u!==hn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===rn&&(i=Bi),i===void 0&&u===hn&&(i=un),super(null,a,r,s,o,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Vt,this.minFilter=c!==void 0?c:Vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ns(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ca extends Ut{constructor(e=1,t=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:a};const r=e/2,s=t/2,o=Math.floor(i),c=Math.floor(a),l=o+1,u=c+1,h=e/o,f=t/c,p=[],y=[],x=[],m=[];for(let d=0;d<u;d++){const A=d*f-s;for(let M=0;M<l;M++){const S=M*h-r;y.push(S,-A,0),x.push(0,0,1),m.push(M/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let A=0;A<o;A++){const M=A+l*d,S=A+l*(d+1),I=A+1+l*(d+1),w=A+1+l*d;p.push(M,S,w),p.push(S,I,w)}this.setIndex(p),this.setAttribute("position",new Tt(y,3)),this.setAttribute("normal",new Tt(x,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.width,e.height,e.widthSegments,e.heightSegments)}}class ga extends Ut{constructor(e=.5,t=1,i=32,a=1,r=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:a,thetaStart:r,thetaLength:s},i=Math.max(3,i),a=Math.max(1,a);const o=[],c=[],l=[],u=[];let h=e;const f=(t-e)/a,p=new U,y=new We;for(let x=0;x<=a;x++){for(let m=0;m<=i;m++){const d=r+m/i*s;p.x=h*Math.cos(d),p.y=h*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),y.x=(p.x/t+1)/2,y.y=(p.y/t+1)/2,u.push(y.x,y.y)}h+=f}for(let x=0;x<a;x++){const m=x*(i+1);for(let d=0;d<i;d++){const A=d+m,M=A,S=A+i+1,I=A+i+2,w=A+1;o.push(M,S,w),o.push(S,I,w)}}this.setIndex(o),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(l,3)),this.setAttribute("uv",new Tt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ya extends Ut{constructor(e=1,t=32,i=16,a=0,r=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:a,phiLength:r,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(s+o,Math.PI);let l=0;const u=[],h=new U,f=new U,p=[],y=[],x=[],m=[];for(let d=0;d<=i;d++){const A=[],M=d/i;let S=0;d===0&&s===0?S=.5/t:d===i&&c===Math.PI&&(S=-.5/t);for(let I=0;I<=t;I++){const w=I/t;h.x=-e*Math.cos(a+w*r)*Math.sin(s+M*o),h.y=e*Math.cos(s+M*o),h.z=e*Math.sin(a+w*r)*Math.sin(s+M*o),y.push(h.x,h.y,h.z),f.copy(h).normalize(),x.push(f.x,f.y,f.z),m.push(w+S,1-M),A.push(l++)}u.push(A)}for(let d=0;d<i;d++)for(let A=0;A<t;A++){const M=u[d][A+1],S=u[d][A],I=u[d+1][A],w=u[d+1][A+1];(d!==0||s>0)&&p.push(M,S,w),(d!==i-1||c<Math.PI)&&p.push(S,I,w)}this.setIndex(p),this.setAttribute("position",new Tt(y,3)),this.setAttribute("normal",new Tt(x,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ya(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class zl extends Dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gl extends Dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class os extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Za=new et,Hs=new U,Vs=new U;class Xo{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rs,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new Ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Hs.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hs),Vs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vs),t.updateMatrixWorld(),Za.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Za),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Za)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ws=new et,bn=new U,Ja=new U;class Hl extends Xo{constructor(){super(new At(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new We(4,2),this._viewportCount=6,this._viewports=[new Ke(2,1,1,1),new Ke(0,1,1,1),new Ke(3,1,1,1),new Ke(1,1,1,1),new Ke(3,0,1,1),new Ke(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,a=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),bn.setFromMatrixPosition(e.matrixWorld),i.position.copy(bn),Ja.copy(i.position),Ja.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ja),i.updateMatrixWorld(),a.makeTranslation(-bn.x,-bn.y,-bn.z),Ws.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ws)}}class Vl extends os{constructor(e,t,i=0,a=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=a,this.shadow=new Hl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class jo extends Vo{constructor(e=-1,t=1,i=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=i-e,s=i+e,o=a+t,c=a-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,s=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Wl extends Xo{constructor(){super(new jo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ys extends os{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new Wl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Yl extends os{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ql extends At{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Xl{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qs(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=qs();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function qs(){return performance.now()}function Xs(n,e,t,i){const a=jl(i);switch(t){case wo:return n*e;case Ro:return n*e;case Po:return n*e*2;case Lo:return n*e/a.components*a.byteLength;case es:return n*e/a.components*a.byteLength;case Do:return n*e*2/a.components*a.byteLength;case ts:return n*e*2/a.components*a.byteLength;case To:return n*e*3/a.components*a.byteLength;case Ht:return n*e*4/a.components*a.byteLength;case is:return n*e*4/a.components*a.byteLength;case oa:case ca:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case la:case da:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xr:case Cr:return Math.max(n,16)*Math.max(e,8)/4;case _r:case Sr:return Math.max(n,8)*Math.max(e,8)/2;case br:case Mr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ar:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Er:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wr:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Tr:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Rr:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Pr:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Lr:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Dr:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ir:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ur:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Br:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Nr:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Fr:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Or:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case kr:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ua:case zr:case Gr:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Io:case Hr:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Vr:case Wr:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jl(n){switch(n){case ii:case Mo:return{byteLength:1,components:1};case En:case Ao:case Tn:return{byteLength:2,components:1};case Jr:case Qr:return{byteLength:2,components:4};case Bi:case Zr:case Qt:return{byteLength:4,components:1};case Eo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$r}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$r);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ko(){let n=null,e=!1,t=null,i=null;function a(r,s){t(r,s),i=n.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(a),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Kl(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const u=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,u);else{h.sort((p,y)=>p.start-y.start);let f=0;for(let p=1;p<h.length;p++){const y=h[f],x=h[p];x.start<=y.start+y.count+1?y.count=Math.max(y.count,x.start+x.count-y.start):(++f,h[f]=x)}h.length=f+1;for(let p=0,y=h.length;p<y;p++){const x=h[p];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:a,remove:r,update:s}}var $l=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zl=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ql=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ed=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,td=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,id=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ad=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,rd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,od=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ld=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,dd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,md=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_d=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Sd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Cd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Md=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ad=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ed="gl_FragColor = linearToOutputTexel( gl_FragColor );",wd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ld=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Id=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ud=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Od=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Vd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$d=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,au=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ru=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,su=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ou=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,du=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_u=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Su=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Au=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Eu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ru=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Du=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Iu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Uu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ou=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ku=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ju=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ku=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$u=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ju=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eh=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,th=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ih=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ah=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ch=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hh=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fh=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ph=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mh=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_h=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sh=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ch=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ah=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wh=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Th=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Le={alphahash_fragment:$l,alphahash_pars_fragment:Zl,alphamap_fragment:Jl,alphamap_pars_fragment:Ql,alphatest_fragment:ed,alphatest_pars_fragment:td,aomap_fragment:id,aomap_pars_fragment:nd,batching_pars_vertex:ad,batching_vertex:rd,begin_vertex:sd,beginnormal_vertex:od,bsdfs:cd,iridescence_fragment:ld,bumpmap_pars_fragment:dd,clipping_planes_fragment:ud,clipping_planes_pars_fragment:hd,clipping_planes_pars_vertex:fd,clipping_planes_vertex:pd,color_fragment:md,color_pars_fragment:gd,color_pars_vertex:yd,color_vertex:vd,common:_d,cube_uv_reflection_fragment:xd,defaultnormal_vertex:Sd,displacementmap_pars_vertex:Cd,displacementmap_vertex:bd,emissivemap_fragment:Md,emissivemap_pars_fragment:Ad,colorspace_fragment:Ed,colorspace_pars_fragment:wd,envmap_fragment:Td,envmap_common_pars_fragment:Rd,envmap_pars_fragment:Pd,envmap_pars_vertex:Ld,envmap_physical_pars_fragment:Hd,envmap_vertex:Dd,fog_vertex:Id,fog_pars_vertex:Ud,fog_fragment:Bd,fog_pars_fragment:Nd,gradientmap_pars_fragment:Fd,lightmap_pars_fragment:Od,lights_lambert_fragment:kd,lights_lambert_pars_fragment:zd,lights_pars_begin:Gd,lights_toon_fragment:Vd,lights_toon_pars_fragment:Wd,lights_phong_fragment:Yd,lights_phong_pars_fragment:qd,lights_physical_fragment:Xd,lights_physical_pars_fragment:jd,lights_fragment_begin:Kd,lights_fragment_maps:$d,lights_fragment_end:Zd,logdepthbuf_fragment:Jd,logdepthbuf_pars_fragment:Qd,logdepthbuf_pars_vertex:eu,logdepthbuf_vertex:tu,map_fragment:iu,map_pars_fragment:nu,map_particle_fragment:au,map_particle_pars_fragment:ru,metalnessmap_fragment:su,metalnessmap_pars_fragment:ou,morphinstance_vertex:cu,morphcolor_vertex:lu,morphnormal_vertex:du,morphtarget_pars_vertex:uu,morphtarget_vertex:hu,normal_fragment_begin:fu,normal_fragment_maps:pu,normal_pars_fragment:mu,normal_pars_vertex:gu,normal_vertex:yu,normalmap_pars_fragment:vu,clearcoat_normal_fragment_begin:_u,clearcoat_normal_fragment_maps:xu,clearcoat_pars_fragment:Su,iridescence_pars_fragment:Cu,opaque_fragment:bu,packing:Mu,premultiplied_alpha_fragment:Au,project_vertex:Eu,dithering_fragment:wu,dithering_pars_fragment:Tu,roughnessmap_fragment:Ru,roughnessmap_pars_fragment:Pu,shadowmap_pars_fragment:Lu,shadowmap_pars_vertex:Du,shadowmap_vertex:Iu,shadowmask_pars_fragment:Uu,skinbase_vertex:Bu,skinning_pars_vertex:Nu,skinning_vertex:Fu,skinnormal_vertex:Ou,specularmap_fragment:ku,specularmap_pars_fragment:zu,tonemapping_fragment:Gu,tonemapping_pars_fragment:Hu,transmission_fragment:Vu,transmission_pars_fragment:Wu,uv_pars_fragment:Yu,uv_pars_vertex:qu,uv_vertex:Xu,worldpos_vertex:ju,background_vert:Ku,background_frag:$u,backgroundCube_vert:Zu,backgroundCube_frag:Ju,cube_vert:Qu,cube_frag:eh,depth_vert:th,depth_frag:ih,distanceRGBA_vert:nh,distanceRGBA_frag:ah,equirect_vert:rh,equirect_frag:sh,linedashed_vert:oh,linedashed_frag:ch,meshbasic_vert:lh,meshbasic_frag:dh,meshlambert_vert:uh,meshlambert_frag:hh,meshmatcap_vert:fh,meshmatcap_frag:ph,meshnormal_vert:mh,meshnormal_frag:gh,meshphong_vert:yh,meshphong_frag:vh,meshphysical_vert:_h,meshphysical_frag:xh,meshtoon_vert:Sh,meshtoon_frag:Ch,points_vert:bh,points_frag:Mh,shadow_vert:Ah,shadow_frag:Eh,sprite_vert:wh,sprite_frag:Th},te={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Re},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Re}},envmap:{envMap:{value:null},envMapRotation:{value:new Re},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Re},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0},uvTransform:{value:new Re}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Re},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0}}},Wt={basic:{uniforms:gt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.fog]),vertexShader:Le.meshbasic_vert,fragmentShader:Le.meshbasic_frag},lambert:{uniforms:gt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Le.meshlambert_vert,fragmentShader:Le.meshlambert_frag},phong:{uniforms:gt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Le.meshphong_vert,fragmentShader:Le.meshphong_frag},standard:{uniforms:gt([te.common,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.roughnessmap,te.metalnessmap,te.fog,te.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag},toon:{uniforms:gt([te.common,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.gradientmap,te.fog,te.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Le.meshtoon_vert,fragmentShader:Le.meshtoon_frag},matcap:{uniforms:gt([te.common,te.bumpmap,te.normalmap,te.displacementmap,te.fog,{matcap:{value:null}}]),vertexShader:Le.meshmatcap_vert,fragmentShader:Le.meshmatcap_frag},points:{uniforms:gt([te.points,te.fog]),vertexShader:Le.points_vert,fragmentShader:Le.points_frag},dashed:{uniforms:gt([te.common,te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Le.linedashed_vert,fragmentShader:Le.linedashed_frag},depth:{uniforms:gt([te.common,te.displacementmap]),vertexShader:Le.depth_vert,fragmentShader:Le.depth_frag},normal:{uniforms:gt([te.common,te.bumpmap,te.normalmap,te.displacementmap,{opacity:{value:1}}]),vertexShader:Le.meshnormal_vert,fragmentShader:Le.meshnormal_frag},sprite:{uniforms:gt([te.sprite,te.fog]),vertexShader:Le.sprite_vert,fragmentShader:Le.sprite_frag},background:{uniforms:{uvTransform:{value:new Re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Le.background_vert,fragmentShader:Le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Re}},vertexShader:Le.backgroundCube_vert,fragmentShader:Le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Le.cube_vert,fragmentShader:Le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Le.equirect_vert,fragmentShader:Le.equirect_frag},distanceRGBA:{uniforms:gt([te.common,te.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Le.distanceRGBA_vert,fragmentShader:Le.distanceRGBA_frag},shadow:{uniforms:gt([te.lights,te.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Le.shadow_vert,fragmentShader:Le.shadow_frag}};Wt.physical={uniforms:gt([Wt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Re},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Re},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Re},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Re},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Re},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Re},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Re}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag};const ia={r:0,b:0,g:0},Ai=new ni,Rh=new et;function Ph(n,e,t,i,a,r,s){const o=new Ue(0);let c=r===!0?0:1,l,u,h=null,f=0,p=null;function y(M){let S=M.isScene===!0?M.background:null;return S&&S.isTexture&&(S=(M.backgroundBlurriness>0?t:e).get(S)),S}function x(M){let S=!1;const I=y(M);I===null?d(o,c):I&&I.isColor&&(d(I,1),S=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,S){const I=y(S);I&&(I.isCubeTexture||I.mapping===xa)?(u===void 0&&(u=new Et(new In(1,1,1),new vi({name:"BackgroundCubeMaterial",uniforms:pn(Wt.backgroundCube.uniforms),vertexShader:Wt.backgroundCube.vertexShader,fragmentShader:Wt.backgroundCube.fragmentShader,side:_t,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,P,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),Ai.copy(S.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Rh.makeRotationFromEuler(Ai)),u.material.toneMapped=He.getTransfer(I.colorSpace)!==je,(h!==I||f!==I.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=I,f=I.version,p=n.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(l===void 0&&(l=new Et(new Ca(2,2),new vi({name:"BackgroundMaterial",uniforms:pn(Wt.background.uniforms),vertexShader:Wt.background.vertexShader,fragmentShader:Wt.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(l)),l.material.uniforms.t2D.value=I,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=He.getTransfer(I.colorSpace)!==je,I.matrixAutoUpdate===!0&&I.updateMatrix(),l.material.uniforms.uvTransform.value.copy(I.matrix),(h!==I||f!==I.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,h=I,f=I.version,p=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function d(M,S){M.getRGB(ia,Ho(n)),i.buffers.color.setClear(ia.r,ia.g,ia.b,S,s)}function A(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,S=1){o.set(M),c=S,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,d(o,c)},render:x,addToRenderList:m,dispose:A}}function Lh(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},a=f(null);let r=a,s=!1;function o(_,T,q,k,W){let $=!1;const H=h(k,q,T);r!==H&&(r=H,l(r.object)),$=p(_,k,q,W),$&&y(_,k,q,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),($||s)&&(s=!1,S(_,T,q,k),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return n.createVertexArray()}function l(_){return n.bindVertexArray(_)}function u(_){return n.deleteVertexArray(_)}function h(_,T,q){const k=q.wireframe===!0;let W=i[_.id];W===void 0&&(W={},i[_.id]=W);let $=W[T.id];$===void 0&&($={},W[T.id]=$);let H=$[k];return H===void 0&&(H=f(c()),$[k]=H),H}function f(_){const T=[],q=[],k=[];for(let W=0;W<t;W++)T[W]=0,q[W]=0,k[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:q,attributeDivisors:k,object:_,attributes:{},index:null}}function p(_,T,q,k){const W=r.attributes,$=T.attributes;let H=0;const Q=q.getAttributes();for(const G in Q)if(Q[G].location>=0){const de=W[G];let ve=$[G];if(ve===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(ve=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(ve=_.instanceColor)),de===void 0||de.attribute!==ve||ve&&de.data!==ve.data)return!0;H++}return r.attributesNum!==H||r.index!==k}function y(_,T,q,k){const W={},$=T.attributes;let H=0;const Q=q.getAttributes();for(const G in Q)if(Q[G].location>=0){let de=$[G];de===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(de=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(de=_.instanceColor));const ve={};ve.attribute=de,de&&de.data&&(ve.data=de.data),W[G]=ve,H++}r.attributes=W,r.attributesNum=H,r.index=k}function x(){const _=r.newAttributes;for(let T=0,q=_.length;T<q;T++)_[T]=0}function m(_){d(_,0)}function d(_,T){const q=r.newAttributes,k=r.enabledAttributes,W=r.attributeDivisors;q[_]=1,k[_]===0&&(n.enableVertexAttribArray(_),k[_]=1),W[_]!==T&&(n.vertexAttribDivisor(_,T),W[_]=T)}function A(){const _=r.newAttributes,T=r.enabledAttributes;for(let q=0,k=T.length;q<k;q++)T[q]!==_[q]&&(n.disableVertexAttribArray(q),T[q]=0)}function M(_,T,q,k,W,$,H){H===!0?n.vertexAttribIPointer(_,T,q,W,$):n.vertexAttribPointer(_,T,q,k,W,$)}function S(_,T,q,k){x();const W=k.attributes,$=q.getAttributes(),H=T.defaultAttributeValues;for(const Q in $){const G=$[Q];if(G.location>=0){let ae=W[Q];if(ae===void 0&&(Q==="instanceMatrix"&&_.instanceMatrix&&(ae=_.instanceMatrix),Q==="instanceColor"&&_.instanceColor&&(ae=_.instanceColor)),ae!==void 0){const de=ae.normalized,ve=ae.itemSize,De=e.get(ae);if(De===void 0)continue;const $e=De.buffer,Y=De.type,ee=De.bytesPerElement,me=Y===n.INT||Y===n.UNSIGNED_INT||ae.gpuType===Zr;if(ae.isInterleavedBufferAttribute){const re=ae.data,Ce=re.stride,Ve=ae.offset;if(re.isInstancedInterleavedBuffer){for(let Me=0;Me<G.locationSize;Me++)d(G.location+Me,re.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Me=0;Me<G.locationSize;Me++)m(G.location+Me);n.bindBuffer(n.ARRAY_BUFFER,$e);for(let Me=0;Me<G.locationSize;Me++)M(G.location+Me,ve/G.locationSize,Y,de,Ce*ee,(Ve+ve/G.locationSize*Me)*ee,me)}else{if(ae.isInstancedBufferAttribute){for(let re=0;re<G.locationSize;re++)d(G.location+re,ae.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let re=0;re<G.locationSize;re++)m(G.location+re);n.bindBuffer(n.ARRAY_BUFFER,$e);for(let re=0;re<G.locationSize;re++)M(G.location+re,ve/G.locationSize,Y,de,ve*ee,ve/G.locationSize*re*ee,me)}}else if(H!==void 0){const de=H[Q];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(G.location,de);break;case 3:n.vertexAttrib3fv(G.location,de);break;case 4:n.vertexAttrib4fv(G.location,de);break;default:n.vertexAttrib1fv(G.location,de)}}}}A()}function I(){B();for(const _ in i){const T=i[_];for(const q in T){const k=T[q];for(const W in k)u(k[W].object),delete k[W];delete T[q]}delete i[_]}}function w(_){if(i[_.id]===void 0)return;const T=i[_.id];for(const q in T){const k=T[q];for(const W in k)u(k[W].object),delete k[W];delete T[q]}delete i[_.id]}function P(_){for(const T in i){const q=i[T];if(q[_.id]===void 0)continue;const k=q[_.id];for(const W in k)u(k[W].object),delete k[W];delete q[_.id]}}function B(){C(),s=!0,r!==a&&(r=a,l(r.object))}function C(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:B,resetDefaultState:C,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:A}}function Dh(n,e,t){let i;function a(l){i=l}function r(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function s(l,u,h){h!==0&&(n.drawArraysInstanced(i,l,u,h),t.update(u,i,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,h);let p=0;for(let y=0;y<h;y++)p+=u[y];t.update(p,i,1)}function c(l,u,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let y=0;y<l.length;y++)s(l[y],u[y],f[y]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,h);let y=0;for(let x=0;x<h;x++)y+=u[x]*f[x];t.update(y,i,1)}}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Ih(n,e,t,i){let a;function r(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(P){return!(P!==Ht&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const B=P===Tn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==ii&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Qt&&!B)}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=y>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:y,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:A,maxVaryings:M,maxFragmentUniforms:S,vertexTextures:I,maxSamples:w}}function Uh(n){const e=this;let t=null,i=0,a=!1,r=!1;const s=new Ti,o=new Re,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||a;return a=f,i=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const y=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!a||y===null||y.length===0||r&&!m)r?u(null):l();else{const A=r?0:i,M=A*4;let S=d.clippingState||null;c.value=S,S=u(y,f,M,p);for(let I=0;I!==M;++I)S[I]=t[I];d.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,y){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,y!==!0||m===null){const d=p+x*4,A=f.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,S=p;M!==x;++M,S+=4)s.copy(h[M]).applyMatrix4(A,o),s.normal.toArray(m,S),m[S+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Bh(n){let e=new WeakMap;function t(s,o){return o===mr?s.mapping=ln:o===gr&&(s.mapping=dn),s}function i(s){if(s&&s.isTexture){const o=s.mapping;if(o===mr||o===gr)if(e.has(s)){const c=e.get(s).texture;return t(c,s.mapping)}else{const c=s.image;if(c&&c.height>0){const l=new Bl(c.height);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",a),t(l.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Qi=4,js=[.125,.215,.35,.446,.526,.582],Li=20,Qa=new jo,Ks=new Ue;let er=null,tr=0,ir=0,nr=!1;const Ri=(1+Math.sqrt(5))/2,Zi=1/Ri,$s=[new U(-Ri,Zi,0),new U(Ri,Zi,0),new U(-Zi,0,Ri),new U(Zi,0,Ri),new U(0,Ri,-Zi),new U(0,Ri,Zi),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],Nh=new U;class Zs{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,a=100,r={}){const{size:s=256,position:o=Nh}=r;er=this._renderer.getRenderTarget(),tr=this._renderer.getActiveCubeFace(),ir=this._renderer.getActiveMipmapLevel(),nr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,a,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(er,tr,ir),this._renderer.xr.enabled=nr,e.scissorTest=!1,na(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ln||e.mapping===dn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),er=this._renderer.getRenderTarget(),tr=this._renderer.getActiveCubeFace(),ir=this._renderer.getActiveMipmapLevel(),nr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:Tn,format:Ht,colorSpace:fn,depthBuffer:!1},a=Js(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Js(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fh(r)),this._blurMaterial=Oh(r,e,t)}return a}_compileMaterial(e){const t=new Et(this._lodPlanes[0],e);this._renderer.compile(t,Qa)}_sceneToCubeUV(e,t,i,a,r){const c=new At(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(Ks),h.toneMapping=gi,h.autoClear=!1;const y=new Ji({name:"PMREM.Background",side:_t,depthWrite:!1,depthTest:!1}),x=new Et(new In,y);let m=!1;const d=e.background;d?d.isColor&&(y.color.copy(d),e.background=null,m=!0):(y.color.copy(Ks),m=!0);for(let A=0;A<6;A++){const M=A%3;M===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[A],r.y,r.z)):M===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[A]));const S=this._cubeSize;na(a,M*S,A>2?S:0,S,S),h.setRenderTarget(a),m&&h.render(x,c),h.render(e,c)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=p,h.autoClear=f,e.background=d}_textureToCubeUV(e,t){const i=this._renderer,a=e.mapping===ln||e.mapping===dn;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=eo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qs());const r=a?this._cubemapMaterial:this._equirectMaterial,s=new Et(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;na(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,Qa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=$s[(a-r-1)%$s.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,a,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,a,"latitudinal",r),this._halfBlur(s,e,i,i,a,"longitudinal",r)}_halfBlur(e,t,i,a,r,s,o){const c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Et(this._lodPlanes[a],l),f=l.uniforms,p=this._sizeLods[i]-1,y=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Li-1),x=r/y,m=isFinite(r)?1+Math.floor(u*x):Li;m>Li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Li}`);const d=[];let A=0;for(let P=0;P<Li;++P){const B=P/x,C=Math.exp(-B*B/2);d.push(C),P===0?A+=C:P<m&&(A+=2*C)}for(let P=0;P<d.length;P++)d[P]=d[P]/A;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=s==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=y,f.mipInt.value=M-i;const S=this._sizeLods[a],I=3*S*(a>M-Qi?a-M+Qi:0),w=4*(this._cubeSize-S);na(t,I,w,3*S,2*S),c.setRenderTarget(t),c.render(h,Qa)}}function Fh(n){const e=[],t=[],i=[];let a=n;const r=n-Qi+1+js.length;for(let s=0;s<r;s++){const o=Math.pow(2,a);t.push(o);let c=1/o;s>n-Qi?c=js[s-n+Qi-1]:s===0&&(c=0),i.push(c);const l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,y=6,x=3,m=2,d=1,A=new Float32Array(x*y*p),M=new Float32Array(m*y*p),S=new Float32Array(d*y*p);for(let w=0;w<p;w++){const P=w%3*2/3-1,B=w>2?0:-1,C=[P,B,0,P+2/3,B,0,P+2/3,B+1,0,P,B,0,P+2/3,B+1,0,P,B+1,0];A.set(C,x*y*w),M.set(f,m*y*w);const _=[w,w,w,w,w,w];S.set(_,d*y*w)}const I=new Ut;I.setAttribute("position",new wt(A,x)),I.setAttribute("uv",new wt(M,m)),I.setAttribute("faceIndex",new wt(S,d)),e.push(I),a>Qi&&a--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Js(n,e,t){const i=new Ni(n,e,t);return i.texture.mapping=xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function na(n,e,t,i,a){n.viewport.set(e,t,i,a),n.scissor.set(e,t,i,a)}function Oh(n,e,t){const i=new Float32Array(Li),a=new U(0,1,0);return new vi({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Qs(){return new vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function eo(){return new vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function cs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function kh(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===mr||c===gr,u=c===ln||c===dn;if(l||u){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Zs(n)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&a(p)?(t===null&&(t=new Zs(n)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function a(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}function zh(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=n.getExtension(i)}return e[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&wi("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function Gh(n,e,t,i){const a={},r=new WeakMap;function s(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const y in f.attributes)e.remove(f.attributes[y]);f.removeEventListener("dispose",s),delete a[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return a[f.id]===!0||(f.addEventListener("dispose",s),a[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function l(h){const f=[],p=h.index,y=h.attributes.position;let x=0;if(p!==null){const A=p.array;x=p.version;for(let M=0,S=A.length;M<S;M+=3){const I=A[M+0],w=A[M+1],P=A[M+2];f.push(I,w,w,P,P,I)}}else if(y!==void 0){const A=y.array;x=y.version;for(let M=0,S=A.length/3-1;M<S;M+=3){const I=M+0,w=M+1,P=M+2;f.push(I,w,w,P,P,I)}}else return;const m=new(Bo(f)?Go:zo)(f,1);m.version=x;const d=r.get(h);d&&e.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Hh(n,e,t){let i;function a(f){i=f}let r,s;function o(f){r=f.type,s=f.bytesPerElement}function c(f,p){n.drawElements(i,p,r,f*s),t.update(p,i,1)}function l(f,p,y){y!==0&&(n.drawElementsInstanced(i,p,r,f*s,y),t.update(p,i,y))}function u(f,p,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,y);let m=0;for(let d=0;d<y;d++)m+=p[d];t.update(m,i,1)}function h(f,p,y,x){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/s,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,x,0,y);let d=0;for(let A=0;A<y;A++)d+=p[A]*x[A];t.update(d,i,1)}}this.setMode=a,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Vh(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:i}}function Wh(n,e,t){const i=new WeakMap,a=new Ke;function r(s,o,c){const l=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let C=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",C)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),y===!0&&(M=2),x===!0&&(M=3);let S=o.attributes.position.count*M,I=1;S>e.maxTextureSize&&(I=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const w=new Float32Array(S*I*4*h),P=new No(w,S,I,h);P.type=Qt,P.needsUpdate=!0;const B=M*4;for(let _=0;_<h;_++){const T=m[_],q=d[_],k=A[_],W=S*I*4*_;for(let $=0;$<T.count;$++){const H=$*B;p===!0&&(a.fromBufferAttribute(T,$),w[W+H+0]=a.x,w[W+H+1]=a.y,w[W+H+2]=a.z,w[W+H+3]=0),y===!0&&(a.fromBufferAttribute(q,$),w[W+H+4]=a.x,w[W+H+5]=a.y,w[W+H+6]=a.z,w[W+H+7]=0),x===!0&&(a.fromBufferAttribute(k,$),w[W+H+8]=a.x,w[W+H+9]=a.y,w[W+H+10]=a.z,w[W+H+11]=k.itemSize===4?a.w:1)}}f={count:h,texture:P,size:new We(S,I)},i.set(o,f),o.addEventListener("dispose",C)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];const y=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",y),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Yh(n,e,t,i){let a=new WeakMap;function r(c){const l=i.render.frame,u=c.geometry,h=e.get(c,u);if(a.get(h)!==l&&(e.update(h),a.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),a.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),a.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;a.get(f)!==l&&(f.update(),a.set(f,l))}return h}function s(){a=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:s}}const $o=new xt,to=new qo(1,1),Zo=new No,Jo=new vl,Qo=new Wo,io=[],no=[],ao=new Float32Array(16),ro=new Float32Array(9),so=new Float32Array(4);function gn(n,e,t){const i=n[0];if(i<=0||i>0)return n;const a=e*t;let r=io[a];if(r===void 0&&(r=new Float32Array(a),io[a]=r),e!==0){i.toArray(r,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(r,o)}return r}function ot(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function ct(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ba(n,e){let t=no[e];t===void 0&&(t=new Int32Array(e),no[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function qh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Xh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;n.uniform2fv(this.addr,e),ct(t,e)}}function jh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ot(t,e))return;n.uniform3fv(this.addr,e),ct(t,e)}}function Kh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;n.uniform4fv(this.addr,e),ct(t,e)}}function $h(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ot(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),ct(t,e)}else{if(ot(t,i))return;so.set(i),n.uniformMatrix2fv(this.addr,!1,so),ct(t,i)}}function Zh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ot(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),ct(t,e)}else{if(ot(t,i))return;ro.set(i),n.uniformMatrix3fv(this.addr,!1,ro),ct(t,i)}}function Jh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ot(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),ct(t,e)}else{if(ot(t,i))return;ao.set(i),n.uniformMatrix4fv(this.addr,!1,ao),ct(t,i)}}function Qh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function ef(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;n.uniform2iv(this.addr,e),ct(t,e)}}function tf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ot(t,e))return;n.uniform3iv(this.addr,e),ct(t,e)}}function nf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;n.uniform4iv(this.addr,e),ct(t,e)}}function af(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function rf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;n.uniform2uiv(this.addr,e),ct(t,e)}}function sf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ot(t,e))return;n.uniform3uiv(this.addr,e),ct(t,e)}}function of(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;n.uniform4uiv(this.addr,e),ct(t,e)}}function cf(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a);let r;this.type===n.SAMPLER_2D_SHADOW?(to.compareFunction=Uo,r=to):r=$o,t.setTexture2D(e||r,a)}function lf(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(e||Jo,a)}function df(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(e||Qo,a)}function uf(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(e||Zo,a)}function hf(n){switch(n){case 5126:return qh;case 35664:return Xh;case 35665:return jh;case 35666:return Kh;case 35674:return $h;case 35675:return Zh;case 35676:return Jh;case 5124:case 35670:return Qh;case 35667:case 35671:return ef;case 35668:case 35672:return tf;case 35669:case 35673:return nf;case 5125:return af;case 36294:return rf;case 36295:return sf;case 36296:return of;case 35678:case 36198:case 36298:case 36306:case 35682:return cf;case 35679:case 36299:case 36307:return lf;case 35680:case 36300:case 36308:case 36293:return df;case 36289:case 36303:case 36311:case 36292:return uf}}function ff(n,e){n.uniform1fv(this.addr,e)}function pf(n,e){const t=gn(e,this.size,2);n.uniform2fv(this.addr,t)}function mf(n,e){const t=gn(e,this.size,3);n.uniform3fv(this.addr,t)}function gf(n,e){const t=gn(e,this.size,4);n.uniform4fv(this.addr,t)}function yf(n,e){const t=gn(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function vf(n,e){const t=gn(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function _f(n,e){const t=gn(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function xf(n,e){n.uniform1iv(this.addr,e)}function Sf(n,e){n.uniform2iv(this.addr,e)}function Cf(n,e){n.uniform3iv(this.addr,e)}function bf(n,e){n.uniform4iv(this.addr,e)}function Mf(n,e){n.uniform1uiv(this.addr,e)}function Af(n,e){n.uniform2uiv(this.addr,e)}function Ef(n,e){n.uniform3uiv(this.addr,e)}function wf(n,e){n.uniform4uiv(this.addr,e)}function Tf(n,e,t){const i=this.cache,a=e.length,r=ba(t,a);ot(i,r)||(n.uniform1iv(this.addr,r),ct(i,r));for(let s=0;s!==a;++s)t.setTexture2D(e[s]||$o,r[s])}function Rf(n,e,t){const i=this.cache,a=e.length,r=ba(t,a);ot(i,r)||(n.uniform1iv(this.addr,r),ct(i,r));for(let s=0;s!==a;++s)t.setTexture3D(e[s]||Jo,r[s])}function Pf(n,e,t){const i=this.cache,a=e.length,r=ba(t,a);ot(i,r)||(n.uniform1iv(this.addr,r),ct(i,r));for(let s=0;s!==a;++s)t.setTextureCube(e[s]||Qo,r[s])}function Lf(n,e,t){const i=this.cache,a=e.length,r=ba(t,a);ot(i,r)||(n.uniform1iv(this.addr,r),ct(i,r));for(let s=0;s!==a;++s)t.setTexture2DArray(e[s]||Zo,r[s])}function Df(n){switch(n){case 5126:return ff;case 35664:return pf;case 35665:return mf;case 35666:return gf;case 35674:return yf;case 35675:return vf;case 35676:return _f;case 5124:case 35670:return xf;case 35667:case 35671:return Sf;case 35668:case 35672:return Cf;case 35669:case 35673:return bf;case 5125:return Mf;case 36294:return Af;case 36295:return Ef;case 36296:return wf;case 35678:case 36198:case 36298:case 36306:case 35682:return Tf;case 35679:case 36299:case 36307:return Rf;case 35680:case 36300:case 36308:case 36293:return Pf;case 36289:case 36303:case 36311:case 36292:return Lf}}class If{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=hf(t.type)}}class Uf{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Df(t.type)}}class Bf{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const a=this.seq;for(let r=0,s=a.length;r!==s;++r){const o=a[r];o.setValue(e,t[o.id],i)}}}const ar=/(\w+)(\])?(\[|\.)?/g;function oo(n,e){n.seq.push(e),n.map[e.id]=e}function Nf(n,e,t){const i=n.name,a=i.length;for(ar.lastIndex=0;;){const r=ar.exec(i),s=ar.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===a){oo(t,l===void 0?new If(o,n,e):new Uf(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new Bf(o),oo(t,h)),t=h}}}class ha{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const r=e.getActiveUniform(t,a),s=e.getUniformLocation(t,r.name);Nf(r,s,this)}}setValue(e,t,i,a){const r=this.map[t];r!==void 0&&r.setValue(e,i,a)}setOptional(e,t,i){const a=t[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,t,i,a){for(let r=0,s=t.length;r!==s;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,a)}}static seqWithValue(e,t){const i=[];for(let a=0,r=e.length;a!==r;++a){const s=e[a];s.id in t&&i.push(s)}return i}}function co(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ff=37297;let Of=0;function kf(n,e){const t=n.split(`
`),i=[],a=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let s=a;s<r;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const lo=new Re;function zf(n){He._getMatrix(lo,He.workingColorSpace,n);const e=`mat3( ${lo.elements.map(t=>t.toFixed(4))} )`;switch(He.getTransfer(n)){case fa:return[e,"LinearTransferOETF"];case je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function uo(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=n.getShaderInfoLog(e).trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const s=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+kf(n.getShaderSource(e),s)}else return a}function Gf(n,e){const t=zf(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Hf(n,e){let t;switch(e){case Vc:t="Linear";break;case Wc:t="Reinhard";break;case Yc:t="Cineon";break;case qc:t="ACESFilmic";break;case jc:t="AgX";break;case Kc:t="Neutral";break;case Xc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const aa=new U;function Vf(){He.getLuminanceCoefficients(aa);const n=aa.x.toFixed(4),e=aa.y.toFixed(4),t=aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wf(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mn).join(`
`)}function Yf(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function qf(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=n.getActiveAttrib(e,a),s=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[s]={type:r.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function Mn(n){return n!==""}function ho(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fo(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Xf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xr(n){return n.replace(Xf,Kf)}const jf=new Map;function Kf(n,e){let t=Le[e];if(t===void 0){const i=jf.get(e);if(i!==void 0)t=Le[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Xr(t)}const $f=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function po(n){return n.replace($f,Zf)}function Zf(n,e,t,i){let a="";for(let r=parseInt(e);r<parseInt(t);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function mo(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Jf(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===So?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Cc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jt&&(e="SHADOWMAP_TYPE_VSM"),e}function Qf(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ln:case dn:e="ENVMAP_TYPE_CUBE";break;case xa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ep(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case dn:e="ENVMAP_MODE_REFRACTION";break}return e}function tp(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Co:e="ENVMAP_BLENDING_MULTIPLY";break;case Gc:e="ENVMAP_BLENDING_MIX";break;case Hc:e="ENVMAP_BLENDING_ADD";break}return e}function ip(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function np(n,e,t,i){const a=n.getContext(),r=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=Jf(t),l=Qf(t),u=ep(t),h=tp(t),f=ip(t),p=Wf(t),y=Yf(r),x=a.createProgram();let m,d,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Mn).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Mn).join(`
`),d.length>0&&(d+=`
`)):(m=[mo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mn).join(`
`),d=[mo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?Le.tonemapping_pars_fragment:"",t.toneMapping!==gi?Hf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Le.colorspace_pars_fragment,Gf("linearToOutputTexel",t.outputColorSpace),Vf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Mn).join(`
`)),s=Xr(s),s=ho(s,t),s=fo(s,t),o=Xr(o),o=ho(o,t),o=fo(o,t),s=po(s),o=po(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Cs?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cs?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=A+m+s,S=A+d+o,I=co(a,a.VERTEX_SHADER,M),w=co(a,a.FRAGMENT_SHADER,S);a.attachShader(x,I),a.attachShader(x,w),t.index0AttributeName!==void 0?a.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function P(T){if(n.debug.checkShaderErrors){const q=a.getProgramInfoLog(x).trim(),k=a.getShaderInfoLog(I).trim(),W=a.getShaderInfoLog(w).trim();let $=!0,H=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(a,x,I,w);else{const Q=uo(a,I,"vertex"),G=uo(a,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+q+`
`+Q+`
`+G)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(k===""||W==="")&&(H=!1);H&&(T.diagnostics={runnable:$,programLog:q,vertexShader:{log:k,prefix:m},fragmentShader:{log:W,prefix:d}})}a.deleteShader(I),a.deleteShader(w),B=new ha(a,x),C=qf(a,x)}let B;this.getUniforms=function(){return B===void 0&&P(this),B};let C;this.getAttributes=function(){return C===void 0&&P(this),C};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=a.getProgramParameter(x,Ff)),_},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Of++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=w,this}let ap=0;class rp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new sp(e),t.set(e,i)),i}}class sp{constructor(e){this.id=ap++,this.code=e,this.usedTimes=0}}function op(n,e,t,i,a,r,s){const o=new Oo,c=new rp,l=new Set,u=[],h=a.logarithmicDepthBuffer,f=a.vertexTextures;let p=a.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(C){return l.add(C),C===0?"uv":`uv${C}`}function m(C,_,T,q,k){const W=q.fog,$=k.geometry,H=C.isMeshStandardMaterial?q.environment:null,Q=(C.isMeshStandardMaterial?t:e).get(C.envMap||H),G=Q&&Q.mapping===xa?Q.image.height:null,ae=y[C.type];C.precision!==null&&(p=a.getMaxPrecision(C.precision),p!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",p,"instead."));const de=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ve=de!==void 0?de.length:0;let De=0;$.morphAttributes.position!==void 0&&(De=1),$.morphAttributes.normal!==void 0&&(De=2),$.morphAttributes.color!==void 0&&(De=3);let $e,Y,ee,me;if(ae){const Xe=Wt[ae];$e=Xe.vertexShader,Y=Xe.fragmentShader}else $e=C.vertexShader,Y=C.fragmentShader,c.update(C),ee=c.getVertexShaderID(C),me=c.getFragmentShaderID(C);const re=n.getRenderTarget(),Ce=n.state.buffers.depth.getReversed(),Ve=k.isInstancedMesh===!0,Me=k.isBatchedMesh===!0,at=!!C.map,tt=!!C.matcap,Be=!!Q,E=!!C.aoMap,Rt=!!C.lightMap,Ne=!!C.bumpMap,Fe=!!C.normalMap,_e=!!C.displacementMap,Je=!!C.emissiveMap,ye=!!C.metalnessMap,b=!!C.roughnessMap,g=C.anisotropy>0,N=C.clearcoat>0,X=C.dispersion>0,K=C.iridescence>0,V=C.sheen>0,ge=C.transmission>0,se=g&&!!C.anisotropyMap,ue=N&&!!C.clearcoatMap,ke=N&&!!C.clearcoatNormalMap,J=N&&!!C.clearcoatRoughnessMap,he=K&&!!C.iridescenceMap,be=K&&!!C.iridescenceThicknessMap,Ae=V&&!!C.sheenColorMap,fe=V&&!!C.sheenRoughnessMap,Oe=!!C.specularMap,Pe=!!C.specularColorMap,Ze=!!C.specularIntensityMap,R=ge&&!!C.transmissionMap,ie=ge&&!!C.thicknessMap,z=!!C.gradientMap,j=!!C.alphaMap,ce=C.alphaTest>0,oe=!!C.alphaHash,Te=!!C.extensions;let it=gi;C.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(it=n.toneMapping);const ht={shaderID:ae,shaderType:C.type,shaderName:C.name,vertexShader:$e,fragmentShader:Y,defines:C.defines,customVertexShaderID:ee,customFragmentShaderID:me,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:p,batching:Me,batchingColor:Me&&k._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&k.instanceColor!==null,instancingMorph:Ve&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:fn,alphaToCoverage:!!C.alphaToCoverage,map:at,matcap:tt,envMap:Be,envMapMode:Be&&Q.mapping,envMapCubeUVHeight:G,aoMap:E,lightMap:Rt,bumpMap:Ne,normalMap:Fe,displacementMap:f&&_e,emissiveMap:Je,normalMapObjectSpace:Fe&&C.normalMapType===el,normalMapTangentSpace:Fe&&C.normalMapType===Qc,metalnessMap:ye,roughnessMap:b,anisotropy:g,anisotropyMap:se,clearcoat:N,clearcoatMap:ue,clearcoatNormalMap:ke,clearcoatRoughnessMap:J,dispersion:X,iridescence:K,iridescenceMap:he,iridescenceThicknessMap:be,sheen:V,sheenColorMap:Ae,sheenRoughnessMap:fe,specularMap:Oe,specularColorMap:Pe,specularIntensityMap:Ze,transmission:ge,transmissionMap:R,thicknessMap:ie,gradientMap:z,opaque:C.transparent===!1&&C.blending===nn&&C.alphaToCoverage===!1,alphaMap:j,alphaTest:ce,alphaHash:oe,combine:C.combine,mapUv:at&&x(C.map.channel),aoMapUv:E&&x(C.aoMap.channel),lightMapUv:Rt&&x(C.lightMap.channel),bumpMapUv:Ne&&x(C.bumpMap.channel),normalMapUv:Fe&&x(C.normalMap.channel),displacementMapUv:_e&&x(C.displacementMap.channel),emissiveMapUv:Je&&x(C.emissiveMap.channel),metalnessMapUv:ye&&x(C.metalnessMap.channel),roughnessMapUv:b&&x(C.roughnessMap.channel),anisotropyMapUv:se&&x(C.anisotropyMap.channel),clearcoatMapUv:ue&&x(C.clearcoatMap.channel),clearcoatNormalMapUv:ke&&x(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&x(C.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&x(C.iridescenceMap.channel),iridescenceThicknessMapUv:be&&x(C.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&x(C.sheenColorMap.channel),sheenRoughnessMapUv:fe&&x(C.sheenRoughnessMap.channel),specularMapUv:Oe&&x(C.specularMap.channel),specularColorMapUv:Pe&&x(C.specularColorMap.channel),specularIntensityMapUv:Ze&&x(C.specularIntensityMap.channel),transmissionMapUv:R&&x(C.transmissionMap.channel),thicknessMapUv:ie&&x(C.thicknessMap.channel),alphaMapUv:j&&x(C.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Fe||g),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!$.attributes.uv&&(at||j),fog:!!W,useFog:C.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ce,skinning:k.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:De,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:C.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:it,decodeVideoTexture:at&&C.map.isVideoTexture===!0&&He.getTransfer(C.map.colorSpace)===je,decodeVideoTextureEmissive:Je&&C.emissiveMap.isVideoTexture===!0&&He.getTransfer(C.emissiveMap.colorSpace)===je,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===zt,flipSided:C.side===_t,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:Te&&C.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&C.extensions.multiDraw===!0||Me)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return ht.vertexUv1s=l.has(1),ht.vertexUv2s=l.has(2),ht.vertexUv3s=l.has(3),l.clear(),ht}function d(C){const _=[];if(C.shaderID?_.push(C.shaderID):(_.push(C.customVertexShaderID),_.push(C.customFragmentShaderID)),C.defines!==void 0)for(const T in C.defines)_.push(T),_.push(C.defines[T]);return C.isRawShaderMaterial===!1&&(A(_,C),M(_,C),_.push(n.outputColorSpace)),_.push(C.customProgramCacheKey),_.join()}function A(C,_){C.push(_.precision),C.push(_.outputColorSpace),C.push(_.envMapMode),C.push(_.envMapCubeUVHeight),C.push(_.mapUv),C.push(_.alphaMapUv),C.push(_.lightMapUv),C.push(_.aoMapUv),C.push(_.bumpMapUv),C.push(_.normalMapUv),C.push(_.displacementMapUv),C.push(_.emissiveMapUv),C.push(_.metalnessMapUv),C.push(_.roughnessMapUv),C.push(_.anisotropyMapUv),C.push(_.clearcoatMapUv),C.push(_.clearcoatNormalMapUv),C.push(_.clearcoatRoughnessMapUv),C.push(_.iridescenceMapUv),C.push(_.iridescenceThicknessMapUv),C.push(_.sheenColorMapUv),C.push(_.sheenRoughnessMapUv),C.push(_.specularMapUv),C.push(_.specularColorMapUv),C.push(_.specularIntensityMapUv),C.push(_.transmissionMapUv),C.push(_.thicknessMapUv),C.push(_.combine),C.push(_.fogExp2),C.push(_.sizeAttenuation),C.push(_.morphTargetsCount),C.push(_.morphAttributeCount),C.push(_.numDirLights),C.push(_.numPointLights),C.push(_.numSpotLights),C.push(_.numSpotLightMaps),C.push(_.numHemiLights),C.push(_.numRectAreaLights),C.push(_.numDirLightShadows),C.push(_.numPointLightShadows),C.push(_.numSpotLightShadows),C.push(_.numSpotLightShadowsWithMaps),C.push(_.numLightProbes),C.push(_.shadowMapType),C.push(_.toneMapping),C.push(_.numClippingPlanes),C.push(_.numClipIntersection),C.push(_.depthPacking)}function M(C,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),C.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reverseDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),C.push(o.mask)}function S(C){const _=y[C.type];let T;if(_){const q=Wt[_];T=Ll.clone(q.uniforms)}else T=C.uniforms;return T}function I(C,_){let T;for(let q=0,k=u.length;q<k;q++){const W=u[q];if(W.cacheKey===_){T=W,++T.usedTimes;break}}return T===void 0&&(T=new np(n,_,C,r),u.push(T)),T}function w(C){if(--C.usedTimes===0){const _=u.indexOf(C);u[_]=u[u.length-1],u.pop(),C.destroy()}}function P(C){c.remove(C)}function B(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:I,releaseProgram:w,releaseShaderCache:P,programs:u,dispose:B}}function cp(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function a(s,o,c){n.get(s)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:a,dispose:r}}function lp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function go(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function yo(){const n=[];let e=0;const t=[],i=[],a=[];function r(){e=0,t.length=0,i.length=0,a.length=0}function s(h,f,p,y,x,m){let d=n[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:y,renderOrder:h.renderOrder,z:x,group:m},n[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=y,d.renderOrder=h.renderOrder,d.z=x,d.group=m),e++,d}function o(h,f,p,y,x,m){const d=s(h,f,p,y,x,m);p.transmission>0?i.push(d):p.transparent===!0?a.push(d):t.push(d)}function c(h,f,p,y,x,m){const d=s(h,f,p,y,x,m);p.transmission>0?i.unshift(d):p.transparent===!0?a.unshift(d):t.unshift(d)}function l(h,f){t.length>1&&t.sort(h||lp),i.length>1&&i.sort(f||go),a.length>1&&a.sort(f||go)}function u(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:a,init:r,push:o,unshift:c,finish:u,sort:l}}function dp(){let n=new WeakMap;function e(i,a){const r=n.get(i);let s;return r===void 0?(s=new yo,n.set(i,[s])):a>=r.length?(s=new yo,r.push(s)):s=r[a],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function up(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ue};break;case"SpotLight":t={position:new U,direction:new U,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function hp(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let fp=0;function pp(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function mp(n){const e=new up,t=hp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const a=new U,r=new et,s=new et;function o(l){let u=0,h=0,f=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,y=0,x=0,m=0,d=0,A=0,M=0,S=0,I=0,w=0,P=0;l.sort(pp);for(let C=0,_=l.length;C<_;C++){const T=l[C],q=T.color,k=T.intensity,W=T.distance,$=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=q.r*k,h+=q.g*k,f+=q.b*k;else if(T.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(T.sh.coefficients[H],k);P++}else if(T.isDirectionalLight){const H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const Q=T.shadow,G=t.get(T);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=$,i.directionalShadowMatrix[p]=T.shadow.matrix,A++}i.directional[p]=H,p++}else if(T.isSpotLight){const H=e.get(T);H.position.setFromMatrixPosition(T.matrixWorld),H.color.copy(q).multiplyScalar(k),H.distance=W,H.coneCos=Math.cos(T.angle),H.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),H.decay=T.decay,i.spot[x]=H;const Q=T.shadow;if(T.map&&(i.spotLightMap[I]=T.map,I++,Q.updateMatrices(T),T.castShadow&&w++),i.spotLightMatrix[x]=Q.matrix,T.castShadow){const G=t.get(T);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,i.spotShadow[x]=G,i.spotShadowMap[x]=$,S++}x++}else if(T.isRectAreaLight){const H=e.get(T);H.color.copy(q).multiplyScalar(k),H.halfWidth.set(T.width*.5,0,0),H.halfHeight.set(0,T.height*.5,0),i.rectArea[m]=H,m++}else if(T.isPointLight){const H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),H.distance=T.distance,H.decay=T.decay,T.castShadow){const Q=T.shadow,G=t.get(T);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,i.pointShadow[y]=G,i.pointShadowMap[y]=$,i.pointShadowMatrix[y]=T.shadow.matrix,M++}i.point[y]=H,y++}else if(T.isHemisphereLight){const H=e.get(T);H.skyColor.copy(T.color).multiplyScalar(k),H.groundColor.copy(T.groundColor).multiplyScalar(k),i.hemi[d]=H,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=te.LTC_FLOAT_1,i.rectAreaLTC2=te.LTC_FLOAT_2):(i.rectAreaLTC1=te.LTC_HALF_1,i.rectAreaLTC2=te.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const B=i.hash;(B.directionalLength!==p||B.pointLength!==y||B.spotLength!==x||B.rectAreaLength!==m||B.hemiLength!==d||B.numDirectionalShadows!==A||B.numPointShadows!==M||B.numSpotShadows!==S||B.numSpotMaps!==I||B.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=y,i.hemi.length=d,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=S+I-w,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=P,B.directionalLength=p,B.pointLength=y,B.spotLength=x,B.rectAreaLength=m,B.hemiLength=d,B.numDirectionalShadows=A,B.numPointShadows=M,B.numSpotShadows=S,B.numSpotMaps=I,B.numLightProbes=P,i.version=fp++)}function c(l,u){let h=0,f=0,p=0,y=0,x=0;const m=u.matrixWorldInverse;for(let d=0,A=l.length;d<A;d++){const M=l[d];if(M.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(m),h++}else if(M.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const S=i.rectArea[y];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),s.identity(),r.copy(M.matrixWorld),r.premultiply(m),s.extractRotation(r),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(s),S.halfHeight.applyMatrix4(s),y++}else if(M.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:i}}function vo(n){const e=new mp(n),t=[],i=[];function a(u){l.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function s(u){i.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:s}}function gp(n){let e=new WeakMap;function t(a,r=0){const s=e.get(a);let o;return s===void 0?(o=new vo(n),e.set(a,[o])):r>=s.length?(o=new vo(n),s.push(o)):o=s[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const yp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _p(n,e,t){let i=new rs;const a=new We,r=new We,s=new Ke,o=new zl({depthPacking:Jc}),c=new Gl,l={},u=t.maxTextureSize,h={[yi]:_t,[_t]:yi,[zt]:zt},f=new vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:yp,fragmentShader:vp}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const y=new Ut;y.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Et(y,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=So;let d=this.type;this.render=function(w,P,B){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const C=n.getRenderTarget(),_=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),q=n.state;q.setBlending(mi),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const k=d!==Jt&&this.type===Jt,W=d===Jt&&this.type!==Jt;for(let $=0,H=w.length;$<H;$++){const Q=w[$],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);const ae=G.getFrameExtents();if(a.multiply(ae),r.copy(G.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(r.x=Math.floor(u/ae.x),a.x=r.x*ae.x,G.mapSize.x=r.x),a.y>u&&(r.y=Math.floor(u/ae.y),a.y=r.y*ae.y,G.mapSize.y=r.y)),G.map===null||k===!0||W===!0){const ve=this.type!==Jt?{minFilter:Vt,magFilter:Vt}:{};G.map!==null&&G.map.dispose(),G.map=new Ni(a.x,a.y,ve),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const de=G.getViewportCount();for(let ve=0;ve<de;ve++){const De=G.getViewport(ve);s.set(r.x*De.x,r.y*De.y,r.x*De.z,r.y*De.w),q.viewport(s),G.updateMatrices(Q,ve),i=G.getFrustum(),S(P,B,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===Jt&&A(G,B),G.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(C,_,T)};function A(w,P){const B=e.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ni(a.x,a.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(P,null,B,f,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(P,null,B,p,x,null)}function M(w,P,B,C){let _=null;const T=B.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(T!==void 0)_=T;else if(_=B.isPointLight===!0?c:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const q=_.uuid,k=P.uuid;let W=l[q];W===void 0&&(W={},l[q]=W);let $=W[k];$===void 0&&($=_.clone(),W[k]=$,P.addEventListener("dispose",I)),_=$}if(_.visible=P.visible,_.wireframe=P.wireframe,C===Jt?_.side=P.shadowSide!==null?P.shadowSide:P.side:_.side=P.shadowSide!==null?P.shadowSide:h[P.side],_.alphaMap=P.alphaMap,_.alphaTest=P.alphaTest,_.map=P.map,_.clipShadows=P.clipShadows,_.clippingPlanes=P.clippingPlanes,_.clipIntersection=P.clipIntersection,_.displacementMap=P.displacementMap,_.displacementScale=P.displacementScale,_.displacementBias=P.displacementBias,_.wireframeLinewidth=P.wireframeLinewidth,_.linewidth=P.linewidth,B.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const q=n.properties.get(_);q.light=B}return _}function S(w,P,B,C,_){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&_===Jt)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld);const k=e.update(w),W=w.material;if(Array.isArray(W)){const $=k.groups;for(let H=0,Q=$.length;H<Q;H++){const G=$[H],ae=W[G.materialIndex];if(ae&&ae.visible){const de=M(w,ae,C,_);w.onBeforeShadow(n,w,P,B,k,de,G),n.renderBufferDirect(B,null,k,de,w,G),w.onAfterShadow(n,w,P,B,k,de,G)}}}else if(W.visible){const $=M(w,W,C,_);w.onBeforeShadow(n,w,P,B,k,$,null),n.renderBufferDirect(B,null,k,$,w,null),w.onAfterShadow(n,w,P,B,k,$,null)}}const q=w.children;for(let k=0,W=q.length;k<W;k++)S(q[k],P,B,C,_)}function I(w){w.target.removeEventListener("dispose",I);for(const B in l){const C=l[B],_=w.target.uuid;_ in C&&(C[_].dispose(),delete C[_])}}}const xp={[cr]:lr,[dr]:fr,[ur]:pr,[cn]:hr,[lr]:cr,[fr]:dr,[pr]:ur,[hr]:cn};function Sp(n,e){function t(){let R=!1;const ie=new Ke;let z=null;const j=new Ke(0,0,0,0);return{setMask:function(ce){z!==ce&&!R&&(n.colorMask(ce,ce,ce,ce),z=ce)},setLocked:function(ce){R=ce},setClear:function(ce,oe,Te,it,ht){ht===!0&&(ce*=it,oe*=it,Te*=it),ie.set(ce,oe,Te,it),j.equals(ie)===!1&&(n.clearColor(ce,oe,Te,it),j.copy(ie))},reset:function(){R=!1,z=null,j.set(-1,0,0,0)}}}function i(){let R=!1,ie=!1,z=null,j=null,ce=null;return{setReversed:function(oe){if(ie!==oe){const Te=e.get("EXT_clip_control");ie?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT);const it=ce;ce=null,this.setClear(it)}ie=oe},getReversed:function(){return ie},setTest:function(oe){oe?re(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(oe){z!==oe&&!R&&(n.depthMask(oe),z=oe)},setFunc:function(oe){if(ie&&(oe=xp[oe]),j!==oe){switch(oe){case cr:n.depthFunc(n.NEVER);break;case lr:n.depthFunc(n.ALWAYS);break;case dr:n.depthFunc(n.LESS);break;case cn:n.depthFunc(n.LEQUAL);break;case ur:n.depthFunc(n.EQUAL);break;case hr:n.depthFunc(n.GEQUAL);break;case fr:n.depthFunc(n.GREATER);break;case pr:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=oe}},setLocked:function(oe){R=oe},setClear:function(oe){ce!==oe&&(ie&&(oe=1-oe),n.clearDepth(oe),ce=oe)},reset:function(){R=!1,z=null,j=null,ce=null,ie=!1}}}function a(){let R=!1,ie=null,z=null,j=null,ce=null,oe=null,Te=null,it=null,ht=null;return{setTest:function(Xe){R||(Xe?re(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(Xe){ie!==Xe&&!R&&(n.stencilMask(Xe),ie=Xe)},setFunc:function(Xe,Bt,qt){(z!==Xe||j!==Bt||ce!==qt)&&(n.stencilFunc(Xe,Bt,qt),z=Xe,j=Bt,ce=qt)},setOp:function(Xe,Bt,qt){(oe!==Xe||Te!==Bt||it!==qt)&&(n.stencilOp(Xe,Bt,qt),oe=Xe,Te=Bt,it=qt)},setLocked:function(Xe){R=Xe},setClear:function(Xe){ht!==Xe&&(n.clearStencil(Xe),ht=Xe)},reset:function(){R=!1,ie=null,z=null,j=null,ce=null,oe=null,Te=null,it=null,ht=null}}}const r=new t,s=new i,o=new a,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,p=[],y=null,x=!1,m=null,d=null,A=null,M=null,S=null,I=null,w=null,P=new Ue(0,0,0),B=0,C=!1,_=null,T=null,q=null,k=null,W=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Q=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=Q>=1):G.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=Q>=2);let ae=null,de={};const ve=n.getParameter(n.SCISSOR_BOX),De=n.getParameter(n.VIEWPORT),$e=new Ke().fromArray(ve),Y=new Ke().fromArray(De);function ee(R,ie,z,j){const ce=new Uint8Array(4),oe=n.createTexture();n.bindTexture(R,oe),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Te=0;Te<z;Te++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(ie+Te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return oe}const me={};me[n.TEXTURE_2D]=ee(n.TEXTURE_2D,n.TEXTURE_2D,1),me[n.TEXTURE_CUBE_MAP]=ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[n.TEXTURE_2D_ARRAY]=ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),me[n.TEXTURE_3D]=ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),re(n.DEPTH_TEST),s.setFunc(cn),Ne(!1),Fe(ys),re(n.CULL_FACE),E(mi);function re(R){u[R]!==!0&&(n.enable(R),u[R]=!0)}function Ce(R){u[R]!==!1&&(n.disable(R),u[R]=!1)}function Ve(R,ie){return h[R]!==ie?(n.bindFramebuffer(R,ie),h[R]=ie,R===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ie),R===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function Me(R,ie){let z=p,j=!1;if(R){z=f.get(ie),z===void 0&&(z=[],f.set(ie,z));const ce=R.textures;if(z.length!==ce.length||z[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Te=ce.length;oe<Te;oe++)z[oe]=n.COLOR_ATTACHMENT0+oe;z.length=ce.length,j=!0}}else z[0]!==n.BACK&&(z[0]=n.BACK,j=!0);j&&n.drawBuffers(z)}function at(R){return y!==R?(n.useProgram(R),y=R,!0):!1}const tt={[Pi]:n.FUNC_ADD,[Mc]:n.FUNC_SUBTRACT,[Ac]:n.FUNC_REVERSE_SUBTRACT};tt[Ec]=n.MIN,tt[wc]=n.MAX;const Be={[Tc]:n.ZERO,[Rc]:n.ONE,[Pc]:n.SRC_COLOR,[sr]:n.SRC_ALPHA,[Nc]:n.SRC_ALPHA_SATURATE,[Uc]:n.DST_COLOR,[Dc]:n.DST_ALPHA,[Lc]:n.ONE_MINUS_SRC_COLOR,[or]:n.ONE_MINUS_SRC_ALPHA,[Bc]:n.ONE_MINUS_DST_COLOR,[Ic]:n.ONE_MINUS_DST_ALPHA,[Fc]:n.CONSTANT_COLOR,[Oc]:n.ONE_MINUS_CONSTANT_COLOR,[kc]:n.CONSTANT_ALPHA,[zc]:n.ONE_MINUS_CONSTANT_ALPHA};function E(R,ie,z,j,ce,oe,Te,it,ht,Xe){if(R===mi){x===!0&&(Ce(n.BLEND),x=!1);return}if(x===!1&&(re(n.BLEND),x=!0),R!==bc){if(R!==m||Xe!==C){if((d!==Pi||S!==Pi)&&(n.blendEquation(n.FUNC_ADD),d=Pi,S=Pi),Xe)switch(R){case nn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case an:n.blendFunc(n.ONE,n.ONE);break;case vs:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _s:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case nn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case an:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case vs:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _s:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}A=null,M=null,I=null,w=null,P.set(0,0,0),B=0,m=R,C=Xe}return}ce=ce||ie,oe=oe||z,Te=Te||j,(ie!==d||ce!==S)&&(n.blendEquationSeparate(tt[ie],tt[ce]),d=ie,S=ce),(z!==A||j!==M||oe!==I||Te!==w)&&(n.blendFuncSeparate(Be[z],Be[j],Be[oe],Be[Te]),A=z,M=j,I=oe,w=Te),(it.equals(P)===!1||ht!==B)&&(n.blendColor(it.r,it.g,it.b,ht),P.copy(it),B=ht),m=R,C=!1}function Rt(R,ie){R.side===zt?Ce(n.CULL_FACE):re(n.CULL_FACE);let z=R.side===_t;ie&&(z=!z),Ne(z),R.blending===nn&&R.transparent===!1?E(mi):E(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),s.setFunc(R.depthFunc),s.setTest(R.depthTest),s.setMask(R.depthWrite),r.setMask(R.colorWrite);const j=R.stencilWrite;o.setTest(j),j&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Je(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(R){_!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),_=R)}function Fe(R){R!==xc?(re(n.CULL_FACE),R!==T&&(R===ys?n.cullFace(n.BACK):R===Sc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),T=R}function _e(R){R!==q&&(H&&n.lineWidth(R),q=R)}function Je(R,ie,z){R?(re(n.POLYGON_OFFSET_FILL),(k!==ie||W!==z)&&(n.polygonOffset(ie,z),k=ie,W=z)):Ce(n.POLYGON_OFFSET_FILL)}function ye(R){R?re(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function b(R){R===void 0&&(R=n.TEXTURE0+$-1),ae!==R&&(n.activeTexture(R),ae=R)}function g(R,ie,z){z===void 0&&(ae===null?z=n.TEXTURE0+$-1:z=ae);let j=de[z];j===void 0&&(j={type:void 0,texture:void 0},de[z]=j),(j.type!==R||j.texture!==ie)&&(ae!==z&&(n.activeTexture(z),ae=z),n.bindTexture(R,ie||me[R]),j.type=R,j.texture=ie)}function N(){const R=de[ae];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function X(){try{n.compressedTexImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function K(){try{n.compressedTexImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function V(){try{n.texSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ge(){try{n.texSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function se(){try{n.compressedTexSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{n.compressedTexSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ke(){try{n.texStorage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function J(){try{n.texStorage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(){try{n.texImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function be(){try{n.texImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ae(R){$e.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),$e.copy(R))}function fe(R){Y.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),Y.copy(R))}function Oe(R,ie){let z=l.get(ie);z===void 0&&(z=new WeakMap,l.set(ie,z));let j=z.get(R);j===void 0&&(j=n.getUniformBlockIndex(ie,R.name),z.set(R,j))}function Pe(R,ie){const j=l.get(ie).get(R);c.get(ie)!==j&&(n.uniformBlockBinding(ie,j,R.__bindingPointIndex),c.set(ie,j))}function Ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ae=null,de={},h={},f=new WeakMap,p=[],y=null,x=!1,m=null,d=null,A=null,M=null,S=null,I=null,w=null,P=new Ue(0,0,0),B=0,C=!1,_=null,T=null,q=null,k=null,W=null,$e.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:re,disable:Ce,bindFramebuffer:Ve,drawBuffers:Me,useProgram:at,setBlending:E,setMaterial:Rt,setFlipSided:Ne,setCullFace:Fe,setLineWidth:_e,setPolygonOffset:Je,setScissorTest:ye,activeTexture:b,bindTexture:g,unbindTexture:N,compressedTexImage2D:X,compressedTexImage3D:K,texImage2D:he,texImage3D:be,updateUBOMapping:Oe,uniformBlockBinding:Pe,texStorage2D:ke,texStorage3D:J,texSubImage2D:V,texSubImage3D:ge,compressedTexSubImage2D:se,compressedTexSubImage3D:ue,scissor:Ae,viewport:fe,reset:Ze}}function Cp(n,e,t,i,a,r,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(b,g){return p?new OffscreenCanvas(b,g):ma("canvas")}function x(b,g,N){let X=1;const K=ye(b);if((K.width>N||K.height>N)&&(X=N/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const V=Math.floor(X*K.width),ge=Math.floor(X*K.height);h===void 0&&(h=y(V,ge));const se=g?y(V,ge):h;return se.width=V,se.height=ge,se.getContext("2d").drawImage(b,0,0,V,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+V+"x"+ge+")."),se}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function m(b){return b.generateMipmaps}function d(b){n.generateMipmap(b)}function A(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(b,g,N,X,K=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let V=g;if(g===n.RED&&(N===n.FLOAT&&(V=n.R32F),N===n.HALF_FLOAT&&(V=n.R16F),N===n.UNSIGNED_BYTE&&(V=n.R8)),g===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(V=n.R8UI),N===n.UNSIGNED_SHORT&&(V=n.R16UI),N===n.UNSIGNED_INT&&(V=n.R32UI),N===n.BYTE&&(V=n.R8I),N===n.SHORT&&(V=n.R16I),N===n.INT&&(V=n.R32I)),g===n.RG&&(N===n.FLOAT&&(V=n.RG32F),N===n.HALF_FLOAT&&(V=n.RG16F),N===n.UNSIGNED_BYTE&&(V=n.RG8)),g===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(V=n.RG8UI),N===n.UNSIGNED_SHORT&&(V=n.RG16UI),N===n.UNSIGNED_INT&&(V=n.RG32UI),N===n.BYTE&&(V=n.RG8I),N===n.SHORT&&(V=n.RG16I),N===n.INT&&(V=n.RG32I)),g===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(V=n.RGB8UI),N===n.UNSIGNED_SHORT&&(V=n.RGB16UI),N===n.UNSIGNED_INT&&(V=n.RGB32UI),N===n.BYTE&&(V=n.RGB8I),N===n.SHORT&&(V=n.RGB16I),N===n.INT&&(V=n.RGB32I)),g===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(V=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(V=n.RGBA16UI),N===n.UNSIGNED_INT&&(V=n.RGBA32UI),N===n.BYTE&&(V=n.RGBA8I),N===n.SHORT&&(V=n.RGBA16I),N===n.INT&&(V=n.RGBA32I)),g===n.RGB&&N===n.UNSIGNED_INT_5_9_9_9_REV&&(V=n.RGB9_E5),g===n.RGBA){const ge=K?fa:He.getTransfer(X);N===n.FLOAT&&(V=n.RGBA32F),N===n.HALF_FLOAT&&(V=n.RGBA16F),N===n.UNSIGNED_BYTE&&(V=ge===je?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(V=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(V=n.RGB5_A1)}return(V===n.R16F||V===n.R32F||V===n.RG16F||V===n.RG32F||V===n.RGBA16F||V===n.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function S(b,g){let N;return b?g===null||g===Bi||g===un?N=n.DEPTH24_STENCIL8:g===Qt?N=n.DEPTH32F_STENCIL8:g===En&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Bi||g===un?N=n.DEPTH_COMPONENT24:g===Qt?N=n.DEPTH_COMPONENT32F:g===En&&(N=n.DEPTH_COMPONENT16),N}function I(b,g){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Vt&&b.minFilter!==Yt?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function w(b){const g=b.target;g.removeEventListener("dispose",w),B(g),g.isVideoTexture&&u.delete(g)}function P(b){const g=b.target;g.removeEventListener("dispose",P),_(g)}function B(b){const g=i.get(b);if(g.__webglInit===void 0)return;const N=b.source,X=f.get(N);if(X){const K=X[g.__cacheKey];K.usedTimes--,K.usedTimes===0&&C(b),Object.keys(X).length===0&&f.delete(N)}i.remove(b)}function C(b){const g=i.get(b);n.deleteTexture(g.__webglTexture);const N=b.source,X=f.get(N);delete X[g.__cacheKey],s.memory.textures--}function _(b){const g=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(g.__webglFramebuffer[X]))for(let K=0;K<g.__webglFramebuffer[X].length;K++)n.deleteFramebuffer(g.__webglFramebuffer[X][K]);else n.deleteFramebuffer(g.__webglFramebuffer[X]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[X])}else{if(Array.isArray(g.__webglFramebuffer))for(let X=0;X<g.__webglFramebuffer.length;X++)n.deleteFramebuffer(g.__webglFramebuffer[X]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let X=0;X<g.__webglColorRenderbuffer.length;X++)g.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[X]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=b.textures;for(let X=0,K=N.length;X<K;X++){const V=i.get(N[X]);V.__webglTexture&&(n.deleteTexture(V.__webglTexture),s.memory.textures--),i.remove(N[X])}i.remove(b)}let T=0;function q(){T=0}function k(){const b=T;return b>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+a.maxTextures),T+=1,b}function W(b){const g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function $(b,g){const N=i.get(b);if(b.isVideoTexture&&_e(b),b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){const X=b.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(N,b,g);return}}t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+g)}function H(b,g){const N=i.get(b);if(b.version>0&&N.__version!==b.version){Y(N,b,g);return}t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+g)}function Q(b,g){const N=i.get(b);if(b.version>0&&N.__version!==b.version){Y(N,b,g);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+g)}function G(b,g){const N=i.get(b);if(b.version>0&&N.__version!==b.version){ee(N,b,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+g)}const ae={[yr]:n.REPEAT,[Di]:n.CLAMP_TO_EDGE,[vr]:n.MIRRORED_REPEAT},de={[Vt]:n.NEAREST,[$c]:n.NEAREST_MIPMAP_NEAREST,[Nn]:n.NEAREST_MIPMAP_LINEAR,[Yt]:n.LINEAR,[wa]:n.LINEAR_MIPMAP_NEAREST,[Ii]:n.LINEAR_MIPMAP_LINEAR},ve={[tl]:n.NEVER,[ol]:n.ALWAYS,[il]:n.LESS,[Uo]:n.LEQUAL,[nl]:n.EQUAL,[sl]:n.GEQUAL,[al]:n.GREATER,[rl]:n.NOTEQUAL};function De(b,g){if(g.type===Qt&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Yt||g.magFilter===wa||g.magFilter===Nn||g.magFilter===Ii||g.minFilter===Yt||g.minFilter===wa||g.minFilter===Nn||g.minFilter===Ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,ae[g.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,ae[g.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,ae[g.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,de[g.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,de[g.minFilter]),g.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,ve[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Vt||g.minFilter!==Nn&&g.minFilter!==Ii||g.type===Qt&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,a.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function $e(b,g){let N=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",w));const X=g.source;let K=f.get(X);K===void 0&&(K={},f.set(X,K));const V=W(g);if(V!==b.__cacheKey){K[V]===void 0&&(K[V]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,N=!0),K[V].usedTimes++;const ge=K[b.__cacheKey];ge!==void 0&&(K[b.__cacheKey].usedTimes--,ge.usedTimes===0&&C(g)),b.__cacheKey=V,b.__webglTexture=K[V].texture}return N}function Y(b,g,N){let X=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(X=n.TEXTURE_3D);const K=$e(b,g),V=g.source;t.bindTexture(X,b.__webglTexture,n.TEXTURE0+N);const ge=i.get(V);if(V.version!==ge.__version||K===!0){t.activeTexture(n.TEXTURE0+N);const se=He.getPrimaries(He.workingColorSpace),ue=g.colorSpace===di?null:He.getPrimaries(g.colorSpace),ke=g.colorSpace===di||se===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let J=x(g.image,!1,a.maxTextureSize);J=Je(g,J);const he=r.convert(g.format,g.colorSpace),be=r.convert(g.type);let Ae=M(g.internalFormat,he,be,g.colorSpace,g.isVideoTexture);De(X,g);let fe;const Oe=g.mipmaps,Pe=g.isVideoTexture!==!0,Ze=ge.__version===void 0||K===!0,R=V.dataReady,ie=I(g,J);if(g.isDepthTexture)Ae=S(g.format===hn,g.type),Ze&&(Pe?t.texStorage2D(n.TEXTURE_2D,1,Ae,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,Ae,J.width,J.height,0,he,be,null));else if(g.isDataTexture)if(Oe.length>0){Pe&&Ze&&t.texStorage2D(n.TEXTURE_2D,ie,Ae,Oe[0].width,Oe[0].height);for(let z=0,j=Oe.length;z<j;z++)fe=Oe[z],Pe?R&&t.texSubImage2D(n.TEXTURE_2D,z,0,0,fe.width,fe.height,he,be,fe.data):t.texImage2D(n.TEXTURE_2D,z,Ae,fe.width,fe.height,0,he,be,fe.data);g.generateMipmaps=!1}else Pe?(Ze&&t.texStorage2D(n.TEXTURE_2D,ie,Ae,J.width,J.height),R&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,he,be,J.data)):t.texImage2D(n.TEXTURE_2D,0,Ae,J.width,J.height,0,he,be,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Pe&&Ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,Ae,Oe[0].width,Oe[0].height,J.depth);for(let z=0,j=Oe.length;z<j;z++)if(fe=Oe[z],g.format!==Ht)if(he!==null)if(Pe){if(R)if(g.layerUpdates.size>0){const ce=Xs(fe.width,fe.height,g.format,g.type);for(const oe of g.layerUpdates){const Te=fe.data.subarray(oe*ce/fe.data.BYTES_PER_ELEMENT,(oe+1)*ce/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,z,0,0,oe,fe.width,fe.height,1,he,Te)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,z,0,0,0,fe.width,fe.height,J.depth,he,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,z,Ae,fe.width,fe.height,J.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?R&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,z,0,0,0,fe.width,fe.height,J.depth,he,be,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,z,Ae,fe.width,fe.height,J.depth,0,he,be,fe.data)}else{Pe&&Ze&&t.texStorage2D(n.TEXTURE_2D,ie,Ae,Oe[0].width,Oe[0].height);for(let z=0,j=Oe.length;z<j;z++)fe=Oe[z],g.format!==Ht?he!==null?Pe?R&&t.compressedTexSubImage2D(n.TEXTURE_2D,z,0,0,fe.width,fe.height,he,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,z,Ae,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?R&&t.texSubImage2D(n.TEXTURE_2D,z,0,0,fe.width,fe.height,he,be,fe.data):t.texImage2D(n.TEXTURE_2D,z,Ae,fe.width,fe.height,0,he,be,fe.data)}else if(g.isDataArrayTexture)if(Pe){if(Ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,Ae,J.width,J.height,J.depth),R)if(g.layerUpdates.size>0){const z=Xs(J.width,J.height,g.format,g.type);for(const j of g.layerUpdates){const ce=J.data.subarray(j*z/J.data.BYTES_PER_ELEMENT,(j+1)*z/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,J.width,J.height,1,he,be,ce)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,he,be,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,J.width,J.height,J.depth,0,he,be,J.data);else if(g.isData3DTexture)Pe?(Ze&&t.texStorage3D(n.TEXTURE_3D,ie,Ae,J.width,J.height,J.depth),R&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,he,be,J.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,J.width,J.height,J.depth,0,he,be,J.data);else if(g.isFramebufferTexture){if(Ze)if(Pe)t.texStorage2D(n.TEXTURE_2D,ie,Ae,J.width,J.height);else{let z=J.width,j=J.height;for(let ce=0;ce<ie;ce++)t.texImage2D(n.TEXTURE_2D,ce,Ae,z,j,0,he,be,null),z>>=1,j>>=1}}else if(Oe.length>0){if(Pe&&Ze){const z=ye(Oe[0]);t.texStorage2D(n.TEXTURE_2D,ie,Ae,z.width,z.height)}for(let z=0,j=Oe.length;z<j;z++)fe=Oe[z],Pe?R&&t.texSubImage2D(n.TEXTURE_2D,z,0,0,he,be,fe):t.texImage2D(n.TEXTURE_2D,z,Ae,he,be,fe);g.generateMipmaps=!1}else if(Pe){if(Ze){const z=ye(J);t.texStorage2D(n.TEXTURE_2D,ie,Ae,z.width,z.height)}R&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,he,be,J)}else t.texImage2D(n.TEXTURE_2D,0,Ae,he,be,J);m(g)&&d(X),ge.__version=V.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function ee(b,g,N){if(g.image.length!==6)return;const X=$e(b,g),K=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+N);const V=i.get(K);if(K.version!==V.__version||X===!0){t.activeTexture(n.TEXTURE0+N);const ge=He.getPrimaries(He.workingColorSpace),se=g.colorSpace===di?null:He.getPrimaries(g.colorSpace),ue=g.colorSpace===di||ge===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const ke=g.isCompressedTexture||g.image[0].isCompressedTexture,J=g.image[0]&&g.image[0].isDataTexture,he=[];for(let j=0;j<6;j++)!ke&&!J?he[j]=x(g.image[j],!0,a.maxCubemapSize):he[j]=J?g.image[j].image:g.image[j],he[j]=Je(g,he[j]);const be=he[0],Ae=r.convert(g.format,g.colorSpace),fe=r.convert(g.type),Oe=M(g.internalFormat,Ae,fe,g.colorSpace),Pe=g.isVideoTexture!==!0,Ze=V.__version===void 0||X===!0,R=K.dataReady;let ie=I(g,be);De(n.TEXTURE_CUBE_MAP,g);let z;if(ke){Pe&&Ze&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ie,Oe,be.width,be.height);for(let j=0;j<6;j++){z=he[j].mipmaps;for(let ce=0;ce<z.length;ce++){const oe=z[ce];g.format!==Ht?Ae!==null?Pe?R&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ce,0,0,oe.width,oe.height,Ae,oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ce,Oe,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ce,0,0,oe.width,oe.height,Ae,fe,oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ce,Oe,oe.width,oe.height,0,Ae,fe,oe.data)}}}else{if(z=g.mipmaps,Pe&&Ze){z.length>0&&ie++;const j=ye(he[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ie,Oe,j.width,j.height)}for(let j=0;j<6;j++)if(J){Pe?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,he[j].width,he[j].height,Ae,fe,he[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Oe,he[j].width,he[j].height,0,Ae,fe,he[j].data);for(let ce=0;ce<z.length;ce++){const Te=z[ce].image[j].image;Pe?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ce+1,0,0,Te.width,Te.height,Ae,fe,Te.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ce+1,Oe,Te.width,Te.height,0,Ae,fe,Te.data)}}else{Pe?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ae,fe,he[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Oe,Ae,fe,he[j]);for(let ce=0;ce<z.length;ce++){const oe=z[ce];Pe?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ce+1,0,0,Ae,fe,oe.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ce+1,Oe,Ae,fe,oe.image[j])}}}m(g)&&d(n.TEXTURE_CUBE_MAP),V.__version=K.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function me(b,g,N,X,K,V){const ge=r.convert(N.format,N.colorSpace),se=r.convert(N.type),ue=M(N.internalFormat,ge,se,N.colorSpace),ke=i.get(g),J=i.get(N);if(J.__renderTarget=g,!ke.__hasExternalTextures){const he=Math.max(1,g.width>>V),be=Math.max(1,g.height>>V);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,V,ue,he,be,g.depth,0,ge,se,null):t.texImage2D(K,V,ue,he,be,0,ge,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Fe(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,K,J.__webglTexture,0,Ne(g)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,K,J.__webglTexture,V),t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(b,g,N){if(n.bindRenderbuffer(n.RENDERBUFFER,b),g.depthBuffer){const X=g.depthTexture,K=X&&X.isDepthTexture?X.type:null,V=S(g.stencilBuffer,K),ge=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=Ne(g);Fe(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,V,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,se,V,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,V,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ge,n.RENDERBUFFER,b)}else{const X=g.textures;for(let K=0;K<X.length;K++){const V=X[K],ge=r.convert(V.format,V.colorSpace),se=r.convert(V.type),ue=M(V.internalFormat,ge,se,V.colorSpace),ke=Ne(g);N&&Fe(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,ue,g.width,g.height):Fe(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ke,ue,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ue,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ce(b,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=i.get(g.depthTexture);X.__renderTarget=g,(!X.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),$(g.depthTexture,0);const K=X.__webglTexture,V=Ne(g);if(g.depthTexture.format===rn)Fe(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(g.depthTexture.format===hn)Fe(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ve(b){const g=i.get(b),N=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){const X=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),X){const K=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,X.removeEventListener("dispose",K)};X.addEventListener("dispose",K),g.__depthDisposeCallback=K}g.__boundDepthTexture=X}if(b.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ce(g.__webglFramebuffer,b)}else if(N){g.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[X]),g.__webglDepthbuffer[X]===void 0)g.__webglDepthbuffer[X]=n.createRenderbuffer(),re(g.__webglDepthbuffer[X],b,!1);else{const K=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=g.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,V)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),re(g.__webglDepthbuffer,b,!1);else{const X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,K)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Me(b,g,N){const X=i.get(b);g!==void 0&&me(X.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Ve(b)}function at(b){const g=b.texture,N=i.get(b),X=i.get(g);b.addEventListener("dispose",P);const K=b.textures,V=b.isWebGLCubeRenderTarget===!0,ge=K.length>1;if(ge||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=g.version,s.memory.textures++),V){N.__webglFramebuffer=[];for(let se=0;se<6;se++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[se]=[];for(let ue=0;ue<g.mipmaps.length;ue++)N.__webglFramebuffer[se][ue]=n.createFramebuffer()}else N.__webglFramebuffer[se]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let se=0;se<g.mipmaps.length;se++)N.__webglFramebuffer[se]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(ge)for(let se=0,ue=K.length;se<ue;se++){const ke=i.get(K[se]);ke.__webglTexture===void 0&&(ke.__webglTexture=n.createTexture(),s.memory.textures++)}if(b.samples>0&&Fe(b)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let se=0;se<K.length;se++){const ue=K[se];N.__webglColorRenderbuffer[se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[se]);const ke=r.convert(ue.format,ue.colorSpace),J=r.convert(ue.type),he=M(ue.internalFormat,ke,J,ue.colorSpace,b.isXRRenderTarget===!0),be=Ne(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,be,he,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,N.__webglColorRenderbuffer[se])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),re(N.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(V){t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),De(n.TEXTURE_CUBE_MAP,g);for(let se=0;se<6;se++)if(g.mipmaps&&g.mipmaps.length>0)for(let ue=0;ue<g.mipmaps.length;ue++)me(N.__webglFramebuffer[se][ue],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,ue);else me(N.__webglFramebuffer[se],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(g)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let se=0,ue=K.length;se<ue;se++){const ke=K[se],J=i.get(ke);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),De(n.TEXTURE_2D,ke),me(N.__webglFramebuffer,b,ke,n.COLOR_ATTACHMENT0+se,n.TEXTURE_2D,0),m(ke)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(se=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,X.__webglTexture),De(se,g),g.mipmaps&&g.mipmaps.length>0)for(let ue=0;ue<g.mipmaps.length;ue++)me(N.__webglFramebuffer[ue],b,g,n.COLOR_ATTACHMENT0,se,ue);else me(N.__webglFramebuffer,b,g,n.COLOR_ATTACHMENT0,se,0);m(g)&&d(se),t.unbindTexture()}b.depthBuffer&&Ve(b)}function tt(b){const g=b.textures;for(let N=0,X=g.length;N<X;N++){const K=g[N];if(m(K)){const V=A(b),ge=i.get(K).__webglTexture;t.bindTexture(V,ge),d(V),t.unbindTexture()}}}const Be=[],E=[];function Rt(b){if(b.samples>0){if(Fe(b)===!1){const g=b.textures,N=b.width,X=b.height;let K=n.COLOR_BUFFER_BIT;const V=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(b),se=g.length>1;if(se)for(let ue=0;ue<g.length;ue++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let ue=0;ue<g.length;ue++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[ue]);const ke=i.get(g[ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,N,X,0,0,N,X,K,n.NEAREST),c===!0&&(Be.length=0,E.length=0,Be.push(n.COLOR_ATTACHMENT0+ue),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Be.push(V),E.push(V),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,E)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),se)for(let ue=0;ue<g.length;ue++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,ge.__webglColorRenderbuffer[ue]);const ke=i.get(g[ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const g=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function Ne(b){return Math.min(a.maxSamples,b.samples)}function Fe(b){const g=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function _e(b){const g=s.render.frame;u.get(b)!==g&&(u.set(b,g),b.update())}function Je(b,g){const N=b.colorSpace,X=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||N!==fn&&N!==di&&(He.getTransfer(N)===je?(X!==Ht||K!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}function ye(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=q,this.setTexture2D=$,this.setTexture2DArray=H,this.setTexture3D=Q,this.setTextureCube=G,this.rebindTextures=Me,this.setupRenderTarget=at,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Fe}function bp(n,e){function t(i,a=di){let r;const s=He.getTransfer(a);if(i===ii)return n.UNSIGNED_BYTE;if(i===Jr)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Qr)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Eo)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Mo)return n.BYTE;if(i===Ao)return n.SHORT;if(i===En)return n.UNSIGNED_SHORT;if(i===Zr)return n.INT;if(i===Bi)return n.UNSIGNED_INT;if(i===Qt)return n.FLOAT;if(i===Tn)return n.HALF_FLOAT;if(i===wo)return n.ALPHA;if(i===To)return n.RGB;if(i===Ht)return n.RGBA;if(i===Ro)return n.LUMINANCE;if(i===Po)return n.LUMINANCE_ALPHA;if(i===rn)return n.DEPTH_COMPONENT;if(i===hn)return n.DEPTH_STENCIL;if(i===Lo)return n.RED;if(i===es)return n.RED_INTEGER;if(i===Do)return n.RG;if(i===ts)return n.RG_INTEGER;if(i===is)return n.RGBA_INTEGER;if(i===oa||i===ca||i===la||i===da)if(s===je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===oa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===oa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===la)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_r||i===xr||i===Sr||i===Cr)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===_r)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Sr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===br||i===Mr||i===Ar)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===br||i===Mr)return s===je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ar)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Er||i===wr||i===Tr||i===Rr||i===Pr||i===Lr||i===Dr||i===Ir||i===Ur||i===Br||i===Nr||i===Fr||i===Or||i===kr)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Er)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Tr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Rr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Pr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Lr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Dr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ir)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ur)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Br)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Nr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Or)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===kr)return s===je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ua||i===zr||i===Gr)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ua)return s===je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===zr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Gr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Io||i===Hr||i===Vr||i===Wr)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ua)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Hr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Vr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Wr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===un?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Mp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ap=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ep{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const a=new xt,r=e.properties.get(a);r.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new vi({vertexShader:Mp,fragmentShader:Ap,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new Ca(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wp extends mn{constructor(e,t){super();const i=this;let a=null,r=1,s=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,p=null,y=null;const x=new Ep,m=t.getContextAttributes();let d=null,A=null;const M=[],S=[],I=new We;let w=null;const P=new At;P.viewport=new Ke;const B=new At;B.viewport=new Ke;const C=[P,B],_=new ql;let T=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ee=M[Y];return ee===void 0&&(ee=new Ka,M[Y]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(Y){let ee=M[Y];return ee===void 0&&(ee=new Ka,M[Y]=ee),ee.getGripSpace()},this.getHand=function(Y){let ee=M[Y];return ee===void 0&&(ee=new Ka,M[Y]=ee),ee.getHandSpace()};function k(Y){const ee=S.indexOf(Y.inputSource);if(ee===-1)return;const me=M[ee];me!==void 0&&(me.update(Y.inputSource,Y.frame,l||s),me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){a.removeEventListener("select",k),a.removeEventListener("selectstart",k),a.removeEventListener("selectend",k),a.removeEventListener("squeeze",k),a.removeEventListener("squeezestart",k),a.removeEventListener("squeezeend",k),a.removeEventListener("end",W),a.removeEventListener("inputsourceschange",$);for(let Y=0;Y<M.length;Y++){const ee=S[Y];ee!==null&&(S[Y]=null,M[Y].disconnect(ee))}T=null,q=null,x.reset(),e.setRenderTarget(d),p=null,f=null,h=null,a=null,A=null,$e.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return y},this.getSession=function(){return a},this.setSession=async function(Y){if(a=Y,a!==null){if(d=e.getRenderTarget(),a.addEventListener("select",k),a.addEventListener("selectstart",k),a.addEventListener("selectend",k),a.addEventListener("squeeze",k),a.addEventListener("squeezestart",k),a.addEventListener("squeezeend",k),a.addEventListener("end",W),a.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(I),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,re=null,Ce=null;m.depth&&(Ce=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=m.stencil?hn:rn,re=m.stencil?un:Bi);const Ve={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:r};h=new XRWebGLBinding(a,t),f=h.createProjectionLayer(Ve),a.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new Ni(f.textureWidth,f.textureHeight,{format:Ht,type:ii,depthTexture:new qo(f.textureWidth,f.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const me={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(a,t,me),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new Ni(p.framebufferWidth,p.framebufferHeight,{format:Ht,type:ii,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await a.requestReferenceSpace(o),$e.setContext(a),$e.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function $(Y){for(let ee=0;ee<Y.removed.length;ee++){const me=Y.removed[ee],re=S.indexOf(me);re>=0&&(S[re]=null,M[re].disconnect(me))}for(let ee=0;ee<Y.added.length;ee++){const me=Y.added[ee];let re=S.indexOf(me);if(re===-1){for(let Ve=0;Ve<M.length;Ve++)if(Ve>=S.length){S.push(me),re=Ve;break}else if(S[Ve]===null){S[Ve]=me,re=Ve;break}if(re===-1)break}const Ce=M[re];Ce&&Ce.connect(me)}}const H=new U,Q=new U;function G(Y,ee,me){H.setFromMatrixPosition(ee.matrixWorld),Q.setFromMatrixPosition(me.matrixWorld);const re=H.distanceTo(Q),Ce=ee.projectionMatrix.elements,Ve=me.projectionMatrix.elements,Me=Ce[14]/(Ce[10]-1),at=Ce[14]/(Ce[10]+1),tt=(Ce[9]+1)/Ce[5],Be=(Ce[9]-1)/Ce[5],E=(Ce[8]-1)/Ce[0],Rt=(Ve[8]+1)/Ve[0],Ne=Me*E,Fe=Me*Rt,_e=re/(-E+Rt),Je=_e*-E;if(ee.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Je),Y.translateZ(_e),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ce[10]===-1)Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const ye=Me+_e,b=at+_e,g=Ne-Je,N=Fe+(re-Je),X=tt*at/b*ye,K=Be*at/b*ye;Y.projectionMatrix.makePerspective(g,N,X,K,ye,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ae(Y,ee){ee===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ee.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(a===null)return;let ee=Y.near,me=Y.far;x.texture!==null&&(x.depthNear>0&&(ee=x.depthNear),x.depthFar>0&&(me=x.depthFar)),_.near=B.near=P.near=ee,_.far=B.far=P.far=me,(T!==_.near||q!==_.far)&&(a.updateRenderState({depthNear:_.near,depthFar:_.far}),T=_.near,q=_.far),P.layers.mask=Y.layers.mask|2,B.layers.mask=Y.layers.mask|4,_.layers.mask=P.layers.mask|B.layers.mask;const re=Y.parent,Ce=_.cameras;ae(_,re);for(let Ve=0;Ve<Ce.length;Ve++)ae(Ce[Ve],re);Ce.length===2?G(_,P,B):_.projectionMatrix.copy(P.projectionMatrix),de(Y,_,re)};function de(Y,ee,me){me===null?Y.matrix.copy(ee.matrixWorld):(Y.matrix.copy(me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ee.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Yr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let ve=null;function De(Y,ee){if(u=ee.getViewerPose(l||s),y=ee,u!==null){const me=u.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let re=!1;me.length!==_.cameras.length&&(_.cameras.length=0,re=!0);for(let Me=0;Me<me.length;Me++){const at=me[Me];let tt=null;if(p!==null)tt=p.getViewport(at);else{const E=h.getViewSubImage(f,at);tt=E.viewport,Me===0&&(e.setRenderTargetTextures(A,E.colorTexture,f.ignoreDepthValues?void 0:E.depthStencilTexture),e.setRenderTarget(A))}let Be=C[Me];Be===void 0&&(Be=new At,Be.layers.enable(Me),Be.viewport=new Ke,C[Me]=Be),Be.matrix.fromArray(at.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(at.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(tt.x,tt.y,tt.width,tt.height),Me===0&&(_.matrix.copy(Be.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),re===!0&&_.cameras.push(Be)}const Ce=a.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&h){const Me=h.getDepthInformation(me[0]);Me&&Me.isValid&&Me.texture&&x.init(e,Me,a.renderState)}}for(let me=0;me<M.length;me++){const re=S[me],Ce=M[me];re!==null&&Ce!==void 0&&Ce.update(re,ee,l||s)}ve&&ve(Y,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),y=null}const $e=new Ko;$e.setAnimationLoop(De),this.setAnimationLoop=function(Y){ve=Y},this.dispose=function(){}}}const Ei=new ni,Tp=new et;function Rp(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Ho(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function a(m,d,A,M,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(r(m,d),y(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(s(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,A,M):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===_t&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===_t&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const A=e.get(d),M=A.envMap,S=A.envMapRotation;M&&(m.envMap.value=M,Ei.copy(S),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),m.envMapRotation.value.setFromMatrix4(Tp.makeRotationFromEuler(Ei)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function s(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,A,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*A,m.scale.value=M*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,A){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===_t&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function y(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const A=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function Pp(n,e,t,i){let a={},r={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,M){const S=M.program;i.uniformBlockBinding(A,S)}function l(A,M){let S=a[A.id];S===void 0&&(y(A),S=u(A),a[A.id]=S,A.addEventListener("dispose",m));const I=M.program;i.updateUBOMapping(A,I);const w=e.render.frame;r[A.id]!==w&&(f(A),r[A.id]=w)}function u(A){const M=h();A.__bindingPointIndex=M;const S=n.createBuffer(),I=A.__size,w=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,I,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,S),S}function h(){for(let A=0;A<o;A++)if(s.indexOf(A)===-1)return s.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const M=a[A.id],S=A.uniforms,I=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let w=0,P=S.length;w<P;w++){const B=Array.isArray(S[w])?S[w]:[S[w]];for(let C=0,_=B.length;C<_;C++){const T=B[C];if(p(T,w,C,I)===!0){const q=T.__offset,k=Array.isArray(T.value)?T.value:[T.value];let W=0;for(let $=0;$<k.length;$++){const H=k[$],Q=x(H);typeof H=="number"||typeof H=="boolean"?(T.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,q+W,T.__data)):H.isMatrix3?(T.__data[0]=H.elements[0],T.__data[1]=H.elements[1],T.__data[2]=H.elements[2],T.__data[3]=0,T.__data[4]=H.elements[3],T.__data[5]=H.elements[4],T.__data[6]=H.elements[5],T.__data[7]=0,T.__data[8]=H.elements[6],T.__data[9]=H.elements[7],T.__data[10]=H.elements[8],T.__data[11]=0):(H.toArray(T.__data,W),W+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,q,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(A,M,S,I){const w=A.value,P=M+"_"+S;if(I[P]===void 0)return typeof w=="number"||typeof w=="boolean"?I[P]=w:I[P]=w.clone(),!0;{const B=I[P];if(typeof w=="number"||typeof w=="boolean"){if(B!==w)return I[P]=w,!0}else if(B.equals(w)===!1)return B.copy(w),!0}return!1}function y(A){const M=A.uniforms;let S=0;const I=16;for(let P=0,B=M.length;P<B;P++){const C=Array.isArray(M[P])?M[P]:[M[P]];for(let _=0,T=C.length;_<T;_++){const q=C[_],k=Array.isArray(q.value)?q.value:[q.value];for(let W=0,$=k.length;W<$;W++){const H=k[W],Q=x(H),G=S%I,ae=G%Q.boundary,de=G+ae;S+=ae,de!==0&&I-de<Q.storage&&(S+=I-de),q.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=S,S+=Q.storage}}}const w=S%I;return w>0&&(S+=I-w),A.__size=S,A.__cache={},this}function x(A){const M={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(M.boundary=4,M.storage=4):A.isVector2?(M.boundary=8,M.storage=8):A.isVector3||A.isColor?(M.boundary=16,M.storage=12):A.isVector4?(M.boundary=16,M.storage=16):A.isMatrix3?(M.boundary=48,M.storage=48):A.isMatrix4?(M.boundary=64,M.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),M}function m(A){const M=A.target;M.removeEventListener("dispose",m);const S=s.indexOf(M.__bindingPointIndex);s.splice(S,1),n.deleteBuffer(a[M.id]),delete a[M.id],delete r[M.id]}function d(){for(const A in a)n.deleteBuffer(a[A]);s=[],a={},r={}}return{bind:c,update:l,dispose:d}}class Lp{constructor(e={}){const{canvas:t=ll(),context:i=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=s;const y=new Uint32Array(4),x=new Int32Array(4);let m=null,d=null;const A=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=It,this.toneMapping=gi,this.toneMappingExposure=1;const S=this;let I=!1,w=0,P=0,B=null,C=-1,_=null;const T=new Ke,q=new Ke;let k=null;const W=new Ue(0);let $=0,H=t.width,Q=t.height,G=1,ae=null,de=null;const ve=new Ke(0,0,H,Q),De=new Ke(0,0,H,Q);let $e=!1;const Y=new rs;let ee=!1,me=!1;this.transmissionResolutionScale=1;const re=new et,Ce=new et,Ve=new U,Me=new Ke,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function Be(){return B===null?G:1}let E=i;function Rt(v,L){return t.getContext(v,L)}try{const v={alpha:!0,depth:a,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$r}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",oe,!1),E===null){const L="webgl2";if(E=Rt(L,v),E===null)throw Rt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Ne,Fe,_e,Je,ye,b,g,N,X,K,V,ge,se,ue,ke,J,he,be,Ae,fe,Oe,Pe,Ze,R;function ie(){Ne=new zh(E),Ne.init(),Pe=new bp(E,Ne),Fe=new Ih(E,Ne,e,Pe),_e=new Sp(E,Ne),Fe.reverseDepthBuffer&&f&&_e.buffers.depth.setReversed(!0),Je=new Vh(E),ye=new cp,b=new Cp(E,Ne,_e,ye,Fe,Pe,Je),g=new Bh(S),N=new kh(S),X=new Kl(E),Ze=new Lh(E,X),K=new Gh(E,X,Je,Ze),V=new Yh(E,K,X,Je),Ae=new Wh(E,Fe,b),J=new Uh(ye),ge=new op(S,g,N,Ne,Fe,Ze,J),se=new Rp(S,ye),ue=new dp,ke=new gp(Ne),be=new Ph(S,g,N,_e,V,p,c),he=new _p(S,V,Fe),R=new Pp(E,Je,Fe,_e),fe=new Dh(E,Ne,Je),Oe=new Hh(E,Ne,Je),Je.programs=ge.programs,S.capabilities=Fe,S.extensions=Ne,S.properties=ye,S.renderLists=ue,S.shadowMap=he,S.state=_e,S.info=Je}ie();const z=new wp(S,E);this.xr=z,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const v=Ne.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ne.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(v){v!==void 0&&(G=v,this.setSize(H,Q,!1))},this.getSize=function(v){return v.set(H,Q)},this.setSize=function(v,L,F=!0){if(z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=v,Q=L,t.width=Math.floor(v*G),t.height=Math.floor(L*G),F===!0&&(t.style.width=v+"px",t.style.height=L+"px"),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(H*G,Q*G).floor()},this.setDrawingBufferSize=function(v,L,F){H=v,Q=L,G=F,t.width=Math.floor(v*F),t.height=Math.floor(L*F),this.setViewport(0,0,v,L)},this.getCurrentViewport=function(v){return v.copy(T)},this.getViewport=function(v){return v.copy(ve)},this.setViewport=function(v,L,F,O){v.isVector4?ve.set(v.x,v.y,v.z,v.w):ve.set(v,L,F,O),_e.viewport(T.copy(ve).multiplyScalar(G).round())},this.getScissor=function(v){return v.copy(De)},this.setScissor=function(v,L,F,O){v.isVector4?De.set(v.x,v.y,v.z,v.w):De.set(v,L,F,O),_e.scissor(q.copy(De).multiplyScalar(G).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(v){_e.setScissorTest($e=v)},this.setOpaqueSort=function(v){ae=v},this.setTransparentSort=function(v){de=v},this.getClearColor=function(v){return v.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,F=!0){let O=0;if(v){let D=!1;if(B!==null){const Z=B.texture.format;D=Z===is||Z===ts||Z===es}if(D){const Z=B.texture.type,ne=Z===ii||Z===Bi||Z===En||Z===un||Z===Jr||Z===Qr,le=be.getClearColor(),pe=be.getClearAlpha(),Ee=le.r,we=le.g,xe=le.b;ne?(y[0]=Ee,y[1]=we,y[2]=xe,y[3]=pe,E.clearBufferuiv(E.COLOR,0,y)):(x[0]=Ee,x[1]=we,x[2]=xe,x[3]=pe,E.clearBufferiv(E.COLOR,0,x))}else O|=E.COLOR_BUFFER_BIT}L&&(O|=E.DEPTH_BUFFER_BIT),F&&(O|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),be.dispose(),ue.dispose(),ke.dispose(),ye.dispose(),g.dispose(),N.dispose(),V.dispose(),Ze.dispose(),R.dispose(),ge.dispose(),z.dispose(),z.removeEventListener("sessionstart",ls),z.removeEventListener("sessionend",ds),_i.stop()};function j(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const v=Je.autoReset,L=he.enabled,F=he.autoUpdate,O=he.needsUpdate,D=he.type;ie(),Je.autoReset=v,he.enabled=L,he.autoUpdate=F,he.needsUpdate=O,he.type=D}function oe(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Te(v){const L=v.target;L.removeEventListener("dispose",Te),it(L)}function it(v){ht(v),ye.remove(v)}function ht(v){const L=ye.get(v).programs;L!==void 0&&(L.forEach(function(F){ge.releaseProgram(F)}),v.isShaderMaterial&&ge.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,F,O,D,Z){L===null&&(L=at);const ne=D.isMesh&&D.matrixWorld.determinant()<0,le=ic(v,L,F,O,D);_e.setMaterial(O,ne);let pe=F.index,Ee=1;if(O.wireframe===!0){if(pe=K.getWireframeAttribute(F),pe===void 0)return;Ee=2}const we=F.drawRange,xe=F.attributes.position;let ze=we.start*Ee,Ye=(we.start+we.count)*Ee;Z!==null&&(ze=Math.max(ze,Z.start*Ee),Ye=Math.min(Ye,(Z.start+Z.count)*Ee)),pe!==null?(ze=Math.max(ze,0),Ye=Math.min(Ye,pe.count)):xe!=null&&(ze=Math.max(ze,0),Ye=Math.min(Ye,xe.count));const rt=Ye-ze;if(rt<0||rt===1/0)return;Ze.setup(D,O,le,F,pe);let nt,Ge=fe;if(pe!==null&&(nt=X.get(pe),Ge=Oe,Ge.setIndex(nt)),D.isMesh)O.wireframe===!0?(_e.setLineWidth(O.wireframeLinewidth*Be()),Ge.setMode(E.LINES)):Ge.setMode(E.TRIANGLES);else if(D.isLine){let Se=O.linewidth;Se===void 0&&(Se=1),_e.setLineWidth(Se*Be()),D.isLineSegments?Ge.setMode(E.LINES):D.isLineLoop?Ge.setMode(E.LINE_LOOP):Ge.setMode(E.LINE_STRIP)}else D.isPoints?Ge.setMode(E.POINTS):D.isSprite&&Ge.setMode(E.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)wi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ge.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Ge.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Se=D._multiDrawStarts,dt=D._multiDrawCounts,qe=D._multiDrawCount,Nt=pe?X.get(pe).bytesPerElement:1,Fi=ye.get(O).currentProgram.getUniforms();for(let St=0;St<qe;St++)Fi.setValue(E,"_gl_DrawID",St),Ge.render(Se[St]/Nt,dt[St])}else if(D.isInstancedMesh)Ge.renderInstances(ze,rt,D.count);else if(F.isInstancedBufferGeometry){const Se=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,dt=Math.min(F.instanceCount,Se);Ge.renderInstances(ze,rt,dt)}else Ge.render(ze,rt)};function Xe(v,L,F){v.transparent===!0&&v.side===zt&&v.forceSinglePass===!1?(v.side=_t,v.needsUpdate=!0,Bn(v,L,F),v.side=yi,v.needsUpdate=!0,Bn(v,L,F),v.side=zt):Bn(v,L,F)}this.compile=function(v,L,F=null){F===null&&(F=v),d=ke.get(F),d.init(L),M.push(d),F.traverseVisible(function(D){D.isLight&&D.layers.test(L.layers)&&(d.pushLight(D),D.castShadow&&d.pushShadow(D))}),v!==F&&v.traverseVisible(function(D){D.isLight&&D.layers.test(L.layers)&&(d.pushLight(D),D.castShadow&&d.pushShadow(D))}),d.setupLights();const O=new Set;return v.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const Z=D.material;if(Z)if(Array.isArray(Z))for(let ne=0;ne<Z.length;ne++){const le=Z[ne];Xe(le,F,D),O.add(le)}else Xe(Z,F,D),O.add(Z)}),d=M.pop(),O},this.compileAsync=function(v,L,F=null){const O=this.compile(v,L,F);return new Promise(D=>{function Z(){if(O.forEach(function(ne){ye.get(ne).currentProgram.isReady()&&O.delete(ne)}),O.size===0){D(v);return}setTimeout(Z,10)}Ne.get("KHR_parallel_shader_compile")!==null?Z():setTimeout(Z,10)})};let Bt=null;function qt(v){Bt&&Bt(v)}function ls(){_i.stop()}function ds(){_i.start()}const _i=new Ko;_i.setAnimationLoop(qt),typeof self<"u"&&_i.setContext(self),this.setAnimationLoop=function(v){Bt=v,z.setAnimationLoop(v),v===null?_i.stop():_i.start()},z.addEventListener("sessionstart",ls),z.addEventListener("sessionend",ds),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),z.enabled===!0&&z.isPresenting===!0&&(z.cameraAutoUpdate===!0&&z.updateCamera(L),L=z.getCamera()),v.isScene===!0&&v.onBeforeRender(S,v,L,B),d=ke.get(v,M.length),d.init(L),M.push(d),Ce.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Y.setFromProjectionMatrix(Ce),me=this.localClippingEnabled,ee=J.init(this.clippingPlanes,me),m=ue.get(v,A.length),m.init(),A.push(m),z.enabled===!0&&z.isPresenting===!0){const Z=S.xr.getDepthSensingMesh();Z!==null&&Ma(Z,L,-1/0,S.sortObjects)}Ma(v,L,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(ae,de),tt=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,tt&&be.addToRenderList(m,v),this.info.render.frame++,ee===!0&&J.beginShadows();const F=d.state.shadowsArray;he.render(F,v,L),ee===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=m.opaque,D=m.transmissive;if(d.setupLights(),L.isArrayCamera){const Z=L.cameras;if(D.length>0)for(let ne=0,le=Z.length;ne<le;ne++){const pe=Z[ne];hs(O,D,v,pe)}tt&&be.render(v);for(let ne=0,le=Z.length;ne<le;ne++){const pe=Z[ne];us(m,v,pe,pe.viewport)}}else D.length>0&&hs(O,D,v,L),tt&&be.render(v),us(m,v,L);B!==null&&P===0&&(b.updateMultisampleRenderTarget(B),b.updateRenderTargetMipmap(B)),v.isScene===!0&&v.onAfterRender(S,v,L),Ze.resetDefaultState(),C=-1,_=null,M.pop(),M.length>0?(d=M[M.length-1],ee===!0&&J.setGlobalState(S.clippingPlanes,d.state.camera)):d=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function Ma(v,L,F,O){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)F=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLight)d.pushLight(v),v.castShadow&&d.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Y.intersectsSprite(v)){O&&Me.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ce);const ne=V.update(v),le=v.material;le.visible&&m.push(v,ne,le,F,Me.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Y.intersectsObject(v))){const ne=V.update(v),le=v.material;if(O&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Me.copy(v.boundingSphere.center)):(ne.boundingSphere===null&&ne.computeBoundingSphere(),Me.copy(ne.boundingSphere.center)),Me.applyMatrix4(v.matrixWorld).applyMatrix4(Ce)),Array.isArray(le)){const pe=ne.groups;for(let Ee=0,we=pe.length;Ee<we;Ee++){const xe=pe[Ee],ze=le[xe.materialIndex];ze&&ze.visible&&m.push(v,ne,ze,F,Me.z,xe)}}else le.visible&&m.push(v,ne,le,F,Me.z,null)}}const Z=v.children;for(let ne=0,le=Z.length;ne<le;ne++)Ma(Z[ne],L,F,O)}function us(v,L,F,O){const D=v.opaque,Z=v.transmissive,ne=v.transparent;d.setupLightsView(F),ee===!0&&J.setGlobalState(S.clippingPlanes,F),O&&_e.viewport(T.copy(O)),D.length>0&&Un(D,L,F),Z.length>0&&Un(Z,L,F),ne.length>0&&Un(ne,L,F),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function hs(v,L,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[O.id]===void 0&&(d.state.transmissionRenderTarget[O.id]=new Ni(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Tn:ii,minFilter:Ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:He.workingColorSpace}));const Z=d.state.transmissionRenderTarget[O.id],ne=O.viewport||T;Z.setSize(ne.z*S.transmissionResolutionScale,ne.w*S.transmissionResolutionScale);const le=S.getRenderTarget();S.setRenderTarget(Z),S.getClearColor(W),$=S.getClearAlpha(),$<1&&S.setClearColor(16777215,.5),S.clear(),tt&&be.render(F);const pe=S.toneMapping;S.toneMapping=gi;const Ee=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),d.setupLightsView(O),ee===!0&&J.setGlobalState(S.clippingPlanes,O),Un(v,F,O),b.updateMultisampleRenderTarget(Z),b.updateRenderTargetMipmap(Z),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let xe=0,ze=L.length;xe<ze;xe++){const Ye=L[xe],rt=Ye.object,nt=Ye.geometry,Ge=Ye.material,Se=Ye.group;if(Ge.side===zt&&rt.layers.test(O.layers)){const dt=Ge.side;Ge.side=_t,Ge.needsUpdate=!0,fs(rt,F,O,nt,Ge,Se),Ge.side=dt,Ge.needsUpdate=!0,we=!0}}we===!0&&(b.updateMultisampleRenderTarget(Z),b.updateRenderTargetMipmap(Z))}S.setRenderTarget(le),S.setClearColor(W,$),Ee!==void 0&&(O.viewport=Ee),S.toneMapping=pe}function Un(v,L,F){const O=L.isScene===!0?L.overrideMaterial:null;for(let D=0,Z=v.length;D<Z;D++){const ne=v[D],le=ne.object,pe=ne.geometry,Ee=O===null?ne.material:O,we=ne.group;le.layers.test(F.layers)&&fs(le,L,F,pe,Ee,we)}}function fs(v,L,F,O,D,Z){v.onBeforeRender(S,L,F,O,D,Z),v.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),D.onBeforeRender(S,L,F,O,v,Z),D.transparent===!0&&D.side===zt&&D.forceSinglePass===!1?(D.side=_t,D.needsUpdate=!0,S.renderBufferDirect(F,L,O,D,v,Z),D.side=yi,D.needsUpdate=!0,S.renderBufferDirect(F,L,O,D,v,Z),D.side=zt):S.renderBufferDirect(F,L,O,D,v,Z),v.onAfterRender(S,L,F,O,D,Z)}function Bn(v,L,F){L.isScene!==!0&&(L=at);const O=ye.get(v),D=d.state.lights,Z=d.state.shadowsArray,ne=D.state.version,le=ge.getParameters(v,D.state,Z,L,F),pe=ge.getProgramCacheKey(le);let Ee=O.programs;O.environment=v.isMeshStandardMaterial?L.environment:null,O.fog=L.fog,O.envMap=(v.isMeshStandardMaterial?N:g).get(v.envMap||O.environment),O.envMapRotation=O.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Ee===void 0&&(v.addEventListener("dispose",Te),Ee=new Map,O.programs=Ee);let we=Ee.get(pe);if(we!==void 0){if(O.currentProgram===we&&O.lightsStateVersion===ne)return ms(v,le),we}else le.uniforms=ge.getUniforms(v),v.onBeforeCompile(le,S),we=ge.acquireProgram(le,pe),Ee.set(pe,we),O.uniforms=le.uniforms;const xe=O.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(xe.clippingPlanes=J.uniform),ms(v,le),O.needsLights=ac(v),O.lightsStateVersion=ne,O.needsLights&&(xe.ambientLightColor.value=D.state.ambient,xe.lightProbe.value=D.state.probe,xe.directionalLights.value=D.state.directional,xe.directionalLightShadows.value=D.state.directionalShadow,xe.spotLights.value=D.state.spot,xe.spotLightShadows.value=D.state.spotShadow,xe.rectAreaLights.value=D.state.rectArea,xe.ltc_1.value=D.state.rectAreaLTC1,xe.ltc_2.value=D.state.rectAreaLTC2,xe.pointLights.value=D.state.point,xe.pointLightShadows.value=D.state.pointShadow,xe.hemisphereLights.value=D.state.hemi,xe.directionalShadowMap.value=D.state.directionalShadowMap,xe.directionalShadowMatrix.value=D.state.directionalShadowMatrix,xe.spotShadowMap.value=D.state.spotShadowMap,xe.spotLightMatrix.value=D.state.spotLightMatrix,xe.spotLightMap.value=D.state.spotLightMap,xe.pointShadowMap.value=D.state.pointShadowMap,xe.pointShadowMatrix.value=D.state.pointShadowMatrix),O.currentProgram=we,O.uniformsList=null,we}function ps(v){if(v.uniformsList===null){const L=v.currentProgram.getUniforms();v.uniformsList=ha.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function ms(v,L){const F=ye.get(v);F.outputColorSpace=L.outputColorSpace,F.batching=L.batching,F.batchingColor=L.batchingColor,F.instancing=L.instancing,F.instancingColor=L.instancingColor,F.instancingMorph=L.instancingMorph,F.skinning=L.skinning,F.morphTargets=L.morphTargets,F.morphNormals=L.morphNormals,F.morphColors=L.morphColors,F.morphTargetsCount=L.morphTargetsCount,F.numClippingPlanes=L.numClippingPlanes,F.numIntersection=L.numClipIntersection,F.vertexAlphas=L.vertexAlphas,F.vertexTangents=L.vertexTangents,F.toneMapping=L.toneMapping}function ic(v,L,F,O,D){L.isScene!==!0&&(L=at),b.resetTextureUnits();const Z=L.fog,ne=O.isMeshStandardMaterial?L.environment:null,le=B===null?S.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:fn,pe=(O.isMeshStandardMaterial?N:g).get(O.envMap||ne),Ee=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,we=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),xe=!!F.morphAttributes.position,ze=!!F.morphAttributes.normal,Ye=!!F.morphAttributes.color;let rt=gi;O.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(rt=S.toneMapping);const nt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Ge=nt!==void 0?nt.length:0,Se=ye.get(O),dt=d.state.lights;if(ee===!0&&(me===!0||v!==_)){const mt=v===_&&O.id===C;J.setState(O,v,mt)}let qe=!1;O.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==dt.state.version||Se.outputColorSpace!==le||D.isBatchedMesh&&Se.batching===!1||!D.isBatchedMesh&&Se.batching===!0||D.isBatchedMesh&&Se.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Se.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Se.instancing===!1||!D.isInstancedMesh&&Se.instancing===!0||D.isSkinnedMesh&&Se.skinning===!1||!D.isSkinnedMesh&&Se.skinning===!0||D.isInstancedMesh&&Se.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Se.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Se.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Se.instancingMorph===!1&&D.morphTexture!==null||Se.envMap!==pe||O.fog===!0&&Se.fog!==Z||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==J.numPlanes||Se.numIntersection!==J.numIntersection)||Se.vertexAlphas!==Ee||Se.vertexTangents!==we||Se.morphTargets!==xe||Se.morphNormals!==ze||Se.morphColors!==Ye||Se.toneMapping!==rt||Se.morphTargetsCount!==Ge)&&(qe=!0):(qe=!0,Se.__version=O.version);let Nt=Se.currentProgram;qe===!0&&(Nt=Bn(O,L,D));let Fi=!1,St=!1,yn=!1;const Qe=Nt.getUniforms(),Pt=Se.uniforms;if(_e.useProgram(Nt.program)&&(Fi=!0,St=!0,yn=!0),O.id!==C&&(C=O.id,St=!0),Fi||_!==v){_e.buffers.depth.getReversed()?(re.copy(v.projectionMatrix),ul(re),hl(re),Qe.setValue(E,"projectionMatrix",re)):Qe.setValue(E,"projectionMatrix",v.projectionMatrix),Qe.setValue(E,"viewMatrix",v.matrixWorldInverse);const yt=Qe.map.cameraPosition;yt!==void 0&&yt.setValue(E,Ve.setFromMatrixPosition(v.matrixWorld)),Fe.logarithmicDepthBuffer&&Qe.setValue(E,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Qe.setValue(E,"isOrthographic",v.isOrthographicCamera===!0),_!==v&&(_=v,St=!0,yn=!0)}if(D.isSkinnedMesh){Qe.setOptional(E,D,"bindMatrix"),Qe.setOptional(E,D,"bindMatrixInverse");const mt=D.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),Qe.setValue(E,"boneTexture",mt.boneTexture,b))}D.isBatchedMesh&&(Qe.setOptional(E,D,"batchingTexture"),Qe.setValue(E,"batchingTexture",D._matricesTexture,b),Qe.setOptional(E,D,"batchingIdTexture"),Qe.setValue(E,"batchingIdTexture",D._indirectTexture,b),Qe.setOptional(E,D,"batchingColorTexture"),D._colorsTexture!==null&&Qe.setValue(E,"batchingColorTexture",D._colorsTexture,b));const Lt=F.morphAttributes;if((Lt.position!==void 0||Lt.normal!==void 0||Lt.color!==void 0)&&Ae.update(D,F,Nt),(St||Se.receiveShadow!==D.receiveShadow)&&(Se.receiveShadow=D.receiveShadow,Qe.setValue(E,"receiveShadow",D.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Pt.envMap.value=pe,Pt.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&L.environment!==null&&(Pt.envMapIntensity.value=L.environmentIntensity),St&&(Qe.setValue(E,"toneMappingExposure",S.toneMappingExposure),Se.needsLights&&nc(Pt,yn),Z&&O.fog===!0&&se.refreshFogUniforms(Pt,Z),se.refreshMaterialUniforms(Pt,O,G,Q,d.state.transmissionRenderTarget[v.id]),ha.upload(E,ps(Se),Pt,b)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(ha.upload(E,ps(Se),Pt,b),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Qe.setValue(E,"center",D.center),Qe.setValue(E,"modelViewMatrix",D.modelViewMatrix),Qe.setValue(E,"normalMatrix",D.normalMatrix),Qe.setValue(E,"modelMatrix",D.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const mt=O.uniformsGroups;for(let yt=0,Aa=mt.length;yt<Aa;yt++){const xi=mt[yt];R.update(xi,Nt),R.bind(xi,Nt)}}return Nt}function nc(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function ac(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(v,L,F){ye.get(v.texture).__webglTexture=L,ye.get(v.depthTexture).__webglTexture=F;const O=ye.get(v);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,L){const F=ye.get(v);F.__webglFramebuffer=L,F.__useDefaultFramebuffer=L===void 0};const rc=E.createFramebuffer();this.setRenderTarget=function(v,L=0,F=0){B=v,w=L,P=F;let O=!0,D=null,Z=!1,ne=!1;if(v){const pe=ye.get(v);if(pe.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(E.FRAMEBUFFER,null),O=!1;else if(pe.__webglFramebuffer===void 0)b.setupRenderTarget(v);else if(pe.__hasExternalTextures)b.rebindTextures(v,ye.get(v.texture).__webglTexture,ye.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const xe=v.depthTexture;if(pe.__boundDepthTexture!==xe){if(xe!==null&&ye.has(xe)&&(v.width!==xe.image.width||v.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(v)}}const Ee=v.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(ne=!0);const we=ye.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(we[L])?D=we[L][F]:D=we[L],Z=!0):v.samples>0&&b.useMultisampledRTT(v)===!1?D=ye.get(v).__webglMultisampledFramebuffer:Array.isArray(we)?D=we[F]:D=we,T.copy(v.viewport),q.copy(v.scissor),k=v.scissorTest}else T.copy(ve).multiplyScalar(G).floor(),q.copy(De).multiplyScalar(G).floor(),k=$e;if(F!==0&&(D=rc),_e.bindFramebuffer(E.FRAMEBUFFER,D)&&O&&_e.drawBuffers(v,D),_e.viewport(T),_e.scissor(q),_e.setScissorTest(k),Z){const pe=ye.get(v.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+L,pe.__webglTexture,F)}else if(ne){const pe=ye.get(v.texture),Ee=L;E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,pe.__webglTexture,F,Ee)}else if(v!==null&&F!==0){const pe=ye.get(v.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,pe.__webglTexture,F)}C=-1},this.readRenderTargetPixels=function(v,L,F,O,D,Z,ne){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let le=ye.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ne!==void 0&&(le=le[ne]),le){_e.bindFramebuffer(E.FRAMEBUFFER,le);try{const pe=v.texture,Ee=pe.format,we=pe.type;if(!Fe.textureFormatReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Fe.textureTypeReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-O&&F>=0&&F<=v.height-D&&E.readPixels(L,F,O,D,Pe.convert(Ee),Pe.convert(we),Z)}finally{const pe=B!==null?ye.get(B).__webglFramebuffer:null;_e.bindFramebuffer(E.FRAMEBUFFER,pe)}}},this.readRenderTargetPixelsAsync=async function(v,L,F,O,D,Z,ne){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let le=ye.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ne!==void 0&&(le=le[ne]),le){const pe=v.texture,Ee=pe.format,we=pe.type;if(!Fe.textureFormatReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Fe.textureTypeReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=v.width-O&&F>=0&&F<=v.height-D){_e.bindFramebuffer(E.FRAMEBUFFER,le);const xe=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,xe),E.bufferData(E.PIXEL_PACK_BUFFER,Z.byteLength,E.STREAM_READ),E.readPixels(L,F,O,D,Pe.convert(Ee),Pe.convert(we),0);const ze=B!==null?ye.get(B).__webglFramebuffer:null;_e.bindFramebuffer(E.FRAMEBUFFER,ze);const Ye=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await dl(E,Ye,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,xe),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,Z),E.deleteBuffer(xe),E.deleteSync(Ye),Z}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,L=null,F=0){v.isTexture!==!0&&(wi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,v=arguments[1]);const O=Math.pow(2,-F),D=Math.floor(v.image.width*O),Z=Math.floor(v.image.height*O),ne=L!==null?L.x:0,le=L!==null?L.y:0;b.setTexture2D(v,0),E.copyTexSubImage2D(E.TEXTURE_2D,F,0,0,ne,le,D,Z),_e.unbindTexture()};const sc=E.createFramebuffer(),oc=E.createFramebuffer();this.copyTextureToTexture=function(v,L,F=null,O=null,D=0,Z=null){v.isTexture!==!0&&(wi("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,v=arguments[1],L=arguments[2],Z=arguments[3]||0,F=null),Z===null&&(D!==0?(wi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Z=D,D=0):Z=0);let ne,le,pe,Ee,we,xe,ze,Ye,rt;const nt=v.isCompressedTexture?v.mipmaps[Z]:v.image;if(F!==null)ne=F.max.x-F.min.x,le=F.max.y-F.min.y,pe=F.isBox3?F.max.z-F.min.z:1,Ee=F.min.x,we=F.min.y,xe=F.isBox3?F.min.z:0;else{const Lt=Math.pow(2,-D);ne=Math.floor(nt.width*Lt),le=Math.floor(nt.height*Lt),v.isDataArrayTexture?pe=nt.depth:v.isData3DTexture?pe=Math.floor(nt.depth*Lt):pe=1,Ee=0,we=0,xe=0}O!==null?(ze=O.x,Ye=O.y,rt=O.z):(ze=0,Ye=0,rt=0);const Ge=Pe.convert(L.format),Se=Pe.convert(L.type);let dt;L.isData3DTexture?(b.setTexture3D(L,0),dt=E.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(b.setTexture2DArray(L,0),dt=E.TEXTURE_2D_ARRAY):(b.setTexture2D(L,0),dt=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,L.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,L.unpackAlignment);const qe=E.getParameter(E.UNPACK_ROW_LENGTH),Nt=E.getParameter(E.UNPACK_IMAGE_HEIGHT),Fi=E.getParameter(E.UNPACK_SKIP_PIXELS),St=E.getParameter(E.UNPACK_SKIP_ROWS),yn=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,nt.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,nt.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ee),E.pixelStorei(E.UNPACK_SKIP_ROWS,we),E.pixelStorei(E.UNPACK_SKIP_IMAGES,xe);const Qe=v.isDataArrayTexture||v.isData3DTexture,Pt=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){const Lt=ye.get(v),mt=ye.get(L),yt=ye.get(Lt.__renderTarget),Aa=ye.get(mt.__renderTarget);_e.bindFramebuffer(E.READ_FRAMEBUFFER,yt.__webglFramebuffer),_e.bindFramebuffer(E.DRAW_FRAMEBUFFER,Aa.__webglFramebuffer);for(let xi=0;xi<pe;xi++)Qe&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ye.get(v).__webglTexture,D,xe+xi),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ye.get(L).__webglTexture,Z,rt+xi)),E.blitFramebuffer(Ee,we,ne,le,ze,Ye,ne,le,E.DEPTH_BUFFER_BIT,E.NEAREST);_e.bindFramebuffer(E.READ_FRAMEBUFFER,null),_e.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(D!==0||v.isRenderTargetTexture||ye.has(v)){const Lt=ye.get(v),mt=ye.get(L);_e.bindFramebuffer(E.READ_FRAMEBUFFER,sc),_e.bindFramebuffer(E.DRAW_FRAMEBUFFER,oc);for(let yt=0;yt<pe;yt++)Qe?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Lt.__webglTexture,D,xe+yt):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Lt.__webglTexture,D),Pt?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,mt.__webglTexture,Z,rt+yt):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,mt.__webglTexture,Z),D!==0?E.blitFramebuffer(Ee,we,ne,le,ze,Ye,ne,le,E.COLOR_BUFFER_BIT,E.NEAREST):Pt?E.copyTexSubImage3D(dt,Z,ze,Ye,rt+yt,Ee,we,ne,le):E.copyTexSubImage2D(dt,Z,ze,Ye,Ee,we,ne,le);_e.bindFramebuffer(E.READ_FRAMEBUFFER,null),_e.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else Pt?v.isDataTexture||v.isData3DTexture?E.texSubImage3D(dt,Z,ze,Ye,rt,ne,le,pe,Ge,Se,nt.data):L.isCompressedArrayTexture?E.compressedTexSubImage3D(dt,Z,ze,Ye,rt,ne,le,pe,Ge,nt.data):E.texSubImage3D(dt,Z,ze,Ye,rt,ne,le,pe,Ge,Se,nt):v.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,Z,ze,Ye,ne,le,Ge,Se,nt.data):v.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,Z,ze,Ye,nt.width,nt.height,Ge,nt.data):E.texSubImage2D(E.TEXTURE_2D,Z,ze,Ye,ne,le,Ge,Se,nt);E.pixelStorei(E.UNPACK_ROW_LENGTH,qe),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,Nt),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Fi),E.pixelStorei(E.UNPACK_SKIP_ROWS,St),E.pixelStorei(E.UNPACK_SKIP_IMAGES,yn),Z===0&&L.generateMipmaps&&E.generateMipmap(dt),_e.unbindTexture()},this.copyTextureToTexture3D=function(v,L,F=null,O=null,D=0){return v.isTexture!==!0&&(wi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,O=arguments[1]||null,v=arguments[2],L=arguments[3],D=arguments[4]||0),wi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,L,F,O,D)},this.initRenderTarget=function(v){ye.get(v).__webglFramebuffer===void 0&&b.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?b.setTextureCube(v,0):v.isData3DTexture?b.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?b.setTexture2DArray(v,0):b.setTexture2D(v,0),_e.unbindTexture()},this.resetState=function(){w=0,P=0,B=null,_e.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=He._getDrawingBufferColorSpace(e),t.unpackColorSpace=He._getUnpackColorSpace()}}class Dp{constructor(){this.group=new Ui,this.init()}init(){const e=new ya(2.4,32,32),t=new Ji({color:463142,transparent:!0,opacity:.85});this.coreMesh=new Et(e,t),this.group.add(this.coreMesh);const i=new ya(2.42,24,24),a=new Ji({color:54015,wireframe:!0,transparent:!0,opacity:.15});this.wireMesh=new Et(i,a),this.group.add(this.wireMesh);const r=600,s=new Ut,o=new Float32Array(r*3);for(let p=0;p<r;p++){const y=Math.random(),x=Math.random(),m=y*2*Math.PI,d=Math.acos(2*x-1),A=2.44,M=A*Math.sin(d)*Math.cos(m),S=A*Math.sin(d)*Math.sin(m),I=A*Math.cos(d);o[p*3]=M,o[p*3+1]=S,o[p*3+2]=I}s.setAttribute("position",new wt(o,3));const c=new ss({color:3718648,size:.04,transparent:!0,opacity:.7,blending:an});this.pointsMesh=new Yo(s,c),this.group.add(this.pointsMesh);const l=new ga(3.1,3.14,64),u=new Ji({color:8490232,side:zt,transparent:!0,opacity:.35,blending:an});this.ring1=new Et(l,u),this.ring1.rotation.x=Math.PI/2.5,this.ring1.rotation.y=Math.PI/6,this.group.add(this.ring1);const h=new ga(3.5,3.53,64),f=new Ji({color:62206,side:zt,transparent:!0,opacity:.2,blending:an});this.ring2=new Et(h,f),this.ring2.rotation.x=-Math.PI/3,this.ring2.rotation.z=Math.PI/4,this.group.add(this.ring2),this.group.position.set(0,-1.8,-4.5)}update(e=.016,t=1){const i=e*t;this.coreMesh.rotation.y+=.15*i,this.wireMesh.rotation.y+=.25*i,this.pointsMesh.rotation.y+=.2*i,this.ring1.rotation.z+=.12*i,this.ring2.rotation.z-=.08*i}dispose(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())})}}class _o{constructor(e="high"){this.group=new Ui,this.quality=e,this.init()}init(){let e=600;this.quality==="medium"&&(e=300),this.quality==="low"&&(e=120);const t=new Ut,i=new Float32Array(e*3),a=new Float32Array(e*3),r=[new Ue(3718648),new Ue(8490232),new Ue(12616956),new Ue(16777215)];for(let o=0;o<e;o++){i[o*3]=(Math.random()-.5)*22,i[o*3+1]=(Math.random()-.5)*26,i[o*3+2]=(Math.random()-.5)*15-5;const c=r[Math.floor(Math.random()*r.length)];a[o*3]=c.r,a[o*3+1]=c.g,a[o*3+2]=c.b}t.setAttribute("position",new wt(i,3)),t.setAttribute("color",new wt(a,3));const s=new ss({size:.05,vertexColors:!0,transparent:!0,opacity:.75,blending:an});this.points=new Yo(t,s),this.group.add(this.points)}update(e=.016,t=1){if(!this.points)return;const i=e*t;this.points.rotation.y+=.04*i,this.points.rotation.x+=.02*i}dispose(){this.points&&(this.points.geometry&&this.points.geometry.dispose(),this.points.material&&this.points.material.dispose())}}class Ip{constructor(){this.group=new Ui,this.init()}init(){this.ambientLight=new Yl(1973067,1.2),this.group.add(this.ambientLight),this.dirLight1=new Ys(62206,1.5),this.dirLight1.position.set(5,8,4),this.group.add(this.dirLight1),this.dirLight2=new Ys(9647082,1.2),this.dirLight2.position.set(-5,-6,2),this.group.add(this.dirLight2),this.pointLight=new Vl(3718648,2,12),this.pointLight.position.set(0,0,1),this.group.add(this.pointLight)}update(e=0){this.pointLight&&(this.pointLight.position.x=Math.sin(e*.5)*3,this.pointLight.position.y=Math.cos(e*.7)*2)}dispose(){}}class Up{constructor(e){this.container=e;const t=e.clientWidth/(e.clientHeight||1);this.camera=new At(50,t,.1,100),this.camera.position.set(0,0,6.5),this.targetX=0,this.targetY=0,this.currentX=0,this.currentY=0,this.reducedMotion=!1,this.onPointerMove=this.onPointerMove.bind(this),window.addEventListener("pointermove",this.onPointerMove,{passive:!0})}setReducedMotion(e){this.reducedMotion=!!e,this.reducedMotion&&(this.targetX=0,this.targetY=0,this.camera.position.set(0,0,6.5))}onPointerMove(e){if(this.reducedMotion)return;const t=window.innerWidth/2,i=window.innerHeight/2;this.targetX=(e.clientX-t)/t*.4,this.targetY=-(e.clientY-i)/i*.4}onResize(e,t){this.camera.aspect=e/(t||1),this.camera.updateProjectionMatrix()}update(e=.016){this.reducedMotion||(this.currentX+=(this.targetX-this.currentX)*.05,this.currentY+=(this.targetY-this.currentY)*.05,this.camera.position.x=this.currentX,this.camera.position.y=this.currentY,this.camera.lookAt(0,0,-2))}dispose(){window.removeEventListener("pointermove",this.onPointerMove)}}class Bp{constructor(e){Ea(this,"animate",()=>{if(this.isPaused||this.isPageHidden||!this.renderer)return;this.animFrameId=requestAnimationFrame(this.animate);const e=Math.min(this.clock.getDelta(),.1),t=this.clock.getElapsedTime(),i=this.reducedMotion?.2:1;this.globe&&this.globe.update(e,i),this.particles&&this.particles.update(e,i),this.lighting&&this.lighting.update(t),this.cameraController&&this.cameraController.update(e),this.renderer.render(this.scene,this.cameraController.camera)});if(this.container=e,this.isSupported=this.checkWebGLSupport(),this.isPaused=!1,this.isPageHidden=!1,this.animFrameId=null,this.clock=new Xl,this.reducedMotion=!1,this.quality="high",!this.isSupported){console.warn("WebGL is not supported or context lost. Using stylish CSS backdrop fallback."),this.container.classList.add("webgl-fallback");return}this.init()}checkWebGLSupport(){try{const e=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(e.getContext("webgl")||e.getContext("experimental-webgl")))}catch{return!1}}init(){this.scene=new Fl,this.scene.fog=new as(330520,.05),this.cameraController=new Up(this.container),this.renderer=new Lp({alpha:!0,antialias:!0,powerPreference:"high-performance"}),this.renderer.setClearColor(330520,1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.container.appendChild(this.renderer.domElement),this.globe=new Dp,this.scene.add(this.globe.group),this.particles=new _o(this.quality),this.scene.add(this.particles.group),this.lighting=new Ip,this.scene.add(this.lighting.group),this.onResize=this.onResize.bind(this),this.onVisibilityChange=this.onVisibilityChange.bind(this),window.addEventListener("resize",this.onResize),document.addEventListener("visibilitychange",this.onVisibilityChange),this.animate()}setQuality(e){if(!(this.quality===e||!this.isSupported)&&(this.quality=e,this.particles&&(this.scene.remove(this.particles.group),this.particles.dispose(),this.particles=new _o(this.quality),this.scene.add(this.particles.group)),this.renderer)){const t=e==="low"?1:Math.min(window.devicePixelRatio||1,2);this.renderer.setPixelRatio(t)}}setReducedMotion(e){this.reducedMotion=!!e,this.cameraController&&this.cameraController.setReducedMotion(e)}onResize(){if(!this.renderer||!this.container)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.renderer.setSize(e,t),this.cameraController&&this.cameraController.onResize(e,t)}onVisibilityChange(){this.isPageHidden=document.hidden,this.isPageHidden?this.pause():this.resume()}pause(){this.isPaused=!0,this.animFrameId&&(cancelAnimationFrame(this.animFrameId),this.animFrameId=null)}resume(){this.isSupported&&(this.isPaused=!1,!this.animFrameId&&!this.isPageHidden&&(this.clock.getDelta(),this.animate()))}dispose(){this.pause(),window.removeEventListener("resize",this.onResize),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.globe&&this.globe.dispose(),this.particles&&this.particles.dispose(),this.lighting&&this.lighting.dispose(),this.cameraController&&this.cameraController.dispose(),this.renderer&&(this.renderer.dispose(),this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement),this.renderer=null)}}class Np{constructor(e,{onToggleSound:t,onOpenSettings:i,onOpenAdmin:a}){this.container=e,this.onToggleSound=t,this.onOpenSettings=i,this.onOpenAdmin=a,this.render()}render(){var e;this.container.innerHTML=`
      <header class="app-header">
        <div class="header-top">
          <div class="brand">
            <span class="brand-badge">3D</span>
            <div class="brand-text">
              <h1 class="brand-title">WORLD STAR QUIZ</h1>
              <span class="brand-tagline">GLOBAL TRIVIA</span>
            </div>
          </div>
          
          <div class="header-actions">
            <button id="btn-quick-add" class="quick-add-btn" title="Add Celebrity Photo">
              <span>➕ Add Star</span>
            </button>
            <button id="btn-sound-toggle" class="icon-btn" title="Toggle Sound" aria-label="Toggle Sound">
              <span class="icon-sound">🔊</span>
            </button>
            <button id="btn-settings-open" class="icon-btn" title="Settings" aria-label="Open Settings">
              <span>⚙️</span>
            </button>
          </div>
        </div>

        <div class="header-stats-bar">
          <div class="stat-pill question-pill">
            <span class="stat-label" id="lbl-question-tag">Q</span>
            <span class="stat-value" id="header-question-num">#1</span>
          </div>

          <div class="mode-pill" id="header-mode-badge">
            <span class="mode-dot"></span>
            <span id="header-mode-text">AUTO</span>
          </div>

          <div class="stat-pill score-pill">
            <span class="stat-label" id="lbl-score-tag">SCORE</span>
            <span class="stat-value" id="header-score-val">0</span>
          </div>

          <div class="stat-pill streak-pill">
            <span class="stat-label">🔥</span>
            <span class="stat-value" id="header-streak-val">0</span>
          </div>
        </div>
      </header>
    `,this.btnQuickAdd=this.container.querySelector("#btn-quick-add"),this.btnSound=this.container.querySelector("#btn-sound-toggle"),this.btnSettings=this.container.querySelector("#btn-settings-open"),this.soundIcon=this.container.querySelector(".icon-sound"),this.questionNumEl=this.container.querySelector("#header-question-num"),this.scoreEl=this.container.querySelector("#header-score-val"),this.streakEl=this.container.querySelector("#header-streak-val"),this.modeEl=this.container.querySelector("#header-mode-text"),(e=this.btnQuickAdd)==null||e.addEventListener("click",()=>{var t;return(t=this.onOpenAdmin)==null?void 0:t.call(this)}),this.btnSound.addEventListener("click",()=>{var t;return(t=this.onToggleSound)==null?void 0:t.call(this)}),this.btnSettings.addEventListener("click",()=>{var t;return(t=this.onOpenSettings)==null?void 0:t.call(this)})}updateStats({questionNumber:e=1,score:t=0,streak:i=0,mode:a="auto"}){this.questionNumEl&&(this.questionNumEl.textContent=`#${e}`),this.scoreEl&&(this.scoreEl.textContent=t),this.streakEl&&(this.streakEl.textContent=i),this.modeEl&&(this.modeEl.textContent=a.toUpperCase())}setSoundState(e){this.soundIcon&&(this.soundIcon.textContent=e?"🔊":"🔇")}}const ra=new Map,Fp={footballer:{bg1:"#0f2027",bg2:"#203a43",bg3:"#2c5364",accent:"#00ffcc",icon:"⚽"},sports:{bg1:"#1f1c2c",bg2:"#928dab",bg3:"#141e30",accent:"#ffaa00",icon:"🏆"},actor:{bg1:"#3a1c71",bg2:"#d76d77",bg3:"#ffaf7b",accent:"#ff007f",icon:"🎬"},singer:{bg1:"#130cb7",bg2:"#52e5e7",bg3:"#0f0c29",accent:"#9b51e0",icon:"🎤"},youtuber:{bg1:"#eb3349",bg2:"#f45c43",bg3:"#31102b",accent:"#ff416c",icon:"🔴"},influencer:{bg1:"#8a2387",bg2:"#e94057",bg3:"#f27121",accent:"#f72585",icon:"✨"},leader:{bg1:"#0f0c29",bg2:"#302b63",bg3:"#24243e",accent:"#ffd700",icon:"🏛️"},historical:{bg1:"#2c3e50",bg2:"#3498db",bg3:"#2980b9",accent:"#00e5ff",icon:"📜"},scientist:{bg1:"#0a192f",bg2:"#172a45",bg3:"#020c1b",accent:"#00f5d4",icon:"🔬"},poet:{bg1:"#1a102f",bg2:"#2d1b4e",bg3:"#0f051d",accent:"#e0aaff",icon:"✒️"},hero:{bg1:"#2b0f0f",bg2:"#4a1515",bg3:"#1a0505",accent:"#ff6b6b",icon:"⚔️"}};function va(n){const e=Fp[n==null?void 0:n.category]||{bg1:"#0f172a",bg2:"#1e293b",bg3:"#0f172a",accent:"#38bdf8",icon:"👤"},t=(n==null?void 0:n.name)||"Star",i=t.split(" ").filter(Boolean).slice(0,2).map(o=>o[0].toUpperCase()).join(""),a=(n==null?void 0:n.flag)||"🌐",r=((n==null?void 0:n.category)||"Star").toUpperCase(),s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${e.bg2}"/>
        <stop offset="70%" stop-color="${e.bg1}"/>
        <stop offset="100%" stop-color="${e.bg3}"/>
      </radialGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${e.accent}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${e.accent}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${e.accent}"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle cx="200" cy="200" r="198" fill="url(#bg)"/>
    <circle cx="200" cy="200" r="150" fill="url(#glow)"/>
    
    <!-- Cyberpunk grid/rings -->
    <circle cx="200" cy="200" r="135" fill="none" stroke="${e.accent}" stroke-width="1.5" stroke-dasharray="6,8" opacity="0.4"/>
    <circle cx="200" cy="200" r="115" fill="#0b1120" stroke="url(#ringGrad)" stroke-width="3" filter="url(#neon)"/>
    
    <!-- Flag badge -->
    <circle cx="280" cy="120" r="22" fill="#030712" stroke="${e.accent}" stroke-width="2"/>
    <text x="280" y="128" font-size="22" text-anchor="middle" dominant-baseline="middle">${a}</text>
    
    <!-- Initials -->
    <text x="200" y="195" font-family="'Roboto', 'Tiro Bangla', sans-serif" font-weight="900" font-size="64" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">${i}</text>
    
    <!-- Name Label -->
    <text x="200" y="260" font-family="'Roboto', 'Tiro Bangla', sans-serif" font-weight="800" font-size="16" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${t}</text>
    
    <!-- Category Icon and Pill -->
    <g transform="translate(200, 315)">
      <rect x="-70" y="-14" width="140" height="28" rx="14" fill="rgba(15, 23, 42, 0.85)" stroke="${e.accent}" stroke-width="1.5"/>
      <text x="-45" y="2" font-size="14" text-anchor="middle" dominant-baseline="middle">${e.icon}</text>
      <text x="12" y="1" font-family="'Roboto', 'Tiro Bangla', sans-serif" font-size="10" font-weight="700" fill="${e.accent}" text-anchor="middle" dominant-baseline="middle" letter-spacing="1.5">${r}</text>
    </g>
  </svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(s)}`}function on(n){if(!n)return"";if(n.startsWith("data:")||n.startsWith("http://")||n.startsWith("https://"))return n;const e=typeof import.meta<"u"&&"./"||"/",t=e.endsWith("/")?e:`${e}/`,i=n.startsWith("/")?n.slice(1):n;return`${t}${i}`}async function Op(n,e=4e3){if(!n)return"";const t=on(n.image);if(!t)return va(n);if(t.includes("/images/")||t.startsWith("data:image/")&&!t.startsWith("data:image/svg+xml")||ra.get(t)===t)return t;const i=va(n);return typeof Image>"u"?i:new Promise(a=>{const r=new Image;let s=!1;const o=setTimeout(()=>{s||(s=!0,a(i))},e);r.onload=()=>{s||(s=!0,clearTimeout(o),ra.set(t,t),a(t))},r.onerror=()=>{s||(s=!0,clearTimeout(o),ra.set(t,i),a(i))},r.src=t,r.complete&&r.naturalWidth>0&&(s=!0,clearTimeout(o),ra.set(t,t),a(t))})}function kp(n){n&&Op(n,4e3).catch(()=>{})}class zp{constructor(e){this.container=e,this.currentPerson=null,this.showName=!0,this.language="en",this.render()}render(){this.container.innerHTML=`
      <div class="portrait-card-wrapper" id="portrait-card-wrapper">
        <div class="portrait-card" id="portrait-card">
          <div class="card-glow-edge"></div>
          
          <div class="card-inner">
            <!-- 1. Photo Frame at top with 4-sided perimeter timer bar -->
            <div class="card-image-frame" id="card-img-frame">
              <div class="image-loader-spinner" id="card-img-spinner"></div>
              <div class="portrait-photo-frame portrait-circle-wrapper" id="portrait-circle-wrapper">
                <!-- 4-Sided SVG Perimeter Timer Bar around the Photo -->
                <svg class="photo-timer-svg" id="photo-timer-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <rect class="photo-timer-track" x="2" y="2" width="96" height="96" rx="7.5" ry="7.5" />
                  <rect class="photo-timer-bar timer-cyan" id="photo-timer-bar" x="2" y="2" width="96" height="96" rx="7.5" ry="7.5" pathLength="100" />
                </svg>

                <div class="portrait-frame-glow portrait-circle-glow"></div>
                <img id="card-portrait-img" class="portrait-img" alt="Celebrity portrait" />
              </div>
            </div>

            <!-- 2. Celebrity name and Photo Bar text MOVED BELOW THE PHOTO -->
            <div class="card-identity-box" id="card-identity-box">
              <h2 class="person-name" id="card-person-name">Loading...</h2>
              
              <!-- Badges from photo bar & Timer Countdown HUD (Moved Below Photo) -->
              <div class="card-badge-row card-meta-below" id="card-badge-row">
                <span class="category-badge" id="card-category-badge">
                  <span class="category-icon" id="card-cat-icon">⭐</span>
                  <span class="category-text" id="card-cat-name">CELEBRITY</span>
                </span>
                <span class="difficulty-badge" id="card-diff-badge">EASY</span>
                <span class="timer-countdown-badge timer-cyan" id="card-timer-badge">
                  <span class="timer-badge-icon">⏱️</span>
                  <span class="timer-badge-number" id="card-timer-val">10</span><span class="timer-badge-unit">s</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,this.cardWrapper=this.container.querySelector("#portrait-card-wrapper"),this.cardElement=this.container.querySelector("#portrait-card"),this.imageEl=this.container.querySelector("#card-portrait-img"),this.spinnerEl=this.container.querySelector("#card-img-spinner"),this.categoryIconEl=this.container.querySelector("#card-cat-icon"),this.categoryNameEl=this.container.querySelector("#card-cat-name"),this.difficultyEl=this.container.querySelector("#card-diff-badge"),this.personNameEl=this.container.querySelector("#card-person-name"),this.promptEl=this.container.querySelector("#card-question-prompt")}setLocalization(e,t="en"){this.language=t,this.translations=e,this.promptEl&&(e!=null&&e.question)&&(this.promptEl.textContent=e.question)}setShowName(e){this.showName=!!e,this.personNameEl&&(this.personNameEl.style.display=this.showName?"block":"none")}async displayPerson(e,t=null){var r,s;if(!e)return;this.currentPerson=e,this.cardElement.classList.add("transitioning-out"),await new Promise(o=>setTimeout(o,120));const i=e.image&&!e.image.startsWith("data:image/svg+xml")?on(e.image):va(e);this.imageEl.onerror=()=>{this.imageEl.onerror=null,this.imageEl.src=va(e)},this.imageEl.src=i,this.imageEl.alt=e.name;const a={footballer:"⚽",sports:"🏆",actor:"🎬",singer:"🎤",youtuber:"🔴",influencer:"✨",leader:"🏛️",historical:"📜",scientist:"🔬",poet:"✒️",hero:"⚔️"};if(this.categoryIconEl&&(this.categoryIconEl.textContent=a[e.category]||"⭐"),this.categoryNameEl){const o=e.category,c=((s=(r=this.translations)==null?void 0:r.categories)==null?void 0:s[o])||e.category;this.categoryNameEl.textContent=c.toUpperCase();const l=this.categoryNameEl.closest(".category-badge");l&&(l.className=`category-badge cat-${e.category||"celebrity"}`)}this.difficultyEl&&(this.difficultyEl.textContent=(e.difficulty||"EASY").toUpperCase(),this.difficultyEl.className=`difficulty-badge diff-${e.difficulty||"easy"}`),this.personNameEl&&(this.personNameEl.textContent=e.name,this.personNameEl.style.display=this.showName?"block":"none"),this.promptEl&&t&&(this.promptEl.textContent=t),this.cardElement.classList.remove("transitioning-out"),this.cardElement.classList.add("transitioning-in"),setTimeout(()=>{this.cardElement.classList.remove("transitioning-in")},350)}}class Gp{constructor(e){this.container=e,this.render()}render(){this.container&&(this.container.innerHTML=`
        <div class="timer-line-widget hidden" id="timer-line-widget" style="display: none;">
          <div class="timer-line-hud">
            <div class="timer-hud-center">
              <span class="timer-hud-seconds" id="timer-number-val">10</span>
              <span class="timer-hud-unit">s</span>
            </div>
          </div>
          <div class="timer-line-track">
            <div class="timer-line-bar" id="timer-line-bar" style="width: 100%;">
              <span class="timer-line-glow-dot"></span>
            </div>
          </div>
        </div>
      `,this.container.style.display="none",this.widgetEl=this.container.querySelector("#timer-line-widget"),this.barEl=this.container.querySelector("#timer-line-bar"),this.numberEl=this.container.querySelector("#timer-number-val"))}setLocalization(){}update({remainingSeconds:e=10,progress:t=1,isUrgent:i=!1}){const a=Math.max(0,Math.min(1,t)),r=Math.max(0,Math.ceil(e)),s=document.getElementById("photo-timer-bar");if(s){const l=(100*(1-a)).toFixed(2);s.style.strokeDashoffset=l,a>.45?s.setAttribute("class","photo-timer-bar timer-cyan"):a>.2?s.setAttribute("class","photo-timer-bar timer-amber"):s.setAttribute("class","photo-timer-bar timer-urgent")}const o=document.getElementById("card-timer-val");o&&(o.textContent=r);const c=document.getElementById("card-timer-badge");c&&(a>.45?c.className="timer-countdown-badge timer-cyan":a>.2?c.className="timer-countdown-badge timer-amber":c.className="timer-countdown-badge timer-urgent"+(i&&r>0?" pulse-urgent":""),r===0?c.classList.add("completed-state"):c.classList.remove("completed-state")),this.numberEl&&(this.numberEl.textContent=r),this.barEl&&(this.barEl.style.width=`${(a*100).toFixed(1)}%`)}reset(e=10){const t=document.getElementById("photo-timer-bar");t&&(t.style.strokeDashoffset="0",t.setAttribute("class","photo-timer-bar timer-cyan"));const i=document.getElementById("card-timer-val");i&&(i.textContent=e);const a=document.getElementById("card-timer-badge");a&&(a.className="timer-countdown-badge timer-cyan"),this.barEl&&(this.barEl.style.width="100%"),this.numberEl&&(this.numberEl.textContent=e)}setVisible(e){const t=document.getElementById("photo-timer-svg");t&&(t.style.display=e?"block":"none");const i=document.getElementById("card-timer-badge");i&&(i.style.display=e?"inline-flex":"none"),this.container&&(this.container.style.display="none")}}class Hp{constructor(e){this.container=e,this.render()}render(){this.container.innerHTML=`
      <div class="question-highlight-banner" id="main-question-banner">
        <span class="question-highlight-icon">❓</span>
        <h2 class="question-prompt" id="main-question-prompt">Which country is he from?</h2>
      </div>
    `,this.bannerEl=this.container.querySelector("#main-question-banner"),this.promptEl=this.container.querySelector("#main-question-prompt")}setLocalization(e){this.promptEl&&(e!=null&&e.question)&&(this.promptEl.textContent=e.question)}setText(e){this.promptEl&&e&&(this.promptEl.textContent=e)}}function jr(n,e="🌐",t="normal"){if(!n||typeof n!="string"||n.length!==2)return`<span class="flag-emoji">${e}</span>`;const i=n.toLowerCase();return`<span class="flag-badge-wrapper flag-size-${t}">
    <img
      src="https://flagcdn.com/w160/${i}.png"
      srcset="https://flagcdn.com/w160/${i}.png 1x, https://flagcdn.com/w320/${i}.png 2x"
      alt="${n}"
      class="flag-raster-img"
      loading="eager"
      onerror="this.style.display='none'; const fb = this.nextElementSibling; if(fb) fb.style.display='inline-block';"
    />
    <span class="flag-fallback-emoji" style="display:none;">${e}</span>
  </span>`}class Vp{constructor(e){this.container=e,this.showCapital=!0,this.language="en",this.translations={},this.render()}render(){this.container.innerHTML=`
      <div class="reveal-card-wrapper hidden" id="reveal-card-wrapper">
        <div class="reveal-card-backdrop"></div>
        <div class="reveal-card" id="reveal-card">
          <!-- Status Banner: Dynamic color (Red on wrong, Green on correct, Blue on neutral) -->
          <div class="reveal-header">
            <span class="reveal-status-banner status-neutral" id="reveal-status-banner">
              COUNTRY REVEALED
            </span>
          </div>

          <!-- Celebrity Photo & Name Showcase -->
          <div class="reveal-celebrity-box" id="reveal-celebrity-box">
            <div class="reveal-celebrity-avatar-ring">
              <img id="reveal-star-photo" class="reveal-star-photo" alt="Celebrity Photo" />
            </div>
            <div class="reveal-celebrity-info">
              <span class="reveal-celebrity-tag" id="reveal-star-category">⭐ CELEBRITY</span>
              <h3 class="reveal-celebrity-name" id="reveal-star-name">Celebrity Name</h3>
            </div>
          </div>

          <!-- Wrong choice display (only visible when user chose an incorrect answer) -->
          <div class="reveal-user-wrong-box hidden" id="reveal-wrong-box">
            <span class="wrong-box-label" id="lbl-wrong-attempt">❌ আপনার উত্তর ছিল:</span>
            <span class="wrong-box-val" id="reveal-wrong-val">France</span>
          </div>

          <!-- Big Authentic National Flag -->
          <div class="reveal-flag-row" id="reveal-flag-container">
            <!-- Injected by getFlagHtml -->
          </div>

          <!-- Correct Country Answer Box -->
          <div class="reveal-correct-box">
            <span class="correct-box-tag" id="lbl-correct-country-tag">✅ সঠিক দেশ / CORRECT ANSWER:</span>
            <div class="reveal-country-row">
              <span class="reveal-name-flag" id="reveal-name-flag"></span>
              <h2 class="reveal-country-name" id="reveal-country-name">GERMANY</h2>
              <span class="reveal-country-code" id="reveal-country-code">DE</span>
            </div>
          </div>

          <div class="reveal-meta-row" id="reveal-meta-row">
            <div class="meta-item" id="reveal-capital-box">
              <span class="meta-label" id="lbl-capital">CAPITAL</span>
              <span class="meta-value" id="reveal-capital-val">Berlin</span>
            </div>
            <div class="meta-item">
              <span class="meta-label" id="lbl-nationality">NATIONALITY</span>
              <span class="meta-value" id="reveal-nationality-val">German</span>
            </div>
          </div>

          <p class="reveal-description" id="reveal-description-text"></p>
        </div>
      </div>
    `,this.wrapper=this.container.querySelector("#reveal-card-wrapper"),this.card=this.container.querySelector("#reveal-card"),this.statusBannerEl=this.container.querySelector("#reveal-status-banner"),this.starPhotoEl=this.container.querySelector("#reveal-star-photo"),this.starNameEl=this.container.querySelector("#reveal-star-name"),this.starCatEl=this.container.querySelector("#reveal-star-category"),this.wrongBox=this.container.querySelector("#reveal-wrong-box"),this.wrongAttemptLabel=this.container.querySelector("#lbl-wrong-attempt"),this.wrongAttemptVal=this.container.querySelector("#reveal-wrong-val"),this.correctTagEl=this.container.querySelector("#lbl-correct-country-tag"),this.flagContainer=this.container.querySelector("#reveal-flag-container"),this.nameFlagEl=this.container.querySelector("#reveal-name-flag"),this.countryNameEl=this.container.querySelector("#reveal-country-name"),this.countryCodeEl=this.container.querySelector("#reveal-country-code"),this.capitalBox=this.container.querySelector("#reveal-capital-box"),this.capitalValEl=this.container.querySelector("#reveal-capital-val"),this.nationalityValEl=this.container.querySelector("#reveal-nationality-val"),this.descriptionEl=this.container.querySelector("#reveal-description-text"),this.lblCapital=this.container.querySelector("#lbl-capital"),this.lblNationality=this.container.querySelector("#lbl-nationality")}setLocalization(e,t="en"){this.language=t,this.translations=e,this.lblCapital&&(e!=null&&e.capital)&&(this.lblCapital.textContent=e.capital.toUpperCase()),this.lblNationality&&(e!=null&&e.nationality)&&(this.lblNationality.textContent=e.nationality.toUpperCase())}setShowCapital(e){this.showCapital=!!e,this.capitalBox&&(this.capitalBox.style.display=this.showCapital?"flex":"none")}show(e,t=null,i=null){if(!e)return;if(this.starPhotoEl&&(this.starPhotoEl.src=on(e.image)||on("/favicon.svg"),this.starPhotoEl.onerror=()=>{this.starPhotoEl.src=on("/favicon.svg")}),this.starNameEl&&(this.starNameEl.textContent=e.name||"Celebrity"),this.starCatEl){const l={footballer:"⚽",sports:"🏆",actor:"🎬",singer:"🎤",youtuber:"🔴",influencer:"✨",leader:"🏛️",historical:"📜",scientist:"🔬",poet:"✒️",hero:"⚔️"}[e.category]||"⭐",u=(e.category||"celebrity").toUpperCase();this.starCatEl.textContent=`${l} ${u}`}const a=this.language==="bn"&&(t!=null&&t.nameBn)?t.nameBn:(t==null?void 0:t.name)||e.country,r=e.countryCode||(t==null?void 0:t.code)||"",s=e.flag||(t==null?void 0:t.flag)||"🌐";this.flagContainer.innerHTML=jr(r,s,"large"),this.nameFlagEl.innerHTML=jr(r,s,"small"),this.countryNameEl.textContent=a.toUpperCase(),this.countryCodeEl.textContent=r,this.capitalValEl.textContent=e.capital||(t==null?void 0:t.capital)||"—",this.nationalityValEl.textContent=e.nationality||"—",this.descriptionEl.textContent=e.description||"";const o=this.language==="bn";(i==null?void 0:i.isCorrect)===!1&&(i!=null&&i.userChoice)?(this.statusBannerEl.className="reveal-status-banner status-wrong",this.statusBannerEl.textContent=o?"❌ ভুল উত্তর!":"❌ WRONG ANSWER!",this.wrongAttemptLabel.textContent=o?"❌ আপনার পছন্দ ছিল:":"❌ You selected:",this.wrongAttemptVal.textContent=i.userChoice.name,this.wrongBox.classList.remove("hidden"),this.correctTagEl.textContent=o?"✅ সঠিক দেশ:":"✅ CORRECT COUNTRY:",this.card.classList.add("card-shake")):(i==null?void 0:i.isCorrect)===!0?(this.statusBannerEl.className="reveal-status-banner status-correct",this.statusBannerEl.textContent=o?"🎯 চমৎকার! সঠিক উত্তর!":"🎯 CORRECT ANSWER!",this.wrongBox.classList.add("hidden"),this.correctTagEl.textContent=o?"✅ সঠিক দেশ:":"✅ CORRECT COUNTRY:",this.card.classList.remove("card-shake")):(i==null?void 0:i.isTimeout)===!0?(this.statusBannerEl.className="reveal-status-banner status-timeout",this.statusBannerEl.textContent=o?"⏰ সময় শেষ!":"⏰ TIME'S UP!",this.wrongBox.classList.add("hidden"),this.correctTagEl.textContent=o?"✅ সঠিক দেশ ছিল:":"✅ THE CORRECT COUNTRY WAS:",this.card.classList.remove("card-shake")):(this.statusBannerEl.className="reveal-status-banner status-neutral",this.statusBannerEl.textContent=o?"🌐 দেশ প্রকাশিত":"🌐 COUNTRY REVEALED",this.wrongBox.classList.add("hidden"),this.correctTagEl.textContent=o?"সঠিক দেশ:":"COUNTRY:",this.card.classList.remove("card-shake")),this.wrapper.classList.remove("hidden"),this.wrapper.classList.remove("fade-out"),this.card.classList.add("reveal-pop-in"),setTimeout(()=>{this.card.classList.remove("card-shake")},600)}hide(){this.wrapper.classList.add("fade-out"),setTimeout(()=>{this.wrapper.classList.add("hidden"),this.card.classList.remove("reveal-pop-in"),this.card.classList.remove("card-shake"),this.wrapper.classList.remove("fade-out")},280)}}class Wp{constructor(e,{onSelect:t}){this.container=e,this.onSelect=t,this.isLocked=!1,this.choices=[],this.language="en",this.render()}render(){this.container.innerHTML=`
      <div class="multiple-choice-container" id="mc-container">
        <div class="mc-grid" id="mc-grid"></div>
      </div>
    `,this.grid=this.container.querySelector("#mc-grid")}setLocalization(e="en"){this.language=e}setChoices(e){this.choices=e||[],this.isLocked=!1,this.grid&&(this.grid.innerHTML="",this.choices.forEach((t,i)=>{const a=document.createElement("button");a.type="button",a.className="choice-btn",a.dataset.index=i,a.dataset.code=t.code,a.setAttribute("aria-label",t.name);const r=jr(t.code,t.flag||"🏳️","small"),o=["A","B","C","D"][i]||"";a.innerHTML=`
        <div class="choice-top-row">
          <span class="choice-letter-badge choice-badge-${i}">${o}</span>
          <span class="choice-flag-box">${r}</span>
          <span class="choice-status-badge"></span>
        </div>
        <span class="choice-name">${t.name}</span>
      `,a.addEventListener("click",()=>this.handleSelection(i,a)),this.grid.appendChild(a)}))}handleSelection(e,t){var o;if(this.isLocked)return;this.isLocked=!0;const i=this.choices[e],a=!!(i!=null&&i.isCorrect),r=this.language==="bn";this.grid.querySelectorAll(".choice-btn").forEach((c,l)=>{c.disabled=!0;const u=this.choices[l],h=c.querySelector(".choice-status-badge");u!=null&&u.isCorrect?(c.classList.add("btn-correct"),h&&(h.textContent=r?"✓ সঠিক":"✓ Correct")):l===e&&!a&&(c.classList.add("btn-incorrect"),h&&(h.textContent=r?"✕ ভুল":"✕ Wrong"))}),(o=this.onSelect)==null||o.call(this,a,i)}lock(){var t;this.isLocked=!0;const e=(t=this.grid)==null?void 0:t.querySelectorAll(".choice-btn");e==null||e.forEach(i=>i.disabled=!0)}setVisible(e){this.container&&(this.container.style.display=e?"block":"none")}clear(){this.grid&&(this.grid.innerHTML=""),this.isLocked=!1}}class Yp{constructor(e,t={}){this.container=e,this.callbacks=t,this.isPaused=!1,this.isDebouncing=!1,this.render()}render(){this.container.innerHTML=`
      <nav class="bottom-controls" aria-label="Game navigation controls">
        <button id="ctrl-pause" class="ctrl-btn ctrl-primary" title="Pause / Resume">
          <span class="ctrl-icon" id="ctrl-pause-icon">⏸️</span>
          <span class="ctrl-label" id="ctrl-pause-label">Pause</span>
        </button>

        <button id="ctrl-reveal" class="ctrl-btn" title="Reveal Answer Immediately">
          <span class="ctrl-icon">💡</span>
          <span class="ctrl-label" id="ctrl-reveal-label">Answer</span>
        </button>

        <button id="ctrl-replay" class="ctrl-btn" title="Replay Current Question">
          <span class="ctrl-icon">🔄</span>
          <span class="ctrl-label" id="ctrl-replay-label">Replay</span>
        </button>

        <button id="ctrl-next" class="ctrl-btn ctrl-accent" title="Next Question">
          <span class="ctrl-icon">⏭️</span>
          <span class="ctrl-label" id="ctrl-next-label">Next</span>
        </button>

        <button id="ctrl-fullscreen" class="ctrl-btn" title="Toggle Fullscreen">
          <span class="ctrl-icon">⛶</span>
          <span class="ctrl-label" id="ctrl-fs-label">Full</span>
        </button>
      </nav>
    `,this.btnPause=this.container.querySelector("#ctrl-pause"),this.iconPause=this.container.querySelector("#ctrl-pause-icon"),this.lblPause=this.container.querySelector("#ctrl-pause-label"),this.btnReveal=this.container.querySelector("#ctrl-reveal"),this.btnReplay=this.container.querySelector("#ctrl-replay"),this.btnNext=this.container.querySelector("#ctrl-next"),this.btnFullscreen=this.container.querySelector("#ctrl-fullscreen"),this.bindEvents()}debounce(e){this.isDebouncing||(this.isDebouncing=!0,e(),setTimeout(()=>{this.isDebouncing=!1},250))}bindEvents(){this.btnPause.addEventListener("click",()=>{this.debounce(()=>{var e,t;return(t=(e=this.callbacks).onTogglePause)==null?void 0:t.call(e)})}),this.btnReveal.addEventListener("click",()=>{this.debounce(()=>{var e,t;return(t=(e=this.callbacks).onRevealNow)==null?void 0:t.call(e)})}),this.btnReplay.addEventListener("click",()=>{this.debounce(()=>{var e,t;return(t=(e=this.callbacks).onReplay)==null?void 0:t.call(e)})}),this.btnNext.addEventListener("click",()=>{this.debounce(()=>{var e,t;return(t=(e=this.callbacks).onNext)==null?void 0:t.call(e)})}),this.btnFullscreen.addEventListener("click",()=>{this.debounce(()=>{var e,t;return(t=(e=this.callbacks).onToggleFullscreen)==null?void 0:t.call(e)})})}setPausedState(e){this.isPaused=e,this.iconPause&&(this.iconPause.textContent=e?"▶️":"⏸️"),this.lblPause&&(this.lblPause.textContent=e?"Play":"Pause")}setLocalization(e){if(!e)return;this.lblPause&&(this.lblPause.textContent=this.isPaused?e.resume||"Resume":e.pause||"Pause");const t=this.container.querySelector("#ctrl-reveal-label");t&&e.showAnswer&&(t.textContent=e.showAnswer);const i=this.container.querySelector("#ctrl-replay-label");i&&e.replay&&(i.textContent=e.replay);const a=this.container.querySelector("#ctrl-next-label");a&&e.next&&(a.textContent=e.next)}}const _a=["footballer","sports","actor","singer","youtuber","influencer","leader","historical","scientist","poet","hero"],xo=["easy","medium","hard"];function ec(n,e=new Set){const t=[];return!n||typeof n!="object"?{valid:!1,errors:["Person record must be an object"]}:(!n.id||typeof n.id!="string"||!n.id.trim()?t.push("Missing or invalid person ID"):e.has(n.id)&&t.push(`Duplicate ID: ${n.id}`),(!n.name||typeof n.name!="string"||!n.name.trim())&&t.push("Missing or invalid name"),(!n.country||typeof n.country!="string"||!n.country.trim())&&t.push("Missing or invalid country"),(!n.countryCode||typeof n.countryCode!="string"||!/^[A-Z]{2}$/.test(n.countryCode))&&t.push(`Invalid countryCode "${n.countryCode}". Must be 2-letter uppercase ISO code.`),_a.includes(n.category)||t.push(`Invalid category "${n.category}". Allowed: ${_a.join(", ")}`),xo.includes(n.difficulty)||t.push(`Invalid difficulty "${n.difficulty}". Allowed: ${xo.join(", ")}`),(!n.image||typeof n.image!="string")&&t.push("Missing or invalid image path"),{valid:t.length===0,errors:t})}function qp(n){if(!Array.isArray(n))return{valid:!1,errors:["Dataset must be an array of person objects"],count:0};const e=[],t=new Set,i=new Set;return n.forEach((a,r)=>{const s=ec(a,t);if(s.valid?t.add(a.id):e.push(`Item ${r} (${(a==null?void 0:a.name)||"unknown"}): ${s.errors.join("; ")}`),a&&a.name){const o=a.name.toLowerCase().trim();i.has(o)&&e.push(`Duplicate person name: "${a.name}" at index ${r}`),i.add(o)}}),{valid:e.length===0,errors:e,count:n.length}}let en=null;function Xp(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0||document.referrer.includes("android-app://")}function jp(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}function Kp(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{const n=new URL("./sw.js",window.location.href).href;navigator.serviceWorker.register(n).then(e=>{console.log("[PWA] Service Worker registered successfully:",e.scope)}).catch(e=>{console.warn("[PWA] Service Worker registration failed:",e)})}),window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),en=n,console.log("[PWA] beforeinstallprompt captured!"),Kr(!0)}),window.addEventListener("appinstalled",()=>{en=null,console.log("[PWA] App successfully installed to Home Screen!"),Kr(!1)})}async function $p(){if(Xp())return rr("✅ World Star Quiz 3D ইতিমধ্যে ইনস্টল করা আছে!"),{outcome:"already_installed"};if(en){en.prompt();const n=await en.userChoice;return console.log("[PWA] User response to install prompt:",n.outcome),en=null,Kr(!1),n}return jp()?(rr('📱 iPhone/iPad এ ইনস্টল করতে: Safari-র নিচের Share (📤) আইকনে চাপ দিন এবং "Add to Home Screen" (+) সিলেক্ট করুন!'),{outcome:"ios_instructions"}):(rr('📲 ব্রাউজারের থ্রি-ডট (⋮) মেন্যু থেকে "Install app" বা "Add to Home screen" চাপুন।'),{outcome:"manual_instructions"})}function Kr(n){document.querySelectorAll(".btn-install-pwa").forEach(t=>{n&&t.classList.add("pwa-ready")})}function rr(n){let e=document.getElementById("pwa-install-toast");e||(e=document.createElement("div"),e.id="pwa-install-toast",e.className="pwa-toast",document.body.appendChild(e)),e.textContent=n,e.classList.add("show"),setTimeout(()=>{e.classList.remove("show")},5e3)}class Zp{constructor(e,{onSave:t,onOpenAdmin:i,getPeople:a,translations:r}){this.container=e,this.onSave=t,this.onOpenAdmin=i,this.getPeople=a,this.translations=r,this.settings={},this.render()}render(){this.container.innerHTML=`
      <div class="settings-drawer-backdrop hidden" id="settings-backdrop">
        <aside class="settings-drawer" id="settings-drawer" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <div class="settings-header">
            <h2 id="settings-title">GAME SETTINGS</h2>
            <button id="btn-settings-close" class="close-btn" aria-label="Close Settings">✕</button>
          </div>

          <div class="settings-body">
            <!-- Mode Selector -->
            <div class="setting-group">
              <label class="setting-label">Game Mode</label>
              <div class="pill-group" id="setting-mode-pills">
                <button type="button" class="pill-opt" data-mode="auto">Auto</button>
                <button type="button" class="pill-opt" data-mode="guess">Guess</button>
                <button type="button" class="pill-opt" data-mode="practice">Practice</button>
                <button type="button" class="pill-opt" data-mode="challenge">Challenge (10)</button>
              </div>
            </div>

            <!-- Language -->
            <div class="setting-group">
              <label class="setting-label">Language</label>
              <div class="pill-group" id="setting-lang-pills">
                <button type="button" class="pill-opt" data-lang="en">English 🇬🇧</button>
                <button type="button" class="pill-opt" data-lang="bn">বাংলা 🇧🇩</button>
              </div>
            </div>

            <!-- Timer Duration -->
            <div class="setting-group">
              <label class="setting-label">Countdown Duration</label>
              <div class="pill-group" id="setting-timer-pills">
                <button type="button" class="pill-opt" data-timer="3">3s</button>
                <button type="button" class="pill-opt" data-timer="5">5s</button>
                <button type="button" class="pill-opt" data-timer="10">10s</button>
                <button type="button" class="pill-opt" data-timer="15">15s</button>
                <button type="button" class="pill-opt" data-timer="20">20s</button>
              </div>
            </div>

            <!-- Reveal Duration -->
            <div class="setting-group">
              <label class="setting-label">Answer Display Delay</label>
              <div class="pill-group" id="setting-reveal-pills">
                <button type="button" class="pill-opt" data-reveal="1.5">1.5s</button>
                <button type="button" class="pill-opt" data-reveal="2.5">2.5s</button>
                <button type="button" class="pill-opt" data-reveal="4">4s</button>
              </div>
            </div>

            <!-- Difficulty -->
            <div class="setting-group">
              <label class="setting-label">Difficulty Level</label>
              <div class="pill-group" id="setting-diff-pills">
                <button type="button" class="pill-opt" data-diff="all">All</button>
                <button type="button" class="pill-opt" data-diff="easy">Easy</button>
                <button type="button" class="pill-opt" data-diff="medium">Medium</button>
                <button type="button" class="pill-opt" data-diff="hard">Hard</button>
              </div>
            </div>

            <!-- Categories Multi-Select (Dynamically Generated) -->
            <div class="setting-group">
              <label class="setting-label">Celebrity Categories</label>
              <div class="pill-grid" id="setting-cat-pills"></div>
            </div>

            <!-- Audio Settings -->
            <div class="setting-group">
              <label class="setting-label">Audio & SFX</label>
              <div class="toggle-row">
                <span>Sound Effects</span>
                <input type="checkbox" id="set-sound-fx" class="switch-checkbox" />
              </div>
              <div class="toggle-row">
                <span>Background Cosmic Audio</span>
                <input type="checkbox" id="set-music" class="switch-checkbox" />
              </div>
              <div class="slider-row">
                <span>Volume</span>
                <input type="range" id="set-volume" min="0" max="1" step="0.05" class="custom-slider" />
              </div>
            </div>

            <!-- Visual Settings -->
            <div class="setting-group">
              <label class="setting-label">Graphics & Performance</label>
              <div class="pill-group" id="setting-vfx-pills">
                <button type="button" class="pill-opt" data-vfx="high">High 3D</button>
                <button type="button" class="pill-opt" data-vfx="medium">Medium</button>
                <button type="button" class="pill-opt" data-vfx="low">Low (Battery)</button>
              </div>
              <div class="toggle-row" style="margin-top: 10px;">
                <span>Reduced Motion</span>
                <input type="checkbox" id="set-reduced-motion" class="switch-checkbox" />
              </div>
            </div>

            <!-- Display Preferences -->
            <div class="setting-group">
              <label class="setting-label">Display Options</label>
              <div class="toggle-row">
                <span>Show Person's Name</span>
                <input type="checkbox" id="set-show-name" class="switch-checkbox" />
              </div>
              <div class="toggle-row">
                <span>Show Capital City</span>
                <input type="checkbox" id="set-show-capital" class="switch-checkbox" />
              </div>
              <div class="toggle-row">
                <span>Keep Screen Awake / স্ক্রিন অন রাখুন 💡</span>
                <input type="checkbox" id="set-keep-awake" class="switch-checkbox" checked />
              </div>
            </div>

            <!-- Install App / Add to Home Screen -->
            <div class="setting-group pwa-trigger-group">
              <button id="btn-install-app" type="button" class="btn-install-pwa">
                📲 Add to Home Screen / অ্যাপ ইনস্টল করুন
              </button>
            </div>

            <!-- Admin Panel Button -->
            <div class="setting-group admin-trigger-group">
              <button id="btn-open-admin" type="button" class="btn-admin-panel">
                🛠️ Open Database Editor (Admin)
              </button>
            </div>
          </div>

          <div class="settings-footer">
            <button id="btn-save-settings" class="btn-primary-action">Close & Apply</button>
          </div>
        </aside>
      </div>
    `,this.backdrop=this.container.querySelector("#settings-backdrop"),this.btnClose=this.container.querySelector("#btn-settings-close"),this.btnSave=this.container.querySelector("#btn-save-settings"),this.btnAdmin=this.container.querySelector("#btn-open-admin"),this.soundFxCheckbox=this.container.querySelector("#set-sound-fx"),this.musicCheckbox=this.container.querySelector("#set-music"),this.volumeSlider=this.container.querySelector("#set-volume"),this.reducedMotionCheckbox=this.container.querySelector("#set-reduced-motion"),this.showNameCheckbox=this.container.querySelector("#set-show-name"),this.showCapitalCheckbox=this.container.querySelector("#set-show-capital"),this.keepAwakeCheckbox=this.container.querySelector("#set-keep-awake"),this.bindEvents()}bindEvents(){this.btnClose.addEventListener("click",()=>this.close()),this.btnSave.addEventListener("click",()=>this.close()),this.backdrop.addEventListener("click",t=>{t.target===this.backdrop&&this.close()}),this.btnAdmin.addEventListener("click",()=>{var t;this.close(),(t=this.onOpenAdmin)==null||t.call(this)});const e=this.container.querySelector("#btn-install-app");e&&e.addEventListener("click",()=>{$p()}),this.setupPillGroup("#setting-mode-pills","data-mode",t=>{this.settings.mode=t}),this.setupPillGroup("#setting-lang-pills","data-lang",t=>{this.settings.language=t,this.renderCategoryPills()}),this.setupPillGroup("#setting-timer-pills","data-timer",t=>{this.settings.timerDuration=Number(t)}),this.setupPillGroup("#setting-reveal-pills","data-reveal",t=>{this.settings.revealDuration=Number(t)}),this.setupPillGroup("#setting-diff-pills","data-diff",t=>{this.settings.difficulty=t}),this.setupPillGroup("#setting-vfx-pills","data-vfx",t=>{this.settings.vfxQuality=t}),this.soundFxCheckbox.addEventListener("change",t=>{this.settings.soundEnabled=t.target.checked}),this.musicCheckbox.addEventListener("change",t=>{this.settings.musicEnabled=t.target.checked}),this.volumeSlider.addEventListener("input",t=>{this.settings.soundVolume=Number(t.target.value)}),this.reducedMotionCheckbox.addEventListener("change",t=>{this.settings.reducedMotion=t.target.checked}),this.showNameCheckbox.addEventListener("change",t=>{this.settings.showName=t.target.checked}),this.showCapitalCheckbox.addEventListener("change",t=>{this.settings.showCapital=t.target.checked}),this.keepAwakeCheckbox.addEventListener("change",t=>{this.settings.keepAwake=t.target.checked})}renderCategoryPills(){var l,u;const e=this.container.querySelector("#setting-cat-pills");if(!e)return;const t=typeof this.getPeople=="function"?this.getPeople():[],i=new Set(_a);t.forEach(h=>{h!=null&&h.category&&typeof h.category=="string"&&i.add(h.category.trim().toLowerCase())});const a={all:t.length};t.forEach(h=>{if(h!=null&&h.category){const f=h.category.trim().toLowerCase();a[f]=(a[f]||0)+1}});const r={all:"⭐",footballer:"⚽",sports:"🏆",actor:"🎬",singer:"🎤",scientist:"🔬",youtuber:"🔴",influencer:"✨",leader:"🏛️",historical:"📜",poet:"✒️",hero:"⚔️"},s=this.settings.language||"en",o=((u=(l=this.translations)==null?void 0:l[s])==null?void 0:u.categories)||{},c=["all",...Array.from(i).filter(h=>h!=="all")];e.innerHTML=c.map(h=>{const f=r[h]||"🌟";let p=o[h];p||(p=h.charAt(0).toUpperCase()+h.slice(1));const y=a[h]!==void 0?` (${a[h]})`:"";return`<button type="button" class="pill-opt pill-toggle" data-cat="${h}">${f} ${p}${y}</button>`}).join(""),e.querySelectorAll("button").forEach(h=>{h.addEventListener("click",()=>{const f=h.dataset.cat;let p=[...this.settings.selectedCategories||["all"]];f==="all"?p=["all"]:(p=p.filter(y=>y!=="all"),p.includes(f)?(p=p.filter(y=>y!==f),p.length===0&&(p=["all"])):p.push(f)),this.settings.selectedCategories=p,this.updateCategoryPills()})}),this.updateCategoryPills()}setupPillGroup(e,t,i){const a=this.container.querySelector(e);a&&a.addEventListener("click",r=>{const s=r.target.closest("button");if(!s)return;const o=s.getAttribute(t);o!==null&&(a.querySelectorAll("button").forEach(c=>c.classList.remove("active")),s.classList.add("active"),i(o))})}updateCategoryPills(){const e=this.settings.selectedCategories||["all"];this.container.querySelectorAll("#setting-cat-pills button").forEach(i=>{const a=i.dataset.cat;e.includes(a)?i.classList.add("active"):i.classList.remove("active")})}setLocalization(e,t="en"){this.translations=e,this.settings.language=t,this.renderCategoryPills()}open(e){this.settings={...e},this.setActivePill("#setting-mode-pills","data-mode",this.settings.mode),this.setActivePill("#setting-lang-pills","data-lang",this.settings.language),this.setActivePill("#setting-timer-pills","data-timer",String(this.settings.timerDuration)),this.setActivePill("#setting-reveal-pills","data-reveal",String(this.settings.revealDuration)),this.setActivePill("#setting-diff-pills","data-diff",this.settings.difficulty),this.setActivePill("#setting-vfx-pills","data-vfx",this.settings.vfxQuality),this.renderCategoryPills(),this.soundFxCheckbox.checked=!!this.settings.soundEnabled,this.musicCheckbox.checked=!!this.settings.musicEnabled,this.volumeSlider.value=this.settings.soundVolume??.7,this.reducedMotionCheckbox.checked=!!this.settings.reducedMotion,this.showNameCheckbox.checked=!!this.settings.showName,this.showCapitalCheckbox.checked=!!this.settings.showCapital,this.keepAwakeCheckbox.checked=this.settings.keepAwake!==!1,this.backdrop.classList.remove("hidden")}setActivePill(e,t,i){const a=this.container.querySelector(e);a&&a.querySelectorAll("button").forEach(r=>{r.getAttribute(t)===String(i)?r.classList.add("active"):r.classList.remove("active")})}close(){var e;this.backdrop.classList.add("hidden"),(e=this.onSave)==null||e.call(this,this.settings)}}class Jp{constructor(e,{onPlayAgain:t,onBackToAuto:i}){this.container=e,this.onPlayAgain=t,this.onBackToAuto=i,this.render()}render(){this.container.innerHTML=`
      <div class="results-screen-backdrop hidden" id="results-backdrop">
        <div class="results-card" id="results-card">
          <div class="results-trophy">🏆</div>
          <h2 class="results-title" id="results-title-text">CHALLENGE COMPLETE!</h2>
          <p class="results-subtitle" id="results-subtitle-text">Outstanding trivia performance</p>

          <div class="results-score-big">
            <span class="score-num" id="res-score-val">0</span>
            <span class="score-label">POINTS</span>
          </div>

          <div class="results-grid">
            <div class="results-stat-box">
              <span class="stat-icon">🎯</span>
              <span class="stat-num" id="res-accuracy-val">0%</span>
              <span class="stat-name">Accuracy</span>
            </div>
            <div class="results-stat-box">
              <span class="stat-icon">✅</span>
              <span class="stat-num" id="res-correct-val">0</span>
              <span class="stat-name">Correct</span>
            </div>
            <div class="results-stat-box">
              <span class="stat-icon">❌</span>
              <span class="stat-num" id="res-wrong-val">0</span>
              <span class="stat-name">Wrong</span>
            </div>
            <div class="results-stat-box">
              <span class="stat-icon">🔥</span>
              <span class="stat-num" id="res-streak-val">0</span>
              <span class="stat-name">Best Streak</span>
            </div>
          </div>

          <div class="results-actions">
            <button id="btn-challenge-retry" class="btn-primary-action">Play Again 🔄</button>
            <button id="btn-challenge-auto" class="btn-secondary-action">Auto Quiz 🌐</button>
          </div>
        </div>
      </div>
    `,this.backdrop=this.container.querySelector("#results-backdrop"),this.scoreEl=this.container.querySelector("#res-score-val"),this.accuracyEl=this.container.querySelector("#res-accuracy-val"),this.correctEl=this.container.querySelector("#res-correct-val"),this.wrongEl=this.container.querySelector("#res-wrong-val"),this.streakEl=this.container.querySelector("#res-streak-val"),this.btnRetry=this.container.querySelector("#btn-challenge-retry"),this.btnAuto=this.container.querySelector("#btn-challenge-auto"),this.btnRetry.addEventListener("click",()=>{var e;this.hide(),(e=this.onPlayAgain)==null||e.call(this)}),this.btnAuto.addEventListener("click",()=>{var e;this.hide(),(e=this.onBackToAuto)==null||e.call(this)})}show(e){this.scoreEl&&(this.scoreEl.textContent=e.score||0),this.accuracyEl&&(this.accuracyEl.textContent=`${e.accuracy||0}%`),this.correctEl&&(this.correctEl.textContent=e.correctCount||0),this.wrongEl&&(this.wrongEl.textContent=e.incorrectCount||0),this.streakEl&&(this.streakEl.textContent=e.bestStreak||0),this.backdrop.classList.remove("hidden")}hide(){this.backdrop.classList.add("hidden")}}const tc=[{code:"PT",name:"Portugal",nameBn:"পর্তুগাল",flag:"🇵🇹",capital:"Lisbon",continent:"Europe"},{code:"AR",name:"Argentina",nameBn:"আর্জেন্টিনা",flag:"🇦🇷",capital:"Buenos Aires",continent:"South America"},{code:"FR",name:"France",nameBn:"ফ্রান্স",flag:"🇫🇷",capital:"Paris",continent:"Europe"},{code:"NO",name:"Norway",nameBn:"নরওয়ে",flag:"🇳🇴",capital:"Oslo",continent:"Europe"},{code:"BR",name:"Brazil",nameBn:"ব্রাজিল",flag:"🇧🇷",capital:"Brasília",continent:"South America"},{code:"US",name:"United States",nameBn:"মার্কিন যুক্তরাষ্ট্র",flag:"🇺🇸",capital:"Washington, D.C.",continent:"North America"},{code:"JM",name:"Jamaica",nameBn:"জ্যামাইকা",flag:"🇯🇲",capital:"Kingston",continent:"North America"},{code:"IN",name:"India",nameBn:"ভারত",flag:"🇮🇳",capital:"New Delhi",continent:"Asia"},{code:"CH",name:"Switzerland",nameBn:"সুইজারল্যান্ড",flag:"🇨🇭",capital:"Bern",continent:"Europe"},{code:"ES",name:"Spain",nameBn:"স্পেন",flag:"🇪🇸",capital:"Madrid",continent:"Europe"},{code:"GB",name:"United Kingdom",nameBn:"যুক্তরাজ্য",flag:"🇬🇧",capital:"London",continent:"Europe"},{code:"HK",name:"Hong Kong",nameBn:"হংকং",flag:"🇭🇰",capital:"City of Victoria",continent:"Asia"},{code:"CA",name:"Canada",nameBn:"কানাডা",flag:"🇨🇦",capital:"Ottawa",continent:"North America"},{code:"CO",name:"Colombia",nameBn:"কলম্বিয়া",flag:"🇨🇴",capital:"Bogotá",continent:"South America"},{code:"KR",name:"South Korea",nameBn:"দক্ষিণ কোরিয়া",flag:"🇰🇷",capital:"Seoul",continent:"Asia"},{code:"SE",name:"Sweden",nameBn:"সুইডেন",flag:"🇸🇪",capital:"Stockholm",continent:"Europe"},{code:"IT",name:"Italy",nameBn:"ইতালি",flag:"🇮🇹",capital:"Rome",continent:"Europe"},{code:"SN",name:"Senegal",nameBn:"সেনেগাল",flag:"🇸🇳",capital:"Dakar",continent:"Africa"},{code:"ZA",name:"South Africa",nameBn:"দক্ষিণ আফ্রিকা",flag:"🇿🇦",capital:"Pretoria",continent:"Africa"},{code:"DE",name:"Germany",nameBn:"জার্মানি",flag:"🇩🇪",capital:"Berlin",continent:"Europe"},{code:"BD",name:"Bangladesh",nameBn:"বাংলাদেশ",flag:"🇧🇩",capital:"Dhaka",continent:"Asia"},{code:"PL",name:"Poland",nameBn:"পোল্যান্ড",flag:"🇵🇱",capital:"Warsaw",continent:"Europe"},{code:"GR",name:"Greece",nameBn:"গ্রীস",flag:"🇬🇷",capital:"Athens",continent:"Europe"},{code:"JP",name:"Japan",nameBn:"জাপান",flag:"🇯🇵",capital:"Tokyo",continent:"Asia"},{code:"EG",name:"Egypt",nameBn:"মিশর",flag:"🇪🇬",capital:"Cairo",continent:"Africa"},{code:"AU",name:"Australia",nameBn:"অস্ট্রেলিয়া",flag:"🇦🇺",capital:"Canberra",continent:"Oceania"},{code:"NG",name:"Nigeria",nameBn:"নাইজেরিয়া",flag:"🇳🇬",capital:"Abuja",continent:"Africa"},{code:"MX",name:"Mexico",nameBn:"মেক্সিকো",flag:"🇲🇽",capital:"Mexico City",continent:"North America"},{code:"BE",name:"Belgium",nameBn:"বেলজিয়াম",flag:"🇧🇪",capital:"Brussels",continent:"Europe"},{code:"HR",name:"Croatia",nameBn:"ক্রোয়েশিয়া",flag:"🇭🇷",capital:"Zagreb",continent:"Europe"},{code:"NL",name:"Netherlands",nameBn:"নেদারল্যান্ডস",flag:"🇳🇱",capital:"Amsterdam",continent:"Europe"},{code:"UY",name:"Uruguay",nameBn:"উরুগুয়ে",flag:"🇺🇾",capital:"Montevideo",continent:"South America"},{code:"RS",name:"Serbia",nameBn:"সার্বিয়া",flag:"🇷🇸",capital:"Belgrade",continent:"Europe"},{code:"BB",name:"Barbados",nameBn:"বার্বাডোজ",flag:"🇧🇧",capital:"Bridgetown",continent:"North America"},{code:"TR",name:"Turkey",nameBn:"তুরস্ক",flag:"🇹🇷",capital:"Ankara",continent:"Europe"},{code:"PK",name:"Pakistan",nameBn:"পাকিস্তান",flag:"🇵🇰",capital:"Islamabad",continent:"Asia"},{code:"IE",name:"Ireland",nameBn:"আয়ারল্যান্ড",flag:"🇮🇪",capital:"Dublin",continent:"Europe"},{code:"AT",name:"Austria",nameBn:"অস্ট্রিয়া",flag:"🇦🇹",capital:"Vienna",continent:"Europe"},{code:"IR",name:"Iran",nameBn:"ইরান",flag:"🇮🇷",capital:"Tehran",continent:"Asia"},{code:"CN",name:"China",nameBn:"চীন",flag:"🇨🇳",capital:"Beijing",continent:"Asia"},{code:"SA",name:"Saudi Arabia",nameBn:"সৌদি আরব",flag:"🇸🇦",capital:"Riyadh",continent:"Asia"},{code:"TN",name:"Tunisia",nameBn:"তিউনিসিয়া",flag:"🇹🇳",capital:"Tunis",continent:"Africa"}];class Qp{constructor(){this.modalEl=null,this.canvas=null,this.ctx=null,this.previewCanvas=null,this.previewCtx=null,this.img=null,this.rawFile=null,this.onComplete=null,this.zoom=1,this.minZoom=.5,this.maxZoom=3.5,this.rotation=0,this.panX=0,this.panY=0,this.cropShape="circle",this.aspectRatio=1,this.isDragging=!1,this.lastPointerX=0,this.lastPointerY=0,this.animationFrameId=null,this.createDom(),this.bindEvents()}createDom(){const e=document.createElement("div");e.className="cropper-modal-backdrop hidden",e.id="cropper-modal-backdrop",e.innerHTML=`
      <div class="cropper-modal" role="dialog" aria-modal="true">
        <div class="cropper-header">
          <div>
            <div class="cropper-title">⭕ CIRCLE PHOTO CROPPER (গোলাকার ছবি ক্রপ)</div>
            <div class="cropper-subtitle">Drag to center celebrity face in the circle & adjust zoom</div>
          </div>
          <button type="button" class="cropper-btn-close" id="btn-crop-cancel-top" aria-label="Cancel">✕</button>
        </div>

        <div class="cropper-body">
          <!-- Main Canvas Area -->
          <div class="cropper-stage-wrapper" id="cropper-stage-wrapper">
            <canvas id="cropper-canvas" class="cropper-canvas" width="460" height="460"></canvas>
            <div class="cropper-drag-hint">👆 Drag to position face in circle | 🔍 Scroll to zoom</div>
          </div>

          <!-- Controls Side / Bottom -->
          <div class="cropper-controls-panel">
            <!-- Crop Shape / Aspect Selector -->
            <div class="cropper-ctrl-group">
              <label class="cropper-ctrl-label">📐 Crop Shape & Style (ক্রপ আকার)</label>
              <div class="cropper-aspect-btns">
                <button type="button" class="crop-aspect-btn active" data-shape="circle" data-ratio="1">
                  <span class="aspect-icon">⭕</span> Circle (গোলাকার)
                </button>
                <button type="button" class="crop-aspect-btn" data-shape="rect" data-ratio="1">
                  <span class="aspect-icon">⏹</span> Square (বর্গাকার)
                </button>
                <button type="button" class="crop-aspect-btn" data-shape="rect" data-ratio="0.75">
                  <span class="aspect-icon">📱</span> Card (লম্বালম্বি)
                </button>
              </div>
            </div>

            <!-- Zoom Slider -->
            <div class="cropper-ctrl-group">
              <div class="cropper-label-val">
                <label class="cropper-ctrl-label">🔍 Zoom Level (জুম ইন / আউট)</label>
                <span id="cropper-zoom-val" class="cropper-val-tag">100%</span>
              </div>
              <div class="cropper-slider-row">
                <button type="button" class="crop-btn-icon" id="btn-zoom-out" title="Zoom Out">−</button>
                <input type="range" id="cropper-zoom-slider" min="0.5" max="3.5" step="0.05" value="1.0" class="cropper-slider" />
                <button type="button" class="crop-btn-icon" id="btn-zoom-in" title="Zoom In">+</button>
              </div>
            </div>

            <!-- Rotation & Reset Toolbar -->
            <div class="cropper-ctrl-group">
              <label class="cropper-ctrl-label">🔄 Orientation & Controls</label>
              <div class="cropper-tool-btns">
                <button type="button" class="crop-action-pill" id="btn-crop-rotate">
                  <span>⟳</span> Rotate 90°
                </button>
                <button type="button" class="crop-action-pill" id="btn-crop-fit">
                  <span>🎯</span> Fit Center
                </button>
                <button type="button" class="crop-action-pill" id="btn-crop-reset">
                  <span>↩️</span> Reset All
                </button>
              </div>
            </div>

            <!-- Mini Live Preview -->
            <div class="cropper-preview-section">
              <label class="cropper-ctrl-label">👁️ Game 3D Card Preview (গেমে যেমন দেখাবে)</label>
              <div class="cropper-live-previews">
                <div class="preview-avatar-box">
                  <canvas id="cropper-mini-preview" width="96" height="96" class="preview-mini-canvas"></canvas>
                  <span class="preview-badge">Circle Avatar</span>
                </div>
                <div class="preview-card-info">
                  <span class="preview-hint-title">Authentic Circular Avatar</span>
                  <span class="preview-hint-desc">Photo will be saved as a clean circular portrait with glowing 3D rings in the game card!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="cropper-footer">
          <button type="button" class="btn-crop-cancel" id="btn-crop-cancel">✕ Cancel</button>
          <button type="button" class="btn-crop-apply" id="btn-crop-apply">
            <span class="btn-icon">⭕</span> Apply Circle Crop (সার্কেল ক্রপ করুন)
          </button>
        </div>
      </div>
    `,document.body.appendChild(e),this.modalEl=e,this.canvas=e.querySelector("#cropper-canvas"),this.ctx=this.canvas.getContext("2d"),this.previewCanvas=e.querySelector("#cropper-mini-preview"),this.previewCtx=this.previewCanvas.getContext("2d"),this.zoomSlider=e.querySelector("#cropper-zoom-slider"),this.zoomValTag=e.querySelector("#cropper-zoom-val"),this.aspectBtns=e.querySelectorAll(".crop-aspect-btn")}bindEvents(){const e=this.modalEl;e.querySelector("#btn-crop-cancel").addEventListener("click",()=>this.close()),e.querySelector("#btn-crop-cancel-top").addEventListener("click",()=>this.close()),e.addEventListener("click",i=>{i.target===e&&this.close()}),this.zoomSlider.addEventListener("input",i=>{this.setZoom(parseFloat(i.target.value))}),e.querySelector("#btn-zoom-in").addEventListener("click",()=>{this.setZoom(Math.min(this.maxZoom,this.zoom+.2))}),e.querySelector("#btn-zoom-out").addEventListener("click",()=>{this.setZoom(Math.max(this.minZoom,this.zoom-.2))}),e.querySelector("#btn-crop-rotate").addEventListener("click",()=>{this.rotation=(this.rotation+90)%360,this.requestRender()}),e.querySelector("#btn-crop-fit").addEventListener("click",()=>{this.fitToScreen()}),e.querySelector("#btn-crop-reset").addEventListener("click",()=>{this.resetTransforms()}),this.aspectBtns.forEach(i=>{i.addEventListener("click",()=>{this.aspectBtns.forEach(r=>r.classList.remove("active")),i.classList.add("active"),this.cropShape=i.dataset.shape||"circle",this.aspectRatio=parseFloat(i.dataset.ratio)||1;const a=e.querySelector("#btn-crop-apply");this.cropShape==="circle"?a.innerHTML='<span class="btn-icon">⭕</span> Apply Circle Crop (সার্কেল ক্রপ করুন)':a.innerHTML='<span class="btn-icon">✂️</span> Apply Crop (ক্রপ সম্পন্ন করুন)',this.requestRender()})}),this.canvas.addEventListener("pointerdown",i=>{this.isDragging=!0,this.lastPointerX=i.clientX,this.lastPointerY=i.clientY,this.canvas.setPointerCapture(i.pointerId)}),this.canvas.addEventListener("pointermove",i=>{if(!this.isDragging)return;const a=i.clientX-this.lastPointerX,r=i.clientY-this.lastPointerY;this.lastPointerX=i.clientX,this.lastPointerY=i.clientY,this.panX+=a,this.panY+=r,this.requestRender()});const t=i=>{if(this.isDragging){this.isDragging=!1;try{this.canvas.releasePointerCapture(i.pointerId)}catch{}}};this.canvas.addEventListener("pointerup",t),this.canvas.addEventListener("pointercancel",t),this.canvas.addEventListener("wheel",i=>{i.preventDefault();const a=i.deltaY<0?1.1:.9;this.setZoom(Math.min(this.maxZoom,Math.max(this.minZoom,this.zoom*a)))},{passive:!1}),e.querySelector("#btn-crop-apply").addEventListener("click",()=>{this.applyCrop()}),window.addEventListener("resize",()=>{this.modalEl.classList.contains("hidden")||(this.adjustCanvasSize(),this.requestRender())})}setZoom(e){this.zoom=Math.min(this.maxZoom,Math.max(this.minZoom,e)),this.zoomSlider.value=this.zoom,this.zoomValTag.textContent=`${Math.round(this.zoom*100)}%`,this.requestRender()}resetTransforms(){this.rotation=0,this.panX=0,this.panY=0,this.fitToScreen()}fitToScreen(){if(!this.img)return;const e=this.getCropBox(),t=this.rotation===90||this.rotation===270,i=t?this.img.height:this.img.width,a=t?this.img.width:this.img.height,r=e.width/i,s=e.height/a,o=Math.max(r,s);this.panX=0,this.panY=0,this.setZoom(o*1.05)}open(e,t){this.onComplete=t,this.rawFile=e instanceof File?e:null;const i=a=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>{this.img=r,this.modalEl.classList.remove("hidden"),this.adjustCanvasSize(),this.resetTransforms(),this.requestRender()},r.onerror=()=>{alert("Failed to load image for cropping.")},r.src=a};if(e instanceof File){const a=new FileReader;a.onload=r=>i(r.target.result),a.readAsDataURL(e)}else typeof e=="string"&&i(e)}close(){this.modalEl.classList.add("hidden"),this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}adjustCanvasSize(){const t=this.modalEl.querySelector("#cropper-stage-wrapper").getBoundingClientRect(),i=Math.min(t.width||420,t.height||420),a=Math.min(window.devicePixelRatio||1,2);this.canvas.width=i*a,this.canvas.height=i*a,this.canvas.style.width=`${i}px`,this.canvas.style.height=`${i}px`,this.ctx.scale(a,a),this.displaySize=i}getCropBox(){const e=this.displaySize||400,t=28,i=e-t*2,a=e-t*2;let r=i,s=r/this.aspectRatio;s>a&&(s=a,r=s*this.aspectRatio);const o=(e-r)/2,c=(e-s)/2;return{x:o,y:c,width:r,height:s}}requestRender(){this.animationFrameId||(this.animationFrameId=requestAnimationFrame(()=>{this.animationFrameId=null,this.render(),this.renderMiniPreview()}))}render(){if(!this.img||!this.ctx)return;const e=Math.min(window.devicePixelRatio||1,2),t=this.displaySize||400;this.ctx.save(),this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.scale(e,e),this.ctx.fillStyle="#060d1f",this.ctx.fillRect(0,0,t,t),this.ctx.strokeStyle="rgba(56, 189, 248, 0.08)",this.ctx.lineWidth=1;for(let o=20;o<t;o+=24)this.ctx.beginPath(),this.ctx.moveTo(o,0),this.ctx.lineTo(o,t),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(0,o),this.ctx.lineTo(t,o),this.ctx.stroke();this.ctx.save(),this.ctx.translate(t/2+this.panX,t/2+this.panY),this.ctx.rotate(this.rotation*Math.PI/180),this.ctx.scale(this.zoom,this.zoom),this.ctx.drawImage(this.img,-this.img.width/2,-this.img.height/2,this.img.width,this.img.height),this.ctx.restore();const i=this.getCropBox(),a=i.x+i.width/2,r=i.y+i.height/2,s=i.width/2;if(this.cropShape==="circle"){this.ctx.save(),this.ctx.fillStyle="rgba(2, 6, 18, 0.82)",this.ctx.beginPath(),this.ctx.rect(0,0,t,t),this.ctx.arc(a,r,s,0,Math.PI*2,!0),this.ctx.fill(),this.ctx.restore(),this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(a,r,s,0,Math.PI*2),this.ctx.clip(),this.ctx.strokeStyle="rgba(0, 242, 254, 0.3)",this.ctx.lineWidth=1,this.ctx.setLineDash([4,4]);const o=i.width/3,c=i.height/3;for(let u=1;u<3;u++)this.ctx.beginPath(),this.ctx.moveTo(i.x+o*u,i.y),this.ctx.lineTo(i.x+o*u,i.y+i.height),this.ctx.stroke();for(let u=1;u<3;u++)this.ctx.beginPath(),this.ctx.moveTo(i.x,i.y+c*u),this.ctx.lineTo(i.x+i.width,i.y+c*u),this.ctx.stroke();this.ctx.restore(),this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(a,r,s,0,Math.PI*2),this.ctx.strokeStyle="#00f2fe",this.ctx.lineWidth=2.5,this.ctx.shadowColor="#00f2fe",this.ctx.shadowBlur=12,this.ctx.stroke();const l=[0,Math.PI/2,Math.PI,3*Math.PI/2];this.ctx.strokeStyle="#facc15",this.ctx.lineWidth=3.5,this.ctx.shadowColor="#facc15",this.ctx.shadowBlur=8,l.forEach(u=>{const h=a+(s-7)*Math.cos(u),f=r+(s-7)*Math.sin(u),p=a+(s+7)*Math.cos(u),y=r+(s+7)*Math.sin(u);this.ctx.beginPath(),this.ctx.moveTo(h,f),this.ctx.lineTo(p,y),this.ctx.stroke()}),this.ctx.restore()}else{this.ctx.fillStyle="rgba(2, 6, 18, 0.78)",this.ctx.fillRect(0,0,t,i.y),this.ctx.fillRect(0,i.y+i.height,t,t-(i.y+i.height)),this.ctx.fillRect(0,i.y,i.x,i.height),this.ctx.fillRect(i.x+i.width,i.y,t-(i.x+i.width),i.height),this.ctx.strokeStyle="rgba(0, 242, 254, 0.35)",this.ctx.lineWidth=1,this.ctx.setLineDash([4,4]);const o=i.width/3,c=i.height/3;for(let u=1;u<3;u++)this.ctx.beginPath(),this.ctx.moveTo(i.x+o*u,i.y),this.ctx.lineTo(i.x+o*u,i.y+i.height),this.ctx.stroke();for(let u=1;u<3;u++)this.ctx.beginPath(),this.ctx.moveTo(i.x,i.y+c*u),this.ctx.lineTo(i.x+i.width,i.y+c*u),this.ctx.stroke();this.ctx.setLineDash([]),this.ctx.strokeStyle="#00f2fe",this.ctx.lineWidth=2,this.ctx.strokeRect(i.x,i.y,i.width,i.height);const l=18;this.ctx.lineWidth=4,this.ctx.strokeStyle="#facc15",this.ctx.beginPath(),this.ctx.moveTo(i.x,i.y+l),this.ctx.lineTo(i.x,i.y),this.ctx.lineTo(i.x+l,i.y),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(i.x+i.width-l,i.y),this.ctx.lineTo(i.x+i.width,i.y),this.ctx.lineTo(i.x+i.width,i.y+l),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(i.x,i.y+i.height-l),this.ctx.lineTo(i.x+i.height,i.y+i.height),this.ctx.lineTo(i.x+l,i.y+i.height),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(i.x+i.width-l,i.y+i.height),this.ctx.lineTo(i.x+i.width,i.y+i.height),this.ctx.lineTo(i.x+i.width,i.y+i.height-l),this.ctx.stroke()}this.ctx.restore()}renderMiniPreview(){if(!this.img||!this.previewCtx)return;const e=this.getCropBox(),t=this.previewCanvas.width,i=this.previewCanvas.height;this.previewCtx.clearRect(0,0,t,i),this.previewCtx.save(),this.previewCtx.beginPath(),this.previewCtx.arc(t/2,i/2,t/2-2,0,Math.PI*2),this.previewCtx.clip(),this.previewCtx.fillStyle="#091224",this.previewCtx.fillRect(0,0,t,i);const a=t/e.width,r=(this.displaySize||400)/2;this.previewCtx.translate((r+this.panX-e.x)*a,(r+this.panY-e.y)*a),this.previewCtx.rotate(this.rotation*Math.PI/180),this.previewCtx.scale(this.zoom*a,this.zoom*a),this.previewCtx.drawImage(this.img,-this.img.width/2,-this.img.height/2,this.img.width,this.img.height),this.previewCtx.restore(),this.previewCtx.beginPath(),this.previewCtx.arc(t/2,i/2,t/2-2,0,Math.PI*2),this.previewCtx.strokeStyle="#00f2fe",this.previewCtx.lineWidth=3,this.previewCtx.stroke()}applyCrop(){if(!this.img)return;const e=this.getCropBox(),t=600,i=this.cropShape==="circle"?600:Math.round(t/this.aspectRatio),a=document.createElement("canvas");a.width=t,a.height=i;const r=a.getContext("2d"),s=t/e.width,o=(this.displaySize||400)/2;this.cropShape==="circle"?(r.clearRect(0,0,t,i),r.save(),r.beginPath(),r.arc(t/2,i/2,t/2,0,Math.PI*2),r.closePath(),r.clip(),r.fillStyle="#091224",r.fill(),r.translate((o+this.panX-e.x)*s,(o+this.panY-e.y)*s),r.rotate(this.rotation*Math.PI/180),r.scale(this.zoom*s,this.zoom*s),r.drawImage(this.img,-this.img.width/2,-this.img.height/2,this.img.width,this.img.height),r.restore(),a.toBlob(c=>{var f;if(!c){alert("Failed to generate cropped image.");return}const l=(((f=this.rawFile)==null?void 0:f.name)||"celebrity-circle").replace(/\.[^/.]+$/,""),u=new File([c],`${l}-circle.png`,{type:"image/png",lastModified:Date.now()}),h=a.toDataURL("image/png");typeof this.onComplete=="function"&&this.onComplete({file:u,blob:c,dataUrl:h,isCircle:!0}),this.close()},"image/png")):(r.fillStyle="#091224",r.fillRect(0,0,t,i),r.save(),r.translate((o+this.panX-e.x)*s,(o+this.panY-e.y)*s),r.rotate(this.rotation*Math.PI/180),r.scale(this.zoom*s,this.zoom*s),r.drawImage(this.img,-this.img.width/2,-this.img.height/2,this.img.width,this.img.height),r.restore(),a.toBlob(c=>{var f;if(!c){alert("Failed to generate cropped image.");return}const l=(((f=this.rawFile)==null?void 0:f.name)||"celebrity-cropped").replace(/\.[^/.]+$/,""),u=new File([c],`${l}.jpg`,{type:"image/jpeg",lastModified:Date.now()}),h=a.toDataURL("image/jpeg",.92);typeof this.onComplete=="function"&&this.onComplete({file:u,blob:c,dataUrl:h,isCircle:!1}),this.close()},"image/jpeg",.92))}}class em{constructor(e,{getPeople:t,onUpdatePeople:i}){this.container=e,this.getPeople=t,this.onUpdatePeople=i,this.countries=tc,this.editingId=null,this.searchQuery="",this.filterCategory="all",this.selectedPhotoFile=null,this.rawPhotoFile=null,this.cropper=new Qp,this.render()}render(){this.container.innerHTML=`
      <div class="admin-modal-backdrop hidden" id="admin-backdrop">
        <div class="admin-modal" role="dialog" aria-modal="true">
          <div class="admin-header">
            <div>
              <h2>🌟 CELEBRITY DATABASE & PHOTO UPLOADER</h2>
              <span class="admin-subtitle">Add new celebrities with photos and automatic country linking</span>
            </div>
            <button id="btn-admin-close" class="close-btn" aria-label="Close Admin Panel">✕</button>
          </div>

          <div class="admin-content-grid">
            <!-- Left: Add/Edit Form -->
            <div class="admin-form-col">
              <h3 id="admin-form-title">➕ Add New Celebrity (নতুন তারকা যুক্ত করুন)</h3>
              
              <form id="admin-person-form" class="admin-form">
                <input type="hidden" id="adm-id" />

                <!-- 1. Photo Upload Box -->
                <div class="form-field">
                  <label>📸 Celebrity Photo / তারকার ছবি (Upload & Crop)</label>
                  <div class="photo-upload-zone" id="adm-photo-zone">
                    <input type="file" id="adm-photo-input" accept="image/*" class="file-hidden-input" />
                    <div class="photo-preview-box" id="adm-preview-box">
                      <img id="adm-photo-preview" class="photo-preview-thumb hidden" alt="Preview" />
                      <div class="photo-preview-actions hidden" id="adm-photo-actions">
                        <button type="button" class="photo-action-btn btn-recrop" id="btn-recrop-photo">
                          <span>✂️</span> Adjust Crop (ক্রপ ঠিক করুন)
                        </button>
                        <button type="button" class="photo-action-btn btn-remove-photo" id="btn-remove-photo">
                          <span>🗑️</span> Remove
                        </button>
                      </div>
                      <div class="upload-prompt" id="adm-upload-prompt">
                        <span class="upload-icon">📁</span>
                        <span class="upload-text">Click to Choose Photo from Device</span>
                        <span class="upload-sub">Supports JPG, PNG, WebP (Crop Available)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 2. Manual Name (Only typed field!) -->
                <div class="form-field">
                  <label>👤 Celebrity Full Name / তারকার পুরো নাম *</label>
                  <input type="text" id="adm-name" required placeholder="e.g. Cristiano Ronaldo / Arijit Singh" />
                </div>

                <!-- 3. Category Dropdown -->
                <div class="form-field">
                  <label>🎭 Profession / Category (পেশা সিলেক্ট করুন) *</label>
                  <select id="adm-category" required>
                    <option value="footballer">⚽ Footballer (ফুটবল তারকা)</option>
                    <option value="singer">🎤 Musician / Singer (সঙ্গীতশিল্পী / গায়ক)</option>
                    <option value="actor">🎬 Actor / Actress (অভিনেতা / অভিনেত্রী)</option>
                    <option value="sports">🏆 Other Sports Star (অন্যান্য ক্রীড়াবিদ)</option>
                    <option value="youtuber">🔴 YouTuber (ইউটিউবার)</option>
                    <option value="influencer">✨ Social Media Star (সোশ্যাল মিডিয়া স্টার)</option>
                    <option value="leader">🏛️ President / Prime Minister (রাষ্ট্রনেতা)</option>
                    <option value="historical">📜 Historical Figure (ঐতিহাসিক ব্যক্তিত্ব)</option>
                    <option value="scientist">🔬 Scientist & Inventor (বিজ্ঞানী ও গবেষক)</option>
                    <option value="poet">✒️ Poet & Author (কবি ও সাহিত্যিক)</option>
                    <option value="hero">⚔️ Hero & Warrior (বীর ও মুক্তিযোদ্ধা)</option>
                  </select>
                </div>

                <!-- 4. Country Dropdown -->
                <div class="form-field">
                  <label>🌐 Country / দেশ (ড্রপডাউন থেকে বেছে নিন) *</label>
                  <select id="adm-country-code" required>
                    <option value="" disabled selected>Select home country...</option>
                    ${this.countries.map(e=>`
                      <option value="${e.code}">
                        ${e.flag||"🏳️"} ${e.name} (${e.nameBn||e.name}) [${e.code}]
                      </option>
                    `).join("")}
                  </select>
                </div>

                <!-- 5. Difficulty Level (Optional) -->
                <div class="form-row">
                  <div class="form-field">
                    <label>Difficulty / স্তর</label>
                    <select id="adm-difficulty">
                      <option value="easy">Easy (সহজ - বিশ্বখ্যাত)</option>
                      <option value="medium" selected>Medium (মাঝারি)</option>
                      <option value="hard">Hard (কঠিন)</option>
                    </select>
                  </div>
                  <div class="form-field-checkbox" style="align-self: flex-end; margin-bottom: 8px;">
                    <input type="checkbox" id="adm-active" checked />
                    <label for="adm-active">Active in Quiz</label>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" id="btn-adm-save-person" class="btn-primary-action">
                    💾 Save Celebrity to Game (সংরক্ষণ করুন)
                  </button>
                  <button type="button" id="btn-adm-cancel-edit" class="btn-secondary-action hidden">
                    Cancel Edit
                  </button>
                </div>

                <div id="adm-form-alert" class="admin-alert hidden"></div>
              </form>

              <!-- Import / Export Toolbar -->
              <div class="admin-io-toolbar">
                <button type="button" id="btn-adm-export" class="tool-btn">📥 Export JSON</button>
                <label class="tool-btn file-input-label">
                  📤 Import JSON
                  <input type="file" id="adm-file-import" accept=".json" style="display: none;" />
                </label>
                <button type="button" id="btn-adm-reset-defaults" class="tool-btn text-danger">⚠️ Reset Seed</button>
              </div>
            </div>

            <!-- Right: Search & Table List -->
            <div class="admin-list-col">
              <div class="admin-filter-bar">
                <input type="search" id="adm-search-input" placeholder="Search celebrity or country..." />
                <select id="adm-filter-category">
                  <option value="all">All Categories</option>
                  ${_a.map(e=>`<option value="${e}">${e.toUpperCase()}</option>`).join("")}
                </select>
              </div>

              <div class="admin-table-scroll">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="adm-table-body"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,this.backdrop=this.container.querySelector("#admin-backdrop"),this.btnClose=this.container.querySelector("#btn-admin-close"),this.form=this.container.querySelector("#admin-person-form"),this.tableBody=this.container.querySelector("#adm-table-body"),this.formTitle=this.container.querySelector("#admin-form-title"),this.btnCancel=this.container.querySelector("#btn-adm-cancel-edit"),this.formAlert=this.container.querySelector("#adm-form-alert"),this.photoInput=this.container.querySelector("#adm-photo-input"),this.photoZone=this.container.querySelector("#adm-photo-zone"),this.photoPreview=this.container.querySelector("#adm-photo-preview"),this.photoActions=this.container.querySelector("#adm-photo-actions"),this.uploadPrompt=this.container.querySelector("#adm-upload-prompt"),this.btnRecrop=this.container.querySelector("#btn-recrop-photo"),this.btnRemovePhoto=this.container.querySelector("#btn-remove-photo"),this.countrySelect=this.container.querySelector("#adm-country-code"),this.categorySelect=this.container.querySelector("#adm-category"),this.nameInput=this.container.querySelector("#adm-name"),this.difficultySelect=this.container.querySelector("#adm-difficulty"),this.activeCheckbox=this.container.querySelector("#adm-active"),this.searchInput=this.container.querySelector("#adm-search-input"),this.filterCatSelect=this.container.querySelector("#adm-filter-category"),this.btnExport=this.container.querySelector("#btn-adm-export"),this.fileImport=this.container.querySelector("#adm-file-import"),this.btnResetDefaults=this.container.querySelector("#btn-adm-reset-defaults"),this.bindEvents()}bindEvents(){this.btnClose.addEventListener("click",()=>this.hide()),this.backdrop.addEventListener("click",e=>{e.target===this.backdrop&&this.hide()}),this.btnCancel.addEventListener("click",()=>this.resetForm()),this.photoZone.addEventListener("click",e=>{e.target.closest("#adm-photo-actions")||this.photoInput.click()}),this.photoZone.addEventListener("dragover",e=>{e.preventDefault(),this.photoZone.style.borderColor="var(--color-cyan)",this.photoZone.style.background="rgba(0, 242, 254, 0.12)"}),this.photoZone.addEventListener("dragleave",()=>{this.photoZone.style.borderColor="",this.photoZone.style.background=""}),this.photoZone.addEventListener("drop",e=>{var i,a;e.preventDefault(),this.photoZone.style.borderColor="",this.photoZone.style.background="";const t=(a=(i=e.dataTransfer)==null?void 0:i.files)==null?void 0:a[0];t&&t.type.startsWith("image/")&&this.openCropperWithFile(t)}),this.photoInput.addEventListener("change",e=>{var i;const t=(i=e.target.files)==null?void 0:i[0];t&&this.openCropperWithFile(t)}),this.btnRecrop.addEventListener("click",e=>{e.stopPropagation();const t=this.rawPhotoFile||this.selectedPhotoFile||this.photoPreview.src;t&&this.cropper.open(t,({file:i,dataUrl:a})=>{this.selectedPhotoFile=i,this.photoPreview.src=a,this.photoPreview.classList.remove("hidden"),this.photoActions.classList.remove("hidden"),this.uploadPrompt.classList.add("hidden")})}),this.btnRemovePhoto.addEventListener("click",e=>{e.stopPropagation(),this.selectedPhotoFile=null,this.rawPhotoFile=null,this.photoInput.value="",this.photoPreview.src="",this.photoPreview.classList.add("hidden"),this.photoActions.classList.add("hidden"),this.uploadPrompt.classList.remove("hidden")}),this.form.addEventListener("submit",async e=>{e.preventDefault(),await this.handleFormSubmit()}),this.searchInput.addEventListener("input",e=>{this.searchQuery=e.target.value.toLowerCase(),this.renderTable()}),this.filterCatSelect.addEventListener("change",e=>{this.filterCategory=e.target.value,this.renderTable()}),this.btnExport.addEventListener("click",()=>this.handleExport()),this.fileImport.addEventListener("change",e=>this.handleImport(e)),this.btnResetDefaults.addEventListener("click",()=>this.handleResetDefaults())}openCropperWithFile(e){this.rawPhotoFile=e,this.cropper.open(e,({file:t,dataUrl:i})=>{this.selectedPhotoFile=t,this.photoPreview.src=i,this.photoPreview.classList.remove("hidden"),this.photoActions.classList.remove("hidden"),this.uploadPrompt.classList.add("hidden")})}showAlert(e,t=!1){this.formAlert.textContent=e,this.formAlert.className=`admin-alert ${t?"alert-error":"alert-success"}`,this.formAlert.classList.remove("hidden"),setTimeout(()=>{this.formAlert.classList.add("hidden")},4500)}async handleFormSubmit(){const e=this.container.querySelector("#adm-id").value,t=this.nameInput.value.trim(),i=this.categorySelect.value,a=this.countrySelect.value,r=this.difficultySelect.value||"easy",s=this.activeCheckbox.checked;if(!t){this.showAlert("Please enter the celebrity full name",!0);return}if(!a){this.showAlert("Please select a country from the dropdown",!0);return}const o=this.countries.find(y=>y.code===a)||{name:a,code:a,flag:"🌐",capital:"—"},c=t.toLowerCase().replace(/[^a-z0-9]/g,"-"),l=e?this.getPeople().find(y=>y.id===e):null,u=this.photoPreview.src&&this.photoPreview.src.startsWith("data:")?this.photoPreview.src:(l==null?void 0:l.image)||`/images/people/${c}.jpg`,h={id:e||`person-${Date.now()}`,name:t,country:o.name,countryCode:o.code,nationality:`${o.name} Citizen`,category:i,image:u,flag:o.flag||"🌐",capital:o.capital||"—",difficulty:r,description:`Famous ${i} from ${o.name}`,imageCredit:"User Entry",imageLicense:"Curated",isActive:s},f=ec(h);if(!f.valid){this.showAlert(f.errors.join("; "),!0);return}const p=[...this.getPeople()];if(e){const y=p.findIndex(x=>x.id===e);y!==-1&&(p[y]=h)}else p.unshift(h);this.onUpdatePeople(p),this.showAlert(e?`Updated "${t}"!`:`🎉 Added "${t}" (${o.name})!`),this.resetForm(),this.renderTable()}editPerson(e){this.editingId=e.id,this.formTitle.textContent=`Edit "${e.name}"`,this.btnCancel.classList.remove("hidden"),this.container.querySelector("#adm-id").value=e.id,this.nameInput.value=e.name,this.categorySelect.value=e.category,this.countrySelect.value=e.countryCode,this.difficultySelect.value=e.difficulty||"easy",this.activeCheckbox.checked=e.isActive!==!1,e.image&&(this.photoPreview.src=on(e.image),this.photoPreview.classList.remove("hidden"),this.photoActions.classList.remove("hidden"),this.uploadPrompt.classList.add("hidden"))}deletePerson(e,t){if(confirm(`Are you sure you want to delete "${t}"?`)){const i=this.getPeople().filter(a=>a.id!==e);this.onUpdatePeople(i),this.showAlert(`Deleted "${t}".`),this.editingId===e&&this.resetForm(),this.renderTable()}}toggleActive(e){const t=[...this.getPeople()],i=t.find(a=>a.id===e);i&&(i.isActive=!i.isActive,this.onUpdatePeople(t),this.renderTable())}resetForm(){this.editingId=null,this.selectedPhotoFile=null,this.rawPhotoFile=null,this.photoInput.value="",this.formTitle.textContent="➕ Add New Celebrity (নতুন তারকা যুক্ত করুন)",this.btnCancel.classList.add("hidden"),this.form.reset(),this.container.querySelector("#adm-id").value="",this.activeCheckbox.checked=!0,this.photoPreview.src="",this.photoPreview.classList.add("hidden"),this.photoActions.classList.add("hidden"),this.uploadPrompt.classList.remove("hidden")}handleExport(){const e=JSON.stringify(this.getPeople(),null,2),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),a=document.createElement("a");a.href=i,a.download=`world_star_quiz_people_${Date.now()}.json`,a.click(),URL.revokeObjectURL(i)}handleImport(e){var a;const t=(a=e.target.files)==null?void 0:a[0];if(!t)return;const i=new FileReader;i.onload=r=>{try{const s=JSON.parse(r.target.result),o=qp(s);if(!o.valid){alert(`Validation error during import:
${o.errors.join(`
`)}`);return}confirm(`Valid dataset found with ${s.length} people. Replace current database?`)&&(this.onUpdatePeople(s),this.renderTable(),this.showAlert(`Successfully imported ${s.length} celebrities!`))}catch(s){alert(`Failed to parse JSON file: ${s.message}`)}},i.readAsText(t),e.target.value=""}handleResetDefaults(){confirm("Reset custom changes and restore default curated database?")&&(localStorage.removeItem("wsq3d_custom_people"),location.reload())}renderTable(){const t=this.getPeople().filter(i=>{if(this.filterCategory!=="all"&&i.category!==this.filterCategory)return!1;if(this.searchQuery){const a=i.name.toLowerCase().includes(this.searchQuery),r=i.country.toLowerCase().includes(this.searchQuery);if(!a&&!r)return!1}return!0});if(this.tableBody.innerHTML="",t.length===0){this.tableBody.innerHTML='<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 24px;">No records match your filter</td></tr>';return}t.forEach(i=>{const a=document.createElement("tr"),r=i.image||"/favicon.svg";a.innerHTML=`
        <td>
          <button class="status-btn ${i.isActive!==!1?"active":"inactive"}" title="Toggle Active">
            ${i.isActive!==!1?"●":"○"}
          </button>
        </td>
        <td>
          <img src="${r}" class="table-thumb" alt="${i.name}" onerror="this.src='/favicon.svg'" />
        </td>
        <td class="font-bold">${i.name}</td>
        <td><span class="table-tag">${i.category}</span></td>
        <td>${i.flag||"🌐"} ${i.country}</td>
        <td>
          <div class="row-actions">
            <button class="action-btn-edit" title="Edit">✏️</button>
            <button class="action-btn-del" title="Delete">🗑️</button>
          </div>
        </td>
      `,a.querySelector(".status-btn").addEventListener("click",()=>this.toggleActive(i.id)),a.querySelector(".action-btn-edit").addEventListener("click",()=>this.editPerson(i)),a.querySelector(".action-btn-del").addEventListener("click",()=>this.deletePerson(i.id,i.name)),this.tableBody.appendChild(a)})}show(){this.renderTable(),this.backdrop.classList.remove("hidden")}hide(){this.backdrop.classList.add("hidden")}}class tm{constructor(){this.ctx=null,this.enabled=!0,this.musicEnabled=!1,this.volume=.7,this.masterGain=null,this.musicOscillators=[],this.musicGain=null,this.isInitialized=!1}init(){if(!this.isInitialized)try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.volume,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination),this.isInitialized=!0}catch(e){console.warn("AudioContext failed to initialize:",e)}}ensureContext(){this.isInitialized||this.init(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.masterGain&&this.ctx&&this.masterGain.gain.setTargetAtTime(this.volume,this.ctx.currentTime,.05)}setEnabled(e){this.enabled=e}setMusicEnabled(e){this.musicEnabled=e,e?this.startAmbientMusic():this.stopAmbientMusic()}playTick(e=!1){if(this.enabled&&(this.ensureContext(),!!this.ctx))try{const t=this.ctx.currentTime,i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=e?"sawtooth":"sine",i.frequency.setValueAtTime(e?880:520,t),i.frequency.exponentialRampToValueAtTime(e?1200:220,t+.06),a.gain.setValueAtTime(e?.35:.2,t),a.gain.exponentialRampToValueAtTime(.001,t+.06),i.connect(a),a.connect(this.masterGain),i.start(t),i.stop(t+.07)}catch{}}playTimeUp(){if(this.enabled&&(this.ensureContext(),!!this.ctx))try{const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(320,e),t.frequency.linearRampToValueAtTime(160,e+.4),i.gain.setValueAtTime(.4,e),i.gain.exponentialRampToValueAtTime(.001,e+.45),t.connect(i),i.connect(this.masterGain),t.start(e),t.stop(e+.45)}catch{}}playCorrect(){if(this.enabled&&(this.ensureContext(),!!this.ctx))try{const e=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((i,a)=>{const r=this.ctx.createOscillator(),s=this.ctx.createGain(),o=e+a*.07;r.type="triangle",r.frequency.setValueAtTime(i,o),s.gain.setValueAtTime(.25,o),s.gain.exponentialRampToValueAtTime(.001,o+.25),r.connect(s),s.connect(this.masterGain),r.start(o),r.stop(o+.26)})}catch{}}playIncorrect(){if(this.enabled&&(this.ensureContext(),!!this.ctx))try{const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="square",t.frequency.setValueAtTime(140,e),t.frequency.setValueAtTime(110,e+.15),i.gain.setValueAtTime(.3,e),i.gain.exponentialRampToValueAtTime(.001,e+.35),t.connect(i),i.connect(this.masterGain),t.start(e),t.stop(e+.36)}catch{}}playReveal(){if(this.enabled&&(this.ensureContext(),!!this.ctx))try{const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(440,e),t.frequency.exponentialRampToValueAtTime(880,e+.2),i.gain.setValueAtTime(.1,e),i.gain.linearRampToValueAtTime(.3,e+.15),i.gain.exponentialRampToValueAtTime(.001,e+.35),t.connect(i),i.connect(this.masterGain),t.start(e),t.stop(e+.36)}catch{}}playTransition(){if(this.enabled&&(this.ensureContext(),!!this.ctx))try{const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(600,e),t.frequency.exponentialRampToValueAtTime(300,e+.15),i.gain.setValueAtTime(.15,e),i.gain.exponentialRampToValueAtTime(.001,e+.16),t.connect(i),i.connect(this.masterGain),t.start(e),t.stop(e+.17)}catch{}}startAmbientMusic(){if(this.musicEnabled&&(this.ensureContext(),!!this.ctx)){this.stopAmbientMusic();try{this.musicGain=this.ctx.createGain(),this.musicGain.gain.setValueAtTime(.06,this.ctx.currentTime),this.musicGain.connect(this.masterGain),[146.83,220,349.23,329.63].forEach(t=>{const i=this.ctx.createOscillator();i.type="sine",i.frequency.setValueAtTime(t,this.ctx.currentTime),i.connect(this.musicGain),i.start(),this.musicOscillators.push(i)})}catch{}}}stopAmbientMusic(){if(this.musicOscillators.length>0&&(this.musicOscillators.forEach(e=>{try{e.stop(),e.disconnect()}catch{}}),this.musicOscillators=[]),this.musicGain){try{this.musicGain.disconnect()}catch{}this.musicGain=null}}}const Mt=new tm;let ui=null,wn=!0,tn=null;async function An(){if(!wn)return!1;if("wakeLock"in navigator&&typeof navigator.wakeLock.request=="function")try{return(!ui||ui.released)&&(ui=await navigator.wakeLock.request("screen"),ui.addEventListener("release",()=>{ui=null}),console.log("[WakeLock] Screen wake lock active (Native API)")),!0}catch(n){console.warn("[WakeLock] Native request failed, using fallback:",n.message)}return am()}async function im(){if(ui)try{await ui.release(),ui=null,console.log("[WakeLock] Screen wake lock released")}catch(n){console.warn("[WakeLock] Error releasing:",n.message)}rm()}function nm(n){wn=!!n,wn?An():im()}function am(){if(tn)return!0;try{const n=document.createElement("video");n.setAttribute("playsinline",""),n.setAttribute("webkit-playsinline",""),n.setAttribute("loop",""),n.muted=!0,n.style.position="fixed",n.style.left="-9999px",n.style.top="-9999px",n.style.width="1px",n.style.height="1px",n.style.opacity="0.01",n.style.pointerEvents="none",n.src="data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQAAAAhmcmVlAAAABG1kYXQ=";const e=n.play();return e!==void 0&&e.then(()=>{tn=n,document.body.appendChild(n),console.log("[WakeLock] Fallback keep-alive active")}).catch(()=>{}),!0}catch{return!1}}function rm(){if(tn){try{tn.pause(),tn.remove()}catch{}tn=null}}function sm(){An();const n=()=>{An()};window.addEventListener("pointerdown",n,{passive:!0}),window.addEventListener("touchstart",n,{passive:!0}),window.addEventListener("click",n,{passive:!0}),window.addEventListener("keydown",n,{passive:!0}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&wn&&An()}),window.addEventListener("focus",()=>{wn&&An()})}const sa=JSON.parse(`[{"id":"star-001","name":"Cristiano Ronaldo","country":"Portugal","countryCode":"PT","nationality":"Portuguese","category":"footballer","image":"/images/people/cristiano-ronaldo.jpg","flag":"🇵🇹","capital":"Lisbon","difficulty":"easy","description":"5-time Ballon d'Or winner and all-time top international goalscorer","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-002","name":"Lionel Messi","country":"Argentina","countryCode":"AR","nationality":"Argentine","category":"footballer","image":"/images/people/lionel-messi.jpg","flag":"🇦🇷","capital":"Buenos Aires","difficulty":"easy","description":"World Cup champion and record 8-time Ballon d'Or winner","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-003","name":"Kylian Mbappé","country":"France","countryCode":"FR","nationality":"French","category":"footballer","image":"/images/people/kylian-mbappe.jpg","flag":"🇫🇷","capital":"Paris","difficulty":"easy","description":"World Cup champion and superstar forward for Real Madrid and France","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-004","name":"Erling Haaland","country":"Norway","countryCode":"NO","nationality":"Norwegian","category":"footballer","image":"/images/people/erling-haaland.jpg","flag":"🇳🇴","capital":"Oslo","difficulty":"medium","description":"Prolific Premier League and Champions League top goalscorer for Man City","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-005","name":"Neymar Jr","country":"Brazil","countryCode":"BR","nationality":"Brazilian","category":"footballer","image":"/images/people/neymar-jr.jpg","flag":"🇧🇷","capital":"Brasília","difficulty":"easy","description":"All-time leading goalscorer for the Brazil national team","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-006","name":"Luka Modrić","country":"Croatia","countryCode":"HR","nationality":"Croatian","category":"footballer","image":"/images/people/luka-modric.jpg","flag":"🇭🇷","capital":"Zagreb","difficulty":"easy","description":"Ballon d'Or winning maestro midfielder for Real Madrid and Croatia","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-007","name":"Robert Lewandowski","country":"Poland","countryCode":"PL","nationality":"Polish","category":"footballer","image":"/images/people/robert-lewandowski.jpg","flag":"🇵🇱","capital":"Warsaw","difficulty":"medium","description":"Legendary striker and all-time top scorer for Poland national team","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-008","name":"Mohamed Salah","country":"Egypt","countryCode":"EG","nationality":"Egyptian","category":"footballer","image":"/images/people/mohamed-salah.jpg","flag":"🇪🇬","capital":"Cairo","difficulty":"easy","description":"Premier League icon and Egyptian talisman forward for Liverpool","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-009","name":"Kevin De Bruyne","country":"Belgium","countryCode":"BE","nationality":"Belgian","category":"footballer","image":"/images/people/kevin-de-bruyne.jpg","flag":"🇧🇪","capital":"Brussels","difficulty":"easy","description":"Master playmaker and midfield orchestrator for Man City and Belgium","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-010","name":"Karim Benzema","country":"France","countryCode":"FR","nationality":"French","category":"footballer","image":"/images/people/karim-benzema.jpg","flag":"🇫🇷","capital":"Paris","difficulty":"easy","description":"Ballon d'Or winner and legendary UEFA Champions League winning striker","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-011","name":"Sadio Mané","country":"Senegal","countryCode":"SN","nationality":"Senegalese","category":"footballer","image":"/images/people/sadio-mane.jpg","flag":"🇸🇳","capital":"Dakar","difficulty":"medium","description":"AFCON champion and African Footballer of the Year","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-012","name":"Harry Kane","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"footballer","image":"/images/people/harry-kane.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"England's all-time record goalscorer and Bayern Munich superstar","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-013","name":"Vinicius Jr","country":"Brazil","countryCode":"BR","nationality":"Brazilian","category":"footballer","image":"/images/people/vinicius-jr.jpg","flag":"🇧🇷","capital":"Brasília","difficulty":"easy","description":"Champions League winner and electric Brazilian winger for Real Madrid","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-014","name":"Jude Bellingham","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"footballer","image":"/images/people/jude-bellingham.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Golden Boy winner and dynamic English midfield star for Real Madrid","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-015","name":"Zinedine Zidane","country":"France","countryCode":"FR","nationality":"French","category":"footballer","image":"/images/people/zinedine-zidane.jpg","flag":"🇫🇷","capital":"Paris","difficulty":"easy","description":"World Cup champion and 3-time FIFA World Player of the Year","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-016","name":"Pelé","country":"Brazil","countryCode":"BR","nationality":"Brazilian","category":"footballer","image":"/images/people/pele.jpg","flag":"🇧🇷","capital":"Brasília","difficulty":"easy","description":"Only player in history to win three FIFA World Cups (1958, 1962, 1970)","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-017","name":"Diego Maradona","country":"Argentina","countryCode":"AR","nationality":"Argentine","category":"footballer","image":"/images/people/diego-maradona.jpg","flag":"🇦🇷","capital":"Buenos Aires","difficulty":"easy","description":"Legendary 1986 World Cup champion and FIFA Player of the Century","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-018","name":"Ronaldinho","country":"Brazil","countryCode":"BR","nationality":"Brazilian","category":"footballer","image":"/images/people/ronaldinho.jpg","flag":"🇧🇷","capital":"Brasília","difficulty":"easy","description":"2002 World Cup champion and Ballon d'Or winning samba wizard","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-019","name":"David Beckham","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"footballer","image":"/images/people/david-beckham.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Global football icon famous for his curling free-kicks and precision crosses","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-020","name":"Gianluigi Buffon","country":"Italy","countryCode":"IT","nationality":"Italian","category":"footballer","image":"/images/people/gianluigi-buffon.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"medium","description":"World Cup winning goalkeeper and one of the greatest shot-stoppers ever","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-021","name":"Manuel Neuer","country":"Germany","countryCode":"DE","nationality":"German","category":"footballer","image":"/images/people/manuel-neuer.jpg","flag":"🇩🇪","capital":"Berlin","difficulty":"easy","description":"World Cup winning sweeper-keeper legend for Germany and Bayern Munich","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-022","name":"Son Heung-min","country":"South Korea","countryCode":"KR","nationality":"South Korean","category":"footballer","image":"/images/people/son-heung-min.jpg","flag":"🇰🇷","capital":"Seoul","difficulty":"easy","description":"Premier League Golden Boot winner and captain of South Korea","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-023","name":"Luis Suárez","country":"Uruguay","countryCode":"UY","nationality":"Uruguayan","category":"footballer","image":"/images/people/luis-suarez.jpg","flag":"🇺🇾","capital":"Montevideo","difficulty":"easy","description":"All-time top scorer for Uruguay and two-time European Golden Shoe winner","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-024","name":"Virgil van Dijk","country":"Netherlands","countryCode":"NL","nationality":"Dutch","category":"footballer","image":"/images/people/virgil-van-dijk.jpg","flag":"🇳🇱","capital":"Amsterdam","difficulty":"medium","description":"UEFA Men's Player of the Year and commanding captain of the Netherlands","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-025","name":"Toni Kroos","country":"Germany","countryCode":"DE","nationality":"German","category":"footballer","image":"/images/people/toni-kroos.jpg","flag":"🇩🇪","capital":"Berlin","difficulty":"medium","description":"6-time Champions League winner and 2014 World Cup winning midfield maestro","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-026","name":"Andres Iniesta","country":"Spain","countryCode":"ES","nationality":"Spanish","category":"footballer","image":"/images/people/andres-iniesta.jpg","flag":"🇪🇸","capital":"Madrid","difficulty":"easy","description":"Scored the winning goal in the 2010 World Cup final for Spain","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-027","name":"Michael Jackson","country":"United States","countryCode":"US","nationality":"American","category":"singer","image":"/images/people/michael-jackson.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"The undisputed 'King of Pop' and creator of Thriller, the bestselling album","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-028","name":"Freddie Mercury","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"singer","image":"/images/people/freddie-mercury.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Legendary Queen frontman renowned for his four-octave vocal range","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-029","name":"Taylor Swift","country":"United States","countryCode":"US","nationality":"American","category":"singer","image":"/images/people/taylor-swift.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Global pop phenomenon and four-time Grammy Album of the Year winner","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-030","name":"Shakira","country":"Colombia","countryCode":"CO","nationality":"Colombian","category":"singer","image":"/images/people/shakira.jpg","flag":"🇨🇴","capital":"Bogotá","difficulty":"easy","description":"Queen of Latin Music famous for 'Hips Don't Lie' and 'Waka Waka'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-031","name":"Justin Bieber","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"singer","image":"/images/people/justin-bieber.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"Chart-topping Canadian pop superstar known for 'Baby' and 'Sorry'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-032","name":"Ed Sheeran","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"singer","image":"/images/people/ed-sheeran.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Singer-songwriter sensation who created 'Shape of You' and 'Perfect'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-033","name":"Beyoncé","country":"United States","countryCode":"US","nationality":"American","category":"singer","image":"/images/people/beyonce.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Most awarded artist in Grammy history with iconic songs like 'Halo'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-034","name":"Eminem","country":"United States","countryCode":"US","nationality":"American","category":"singer","image":"/images/people/eminem.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Hip-hop legend and best-selling rap artist of all time ('Lose Yourself')","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-035","name":"Rihanna","country":"Barbados","countryCode":"BB","nationality":"Barbadian","category":"singer","image":"/images/people/rihanna.jpg","flag":"🇧🇧","capital":"Bridgetown","difficulty":"easy","description":"Nine-time Grammy winner and National Hero of Barbados ('Umbrella')","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-036","name":"Adele","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"singer","image":"/images/people/adele.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Soulful British vocal powerhouse behind 'Rolling in the Deep' and 'Hello'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-037","name":"Drake","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"singer","image":"/images/people/drake.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"Record-breaking Canadian rapper and Billboard chart champion","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-038","name":"Bruno Mars","country":"United States","countryCode":"US","nationality":"American","category":"singer","image":"/images/people/bruno-mars.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Show-stopping pop and funk icon behind 'Uptown Funk' and '24K Magic'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-039","name":"The Weeknd","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"singer","image":"/images/people/the-weeknd.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"R&B sensation who set records with 'Blinding Lights' and 'Starboy'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-040","name":"Dua Lipa","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"singer","image":"/images/people/dua-lipa.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Grammy-winning pop diva renowned for 'Levitating' and 'New Rules'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-041","name":"Arijit Singh","country":"India","countryCode":"IN","nationality":"Indian","category":"singer","image":"/images/people/arijit-singh.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Beloved Indian playback singer famous for soulful romantic melodies","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-042","name":"Shreya Ghoshal","country":"India","countryCode":"IN","nationality":"Indian","category":"singer","image":"/images/people/shreya-ghoshal.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"5-time National Film Award winning melodious Indian vocalist","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-043","name":"Lata Mangeshkar","country":"India","countryCode":"IN","nationality":"Indian","category":"singer","image":"/images/people/lata-mangeshkar.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"medium","description":"The Nightingale of India who recorded thousands of timeless songs","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-044","name":"James","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"singer","image":"/images/people/james.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"The legendary 'Guru' of psychedelic rock in Bangladesh and Bollywood hitmaker","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-045","name":"Ayub Bachchu","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"singer","image":"/images/people/ayub-bachchu.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Pioneering rock guitarist, composer, and founder of the band LRB","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-046","name":"Runa Laila","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"singer","image":"/images/people/runa-laila.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"medium","description":"Internationally acclaimed South Asian vocal diva famous for 'Dama Dam Mast Qalandar'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-047","name":"Bob Marley","country":"Jamaica","countryCode":"JM","nationality":"Jamaican","category":"singer","image":"/images/people/bob-marley.jpg","flag":"🇯🇲","capital":"Kingston","difficulty":"easy","description":"Reggae pioneer and global symbol of peace and freedom ('One Love')","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-048","name":"Elvis Presley","country":"United States","countryCode":"US","nationality":"American","category":"singer","image":"/images/people/elvis-presley.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"The 'King of Rock and Roll' who revolutionized 20th-century popular music","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-049","name":"Billie Eilish","country":"United States","countryCode":"US","nationality":"American","category":"singer","image":"/images/people/billie-eilish.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"medium","description":"Oscar and multiple Grammy-winning modern alternative pop pioneer","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-050","name":"Atif Aslam","country":"Pakistan","countryCode":"PK","nationality":"Pakistani","category":"singer","image":"/images/people/atif-aslam.jpg","flag":"🇵🇰","capital":"Islamabad","difficulty":"easy","description":"Acclaimed playback singer celebrated across South Asia for vocal power","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-051","name":"Nusrat Fateh Ali Khan","country":"Pakistan","countryCode":"PK","nationality":"Pakistani","category":"singer","image":"/images/people/nusrat-fateh-ali-khan.jpg","flag":"🇵🇰","capital":"Islamabad","difficulty":"medium","description":"The 'Shahenshah-e-Qawwali' whose mystical voice captivated global audiences","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-052","name":"Jungkook","country":"South Korea","countryCode":"KR","nationality":"South Korean","category":"singer","image":"/images/people/jungkook.jpg","flag":"🇰🇷","capital":"Seoul","difficulty":"easy","description":"Global pop sensation and main vocalist of record-breaking BTS","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-053","name":"Celine Dion","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"singer","image":"/images/people/celine-dion.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"Vocal legend who sang the Titanic anthem 'My Heart Will Go On'","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-054","name":"Leonardo DiCaprio","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/leonardo-dicaprio.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Oscar-winning Hollywood legend known for Titanic, Inception, and The Revenant","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-055","name":"Tom Cruise","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/tom-cruise.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Iconic Hollywood action hero famous for Top Gun and Mission: Impossible stunts","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-056","name":"Shah Rukh Khan","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/shah-rukh-khan.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"The 'King of Bollywood' and one of the world's most successful film stars","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-057","name":"Amitabh Bachchan","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/amitabh-bachchan.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"The 'Shahenshah' and legendary towering figure of Indian cinema","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-058","name":"Jackie Chan","country":"Hong Kong","countryCode":"HK","nationality":"Hong Konger","category":"actor","image":"/images/people/jackie-chan.jpg","flag":"🇭🇰","capital":"City of Victoria","difficulty":"easy","description":"World-famous martial arts movie legend renowned for his comedic acrobatic stunts","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-059","name":"Robert Downey Jr","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/robert-downey-jr.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Oscar winner beloved worldwide as Marvel's Tony Stark / Iron Man","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-060","name":"Cillian Murphy","country":"Ireland","countryCode":"IE","nationality":"Irish","category":"actor","image":"/images/people/cillian-murphy.jpg","flag":"🇮🇪","capital":"Dublin","difficulty":"medium","description":"Academy Award winning actor for Oppenheimer and star of Peaky Blinders","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-061","name":"Brad Pitt","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/brad-pitt.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Two-time Academy Award winner known for Fight Club and Once Upon a Time in Hollywood","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-062","name":"Johnny Depp","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/johnny-depp.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Celebrated Hollywood star famed as Captain Jack Sparrow in Pirates of the Caribbean","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-063","name":"Keanu Reeves","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"actor","image":"/images/people/keanu-reeves.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"Beloved superstar actor known for The Matrix (Neo) and the John Wick franchise","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-064","name":"Will Smith","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/will-smith.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Oscar winner and blockbuster titan known for Men in Black and The Pursuit of Happyness","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-065","name":"Emma Watson","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"actor","image":"/images/people/emma-watson.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Beloved British actress and UN ambassador famous as Hermione Granger in Harry Potter","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-066","name":"Angelina Jolie","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/angelina-jolie.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Academy Award winner and humanitarian star of Lara Croft: Tomb Raider and Maleficent","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-067","name":"Scarlett Johansson","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/scarlett-johansson.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Highest-grossing actress of all time renowned as Marvel's Black Widow","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-068","name":"Chris Hemsworth","country":"Australia","countryCode":"AU","nationality":"Australian","category":"actor","image":"/images/people/chris-hemsworth.jpg","flag":"🇦🇺","capital":"Canberra","difficulty":"easy","description":"Australian star beloved worldwide as Thor, the Norse God of Thunder in Marvel","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-069","name":"Arnold Schwarzenegger","country":"Austria","countryCode":"AT","nationality":"Austrian","category":"actor","image":"/images/people/arnold-schwarzenegger.jpg","flag":"🇦🇹","capital":"Vienna","difficulty":"easy","description":"7-time Mr. Olympia, blockbuster Terminator icon, and 38th Governor of California","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-070","name":"Rowan Atkinson","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"actor","image":"/images/people/rowan-atkinson.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Iconic comedic genius famous worldwide as the lovable Mr. Bean","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-071","name":"Usain Bolt","country":"Jamaica","countryCode":"JM","nationality":"Jamaican","category":"sports","image":"/images/people/usain-bolt.jpg","flag":"🇯🇲","capital":"Kingston","difficulty":"easy","description":"The fastest man in history and 8-time Olympic gold medal sprint champion","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-072","name":"Roger Federer","country":"Switzerland","countryCode":"CH","nationality":"Swiss","category":"sports","image":"/images/people/roger-federer.jpg","flag":"🇨🇭","capital":"Bern","difficulty":"easy","description":"20-time Grand Slam champion revered for his effortless tennis elegance","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-073","name":"Rafael Nadal","country":"Spain","countryCode":"ES","nationality":"Spanish","category":"sports","image":"/images/people/rafael-nadal.jpg","flag":"🇪🇸","capital":"Madrid","difficulty":"easy","description":"The 'King of Clay' and 22-time Grand Slam tennis champion from Spain","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-074","name":"Novak Djokovic","country":"Serbia","countryCode":"RS","nationality":"Serbian","category":"sports","image":"/images/people/novak-djokovic.jpg","flag":"🇷🇸","capital":"Belgrade","difficulty":"easy","description":"Record 24-time Grand Slam champion and Olympic gold medalist in tennis","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-075","name":"Serena Williams","country":"United States","countryCode":"US","nationality":"American","category":"sports","image":"/images/people/serena-williams.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"23-time Grand Slam singles tennis champion and all-time sports pioneer","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-076","name":"LeBron James","country":"United States","countryCode":"US","nationality":"American","category":"sports","image":"/images/people/lebron-james.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"NBA's all-time leading scorer and 4-time NBA Finals champion","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-077","name":"Michael Jordan","country":"United States","countryCode":"US","nationality":"American","category":"sports","image":"/images/people/michael-jordan.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Six-time NBA champion with the Chicago Bulls and global basketball icon","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-078","name":"Virat Kohli","country":"India","countryCode":"IN","nationality":"Indian","category":"sports","image":"/images/people/virat-kohli.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Modern cricket legend, former Indian captain, and record-setting ODI run-machine","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-079","name":"Sachin Tendulkar","country":"India","countryCode":"IN","nationality":"Indian","category":"sports","image":"/images/people/sachin-tendulkar.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"The 'God of Cricket' who scored 100 international centuries for India","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-080","name":"Shakib Al Hasan","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"sports","image":"/images/people/shakib-al-hasan.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"World No. 1 all-rounder and all-time highest wicket-taker for Bangladesh","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-081","name":"Lewis Hamilton","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"sports","image":"/images/people/lewis-hamilton.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Record-equalling seven-time Formula One World Drivers' Championship winner","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-082","name":"Tiger Woods","country":"United States","countryCode":"US","nationality":"American","category":"sports","image":"/images/people/tiger-woods.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"15-time major golf champion who transformed the landscape of professional golf","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-083","name":"MrBeast","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/mrbeast.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"The most subscribed individual creator in YouTube history, famous for mega-giveaways","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-084","name":"PewDiePie","country":"Sweden","countryCode":"SE","nationality":"Swedish","category":"youtuber","image":"/images/people/pewdiepie.jpg","flag":"🇸🇪","capital":"Stockholm","difficulty":"easy","description":"Pioneering gaming commentary creator and digital icon from Sweden","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-085","name":"Khaby Lame","country":"Senegal","countryCode":"SN","nationality":"Senegalese","category":"influencer","image":"/images/people/khaby-lame.jpg","flag":"🇸🇳","capital":"Dakar","difficulty":"easy","description":"The most followed TikTok creator worldwide, famous for silent life-hack parodies","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-086","name":"Nelson Mandela","country":"South Africa","countryCode":"ZA","nationality":"South African","category":"leader","image":"/images/people/nelson-mandela.jpg","flag":"🇿🇦","capital":"Pretoria","difficulty":"easy","description":"Nobel Peace Prize laureate and anti-apartheid leader who became South Africa's president","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-087","name":"Mahatma Gandhi","country":"India","countryCode":"IN","nationality":"Indian","category":"leader","image":"/images/people/mahatma-gandhi.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Leader of the Indian independence movement and pioneer of non-violent resistance (Satyagraha)","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-088","name":"Albert Einstein","country":"Germany","countryCode":"DE","nationality":"German","category":"scientist","image":"/images/people/albert-einstein.jpg","flag":"🇩🇪","capital":"Berlin","difficulty":"easy","description":"Theoretical physicist who developed the theory of relativity and E = mc²","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-089","name":"Leonardo da Vinci","country":"Italy","countryCode":"IT","nationality":"Italian","category":"historical","image":"/images/people/leonardo-da-vinci.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"easy","description":"Renaissance polymath who painted the Mona Lisa and designed visionary flying machines","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-090","name":"Barack Obama","country":"United States","countryCode":"US","nationality":"American","category":"leader","image":"/images/people/barack-obama.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"44th President of the United States and 2009 Nobel Peace Prize recipient","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-091","name":"Queen Elizabeth II","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"leader","image":"/images/people/queen-elizabeth-ii.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Longest-reigning British monarch in history who served for over 70 years","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-092","name":"Abraham Lincoln","country":"United States","countryCode":"US","nationality":"American","category":"historical","image":"/images/people/abraham-lincoln.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"medium","description":"16th US President who preserved the Union and abolished slavery via the Emancipation Proclamation","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-093","name":"Bangabandhu Sheikh Mujibur Rahman","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"leader","image":"/images/people/bangabandhu-sheikh-mujibur-rahman.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Founding Father of Bangladesh and revered architect of the nation's independence","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-094","name":"Christian Bale","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"actor","image":"/images/people/christian-bale.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Acclaimed Oscar-winning actor famous for The Dark Knight trilogy and intense method acting transformations","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-095","name":"Dwayne Johnson","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/dwayne-johnson.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Global box office superstar and former WWE champion known worldwide as The Rock","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-096","name":"Al Pacino","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/al-pacino.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"medium","description":"Legendary cinematic icon celebrated for masterclass performances in The Godfather and Scarface","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-097","name":"Robert De Niro","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/robert-de-niro.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"medium","description":"Two-time Academy Award winner famous for Taxi Driver, Raging Bull, and Goodfellas","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-098","name":"Morgan Freeman","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/morgan-freeman.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Iconic voice of cinema and Oscar winner celebrated for The Shawshank Redemption and Driving Miss Daisy","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-099","name":"Tom Hanks","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/tom-hanks.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Beloved two-time Oscar winner known for Forrest Gump, Cast Away, and Saving Private Ryan","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-100","name":"Denzel Washington","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/denzel-washington.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"medium","description":"Revered two-time Academy Award winning powerhouse known for Training Day and Malcolm X","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-101","name":"Hugh Jackman","country":"Australia","countryCode":"AU","nationality":"Australian","category":"actor","image":"/images/people/hugh-jackman.jpg","flag":"🇦🇺","capital":"Canberra","difficulty":"easy","description":"Versatile Australian star acclaimed as Wolverine in X-Men and lead in The Greatest Showman","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-102","name":"Henry Cavill","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"actor","image":"/images/people/henry-cavill.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"British screen idol known as Superman in Man of Steel and Geralt of Rivia in The Witcher","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-103","name":"Heath Ledger","country":"Australia","countryCode":"AU","nationality":"Australian","category":"actor","image":"/images/people/heath-ledger.jpg","flag":"🇦🇺","capital":"Canberra","difficulty":"easy","description":"Legendary Australian actor who delivered an unforgettable, Oscar-winning portrayal of the Joker in The Dark Knight","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-104","name":"Ryan Reynolds","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"actor","image":"/images/people/ryan-reynolds.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"Charming Canadian superstar world-famous for playing Marvel's witty superhero Deadpool","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-105","name":"Chris Evans","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/chris-evans.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Beloved Marvel Cinematic Universe hero celebrated globally as Captain America","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-106","name":"Aamir Khan","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/aamir-khan.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Bollywood's Mr. Perfectionist acclaimed worldwide for blockbuster masterpieces like 3 Idiots, Dangal, and Lagaan","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-107","name":"Salman Khan","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/salman-khan.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Mega-popular Bollywood hero and box office titan known for Bajrangi Bhaijaan, Sultan, and Dabangg","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-108","name":"Hrithik Roshan","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/hrithik-roshan.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Bollywood Greek God and dancing sensation renowned for Krrish, Dhoom 2, and War","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-109","name":"Prabhas","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/prabhas.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Pan-Indian superstar who attained global fame as the mighty title hero of the epic Baahubali franchise","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-110","name":"Rajinikanth","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/rajinikanth.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Iconic Thalaiva of Indian cinema revered for unique charisma and blockbusters like Sivaji and Enthiran (Robot)","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-111","name":"Shakib Khan","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"actor","image":"/images/people/shakib-khan.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"King Khan of Dhallywood cinema who has ruled Bangladesh film industry for over two decades with hits like Priyotoma and Toofan","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-112","name":"Allu Arjun","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/allu-arjun.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"National Award-winning Indian powerhouse known for stylish dancing and global blockbuster Pushpa: The Rise","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-113","name":"Daniel Craig","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"actor","image":"/images/people/daniel-craig.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Distinguished British actor renowned for his gritty and legendary five-film tenure as James Bond 007","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-114","name":"Marilyn Monroe","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/marilyn-monroe.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Timeless Hollywood cultural icon and legendary star of Some Like It Hot and Gentlemen Prefer Blondes","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-115","name":"Audrey Hepburn","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"actor","image":"/images/people/audrey-hepburn.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Beloved cinematic legend and fashion icon celebrated for Roman Holiday and Breakfast at Tiffany's","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-116","name":"Meryl Streep","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/meryl-streep.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Three-time Academy Award winner widely hailed as the greatest film actress of her generation","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-117","name":"Natalie Portman","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/natalie-portman.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Oscar-winning star acclaimed for powerful performances in Black Swan, Léon, and Star Wars","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-118","name":"Jennifer Lawrence","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/jennifer-lawrence.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Academy Award-winning actress and box office sensation famous for The Hunger Games and Silver Linings Playbook","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-119","name":"Anne Hathaway","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/anne-hathaway.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Oscar-winning Hollywood leading lady renowned for Les Misérables, Interstellar, and The Devil Wears Prada","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-120","name":"Kate Winslet","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"actor","image":"/images/people/kate-winslet.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Academy Award-winning British powerhouse acclaimed worldwide as Rose in Titanic and Hanna in The Reader","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-121","name":"Margot Robbie","country":"Australia","countryCode":"AU","nationality":"Australian","category":"actor","image":"/images/people/margot-robbie.jpg","flag":"🇦🇺","capital":"Canberra","difficulty":"easy","description":"Top global superstar known for record-breaking blockbuster Barbie and The Wolf of Wall Street","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-122","name":"Penélope Cruz","country":"Spain","countryCode":"ES","nationality":"Spanish","category":"actor","image":"/images/people/penelope-cruz.jpg","flag":"🇪🇸","capital":"Madrid","difficulty":"easy","description":"The first Spanish actress to win an Academy Award, internationally celebrated for Vicky Cristina Barcelona and Volver","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-123","name":"Zendaya","country":"United States","countryCode":"US","nationality":"American","category":"actor","image":"/images/people/zendaya.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Two-time Emmy-winning modern icon starring in Dune, Euphoria, and the Spider-Man franchise","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-124","name":"Deepika Padukone","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/deepika-padukone.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Bollywood queen and global fashion ambassador known for epic masterworks like Padmaavat, Bajirao Mastani, and Pathaan","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-125","name":"Priyanka Chopra","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/priyanka-chopra.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Miss World winner and international crossover superstar starring in Quantico, Barfi!, and Citadel","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-126","name":"Katrina Kaif","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"actor","image":"/images/people/katrina-kaif.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"One of Indian cinema highest-paid leading ladies renowned for blockbuster action hits like Tiger Zinda Hai and Dhoom 3","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-127","name":"Kareena Kapoor","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/kareena-kapoor.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Bollywood royal renowned for iconic pop-culture roles such as Geet in Jab We Met and Poo in Kabhi Khushi Kabhie Gham","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-128","name":"Aishwarya Rai","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/aishwarya-rai.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Miss World 1994 winner celebrated worldwide as one of the most beautiful women in cinema history with hits like Devdas and Dhoom 2","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-129","name":"Alia Bhatt","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/alia-bhatt.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"National Film Award-winning powerhouse celebrated for acclaimed masterpieces Gangubai Kathiawadi, Raazi, and RRR","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-130","name":"Samantha Ruth Prabhu","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/samantha-ruth-prabhu.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Four-time Filmfare Award-winning Pan-Indian star celebrated for The Family Man 2, Eega, and Citadel: Honey Bunny","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-131","name":"Rashmika Mandanna","country":"India","countryCode":"IN","nationality":"Indian","category":"actor","image":"/images/people/rashmika-mandanna.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Nationally adored heroine known as the National Crush of India, star of blockbuster sensations Pushpa: The Rise and Animal","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-132","name":"Joya Ahsan","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"actor","image":"/images/people/joya-ahsan.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Five-time National Film Award winner in Bangladesh and Filmfare winner acclaimed for Debi, Guerrilla, and Ek Je Chhilo Raja","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-133","name":"Pori Moni","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"actor","image":"/images/people/pori-moni.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Glamorous and popular leading actress of Bangladeshi cinema celebrated for Swapnajaal and Gunin","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-134","name":"Isaac Newton","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"scientist","image":"/images/people/isaac-newton.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"One of the greatest mathematicians and physicists in history who formulated the laws of motion and universal gravitation","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-135","name":"Nikola Tesla","country":"Serbia","countryCode":"RS","nationality":"Serbian","category":"scientist","image":"/images/people/nikola-tesla.jpg","flag":"🇷🇸","capital":"Belgrade","difficulty":"easy","description":"Visionary inventor and electrical engineer who pioneered the alternating current (AC) electrical system","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-136","name":"Marie Curie","country":"Poland","countryCode":"PL","nationality":"Polish","category":"scientist","image":"/images/people/marie-curie.jpg","flag":"🇵🇱","capital":"Warsaw","difficulty":"easy","description":"Pioneering physicist and chemist who discovered radioactivity and became the first person to win two Nobel Prizes","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-137","name":"Galileo Galilei","country":"Italy","countryCode":"IT","nationality":"Italian","category":"scientist","image":"/images/people/galileo-galilei.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"easy","description":"Father of modern observational astronomy and modern physics who confirmed the heliocentric solar system","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-138","name":"Charles Darwin","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"scientist","image":"/images/people/charles-darwin.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Renowned naturalist who transformed biological science with the theory of evolution by natural selection","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-139","name":"Stephen Hawking","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"scientist","image":"/images/people/stephen-hawking.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Brilliant theoretical physicist and cosmologist famed for black hole radiation and A Brief History of Time","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-140","name":"Thomas Edison","country":"United States","countryCode":"US","nationality":"American","category":"scientist","image":"/images/people/thomas-edison.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Prolific American inventor who developed the practical electric incandescent light bulb, phonograph, and motion picture camera","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-141","name":"Louis Pasteur","country":"France","countryCode":"FR","nationality":"French","category":"scientist","image":"/images/people/louis-pasteur.jpg","flag":"🇫🇷","capital":"Paris","difficulty":"easy","description":"Foundational microbiologist and chemist who pioneered vaccination, microbial fermentation, and pasteurization","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-142","name":"Michael Faraday","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"scientist","image":"/images/people/michael-faraday.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Groundbreaking scientist whose discoveries in electromagnetic induction laid the groundwork for modern electric power","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-143","name":"Alan Turing","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"scientist","image":"/images/people/alan-turing.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Father of modern computer science and artificial intelligence who broke the Enigma code in WWII","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-144","name":"Johannes Kepler","country":"Germany","countryCode":"DE","nationality":"German","category":"scientist","image":"/images/people/johannes-kepler.jpg","flag":"🇩🇪","capital":"Berlin","difficulty":"medium","description":"Key figure in the scientific revolution who discovered Kepler laws of planetary motion","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-145","name":"Max Planck","country":"Germany","countryCode":"DE","nationality":"German","category":"scientist","image":"/images/people/max-planck.jpg","flag":"🇩🇪","capital":"Berlin","difficulty":"medium","description":"Nobel Prize-winning theoretical physicist who originated quantum theory and Planck constant","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-146","name":"Alfred Nobel","country":"Sweden","countryCode":"SE","nationality":"Swedish","category":"scientist","image":"/images/people/alfred-nobel.jpg","flag":"🇸🇪","capital":"Stockholm","difficulty":"easy","description":"Swedish chemist, engineer, and inventor of dynamite who established the worldwide Nobel Prizes","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-147","name":"Archimedes","country":"Greece","countryCode":"GR","nationality":"Greek","category":"scientist","image":"/images/people/archimedes.jpg","flag":"🇬🇷","capital":"Athens","difficulty":"easy","description":"Ancient Greek polymath and greatest mathematician of antiquity famed for the principle of buoyancy (Eureka)","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-148","name":"Anton van Leeuwenhoek","country":"Netherlands","countryCode":"NL","nationality":"Dutch","category":"scientist","image":"/images/people/anton-van-leeuwenhoek.jpg","flag":"🇳🇱","capital":"Amsterdam","difficulty":"medium","description":"Dutch microscopist acknowledged as the Father of Microbiology for first observing microscopic organisms","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-149","name":"Alexander Graham Bell","country":"United States","countryCode":"US","nationality":"American","category":"scientist","image":"/images/people/alexander-graham-bell.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Eminent inventor, scientist, and innovator who patented the first practical telephone","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-150","name":"C. V. Raman","country":"India","countryCode":"IN","nationality":"Indian","category":"scientist","image":"/images/people/c-v-raman.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Nobel Prize-winning physicist celebrated for discovering the Raman effect in light scattering","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-151","name":"Jagadish Chandra Bose","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"scientist","image":"/images/people/jagadish-chandra-bose.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Legendary Bengali polymath, father of wireless radio communication, and inventor of the crescograph to measure plant response","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-152","name":"Satyendra Nath Bose","country":"India","countryCode":"IN","nationality":"Indian","category":"scientist","image":"/images/people/satyendra-nath-bose.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Theoretical physicist who pioneered Bose-Einstein statistics and quantum physics; the subatomic boson particle is named in his honour","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-153","name":"Jamal Nazrul Islam","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"scientist","image":"/images/people/jamal-nazrul-islam.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Internationally renowned Bangladeshi theoretical physicist and cosmologist celebrated for his seminal work The Ultimate Fate of the Universe","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-154","name":"Markiplier","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/markiplier.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Mark Fischbach, world-famous gaming creator, charity livestreamer, and filmmaker with over 36 million subscribers","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-155","name":"IShowSpeed","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/ishowspeed.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Darren Watkins Jr., high-energy viral streaming sensation and globe-trotting football enthusiast","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-156","name":"Ninja","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/ninja.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Tyler Blevins, iconic gaming streamer who brought Fortnite and esports into mainstream pop culture","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-157","name":"Marques Brownlee","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/marques-brownlee.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"MKBHD, widely recognized as the world premiere consumer technology reviewer and creator","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-158","name":"Mark Rober","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/mark-rober.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Former NASA engineer celebrated for spectacular viral engineering inventions, glitter bombs, and Team Trees","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-159","name":"Casey Neistat","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/casey-neistat.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Pioneering NYC filmmaker who revolutionized cinematic storytelling and daily vlogging on YouTube","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-160","name":"Logan Paul","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/logan-paul.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Global content creator, WWE United States Champion, and co-founder of PRIME Hydration","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-161","name":"Jake Paul","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/jake-paul.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Multi-million subscriber YouTube creator turned professional boxer and combat sports promoter","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-162","name":"SSSniperWolf","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/sssniperwolf.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Lia Shelesh, one of the most-viewed female content creators on YouTube with over 34 million subscribers","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-163","name":"Valkyrae","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/valkyrae.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Rachell Hofstetter, award-winning gaming superstar, co-owner of 100 Thieves, and leading female streamer","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-164","name":"Ludwig Ahgren","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/ludwig-ahgren.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Streamer of the Year and YouTube creator famed for record-setting subathons and creative gameshows","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-165","name":"PrestonPlayz","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/prestonplayz.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Preston Arsement, top family-friendly gaming and challenge creator with over 26 million subscribers","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-166","name":"Anthony Padilla","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/anthony-padilla.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Smosh co-founder and acclaimed interviewer celebrated for his I Spent a Day With... documentary series","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-167","name":"James Charles","country":"United States","countryCode":"US","nationality":"American","category":"youtuber","image":"/images/people/james-charles.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"First male CoverGirl ambassador and beauty creator with over 23 million YouTube subscribers","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-168","name":"DanTDM","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"youtuber","image":"/images/people/dantdm.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Daniel Middleton, one of Britain most beloved gaming icons and Guinness World Record holder for Minecraft","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-169","name":"KSI","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"youtuber","image":"/images/people/ksi.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Olajide Olatunji, UK entertainment titan, Sidemen founding member, chart-topping musician, and boxer","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-170","name":"Ali-A","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"youtuber","image":"/images/people/ali-a.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Alastair Aiken, British gaming pioneer celebrated for Call of Duty and Fortnite content with Guinness World Records","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-171","name":"Pokimane","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"youtuber","image":"/images/people/pokimane.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"Imane Anys, prominent Canadian-Moroccan gaming creator and influential internet personality","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-172","name":"Linus Sebastian","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"youtuber","image":"/images/people/linus-sebastian.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"Founder of Linus Tech Tips and Linus Media Group, leading PC hardware and technology reviews globally","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-173","name":"Veritasium","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"youtuber","image":"/images/people/veritasium.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"Derek Muller, PhD physicist and acclaimed filmmaker presenting fascinating science mysteries and experiments","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-174","name":"Lilly Singh","country":"Canada","countryCode":"CA","nationality":"Canadian","category":"youtuber","image":"/images/people/lilly-singh.jpg","flag":"🇨🇦","capital":"Ottawa","difficulty":"easy","description":"IISuperwomanII, trailblazing sketch comedian, author, and former NBC late-night talk show host","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-175","name":"LazarBeam","country":"Australia","countryCode":"AU","nationality":"Australian","category":"youtuber","image":"/images/people/lazarbeam.jpg","flag":"🇦🇺","capital":"Canberra","difficulty":"easy","description":"Lannan Eacott, Australia biggest gaming creator renowned for hilarious Fortnite memes and challenges","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-176","name":"El Rubius","country":"Spain","countryCode":"ES","nationality":"Spanish","category":"youtuber","image":"/images/people/el-rubius.jpg","flag":"🇪🇸","capital":"Madrid","difficulty":"easy","description":"Rubén Doblas Gundersen, Spain top YouTube legend with over 40 million subscribers","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-177","name":"Whindersson Nunes","country":"Brazil","countryCode":"BR","nationality":"Brazilian","category":"youtuber","image":"/images/people/whindersson-nunes.jpg","flag":"🇧🇷","capital":"Brasília","difficulty":"easy","description":"Beloved Brazilian comedian, singer, and YouTuber with over 44 million subscribers","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-178","name":"CarryMinati","country":"India","countryCode":"IN","nationality":"Indian","category":"youtuber","image":"/images/people/carryminati.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Ajey Nagar, India leading individual YouTuber with over 42 million subscribers, famous for high-energy comedy and roasts","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-179","name":"Bhuvan Bam","country":"India","countryCode":"IN","nationality":"Indian","category":"youtuber","image":"/images/people/bhuvan-bam.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"BB Ki Vines founder, pioneering Indian comedy creator and actor who created multiple beloved iconic characters","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-180","name":"Technical Guruji","country":"India","countryCode":"IN","nationality":"Indian","category":"youtuber","image":"/images/people/technical-guruji.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Gaurav Chaudhary, India most popular Hindi consumer technology YouTuber with over 23 million subscribers","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-181","name":"Tanmay Bhat","country":"India","countryCode":"IN","nationality":"Indian","category":"youtuber","image":"/images/people/tanmay-bhat.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Comedian, co-founder of AIB, and top gaming/reaction creator known for viral financial and humor vlogs","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-182","name":"Dhruv Rathee","country":"India","countryCode":"IN","nationality":"Indian","category":"youtuber","image":"/images/people/dhruv-rathee.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"India most-watched informational creator and educator with over 25 million subscribers","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-183","name":"Ayman Sadiq","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"youtuber","image":"/images/people/ayman-sadiq.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Founder of 10 Minute School, Queen Young Leader Award winner, and Bangladesh most influential educational creator","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-184","name":"Rabindranath Tagore","country":"India","countryCode":"IN","nationality":"Indian","category":"poet","image":"/images/people/rabindranath-tagore.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Nobel laureate in Literature (1913) for Gitanjali and composer of national anthems for India and Bangladesh","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-185","name":"Kazi Nazrul Islam","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/kazi-nazrul-islam.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"National Poet of Bangladesh and revered Rebel Poet (Bidrohi Kobi) who fought injustice through fiery verses and songs","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-186","name":"Jibanananda Das","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/jibanananda-das.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Foremost modernist Bengali poet and lyricist born in Barisal, immortalized for Banalata Sen and Ruposhi Bangla","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-187","name":"Jasimuddin","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/jasimuddin.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Beloved Polli Kobi (Pastoral Poet) of Bangladesh acclaimed for rural folk masterpieces Nakshi Kanthar Math and Sojan Badiyar Ghat","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-188","name":"Michael Madhusudan Dutt","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/michael-madhusudan-dutt.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Pioneer of Bengali blank verse and modern drama born in Sagardari, Jessore; author of the immortal epic Meghnad Badh Kavya","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-189","name":"Begum Rokeya","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/begum-rokeya.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Pioneering feminist thinker, educator, writer, and poet of Bengal Renaissance from Pairaband, Rangpur; author of Sultana Dream","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-190","name":"Sufia Kamal","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/sufia-kamal.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Revered Bangladeshi poet, political activist, and feminist leader who played a pivotal role in the Bengali nationalist movement","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-191","name":"Shamsur Rahman","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/shamsur-rahman.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Major contemporary Bangladeshi poet whose powerful verses captured Bangladesh liberation war and national identity","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-192","name":"Al Mahmud","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/al-mahmud.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Master 20th-century Bengali poet and novelist acclaimed for his landmark poetry volume Sonali Kabin (The Golden Touch)","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-193","name":"Mirza Ghalib","country":"India","countryCode":"IN","nationality":"Indian","category":"poet","image":"/images/people/mirza-ghalib.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Legendary 19th-century Mughal classical poet whose Urdu and Persian ghazals remain immortal across the world","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-194","name":"Allama Iqbal","country":"Pakistan","countryCode":"PK","nationality":"Pakistani","category":"poet","image":"/images/people/allama-iqbal.jpg","flag":"🇵🇰","capital":"Islamabad","difficulty":"easy","description":"Philosopher, barrister, and National Poet of Pakistan widely known as Shair-e-Mashriq (Poet of the East)","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-195","name":"Sarojini Naidu","country":"India","countryCode":"IN","nationality":"Indian","category":"poet","image":"/images/people/sarojini-naidu.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Eminent poet and political activist dubbed the Nightingale of India (Bharat Kokila) by Mahatma Gandhi","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-196","name":"William Shakespeare","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/william-shakespeare.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"The Bard of Avon, widely regarded as the greatest writer in the English language and world pre-eminent dramatist","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-197","name":"John Keats","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/john-keats.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Iconic English Romantic poet celebrated for vivid sensuous imagery in Ode to a Nightingale and Ode on a Grecian Urn","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-198","name":"William Wordsworth","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/william-wordsworth.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Major English Romantic poet who launched the Romantic Age with Lyrical Ballads and composed I Wandered Lonely as a Cloud (Daffodils)","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-199","name":"Percy Bysshe Shelley","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/percy-bysshe-shelley.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Major English Romantic lyric poet acclaimed for masterpiece anthologies like Ozymandias and Ode to the West Wind","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-200","name":"Lord Byron","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/lord-byron.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Flamboyant English Romantic peer and poet famed for Don Juan, Childe Harold Pilgrimage, and She Walks in Beauty","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-201","name":"John Milton","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/john-milton.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Epic English poet and intellectual who penned the theological epic masterpiece Paradise Lost","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-202","name":"William Blake","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/william-blake.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Visionary English poet, painter, and printmaker celebrated for Songs of Innocence and of Experience and The Tyger","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-203","name":"T. S. Eliot","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/t-s-eliot.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"Nobel Prize in Literature laureate who revolutionized modern poetry with The Waste Land and The Love Song of J. Alfred Prufrock","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-204","name":"Robert Frost","country":"United States","countryCode":"US","nationality":"American","category":"poet","image":"/images/people/robert-frost.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Four-time Pulitzer Prize-winning poet revered for rural New England verse including The Road Not Taken and Stopping by Woods","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-205","name":"Emily Dickinson","country":"United States","countryCode":"US","nationality":"American","category":"poet","image":"/images/people/emily-dickinson.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Legendary American poet known for unconventional, intensely introspective lyric poetry and unique slant rhyme","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-206","name":"Walt Whitman","country":"United States","countryCode":"US","nationality":"American","category":"poet","image":"/images/people/walt-whitman.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Father of American free verse whose groundbreaking poetry collection Leaves of Grass celebrated democracy and humanity","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-207","name":"Edgar Allan Poe","country":"United States","countryCode":"US","nationality":"American","category":"poet","image":"/images/people/edgar-allan-poe.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Master of American gothic literature and macabre poetry renowned for The Raven, Annabel Lee, and detective fiction","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-208","name":"Maya Angelou","country":"United States","countryCode":"US","nationality":"American","category":"poet","image":"/images/people/maya-angelou.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Celebrated poet, memoirist, and civil rights icon world-famous for Still I Rise and I Know Why the Caged Bird Sings","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-209","name":"Sylvia Plath","country":"United States","countryCode":"US","nationality":"American","category":"poet","image":"/images/people/sylvia-plath.jpg","flag":"🇺🇸","capital":"Washington, D.C.","difficulty":"easy","description":"Posthumous Pulitzer Prize-winning poet who advanced confessional poetry through Ariel and the novel The Bell Jar","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-210","name":"Dante Alighieri","country":"Italy","countryCode":"IT","nationality":"Italian","category":"poet","image":"/images/people/dante-alighieri.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"easy","description":"Supreme Italian poet of the late Middle Ages whose epic poem the Divine Comedy is widely considered the greatest literary work in Italian","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-211","name":"Homer","country":"Greece","countryCode":"GR","nationality":"Greek","category":"poet","image":"/images/people/homer.jpg","flag":"🇬🇷","capital":"Athens","difficulty":"easy","description":"Ancient Greek epic poet to whom the foundational masterworks of Western literature, The Iliad and The Odyssey, are attributed","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-212","name":"Johann Wolfgang von Goethe","country":"Germany","countryCode":"DE","nationality":"German","category":"poet","image":"/images/people/johann-wolfgang-von-goethe.jpg","flag":"🇩🇪","capital":"Berlin","difficulty":"easy","description":"Supreme literary figure of the German language whose masterpieces include the monumental verse drama Faust and Prometheus","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-213","name":"Victor Hugo","country":"France","countryCode":"FR","nationality":"French","category":"poet","image":"/images/people/victor-hugo.jpg","flag":"🇫🇷","capital":"Paris","difficulty":"easy","description":"Towering French Romantic poet, playwright, and novelist celebrated for magnificent lyric collections and Les Misérables","imageCredit":"Curated","imageLicense":"CC BY-SA 4.0","isActive":true},{"id":"star-214","name":"Kalidasa","country":"India","countryCode":"IN","nationality":"Indian","category":"poet","image":"/images/people/kalidasa.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"medium","description":"Classical Sanskrit poet & playwright renowned as the greatest in Indian literature (Shakuntala, Meghaduta)","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-215","name":"Rumi","country":"Iran","countryCode":"IR","nationality":"Persian","category":"poet","image":"/images/people/rumi.jpg","flag":"🇮🇷","capital":"Tehran","difficulty":"easy","description":"13th-century Persian poet, Islamic scholar and Sufi mystic whose spiritual verses (Masnavi) transcend borders","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-216","name":"Hafez","country":"Iran","countryCode":"IR","nationality":"Persian","category":"poet","image":"/images/people/hafez.jpg","flag":"🇮🇷","capital":"Tehran","difficulty":"medium","description":"Celebrated 14th-century Persian lyric poet renowned for ghazals of love, faith and wine in the Divan of Hafez","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-217","name":"Omar Khayyam","country":"Iran","countryCode":"IR","nationality":"Persian","category":"poet","image":"/images/people/omar-khayyam.jpg","flag":"🇮🇷","capital":"Tehran","difficulty":"easy","description":"Persian polymath, mathematician, astronomer and philosopher famed worldwide for the Rubaiyat","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-218","name":"Saadi Shirazi","country":"Iran","countryCode":"IR","nationality":"Persian","category":"poet","image":"/images/people/saadi-shirazi.jpg","flag":"🇮🇷","capital":"Tehran","difficulty":"medium","description":"Major Persian master poet and writer of the medieval period, widely recognized for Gulistan and Bustan","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-219","name":"Ferdowsi","country":"Iran","countryCode":"IR","nationality":"Persian","category":"poet","image":"/images/people/ferdowsi.jpg","flag":"🇮🇷","capital":"Tehran","difficulty":"medium","description":"Persian epic poet and author of Shahnameh (Book of Kings), the world longest epic poem written by a single poet","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-220","name":"Virgil","country":"Italy","countryCode":"IT","nationality":"Roman","category":"poet","image":"/images/people/virgil.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"medium","description":"Ancient Roman poet of the Augustan period, celebrated for his magnum opus national epic The Aeneid","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-221","name":"Ovid","country":"Italy","countryCode":"IT","nationality":"Roman","category":"poet","image":"/images/people/ovid.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"hard","description":"Roman poet of the Golden Age of Latin literature, famous for his mythological masterpiece Metamorphoses","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-222","name":"Horace","country":"Italy","countryCode":"IT","nationality":"Roman","category":"poet","image":"/images/people/horace.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"hard","description":"Leading Roman lyric poet during the time of Augustus, famed for his Odes and coining Carpe Diem","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-223","name":"Sappho","country":"Greece","countryCode":"GR","nationality":"Greek","category":"poet","image":"/images/people/sappho.jpg","flag":"🇬🇷","capital":"Athens","difficulty":"medium","description":"Archaic Greek lyric poet from the isle of Lesbos, hailed by Plato as the tenth muse of poetry","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-224","name":"Hesiod","country":"Greece","countryCode":"GR","nationality":"Greek","category":"poet","image":"/images/people/hesiod.jpg","flag":"🇬🇷","capital":"Athens","difficulty":"hard","description":"Ancient Greek poet active alongside Homer, author of Theogony and Works and Days on Greek mythology","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-225","name":"Li Bai","country":"China","countryCode":"CN","nationality":"Chinese","category":"poet","image":"/images/people/li-bai.jpg","flag":"🇨🇳","capital":"Beijing","difficulty":"medium","description":"Tang dynasty Chinese poet acclaimed as the Poet Immortal, known for extravagant romantic imagination","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-226","name":"Du Fu","country":"China","countryCode":"CN","nationality":"Chinese","category":"poet","image":"/images/people/du-fu.jpg","flag":"🇨🇳","capital":"Beijing","difficulty":"medium","description":"Prominent Tang dynasty Chinese poet revered as Poet-Historian and Poet-Sage in classical Chinese history","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-227","name":"Matsuo Basho","country":"Japan","countryCode":"JP","nationality":"Japanese","category":"poet","image":"/images/people/matsuo-basho.jpg","flag":"🇯🇵","capital":"Tokyo","difficulty":"medium","description":"Edo-period master recognized as the greatest master of Haiku poetry, author of The Narrow Road to the Deep North","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-228","name":"Kabir","country":"India","countryCode":"IN","nationality":"Indian","category":"poet","image":"/images/people/kabir.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"15th-century Indian mystic poet and saint whose Dohas influenced the Bhakti movement and Sikhism","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-229","name":"Amir Khusrau","country":"India","countryCode":"IN","nationality":"Indian","category":"poet","image":"/images/people/amir-khusrau.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"medium","description":"Iconic Sufi musician, poet and scholar regarded as the father of Qawwali and voice of India (Tuti-e-Hind)","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-230","name":"Geoffrey Chaucer","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"poet","image":"/images/people/geoffrey-chaucer.jpg","flag":"🇬🇧","capital":"London","difficulty":"easy","description":"English poet and author widely considered the father of English literature, renowned for The Canterbury Tales","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-231","name":"Mirabai","country":"India","countryCode":"IN","nationality":"Indian","category":"poet","image":"/images/people/mirabai.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"medium","description":"16th-century Hindu mystic poet and devotee of Krishna, whose devotional bhajans remain beloved across India","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-232","name":"Jayadeva","country":"India","countryCode":"IN","nationality":"Indian","category":"poet","image":"/images/people/jayadeva.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"hard","description":"12th-century Sanskrit poet of Bengal/Odisha, celebrated for the lyrical devotional epic Gita Govinda","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-233","name":"Chandidas","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"poet","image":"/images/people/chandidas.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"hard","description":"Medieval Bengali poet whose immortal Vaishnava love songs shaped Bengali poetry (Shobar upor manush shotto)","imageCredit":"Wikipedia / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-234","name":"Munshi Abdur Rouf","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/munshi-abdur-rouf.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Bir Sreshtho war hero who single-handedly defended against enemy gunboats in the 1971 Bangladesh Liberation War","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-235","name":"Mostafa Kamal","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/mostafa-kamal.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Bir Sreshtho martyr who fought valiantly to provide covering fire so his fellow comrades could safely retreat","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-236","name":"Matiur Rahman","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/matiur-rahman.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Bir Sreshtho military flight lieutenant who attempted to defect with a fighter aircraft to join the 1971 Liberation War","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-237","name":"Mohiuddin Jahangir","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/mohiuddin-jahangir.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Bir Sreshtho Captain who heroically led the assault across the Mahananda River to liberate Chapai Nawabganj","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-238","name":"Hamidur Rahman","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/hamidur-rahman.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Youngest Bir Sreshtho recipient who silenced an enemy light machine gun bunker at Dhalai outpost","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-239","name":"Nur Mohammad Sheikh","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/nur-mohammad-sheikh.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Bir Sreshtho Lance Naik who continued fighting to evacuate his wounded teammates despite mortal injuries","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-240","name":"Ruhul Amin","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/ruhul-amin.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Bir Sreshtho naval engine room artificer aboard BNS Palash who sacrificed his life fighting for Bangladesh","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-241","name":"M. A. G. Osmani","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/m-a-g-osmani.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"medium","description":"Supreme Commander of the Bangladesh Armed Forces (Mukti Bahini) during the historic 1971 Liberation War","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-242","name":"Sitara Begum","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/sitara-begum.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"medium","description":"Bir Protik decorated army physician and freedom fighter who commanded the Sector 2 field hospital in 1971","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-243","name":"Titumeer","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/titumeer.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"easy","description":"Legendary Bengali revolutionary who constructed the historic Bamboo Fort (Basher Kella) to fight British colonial rule","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-244","name":"Surya Sen","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/surya-sen.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"medium","description":"Masterda Surya Sen, fearless leader of the 1930 Chittagong Armoury Raid against the British Empire","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-245","name":"Pritilata Waddedar","country":"Bangladesh","countryCode":"BD","nationality":"Bangladeshi","category":"hero","image":"/images/people/pritilata-waddedar.jpg","flag":"🇧🇩","capital":"Dhaka","difficulty":"medium","description":"Trailblazing Bengali nationalist revolutionary who led the assault on the Pahartali European Club in Chittagong","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-246","name":"Khudiram Bose","country":"India","countryCode":"IN","nationality":"Indian","category":"hero","image":"/images/people/khudiram-bose.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"One of the youngest martyrs of the Indian independence movement, immortalized in folklore for his defiance","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-247","name":"Bhagat Singh","country":"India","countryCode":"IN","nationality":"Indian","category":"hero","image":"/images/people/bhagat-singh.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Charismatic socialist revolutionary hero whose fearless sacrifice sparked revolutionary fervour across India","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-248","name":"Subhas Chandra Bose","country":"India","countryCode":"IN","nationality":"Indian","category":"hero","image":"/images/people/subhas-chandra-bose.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"easy","description":"Netaji, defiant patriotic leader and commander of the Indian National Army (Azad Hind Fauj)","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-249","name":"Tipu Sultan","country":"India","countryCode":"IN","nationality":"Indian","category":"hero","image":"/images/people/tipu-sultan.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"medium","description":"The Tiger of Mysore, fearless warrior king and pioneer of rocket artillery who resisted British colonial forces","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-250","name":"Rani Lakshmibai","country":"India","countryCode":"IN","nationality":"Indian","category":"hero","image":"/images/people/rani-lakshmibai.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"medium","description":"The heroic Queen of Jhansi, fierce warrior icon and leading commander of the Indian Rebellion of 1857","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-251","name":"Mangal Pandey","country":"India","countryCode":"IN","nationality":"Indian","category":"hero","image":"/images/people/mangal-pandey.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"medium","description":"Heroic soldier whose defiance against British officers at Barrackpore sparked the Indian Rebellion of 1857","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-252","name":"Chhatrapati Shivaji","country":"India","countryCode":"IN","nationality":"Indian","category":"hero","image":"/images/people/chhatrapati-shivaji.jpg","flag":"🇮🇳","capital":"New Delhi","difficulty":"medium","description":"Legendary warrior king who founded the Maratha Empire and pioneered innovative guerrilla warfare tactics","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-253","name":"Alexander the Great","country":"Greece","countryCode":"GR","nationality":"Greek","category":"hero","image":"/images/people/alexander-the-great.jpg","flag":"🇬🇷","capital":"Athens","difficulty":"easy","description":"Ancient Macedonian king and legendary military tactician who created one of history largest empires","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-254","name":"Julius Caesar","country":"Italy","countryCode":"IT","nationality":"Roman","category":"hero","image":"/images/people/julius-caesar.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"easy","description":"Formidable Roman general whose military conquest of Gaul paved the way for the Roman Empire","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-255","name":"Leonidas","country":"Greece","countryCode":"GR","nationality":"Greek","category":"hero","image":"/images/people/leonidas.jpg","flag":"🇬🇷","capital":"Athens","difficulty":"medium","description":"Spartan warrior king who led the heroic last stand of 300 Spartans against the Persian army at Thermopylae","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-256","name":"Spartacus","country":"Italy","countryCode":"IT","nationality":"Roman","category":"hero","image":"/images/people/spartacus.jpg","flag":"🇮🇹","capital":"Rome","difficulty":"medium","description":"Thracian gladiator warrior who led the legendary major slave revolt against the Roman Republic","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-257","name":"Saladin","country":"Egypt","countryCode":"EG","nationality":"Egyptian","category":"hero","image":"/images/people/saladin.jpg","flag":"🇪🇬","capital":"Cairo","difficulty":"medium","description":"Chivalrous Muslim warrior sultan who united the Levant and recaptured Jerusalem during the Crusades","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-258","name":"Joan of Arc","country":"France","countryCode":"FR","nationality":"French","category":"hero","image":"/images/people/joan-of-arc.jpg","flag":"🇫🇷","capital":"Paris","difficulty":"easy","description":"The Maid of Orléans, heroic peasant girl and patron saint who led the French army during the Hundred Years War","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-259","name":"William Wallace","country":"United Kingdom","countryCode":"GB","nationality":"British","category":"hero","image":"/images/people/william-wallace.jpg","flag":"🇬🇧","capital":"London","difficulty":"medium","description":"Iconic Scottish knight and freedom warrior who led the resistance during the First War of Scottish Independence","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-260","name":"Sun Tzu","country":"China","countryCode":"CN","nationality":"Chinese","category":"hero","image":"/images/people/sun-tzu.jpg","flag":"🇨🇳","capital":"Beijing","difficulty":"easy","description":"Ancient Chinese military general, master strategist and philosopher who authored The Art of War","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-261","name":"Miyamoto Musashi","country":"Japan","countryCode":"JP","nationality":"Japanese","category":"hero","image":"/images/people/miyamoto-musashi.jpg","flag":"🇯🇵","capital":"Tokyo","difficulty":"medium","description":"Legendary undefeated Japanese master swordsman and philosopher who authored The Book of Five Rings","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-262","name":"Che Guevara","country":"Argentina","countryCode":"AR","nationality":"Argentine","category":"hero","image":"/images/people/che-guevara.jpg","flag":"🇦🇷","capital":"Buenos Aires","difficulty":"easy","description":"Argentine Marxist revolutionary commander and iconic international symbol of guerrilla struggle","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true},{"id":"star-263","name":"Khalid ibn al-Walid","country":"Saudi Arabia","countryCode":"SA","nationality":"Saudi","category":"hero","image":"/images/people/khalid-ibn-al-walid.jpg","flag":"🇸🇦","capital":"Riyadh","difficulty":"medium","description":"Legendary undefeated military commander known as The Sword of Allah (Sayf Allah al-Maslul)","imageCredit":"Historical / Public Domain","imageLicense":"Public Domain / CC BY-SA","isActive":true}]`),om={title:"WORLD STAR QUIZ 3D",subtitle:"Guess the Celebrity's Country",question:"Which country is he from?",score:"Score",streak:"Streak",questionNum:"Question",paused:"PAUSED",resume:"Resume",pause:"Pause",next:"Next",replay:"Replay",showAnswer:"Reveal",countryRevealed:"COUNTRY REVEALED",capital:"Capital",nationality:"Nationality",category:"Category",correct:"CORRECT! 🎯",incorrect:"WRONG ANSWER ❌",timeUp:"TIME'S UP! ⏰",timerRemaining:"TIME REMAINING",modes:{auto:"Auto Quiz",guess:"Guess Country",practice:"Practice",challenge:"Challenge"},categories:{all:"All People",footballer:"Footballers",sports:"Other Sports Stars",actor:"Actors & Actresses",singer:"Singers & Musicians",youtuber:"YouTubers",influencer:"Social Media Stars",leader:"Presidents & PMs",historical:"Historical Figures",scientist:"Scientists & Inventors",poet:"Poets & Authors",hero:"Warriors & Freedom Fighters"},difficulties:{all:"All Difficulties",easy:"Easy",medium:"Medium",hard:"Hard"},settings:{title:"Game Settings",language:"Language",gameMode:"Game Mode",timerDuration:"Countdown Duration",revealDuration:"Answer Display Delay",category:"Category Filter",difficulty:"Difficulty",soundEffects:"Sound Effects",music:"Background Audio",musicVolume:"Audio Volume",vfxQuality:"Visual Quality",reducedMotion:"Reduced Motion",showName:"Show Person's Name",showCapital:"Show Capital City",fullscreen:"Fullscreen",admin:"Open Admin Panel",close:"Close & Save"},challenge:{title:"Challenge Complete!",finalScore:"Final Score",accuracy:"Accuracy",correct:"Correct",wrong:"Wrong",bestStreak:"Best Streak",playAgain:"Play Again",mainMenu:"Back to Auto Quiz"}},cm={title:"ওয়ার্ল্ড স্টার কুইজ ৩ডি",subtitle:"তারকার দেশ অনুমান করুন",question:"তিনি কোন দেশের নাগরিক?",score:"স্কোর",streak:"ধারাবাহিকতা",questionNum:"প্রশ্ন",paused:"বিরতি",resume:"চালিয়ে যান",pause:"বিরতি",next:"পরবর্তী",replay:"পুনরায়",showAnswer:"উত্তর দেখুন",countryRevealed:"দেশ প্রকাশিত",capital:"রাজধানী",nationality:"জাতীয়তা",category:"বিভাগ",correct:"সঠিক উত্তর! 🎯",incorrect:"ভুল উত্তর ❌",timeUp:"সময় শেষ! ⏰",timerRemaining:"অবশিষ্ট সময়",modes:{auto:"স্বয়ংক্রিয় কুইজ",guess:"দেশ অনুমান করুন",practice:"অনুশীলন মোড",challenge:"চ্যালেঞ্জ মোড"},categories:{all:"সকল তারকা",footballer:"ফুটবল তারকা",sports:"অন্যান্য ক্রীড়াবিদ",actor:"অভিনেতা ও অভিনেত্রী",singer:"গায়ক ও সঙ্গীতশিল্পী",youtuber:"ইউটিউবার",influencer:"সোশ্যাল মিডিয়া স্টার",leader:"রাষ্ট্রপ্রধান ও প্রধানমন্ত্রী",historical:"ঐতিহাসিক ব্যক্তিত্ব",scientist:"বিজ্ঞানী ও আবিষ্কারক",poet:"কবি ও সাহিত্যিক",hero:"বীর ও মুক্তিযোদ্ধা"},difficulties:{all:"সব স্তর",easy:"সহজ",medium:"মাঝারি",hard:"কঠিন"},settings:{title:"সেটিংস",language:"ভাষা",gameMode:"গেম মোড",timerDuration:"টাইমার সময়কাল",revealDuration:"উত্তর প্রদর্শনের সময়",category:"বিভাগ ফিল্টার",difficulty:"কঠিনতার স্তর",soundEffects:"শব্দ প্রভাব",music:"ব্যাকগ্রাউন্ড মিউজিক",musicVolume:"সাউন্ড ভলিউম",vfxQuality:"ভিজ্যুয়াল কোয়ালিটি",reducedMotion:"মোশন হ্রাস",showName:"ব্যক্তির নাম প্রদর্শন",showCapital:"রাজধানীর নাম প্রদর্শন",fullscreen:"ফুলস্ক্রিন",admin:"অ্যাডমিন প্যানেল",close:"সংরক্ষণ ও বন্ধ"},challenge:{title:"চ্যালেঞ্জ সমাপ্ত!",finalScore:"সর্বমোট স্কোর",accuracy:"সঠিকতার হার",correct:"সঠিক",wrong:"ভুল",bestStreak:"সর্বোচ্চ স্ট্রিক",playAgain:"আবার খেলুন",mainMenu:"প্রধান কুইজে ফিরুন"}},lm={en:om,bn:cm};class dm{constructor(e){this.dom=e,this.state=new mc,this.countries=tc,this.translations=lm;const t=hi.getItem(fi.CUSTOM_PEOPLE,null);if(Array.isArray(t)&&t.length>0){const i=new Map;t.forEach(s=>{s!=null&&s.name&&i.set(s.name.trim().toLowerCase(),s)});const a=sa.map(s=>({...s})),r=new Set(sa.map(s=>s.name.trim().toLowerCase()));t.forEach(s=>{s!=null&&s.name&&!r.has(s.name.trim().toLowerCase())&&(a.push(s),r.add(s.name.trim().toLowerCase()))}),this.people=a,hi.setItem(fi.CUSTOM_PEOPLE,a)}else this.people=sa,hi.setItem(fi.CUSTOM_PEOPLE,sa);this.randomSelector=new gc(this.people,{historyWindowSize:8}),this.scoreController=new vc,this.answerController=new _c(this.countries),this.timerController=new yc({duration:this.state.settings.timerDuration,onTick:i=>this.handleTimerTick(i),onComplete:()=>this.handleTimerComplete()}),this.revealTimeoutId=null,this.nextQuestionTimeoutId=null,this.isTransitioning=!1}init(){this.applyAudioSettings(),this.sceneManager=new Bp(this.dom.threeCanvas),this.sceneManager.setQuality(this.state.settings.vfxQuality),this.sceneManager.setReducedMotion(this.state.settings.reducedMotion),this.header=new Np(this.dom.headerContainer,{onToggleSound:()=>this.toggleSound(),onOpenSettings:()=>this.openSettings(),onOpenAdmin:()=>this.adminPanel.show()}),this.portraitCard=new zp(this.dom.portraitContainer),this.countdownTimer=new Gp(this.dom.timerContainer),this.questionBanner=new Hp(this.dom.questionContainer),this.countryReveal=new Vp(this.dom.revealContainer),this.multipleChoice=new Wp(this.dom.choiceContainer,{onSelect:(t,i)=>this.handleChoiceSelection(t,i)}),this.gameControls=new Yp(this.dom.controlsContainer,{onTogglePause:()=>this.togglePause(),onRevealNow:()=>this.revealAnswerNow(),onReplay:()=>this.replayCurrentQuestion(),onNext:()=>this.loadNextQuestion(!0),onToggleFullscreen:()=>this.toggleFullscreen()}),this.settingsPanel=new Zp(this.dom.settingsContainer,{onSave:t=>this.applySettings(t),onOpenAdmin:()=>this.adminPanel.show(),getPeople:()=>this.people,translations:this.translations}),this.resultsScreen=new Jp(this.dom.resultsContainer,{onPlayAgain:()=>this.startChallenge(),onBackToAuto:()=>{this.state.setMode("auto"),this.applySettings({...this.state.settings,mode:"auto"})}}),this.adminPanel=new em(this.dom.adminContainer,{getPeople:()=>this.people,onUpdatePeople:t=>this.updatePeopleDatabase(t)});const e=()=>{Mt.ensureContext(),window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e)};window.addEventListener("pointerdown",e),window.addEventListener("keydown",e),this.updateLocalization(),this.syncFilterRules(),this.startMode(this.state.settings.mode)}applyAudioSettings(){Mt.setEnabled(this.state.settings.soundEnabled),Mt.setVolume(this.state.settings.soundVolume),Mt.setMusicEnabled(this.state.settings.musicEnabled)}syncFilterRules(){this.randomSelector.setCategories(this.state.settings.selectedCategories),this.randomSelector.setDifficulty(this.state.settings.difficulty),this.portraitCard.setShowName(this.state.settings.showName),this.countryReveal.setShowCapital(this.state.settings.showCapital)}updateLocalization(){var i,a,r;const e=this.state.settings.language||"en",t=this.translations[e]||this.translations.en;document.documentElement.lang=e,e==="bn"?(document.body.classList.add("lang-bn"),document.body.classList.remove("lang-en")):(document.body.classList.add("lang-en"),document.body.classList.remove("lang-bn")),this.portraitCard.setLocalization(t,e),this.countdownTimer.setLocalization(t),(i=this.questionBanner)==null||i.setLocalization(t),(a=this.multipleChoice)==null||a.setLocalization(e),this.countryReveal.setLocalization(t,e),this.gameControls.setLocalization(t),(r=this.settingsPanel)==null||r.setLocalization(this.translations,e)}startMode(e){this.clearAllTimers(),this.state.setMode(e),this.state.questionNumber=1,this.state.challengeQuestionIndex=0,this.scoreController.reset(),this.header.updateStats({questionNumber:1,score:0,streak:0,mode:this.state.settings.mode}),e==="challenge"?this.startChallenge():this.loadNextQuestion(!1)}startChallenge(){this.clearAllTimers(),this.scoreController.reset(),this.state.challengeQuestionIndex=0,this.state.questionNumber=1,this.header.updateStats({questionNumber:1,score:0,streak:0,mode:"challenge"}),this.loadNextQuestion(!1)}clearAllTimers(){this.timerController.stop(),this.revealTimeoutId&&(clearTimeout(this.revealTimeoutId),this.revealTimeoutId=null),this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null)}async loadNextQuestion(e=!1){if(this.isTransitioning&&!e)return;if(this.clearAllTimers(),this.countryReveal.hide(),this.state.settings.mode==="challenge"){const o=this.state.settings.challengeQuestionsCount||10;if(this.state.challengeQuestionIndex>=o){this.finishChallenge();return}this.state.challengeQuestionIndex+=1}const t=this.randomSelector.selectNext();if(!t){alert("No celebrities match your current category/difficulty filter. Please adjust settings.");return}this.isTransitioning=!0,this.state.currentPerson=t,this.state.status=pi.COUNTDOWN,Mt.playTransition(),this.header.updateStats({questionNumber:this.state.questionNumber,score:this.scoreController.score,streak:this.scoreController.currentStreak,mode:this.state.settings.mode});const i=this.state.settings.language||"en",a=this.translations[i]||this.translations.en;if(await this.portraitCard.displayPerson(t,a.question),this.state.settings.mode==="guess"||this.state.settings.mode==="challenge"){const o=this.answerController.generateChoices(t,i);this.multipleChoice.setChoices(o),this.multipleChoice.setVisible(!0)}else this.multipleChoice.setVisible(!1);this.state.settings.mode==="practice"?this.countdownTimer.setVisible(!1):(this.countdownTimer.setVisible(!0),this.timerController.setDuration(this.state.settings.timerDuration),this.countdownTimer.reset(this.state.settings.timerDuration),this.timerController.start()),this.isTransitioning=!1;const s=this.randomSelector.getEligiblePeople();if(s.length>1){const o=s.find(c=>c.id!==t.id);kp(o)}}handleTimerTick({remainingSeconds:e,progress:t,isUrgent:i,didSecondChange:a}){this.countdownTimer.update({remainingSeconds:e,progress:t,isUrgent:i}),a&&Mt.playTick(i)}handleTimerComplete(){Mt.playTimeUp(),this.state.settings.mode==="guess"||this.state.settings.mode==="challenge"?(this.multipleChoice.lock(),this.scoreController.recordAnswer(!1,0),this.header.updateStats({questionNumber:this.state.questionNumber,score:this.scoreController.score,streak:this.scoreController.currentStreak,mode:this.state.settings.mode}),this.triggerReveal({isTimeout:!0})):this.triggerReveal({isNeutral:!0})}handleChoiceSelection(e,t){this.timerController.stop();const i=this.timerController.totalDurationMs>0?this.timerController.remainingMs/this.timerController.totalDurationMs:0,a=this.scoreController.recordAnswer(e,i);e?Mt.playCorrect():Mt.playIncorrect(),this.header.updateStats({questionNumber:this.state.questionNumber,score:a.score,streak:a.currentStreak,mode:this.state.settings.mode}),this.triggerReveal({isCorrect:e,userChoice:t})}triggerReveal(e=null){this.state.status=pi.REVEALED,Mt.playReveal();const t=this.countries.find(i=>{var a,r;return i.code===((a=this.state.currentPerson)==null?void 0:a.countryCode)||i.name===((r=this.state.currentPerson)==null?void 0:r.country)});if(this.countryReveal.show(this.state.currentPerson,t,e),this.state.settings.mode!=="practice"){const i=(this.state.settings.revealDuration||2.5)*1e3;this.nextQuestionTimeoutId=setTimeout(()=>{this.state.questionNumber+=1,this.loadNextQuestion(!1)},i)}}revealAnswerNow(){this.timerController.stop(),(this.state.settings.mode==="guess"||this.state.settings.mode==="challenge")&&this.multipleChoice.lock(),this.triggerReveal()}replayCurrentQuestion(){if(this.clearAllTimers(),this.countryReveal.hide(),this.state.settings.mode==="guess"||this.state.settings.mode==="challenge"){const t=this.state.settings.language||"en",i=this.answerController.generateChoices(this.state.currentPerson,t);this.multipleChoice.setChoices(i),this.multipleChoice.setVisible(!0)}this.state.settings.mode!=="practice"&&(this.countdownTimer.reset(this.state.settings.timerDuration),this.timerController.setDuration(this.state.settings.timerDuration),this.timerController.start())}togglePause(){const e=!this.state.isPaused;this.state.setPaused(e),this.gameControls.setPausedState(e),e?(this.timerController.pause(),this.sceneManager.pause(),Mt.setMusicEnabled(!1),this.nextQuestionTimeoutId&&clearTimeout(this.nextQuestionTimeoutId)):(this.timerController.resume(),this.sceneManager.resume(),this.state.settings.musicEnabled&&Mt.setMusicEnabled(!0),this.state.status===pi.REVEALED&&this.state.settings.mode!=="practice"&&(this.nextQuestionTimeoutId=setTimeout(()=>{this.state.questionNumber+=1,this.loadNextQuestion(!1)},1500)))}toggleSound(){const e=!this.state.settings.soundEnabled;this.state.settings.soundEnabled=e,Mt.setEnabled(e),this.header.setSoundState(e),gs(this.state.settings)}openSettings(){this.settingsPanel.open(this.state.settings)}applySettings(e){const t=this.state.settings.mode,i=JSON.stringify(this.state.settings.selectedCategories||["all"]),a=JSON.stringify(e.selectedCategories||["all"]);if(this.state.settings={...e},gs(this.state.settings),this.applyAudioSettings(),this.header.setSoundState(this.state.settings.soundEnabled),this.sceneManager.setQuality(this.state.settings.vfxQuality),this.sceneManager.setReducedMotion(this.state.settings.reducedMotion),nm(this.state.settings.keepAwake!==!1),this.syncFilterRules(),this.updateLocalization(),t!==this.state.settings.mode)this.startMode(this.state.settings.mode);else if(i!==a){const r=this.state.currentPerson;r&&(this.state.settings.selectedCategories.includes("all")||this.state.settings.selectedCategories.includes(r.category))||this.startNewRound()}}finishChallenge(){this.clearAllTimers(),this.state.status=pi.FINISHED;const e=this.scoreController.getStats(),t=fc();(e.score>t.bestScore||e.bestStreak>t.bestStreak)&&pc({bestScore:Math.max(e.score,t.bestScore),bestStreak:Math.max(e.bestStreak,t.bestStreak),gamesPlayed:(t.gamesPlayed||0)+1,totalCorrect:(t.totalCorrect||0)+e.correctCount}),this.resultsScreen.show(e)}toggleFullscreen(){var e,t,i;try{document.fullscreenElement?(i=document.exitFullscreen)==null||i.call(document).catch(()=>{}):(t=(e=document.documentElement).requestFullscreen)==null||t.call(e).catch(()=>{})}catch{}}updatePeopleDatabase(e){this.people=e,hi.setItem(fi.CUSTOM_PEOPLE,e),this.randomSelector.setPeople(this.people)}}document.addEventListener("DOMContentLoaded",()=>{Kp(),sm();const n={threeCanvas:document.getElementById("three-canvas-slot"),headerContainer:document.getElementById("header-slot"),portraitContainer:document.getElementById("portrait-slot"),timerContainer:document.getElementById("timer-slot"),questionContainer:document.getElementById("question-slot"),choiceContainer:document.getElementById("choice-slot"),revealContainer:document.getElementById("reveal-slot"),controlsContainer:document.getElementById("controls-slot"),settingsContainer:document.getElementById("settings-slot"),resultsContainer:document.getElementById("results-slot"),adminContainer:document.getElementById("admin-slot")};try{const e=new dm(n);e.init(),window.__WSQ3D_APP__=e}catch(e){console.error("Fatal initialization error:",e)}});
//# sourceMappingURL=index-B6QhMVPk.js.map
