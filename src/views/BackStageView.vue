<template>
  <h1 class="text-center">WEEK4後台1 | Backstage</h1>
  <Upload-Images></Upload-Images>
  <div class="container">
    <div class="text-end mt-4">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModal('new', product)"
      >
        建立新產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>NT${{ product.origin_price }}</td>
          <td>NT${{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- props -->
    <pagination :page-in="page" :get-product-list="getProductList"></pagination>
    <!-- $emit -->
    <!-- <pagination2 :page-in="page" :get-product-list="getProductList" @change-page="getProductList"></pagination2> -->
  </div>

  <!-- 新增or編輯 Modal start-->
  <ProductModal
    :inner-temp-data="tempData"
    @update="getProductList"
    :is-new="isNew"
    ref="editProductModal"
  >
  </ProductModal>
  <!-- <ProductModal
    :temp-data="tempData"
    @update="getProductList"
    :is-new="isNew"
    ref="editProductModal"
  >
  </ProductModal> -->

  <!-- 新增or編輯 Modal end-->

  <!-- 刪除 Modal start-->
  <delete-modal
    :temp-data="tempData"
    @update="getProductList"
    ref="deleteProductModal"
  ></delete-modal>
  <!-- 刪除 Modal end-->
</template>

<script>
import UploadImages from "../components/UploadImages.vue";
import DeleteModal from "../components/DeleteModal.vue";
import ProductModal from "../components/ProductModal.vue";
export default {
  data() {
    return {
      //產品資料
      products: [],
      page: {},
      isNew: false, //判斷是否為新增or編輯
      tempData: {
        //暫存各產品modal的資料
        imagesUrl: [],
        flavor: "",
      },
    };
  },
  methods: {
    //登入驗證
    checkAdmin() {
      const api_url = import.meta.env.VITE_URL;
      this.$http
        .post(`${api_url}/api/user/check`)
        .then((res) => {
          console.log(res.data);
          //使用此api後驗證後再取得資料
          this.getProductList();
        })
        .catch((error) => {
          console.log(error.message);
          alert("請先登入帳號密碼喔～不要偷懶(ゝ∀･)b 感謝你！");
          this.$router.back();
        });
    },
    //取得產品列表
    getProductList(page = 1) {
      const api_url = import.meta.env.VITE_URL;
      const api_path = import.meta.env.VITE_PATH;
      this.$http
        .get(`${api_url}/api/${api_path}/admin/products/?page=${page}`)
        .then((res) => {
          this.page = res.data.pagination;
          this.products = res.data.products;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    //確認開啟的modal類別
    openModal(state, product) {
      if (state === "new") {
        this.tempData = {
          imagesUrl: [],
        };
        this.$refs.editProductModal.show();
        this.isNew = true;
      } else if (state === "edit") {
        this.$refs.editProductModal.show();
        this.tempData = { ...product };
        console.log(this.tempData);
        this.isNew = false;
      } else if (state === "delete") {
        this.$refs.deleteProductModal.show();
        this.tempData = { ...product };
        this.isNew = false;
      }
    },
  },
  //區域註冊
  components: {
    // pagination,
    ProductModal,
    DeleteModal,
    UploadImages,
  },
  mounted() {
    //取出Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)week2HexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common["Authorization"] = token;
    this.checkAdmin();
  },
};
</script>
