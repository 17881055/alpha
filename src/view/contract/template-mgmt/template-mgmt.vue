<template>
  <div>
    <Card title="模版管理"
          shadow>
      <div style="margin:10px 0"
           v-if="!appId">
        <Input @on-change="handleClear"
               class="search-input"
               v-model="searchValue"
               placeholder="请输入应用ID..."
               clearable
               style="width: 300px" />

        <Button style="margin:0 10px"
                type="primary"
                @click="handleSearch">搜索</Button>
      </div>
      <Button size="small"
              slot="extra"
              type="primary"
              @click.prevent="handleAdd">新增模版</Button>

      <Table stripe
             large
             :loading="loading"
             :columns="columns"
             :data="tableData">
      </Table>

      <div class="page-wrap">
        <Page :total="tableTotalPage"
              show-total />
      </div>

    </Card>

    <!-- 新增 -->
    <Modal :loading="loading"
           v-model="modalAddShow"
           @on-visible-change="handleModalClose"
           title="新增模版">
      <Form :model="formItem"
            ref="modalAdd"
            :rules="ruleValidate"
            :label-width="80">

        <form-item label="应用名称"
                   prop="appName">
          <Input disabled
                 v-model="formItem.appName" />
        </form-item>
        <form-item label="应用ID"
                   prop="appId">
          <Input :disabled="appId?true:false"
                 v-model="formItem.appId"
                 placeholder="应用ID..." />
        </form-item>
        <form-item label="模版名称"
                   prop="templateName">
          <Input v-model="formItem.templateName"
                 placeholder="模版名称..." />
        </form-item>
        <form-item label="模版编号"
                   prop="templateNo">
          <Input v-model="formItem.templateNo"
                 placeholder="模版编号..." />
        </form-item>
        <form-item label="描述"
                   prop="description">
          <Input v-model="formItem.description"
                 type="textarea"
                 :autosize="{minRows: 3,maxRows: 8}"
                 placeholder="描述..." />
        </form-item>
      </Form>
      <div slot="footer">
        <Button type="primary"
                size="large"
                :loading="loading"
                @click="handleModalAdd">确认</Button>
      </div>
    </Modal>

    <!-- 详细 & 编辑 -->
    <Modal :loading="loading"
           v-model="modalInfoShow"
           @on-visible-change="handleModalClose"
           title="新增模版">
      <div class="text-right m-b-5">
        <Button @click="handleModalEdit"
                :disabled="canEdit">编辑</Button>
      </div>

      <Form :model="formItem"
            ref="modalInfo"
            :rules="ruleValidate"
            :label-width="80">
        <form-item label="应用名称"
                   prop="appName">
          <Input disabled
                 v-model="formItem.appName" />
        </form-item>
        <form-item label="应用ID"
                   prop="appId">
          <Input :disabled="appId?true:false"
                 v-model="formItem.appId"
                 placeholder="应用ID..." />
        </form-item>
        <form-item label="模版名称"
                   prop="templateName">
          <Input v-model="formItem.templateName"
                 :disabled="!canEdit"
                 placeholder="模版名称..." />
        </form-item>
        <form-item label="模版编号"
                   prop="templateNo">
          <Input v-model="formItem.templateNo"
                 :disabled="!canEdit"
                 placeholder="模版编号..." />
        </form-item>
        <form-item label="状态">
          <Row>
            <Col span="12">
            <Input disabled
                   v-model="formItem.status" />
            </Col>
          </Row>
        </form-item>
        <form-item label="描述"
                   prop="description">
          <Input v-model="formItem.description"
                 :disabled="!canEdit"
                 type="textarea"
                 :autosize="{minRows: 3,maxRows: 8}"
                 placeholder="描述..." />
        </form-item>
      </Form>
      <div slot="footer">
        <Button type="text"
                size="large"
                :loading="loading"
                @click="handleModalInfoClose">取消</Button>
        <Button v-if="canEdit"
                type="primary"
                size="large"
                :loading="loading"
                @click="handleModalUpdate">确认</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import { getTemplateList, addTemplate, updateTemplate } from '@/api/contract';
