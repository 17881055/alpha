<template>
  <div>
    <Card title="PDF 阅读器">
      <Input style="width:500px"
             enter-button="查看"
             v-model="pdfUrl"
             placeholder="输入 pdf url..." />
      <Button class="m-l-5"
              type="primary"
              @click="handleSearch">查 看</Button>
      <div>
        <pdf-viewer ref="pdfViewer"
                    class="canvas-wrap"
                    style="margin:20px 0 0">

        </pdf-viewer>
      </div>

    </Card>
  </div>

</template>
<script>
import PdfViewer from '_c/pdf-viewer';
export default {
  name: 'pdf-view',
  components: {
    PdfViewer
  },
  data() {
    return {
      //'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
      pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
      loading: false
    };
  },
  mounted() {},
  methods: {
    handleSearch() {
      // console.log('url', this.pdfUrl);
      if (!this.pdfUrl) return;
      this.$refs.pdfViewer.setUrl(this.pdfUrl);
    }
  }
};
</script>

<style scoped>
.text-right {
  text-align: right;
}
.m-l-5 {
  margin-left: 5px;
}
.m-b-5 {
  margin-bottom: 5px;
}
.m-t-5 {
  margin-top: 5px;
}

.m-r-5 {
  margin-right: 5px;
}
.page-wrap {
  text-align: right;
  margin: 10px 0;
}
.wrap {
  margin: 10px;
}

.canvas-wrap {
  width: 100%;
  height: 800px;
}
</style>
