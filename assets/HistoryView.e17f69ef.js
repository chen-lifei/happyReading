import{B as t,a as d}from"./BookDetail.9b91687d.js";import{d as i,I as c,k as F,F as r,ab as n,x as l,j as B,B as _,y as p,Y as m,Z as k,q as u,a2 as A}from"./index.cc8f0ae0.js";const h=E=>(m("data-v-bd887575"),E=E(),k(),E),v={class:"history-view"},f={key:0,class:"book-wrapper"},y=h(()=>u("div",{class:"data-wrapper"},[u("div",{class:"tag-list"},[u("div",{class:"tag"},"\u4EBA\u6587"),u("div",{class:"tag"},"\u6587\u5B66"),u("div",{class:"tag"},"\u79D1\u5E7B"),u("div",{class:"tag"},"\u65C5\u6E38\u7EAA\u5B9E\u6587\u5B66")]),u("div",{class:"time"},"2022/08/05 08:05")],-1)),b=i({__name:"HistoryView",setup(E){const D=c({bookList:[{name:"\u661F\u6C49\u707F\u70C2",author:"\u5C0F\u732A\u4F69\u5947",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u661F\u6C49\u707F\u70C2",author:"\u5C0F\u732A\u4F69\u5947",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u6211\u548C\u6211\u7684\u7956\u56FD",author:"\u5C0F\u732A\u4F69\u5947",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u6211\u548C\u6211\u7684\u7956\u56FD",author:"\u5C0F\u732A\u4F69\u5947",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u9633\u5149\u4E0B\u7684\u4E00\u7C92\u575A\u5F3A\u7684\u5C18\u57C3",author:"\u65E0\u540D",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u9633\u5149\u4E0B\u7684\u4E00\u7C92\u575A\u5F3A\u7684\u5C18\u57C3",author:"\u65E0\u540D",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u9633\u5149\u4E0B\u7684\u4E00\u7C92\u575A\u5F3A\u7684\u5C18\u57C3",author:"\u65E0\u540D",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u9633\u5149\u4E0B\u7684\u4E00\u7C92\u575A\u5F3A\u7684\u5C18\u57C3",author:"\u65E0\u540D",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u6211\u548C\u6211\u7684\u7956\u56FD",author:"\u5C0F\u732A\u4F69\u5947",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u6211\u548C\u6211\u7684\u7956\u56FD",author:"\u5C0F\u732A\u4F69\u5947",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u9633\u5149\u4E0B\u7684\u4E00\u7C92\u575A\u5F3A\u7684\u5C18\u57C3",author:"\u65E0\u540D",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"},{name:"\u9633\u5149\u4E0B\u7684\u4E00\u7C92\u575A\u5F3A\u7684\u5C18\u57C3",author:"\u65E0\u540D",desc:"\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57\u8FD9\u662F\u4E00\u6BB5\u4ECB\u7ECD\u6587\u5B57"}],showBookDetail:!1});function e(a){D.showBookDetail=a}return(a,C)=>(B(),F("div",v,[D.showBookDetail?(B(),l(t,{key:1,class:"book-detail",onBack:C[1]||(C[1]=s=>e(!1))})):(B(),F("div",f,[(B(!0),F(r,null,n(D.bookList,(s,o)=>(B(),F("div",{class:"book-item",key:o,onClick:C[0]||(C[0]=w=>e(!0))},[_(d,{bookInfo:s,displayType:"list"},{default:p(()=>[y]),_:2},1032,["bookInfo"])]))),128))]))]))}});const x=A(b,[["__scopeId","data-v-bd887575"]]);export{x as default};
