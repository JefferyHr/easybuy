import{_ as D,i as k,u as I,B as S,v as g,r as B,a as c,o as r,c as E,w as F,A as L,d as l,g as t,f as d,l as N,j as q,t as s,h as R,F as V,I as j}from"./index.c95de30c.js";const A={class:"home-brick-box pt-20 bg-[rgb(245,245,245)]"},G={class:"base-width flex flex-row"},H={class:"brick-list"},P=["onClick"],U={class:"w-[160px] h-[160px] mx-auto my-20"},z={class:"w-full p-10 text-box"},J={class:"text-[14px] w-full text-center"},O={class:"w-full text-[12px] truncate m-5 text-gray-300"},T={class:"text-primaryColor text-[14px] text-center"},$={class:"text-gray-400 ml-2"},K={key:0,class:"py-10 flex flex-row justify-between base-width"},M={class:"text-gray-500 text-[14px]"},Q={__name:"Search",setup(W){const u=k("baseURL"),x=I(),i=S(),n=g({pageIndex:1,products_id:"",goods_name:""}),o=g({listData:[],pageStart:1,pageEnd:1,totalCount:0,pageCount:0}),h=B(!1),p=()=>{L.goodsInfo.getListByPage(n).then(e=>{e.listData.forEach(_=>{_.goods_photo=JSON.parse(_.goods_photo)}),o.listData=e.listData,o.pageStart=e.pageStart,o.pageEnd=e.pageEnd,o.totalCount=e.totalCount,o.pageCount=e.pageCount}).finally(()=>{h.value=!1})};n.goods_name=i.query.goods_name,n.products_id=i.query.products_id,p();const f=e=>{n.pageIndex=e,p()},m=e=>{window.open(x.resolve({name:"GoodsDetail",params:{id:e.id}}).href)};return(e,_)=>{const v=c("Header"),y=c("el-image"),C=c("el-pagination"),w=c("Footer"),b=c("page-view");return r(),E(b,null,{default:F(()=>[l(v),t("div",A,[t("div",G,[t("div",H,[(r(!0),d(V,null,N(o.listData,(a,X)=>(r(),d("div",{key:a.id,class:"brick-item cursor-pointer",onClick:Y=>m(a)},[t("a",null,[t("div",U,[l(y,{src:q(u)+a.goods_photo[0],class:"figure-img",lazy:""},null,8,["src"])]),t("div",z,[t("div",J,s(a.goods_name),1),t("div",O,s(a.goods_brief_o),1),t("div",T,[R(s(a.goods_sale_price)+"\u5143\u8D77 ",1),t("del",$,s(a.goods_price)+"\u5143",1)])])])],8,P))),128))])]),o.listData.length>0?(r(),d("div",K,[t("p",M,"\u5F53\u524D\u7B2C"+s(n.pageIndex)+"\u9875\uFF0C\u5171"+s(o.pageCount)+"\u9875\uFF0C\u5171"+s(o.totalCount)+"\u6761",1),l(C,{background:"",layout:"prev, pager, next","current-page":n.pageIndex,onCurrentChange:f,total:o.totalCount},null,8,["current-page","total"])])):j("",!0)]),l(w)]),_:1})}}},ee=D(Q,[["__scopeId","data-v-f2585170"]]);export{ee as default};