<template>
  <div>
    <Card title="新增模版版本"
          shadow>
      <div style="margin:10px 0">
        <Row type="flex"
             justify="start"
             class="code-row-bg">
          <Col span="6">
          <span> 应用名称 ：</span>
          <Input disabled
                 style="width: auto"
                 :value="appName" />
          </Col>
          <Col span="6">
          <span> 模板ID ：</span>
          <Input disabled
                 style="width: auto"
                 :value="templateId" />
          </Col>
          <Col span="6">
          <span> 模版名称 ：</span>
          <Input disabled
                 style="width: auto"
                 :value="templateName" />
          </Col>
        </Row>
      </div>
      <div class="text-right">
        <Button class="m-r-5"
                size="small"
                type="primary"
                @click.prevent="handlePreview">预览</Button>
        <Button type="primary"
                size="small"
                @click.prevent="handleAdd">保存</Button>
      </div>

      <paste-editor class="m-t-5"
                    style="height:500px"
                    v-model="templateContent"
                    :pasteData="templateContent" />

      <!--  <editor class="m-t-5"
              ref="editor"
              :value="templateContent"
              @on-change="handleChange" /> -->
    </Card>
  </div>
</template>
<script>
import { addVersion } from '@/api/contract';
import { mapMutations } from 'vuex';
import PasteEditor from '_c/paste-editor';
import Editor from '_c/editor';
export default {
  components: {
    Editor,
    PasteEditor
  },
  data() {
    return {
      loading: false,
      appName: null,
      templateName: null,
      templateId: null,
      templateContent: null
    };
  },
  created() {
    this.appName = this.$route.params.appName;
    this.templateName = this.$route.params.templateName;
    this.templateId = this.$route.query.templateId;
  },
  mounted() {},

  methods: {
    ...mapMutations(['addTag']),
    handlePreview() {},
    handleAdd() {
      this.add();
    },
    handleChange(html, text) {
      this.templateContent = html;
    },
    add() {
      let templateBO = {
        templateContent: this.templateContent,
        templateId: this.templateId
      };
      this.loading = true;
      addVersion(templateBO)
        .then(res => {
          this.loading = false;
          if (res.data.errorMsg) {
            this.$Notice.error({
              title: '新增失败',
              desc: res.data.errorMsg
            });
          } else {
            this.$Notice.success({
              title: '新增成功'
            });
            this.$router.back();
          }
        })
        .catch(res => {
          this.loading = false;
          this.$Notice.error({
            title: '新增失败'
          });
        });
    },
    preview() {},
    getVersionInfo() {
      this.loading = true;
      getVersionInfo(this.id).then(res => {
        this.loading = false;
        const {
          templateId,
          templateVersion,
          createTime,
          updateTime,
          templateContent,
          status
        } = res.data.content;
        this.templateId = templateId;
        this.templateVersion = templateVersion;
        this.createTime = filters.formatDate(createTime);
        this.updateTime = filters.formatDate(updateTime);
        this.templateContent = templateContent;
        this.status = status.toString();
        this.$refs.editor.setHtml(this.templateContent);
        this.$refs.editor.disable();
        // 开启编辑功能
        // this.$refs.editor.enable
      });
    }
  }
};
</script>
<style>
.text-right {
  text-align: right;
}
.code-row-bg {
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
</style>
