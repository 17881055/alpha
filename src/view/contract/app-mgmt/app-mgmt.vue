<template>
  <div>
    <Card title="应用管理"
          shadow>
      <Button size="small"
              slot="extra"
              type="primary"
              @click.prevent="handleAdd">新增应用</Button>

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
           title="新增应用">
      <Form :model="formItem"
            ref="modalAdd"
            :rules="ruleValidate"
            :label-width="80">
        <form-item label="应用名称"
                   prop="appName">
          <Input v-model="formItem.appName"
                 placeholder="应用名称..." />
        </form-item>
        <form-item label="应用编号"
                   prop="appNo">
          <Input v-model="formItem.appNo"
                 placeholder="应用编号..." />
        </form-item>
        <form-item label="应用秘钥"
                   prop="appSecret">
          <Input v-model="formItem.appSecret"
                 placeholder="应用秘钥..." />
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
           title="应用信息">
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
          <Input :disabled="!canEdit"
                 v-model="formItem.appName"
                 placeholder="应用名称..." />
        </form-item>
        <form-item label="ID">
          <Input disabled
                 v-model="formItem.id" />
        </form-item>
        <form-item label="应用编号">
          <Input disabled
                 v-model="formItem.appNo" />
        </form-item>
        <form-item label="应用秘钥"
                   prop="appSecret">
          <Input :disabled="!canEdit"
                 v-model="formItem.appSecret"
                 placeholder="应用秘钥..." />
        </form-item>
        <Row>
          <Col span="12">
          <form-item label="创建时间">
            <Input disabled
                   v-model="formItem.createTime" />
          </form-item>
          </Col>
          <Col span="12">
          <form-item label="更新时间">
            <Input disabled
                   v-model="formItem.updateTime" />
          </form-item>
          </Col>
        </Row>
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
          <Input :disabled="!canEdit"
                 v-model="formItem.description"
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
import { getAppList, addApp, updateApp } from '@/api/contract';
import * as filters from '@filters';
import { mapMutations } from 'vuex';
export default {
  name: 'AppMgmt',
  data() {
    return {
      loading: false,
      modalAddShow: false,
      modalInfoShow: false,
      canEdit: false,
      formItem: {
        appName: null,
        appNo: null,
        appSecret: null,
        description: null,
        id: null
      },
      ruleValidate: {
        appName: [
          {
            required: true,
            message: '应用名称不能为空'
          }
        ],
        appNo: [
          {
            required: true,
            message: '应用编号不能为空'
          }
        ],
        appSecret: [
          {
            required: true,
            message: '应用秘钥不能为空'
          }
        ]
      },
      columns: [
        { title: '应用名称', key: 'appName' },
        { title: '应用编号', key: 'appNo' },
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
                  '详情'
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
                        this.handleToTemplate(params.row);
                      }
                    }
                  },
                  '相关模版'
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
  mounted() {
    this.getAppList();
  },
  methods: {
    ...mapMutations(['addTag']),
    handleAdd() {
      this.modalAddShow = true;
    },
    handleModalAdd() {
      this.$refs.modalAdd.validate(valid => {
        if (valid) {
          let reqAppInfoBO = {
            ...this.formItem
          };
          this.loading = true;
          addApp(reqAppInfoBO).then(res => {
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
              this.getAppList();
            }
          });
        }
      });
    },
    handleToInfo(item) {
      this.modalInfoShow = true;
      this.$nextTick(function() {
        this.formItem = {
          ...item,
          createTime: filters.formatDate(item.createTime),
          updateTime: filters.formatDate(item.updateTime),
          status: item.status.toString() === '1' ? '启用' : '停用'
        };
      });
    },
    handleToEdit(item) {
      this.modalInfoShow = true;
      this.$nextTick(function() {
        this.canEdit = true;
        this.formItem = {
          ...item,
          createTime: filters.formatDate(item.createTime),
          updateTime: filters.formatDate(item.updateTime),
          status: item.status.toString() === '1' ? '启用' : '停用'
        };
      });
    },
    handleToTemplate(item) {
      const route = {
        name: 'template_mgmt_page',
        params: {
          appName: item.appName
        },
        query: {
          appId: item.id
        },
        meta: {
          title: `【${item.appName}】模版管理`
        }
      };
      this.addTag({
        route: route,
        type: 'push'
      });
      this.$router.push(route);
    },
    handleModalEdit() {
      this.canEdit = true;
    },
    handleModalUpdate() {
      this.$refs.modalAdd.validate(valid => {
        if (valid) {
          let reqAppInfoBO = {
            ...this.formItem
          };
          this.loading = true;
          updateApp(reqAppInfoBO).then(res => {
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
              this.getAppList();
            }
          });
        }
      });
    },
    handleModalInfoClose() {
      this.modalInfoShow = false;
      this.handleModalClose();
    },
    handleModalClose() {
      this.formItem = {
        appName: null,
        appNo: null,
        appSecret: null,
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
    getAppList() {
      this.loading = true;
      getAppList().then(res => {
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