import { mapMutations } from 'vuex';
import * as filters from '@filters';
export default {
  name: 'templateMgmt',
  data() {
    return {
      loading: false,
      searchValue: null,
      appId: null,
      appName: null,
      modalInfoShow: false,
      modalAddShow: false,
      canEdit: false,
      formItem: {
        templateName: null,
        templateNo: null,
        appId: null,
        appName: null,
        description: null,
        id: null
      },
      ruleValidate: {
        templateName: [
          {
            required: true,
            message: '模版名称不能为空'
          }
        ],
        appId: [
          {
            required: true,
            message: '模版编号不能为空'
          }
        ],
        templateNo: [
          {
            required: true,
            message: '模版编号不能为空'
          }
        ]
      },
      columns: [
        { title: '模版名称', key: 'templateName' },
        { title: '模板编号', key: 'templateNo' },
        { title: 'ID', key: 'id' },
        {
          title: '状态',
          key: 'status',
          width: 100,
          render: (h, params) => {
            let text = '禁用';
            if (params.row.status.toString() === '1') {
              text = '启用';
            }
            return h('span', text);
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('div', filters.formatDate(params.row.createTime));
          }
        },
        {
          title: '更新时间',
          key: 'updateTime ',
          render: (h, params) => {
            return h('div', filters.formatDate(params.row.updateTime));
          }
        },
        {
          title: '操作',
          key: 'oper',
          render: (h, params) => {
            return h(
              'div',
              {
                class: 'm-t-5 '
              },
              [
                h(
                  'Button',
                  {
                    class: 'm-r-5 m-b-5',
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: val => {
                        this.handleToInfo(params.row);
                      }
                    }
                  },
                  '查看'
                ),
                h(
                  'Button',
                  {
                    class: 'm-r-5 m-b-5',
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: val => {
                        this.handleToEdit(params.row);
                      }
                    }
                  },
                  '修改'
                ),
                h(
                  'Button',
                  {
                    class: 'm-r-5 m-b-5',
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: val => {
                        this.handleToVersion(params.row);
                      }
                    }
                  },
                  '相关版本'
                )
              ]
            );
          }
        }
      ],
      tableData: [],
      tableTotalPage: null
    };
  },
  created() {
    this.appName = this.$route.params.appName;
    this.appId = this.$route.query.appId;
    this.searchValue = this.$route.query.appId;
    if (this.searchValue) this.getTemplateList();
  },
  mounted() {},
  watch: {
    $route: function(to, from) {
      if (this.$route.query.appId && this.appId !== this.$route.query.appId) {
        this.appId = this.$route.query.appId;
        this.searchValue = this.$route.query.appId;
        this.appName = this.$route.params.appName;
        this.getTemplateList();
      }
    }
  },
  methods: {
    ...mapMutations(['addTag']),
    handleSearch() {
      this.getTemplateList();
    },
    handleToEdit(item) {
      this.modalInfoShow = true;
      this.$nextTick(function() {
        this.canEdit = true;
        this.formItem = {
          ...item,
          appName: this.appName,
          createTime: filters.formatDate(item.createTime),
          updateTime: filters.formatDate(item.updateTime),
          status: item.status.toString() === '1' ? '启用' : '停用'
        };
      });
    },
    handleToInfo(item) {
      this.modalInfoShow = true;
      this.$nextTick(function() {
        this.formItem = {
          ...item,
          appName: this.appName,
          createTime: filters.formatDate(item.createTime),
          updateTime: filters.formatDate(item.updateTime),
          status: item.status.toString() === '1' ? '启用' : '停用'
        };
      });
    },
    handleAdd() {
      this.modalAddShow = true;
      this.$nextTick(function() {
        this.formItem = {
          ...this.formItem,
          appId: this.appId,
          appName: this.appName
        };
      });
    },
    handleModalAdd() {
      this.$refs.modalAdd.validate(valid => {
        if (valid) {
          let reqTemplateBO = {
            ...this.formItem
          };
          this.loading = true;
          addTemplate(reqTemplateBO).then(res => {
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
              this.modalAddShow = false;
              this.searchValue = this.formItem.appId;
              if (this.searchValue) this.getTemplateList();
            }
          });
        }
      });
    },
    handleModalInfoClose() {
      this.modalInfoShow = false;
      this.handleModalClose();
    },
    handleModalUpdate() {
      this.$refs.modalInfo.validate(valid => {
        if (valid) {
          let reqTemplateBO = {
            ...this.formItem
          };
          this.loading = true;
          updateTemplate(reqTemplateBO).then(res => {
            this.loading = false;
            if (res.data.errorMsg) {
              this.$Notice.error({
                title: '修改失败',
                desc: res.data.errorMsg
              });
            } else {
              this.$Notice.success({
                title: '修改成功'
              });
              this.modalInfoShow = false;
              this.searchValue = this.formItem.appId;
              if (this.searchValue) this.getTemplateList();
            }
          });
        }
      });
    },
    handleModalEdit() {
      this.canEdit = true;
    },
    handleClear(e) {
      if (e.target.value === '') {
        this.tableData = [];
        this.tableTotalPage = null;
      }
    },
    handleToVersion(item) {
      const route = {
        name: 'version_mgmt_page',
        params: {
          appName: this.appName,
          templateName: item.templateName
        },
        query: {
          id: item.id
        },
        meta: {
          title: `【${this.appName} ${item.templateName}】版本管理`
        }
      };
      this.addTag({
        route: route,
        type: 'push'
      });
      this.$router.push(route);
    },
    handleModalClose() {
      this.formItem = {
        templateName: null,
        templateNo: null,
        appId: null,
        description: null,
        id: null,
        status: null,
        createTime: null,
        updateTime: null
      };
      this.canEdit = false;
      this.$refs.modalAdd.resetFields();
      this.$refs.modalInfo.resetFields();
    },
    getTemplateList() {
      this.loading = true;
      getTemplateList(this.searchValue).then(res => {
        this.loading = false;
        this.tableTotalPage = res.data.content.totalPage;
        this.tableData = res.data.content.items;
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
