import Main from '@/view/main';
import parentView from '@/components/parent-view';

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/contract',
    name: 'contract',
    meta: {
      showAlways: true,
      icon: 'md-contacts',
      title: '协议管理',
    },
    component: Main,
    children: [
      {
        path: 'app_mgmt_page',
        name: 'app_mgmt_page',
        meta: {
          icon: 'md-trending-up',
          title: '应用管理'
        },
        component: () => import('@/view/contract/app-mgmt/app-mgmt.vue')
      },
      {
        path: 'template_mgmt_page',
        name: 'template_mgmt_page',
        meta: {
          hideInMenu: true,
          icon: 'ios-infinite',
          notCache: true,
          title: '模版管理'
        },
        component: () =>
          import('@/view/contract/template-mgmt/template-mgmt.vue')
      },
      {
        path: 'version_mgmt_page',
        name: 'version_mgmt_page',
        meta: {
          hideInMenu: true,
          icon: 'md-grid',
          notCache: true,
          title: '模版版本管理',
        },
        component: () => import('@/view/contract/version-mgmt/version-mgmt.vue')
      },
      {
        path: 'version_page',
        name: 'version_page',
        meta: {
          hideInMenu: true,
          icon: 'md-grid',
          title: '模版版本'
        },
        component: () => import('@/view/contract/version-mgmt/version-page.vue')
      },
      {
        path: 'version_add',
        name: 'version_add',
        meta: {
          hideInMenu: true,
          icon: 'md-grid',
          title: '新增版本'
        },
        component: () => import('@/view/contract/version-mgmt/version-add.vue')
      }
    ]
  },
  /*  {
    path: "",
    name: "doc",
    meta: {
      title: "文档",
      href: "https://lison16.github.io/iview-admin-doc/#/",
      icon: "ios-book"
    }
  }, */
  /*  {
    path: "/join",
    name: "join",
    component: Main,
    children: [
      {
        path: "join_page",
        name: "join_page",
        meta: {
          icon: "_qq",
          title: "QQ群"
        },
        component: () => import("@/view/join-page.vue")
      }
    ]
  }, */
  {
    path: '/components',
    name: 'components',
    meta: {
      showAlways: true,
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'pdf_view',
        name: 'pdf_view',
        meta: {
          icon: 'md-eye',
          title: 'PDF阅读器'
        },
        component: () => import('@/view/components/pdf-view/pdf-view.vue')
      },
      {
        path: 'viewer_page',
        name: 'viewer_page',
        meta: {
          icon: 'md-eye',
          title: '多功能阅读器'
        },
        component: () => import('@/view/components/viewer_page/viewer_page.vue')
      }
      /*  {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      } */
    ]
  },
  /*  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  }, */
  /*  {
    path: "/excel",
    name: "excel",
    meta: {
      icon: "ios-stats",
      title: "EXCEL导入导出"
    },
    component: Main,
    children: [
      {
        path: "upload-excel",
        name: "upload-excel",
        meta: {
          icon: "md-add",
          title: "导入EXCEL"
        },
        component: () => import("@/view/excel/upload-excel.vue")
      },
      {
        path: "export-excel",
        name: "export-excel",
        meta: {
          icon: "md-download",
          title: "导出EXCEL"
        },
        component: () => import("@/view/excel/export-excel.vue")
      }
    ]
  },
  {
    path: "/tools_methods",
    name: "tools_methods",
    meta: {
      hide: true
    },
    component: Main,
    children: [
      {
        path: "tools_methods_page",
        name: "tools_methods_page",
        meta: {
          icon: "ios-hammer",
          title: "工具方法"
        },
        component: () => import("@/view/tools-methods/tools-methods.vue")
      }
    ]
  },
  {
    path: "/directive",
    name: "directive",
    meta: {
      hide: true
    },
    component: Main,
    children: [
      {
        path: "directive_page",
        name: "directive_page",
        meta: {
          icon: "ios-navigate",
          title: "指令"
        },
        component: () => import("@/view/directive/directive.vue")
      }
    ]
  }, */

  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: '动态路由',
          notCache: true
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: '带参路由',
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
];
