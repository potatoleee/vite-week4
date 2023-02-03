import{_,o as c,c as r,a as t,t as p,r as h,b as u,F as m,d as w}from"./index-a5ada92f.js";const $={data(){return{uploadImages:""}},methods:{upload(s){const e=s.target.files[0];let i=e.name.substring(e.name.lastIndexOf(".")+1);if(i!=="jpg"&&i!=="JPG"&&i!=="png"){alert("上傳檔案只能是 jpg、png 格式!，請注意格式上傳呦");return}const n=new FormData;n.append("file-to-upload",e);const a="https://vue3-course-api.hexschool.io/v2",o="week3dean";this.$http.post(`${a}/api/${o}/admin/upload`,n).then(d=>{this.uploadImages=d.data.imageUrl,alert("圖片上傳成功")}).catch(d=>{alert(d.response.data.message)})}}},v={class:"container mt-4"},y=t("h2",null,"圖片上傳區",-1),x=t("label",{for:"file",class:"mb-2"},"圖片檔案僅接受 jpg、png 格式，感謝配合～",-1),P=["href"],U={class:"break-word"};function D(s,e,i,n,a,o){return c(),r("div",v,[y,x,t("input",{type:"file",class:"form-control mb-2",id:"file",placeholder:"請輸入圖片連結",onChange:e[0]||(e[0]=(...d)=>o.upload&&o.upload(...d))},null,32),t("a",{href:a.uploadImages,target:"_blank"},"上傳的圖片連結",8,P),t("p",U,p(a.uploadImages),1)])}const M=_($,[["render",D]]),N={data(){return{products:[],page:{},isNew:!1,tempData:{imagesUrl:[],flavor:""}}},methods:{checkAdmin(){const s="https://vue3-course-api.hexschool.io/v2";this.$http.post(`${s}/api/user/check`).then(e=>{console.log(e.data),this.getProductList()}).catch(e=>{console.log(e.message),alert("請先登入帳號密碼喔～不要偷懶(ゝ∀･)b 感謝你！"),this.$router.back()})},getProductList(s=1){const e="https://vue3-course-api.hexschool.io/v2",i="week3dean";this.$http.get(`${e}/api/${i}/admin/products/?page=${s}`).then(n=>{this.page=n.data.pagination,this.products=n.data.products}).catch(n=>{alert(n.response.data.message)})},openModal(s,e){s==="new"?(this.tempData={imagesUrl:[]},this.$refs.editProductModal.show(),this.isNew=!0):s==="edit"?(this.$refs.editProductModal.show(),this.tempData={...e},this.isNew=!1):s==="delete"&&(this.$refs.deleteProductModal.show(),this.tempData={...e},this.isNew=!1)}},components:{UploadImages:M},mounted(){const s=document.cookie.replace(/(?:(?:^|.*;\s*)week2HexToken\s*\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=s,this.checkAdmin()}},I=t("h1",{class:"text-center"},"WEEK4後台 | Backstage",-1),C={class:"container"},L={class:"text-end mt-4"},B={class:"table mt-4"},T=t("thead",null,[t("tr",null,[t("th",{width:"120"},"分類"),t("th",null,"產品名稱"),t("th",{width:"120"},"原價"),t("th",{width:"120"},"售價"),t("th",{width:"100"},"是否啟用"),t("th",{width:"120"},"編輯")])],-1),j={key:0,class:"text-success"},A={key:1},E={class:"btn-group"},F=["onClick"],V=["onClick"];function S(s,e,i,n,a,o){const d=h("Upload-Images"),g=h("pagination"),f=h("product-modal"),b=h("delete-modal");return c(),r(m,null,[I,u(d),t("div",C,[t("div",L,[t("button",{type:"button",class:"btn btn-primary",onClick:e[0]||(e[0]=l=>o.openModal("new",s.product))}," 建立新產品 ")]),t("table",B,[T,t("tbody",null,[(c(!0),r(m,null,w(a.products,l=>(c(),r("tr",{key:l.id},[t("td",null,p(l.category),1),t("td",null,p(l.title),1),t("td",null,"NT$"+p(l.origin_price),1),t("td",null,"NT$"+p(l.price),1),t("td",null,[l.is_enabled?(c(),r("span",j,"啟用")):(c(),r("span",A,"未啟用"))]),t("td",null,[t("div",E,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:k=>o.openModal("edit",l)}," 編輯 ",8,F),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:k=>o.openModal("delete",l)}," 刪除 ",8,V)])])]))),128))])]),u(g,{"page-in":a.page,"get-product-list":o.getProductList},null,8,["page-in","get-product-list"])]),u(f,{"temp-data":a.tempData,onUpdate:o.getProductList,"is-new":a.isNew,ref:"editProductModal"},null,8,["temp-data","onUpdate","is-new"]),u(b,{"temp-data":a.tempData,onUpdate:o.getProductList,ref:"deleteProductModal"},null,8,["temp-data","onUpdate"])],64)}const G=_(N,[["render",S]]);export{G as default};