import{d as m,r as w,E as y,o as k,C as F,u as b,x as C,j as o,a as n,b as r,t as c,G as L,f as l,F as v,y as _,n as f,p as D,m as I}from"./index.36d22617.js";const A=m({name:"SelectNavbar",props:{topNav:{type:[Array,String],default:""},navList:{type:Array,default:[]}},emits:["selectItem"],setup(e,{emit:d}){const t=w({isNavList:!1,showDropdown:!1,selectTopNav:{},currentNavList:[],currentItem:{}});y(()=>b(e.topNav),a=>{if(t.isNavList=Array.isArray(a),t.isNavList)u(a[0]);else{let s=e.navList;t.currentNavList=s,s.length&&i(s[0])}},{immediate:!0}),k(()=>{document.addEventListener("click",a=>{t.showDropdown&&(t.showDropdown=!1)})});function u(a){!a||(t.selectTopNav=a,t.currentNavList=a.list,i(a.list[0]))}function i(a){t.currentItem=a,t.showDropdown=!1,d("selectItem",{category:t.selectTopNav&&t.selectTopNav.id,type:a&&a.id})}return{selectNav:u,selectItem:i,...F(t)}}});const N=e=>(D("data-v-fa3d7bc1"),e=e(),I(),e),S={class:"select-bar"},B={class:"top-nav"},T=N(()=>r("span",{class:"name"},"\u5206\u7C7B\uFF1A",-1)),$={class:"select-name"},g=N(()=>r("div",{class:"line"},null,-1)),E={key:1,class:"dropdown-wrapper hidden-scrollbar",ref:"dropdownRef"},V=["onClick"],M={class:"second-nav"},R=["onClick"],j={class:"name"},z={class:"desc"},G={key:0,class:"number"},q={key:1,class:"click-number"},H={key:2,class:"create-date"};function J(e,d,t,u,i,a){return o(),n("div",S,[r("div",B,[T,r("span",$,c(e.isNavList?e.selectTopNav.cname||e.selectTopNav.name:e.topNav),1),e.isNavList?(o(),n("i",{key:0,class:"iconfont icon-arrowDown",onClick:d[0]||(d[0]=L(s=>e.showDropdown=!e.showDropdown,["stop"]))})):l("",!0),g,e.showDropdown?(o(),n("div",E,[(o(!0),n(v,null,_(e.topNav,(s,p)=>(o(),n("div",{class:f(["dropdown-item",{selected:s.id===e.selectTopNav.id}]),key:p,onClick:h=>e.selectNav(s)},c(s.cname||s.name),11,V))),128))],512)):l("",!0)]),r("div",M,[(o(!0),n(v,null,_(e.currentNavList,(s,p)=>(o(),n("div",{class:f(["nav-item",{selected:s.id===e.currentItem.id}]),key:p,onClick:h=>e.selectItem(s)},[r("div",j,c(s.cname||s.name),1),r("div",z,[(s.number,o(),n("span",G,"\u6570\u91CF\uFF1A"+c(s.number||1)+"\u672C",1)),s.clickNumber?(o(),n("span",q,"\u70B9\u51FB\u91CF\uFF1A"+c(s.clickNumber),1)):l("",!0),s.createDate?(o(),n("span",H,"\u521B\u5EFA\u65F6\u95F4\uFF1A"+c(s.createDate),1)):l("",!0)])],10,R))),128))])])}const O=C(A,[["render",J],["__scopeId","data-v-fa3d7bc1"]]);export{O as S};
