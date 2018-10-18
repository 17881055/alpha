<template>
  <div>
    <Card title="模版版本管理"
          shadow>
      <!--  <div style="margin:10px 0">
        <Input
            @on-change="handleClear"
            class="search-input"
            v-model="searchValue"
            placeholder="请输入模版ID..."
            clearable
            style="width: 300px" />

        <Button style="margin:0 10px"
                type="primary"
                @click="handleSearch">搜索</Button>
      </div> -->
      <Button size="small"
              slot="extra"
              type="primary"
              @click.prevent="handleAdd">新增版本</Button>
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
  </div>
</template>
<script>
import { getVersionList } from '@/api/contract';
import * as filters from '@filters';
import { mapMutations } from 'vuex';
export default {
  name: 'versionMgmt',
  data() {
    return {
      appName: null,
      templateName: null,
      loading: false,
      searchValue: null,
      columns: [
        { title: '模板版本号', width: 120, key: 'templateVersion' },
        { title: 'ID', key: 'id' },
        {
          title: '状态',
          key: 'status',
          width: 100,
          render: (h, params) => {
            let text = '禁用';
            if (params.row.status.toString() === '1') {
              text = '启动';
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
            let edit = h(
              'Button',
              {
                class: 'm-r-5 m-b-5',
                props: {
                  type: 'primary',
                  size: 'small'
                }
              },
              '修改'
            );
            let able = h(
              'Button',
              {
                class: 'm-r-5 m-b-5',
                props: {
                  type: 'primary',
                  size: 'small'
                }
              },
              '启动'
            );
            if (params.row.status.toString() === '1') {
              able = null;
              edit = null;
            }

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
                        this.handleToVersionInfo(params.row);
                      }
                    }
                  },
                  '查看'
                ),
                edit,
                able
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
    this.templateName = this.$route.params.templateName;
    this.searchValue = this.$route.query.id;
    if (this.searchValue) this.getVersionList();
  },
  mounted() {},
  watch: {
    $route: function(to, from) {
      if (this.$route.query.id && this.searchValue !== this.$route.query.id) {
        this.searchValue = this.$route.query.id;
        this.appName = this.$route.params.appName;
        this.templateName = this.$route.params.templateName;
        this.getVersionList();
      }
    }
  },
  methods: {
    ...mapMutations(['addTag']),
    handleSearch() {
      this.getVersionList();
    },
    handleAdd() {
      const route = {
        name: 'version_add',
        params: {
          appName: this.appName,
          templateName: this.templateName
        },
        query: {
          templateId: this.$route.query.id
        },
        meta: {
          title: `【${this.appName} ${this.templateName}】新增版本`
        }
      };
      /* this.addTag({
        route: route,
        type: 'push'
      }); */
      this.$router.push(route);
    },
    handleClear(e) {
      if (e.target.value === '') {
        this.tableData = [];
        this.tableTotalPage = null;
      }
    },
    handleToVersionInfo(item) {
      const route = {
        name: 'version_page',
        query: {
          id: item.id
        },
        meta: {
          title: `【${this.appName} ${this.templateName} ${
            item.templateVersion
          }】版本信息`
        }
      };
      /* this.addTag({
        route: route,
        type: 'push'
      }); */
      this.$router.push(route);
    },
    getVersionList() {
      this.loading = true;
      getVersionList(this.searchValue).then(res => {
        this.loading = false;
        this.tableTotalPage = res.data.content.totalPage;
        this.tableData = res.data.content.items;
      });
    }
  }
};
</script>

<style>
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
