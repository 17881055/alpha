<template>
  <div>
    <Card title="模版版本详情"
          shadow>
      <div style="margin:10px 0">
        <Row type="flex"
             justify="start"
             class="code-row-bg">
          <Col span="6">
          <span> 模板ID ：</span>
          <Input disabled
                 style="width: auto"
                 :value="templateId" />
          </Col>
          <Col span="6">
          <span> 版本ID：</span>
          <Input disabled
                 style="width: auto"
                 :value="id" />
          </Col>
          <Col span="6">
          <span> 模板版本号：</span>
          <Input disabled
                 style="width: auto"
                 :value="templateVersion" />
          </Col>
        </Row>
        <Row style="margin:20px 0"
             type="flex"
             justify="start"
             class="code-row-bg">
          <Col span="6">
          <span> 创建时间：</span>
          <Input disabled
                 style="width: auto"
                 :value="createTime" />
          </Col>
          <Col span="6">
          <span> 更新时间：</span>
          <Input disabled
                 style="width: auto"
                 :value="updateTime" />
          </Col>
        </Row>

      </div>
      <div class="text-right"
           v-if="status==='1'">
        <Button class="m-r-5"
                size="small"
                type="primary"
                @click.prevent="handleAdd">编辑</Button>
        <Button type="primary"
                size="small"
                @click.prevent="handleAdd">保存</Button>
      </div>

      <paste-editor class="m-t-5"
                    ref="editor"
                    style="height:500px"
                    :pasteData="templateContent" />

      <!--  <editor class="m-t-5"
              ref="editor"
              :value="templateContent"
              @on-change="handleChange" /> -->
    </Card>
  </div>
</template>

<script>
import { getVersionInfo } from '@/api/contract';
import Editor from '_c/editor';
import PasteEditor from '_c/paste-editor';
import * as filters from '@filters';
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
      id: null,
      status: null,
      templateId: null,
      templateVersion: null,
      createTime: null,
      updateTime: null,
      templateContent: null
    };
  },
  created() {
    this.appName = this.$route.params.appName;
    this.templateName = this.$route.params.templateName;
    this.id = this.$route.query.id;
    if (this.id) this.getVersionInfo();
  },
  mounted() {},

  methods: {
    handleChange(html, text) {
      // console.log(html);
    },
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
        this.$refs.editor.setValue(this.templateContent);
        // this.$refs.editor.html(this.templateContent);
        // this.$refs.editor.disable();
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
