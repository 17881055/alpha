import axios from '@/libs/api.request';
/**
 **************************************************************
 *           应用管理                                          *
 **************************************************************
 */
export const getAppList = () => {
  return axios.request({
    url: '/appInfo/list',
    method: 'get'
  });
};

export const addApp = reqAppInfoBO => {
  return axios.request({
    url: '/appInfo/add',
    data: reqAppInfoBO,
    method: 'post'
  });
};

// 修改应用，不允许修改appNo
export const updateApp = reqAppInfoBO => {
  return axios.request({
    url: '/appInfo/update',
    data: reqAppInfoBO,
    method: 'post'
  });
};

// 获取应用信息
export const getAppInfo = id => {
  return axios.request({
    url: `/appInfo/${id}`,
    method: 'get'
  });
};

/**
 **************************************************************
 *           模版管理                                          *
 **************************************************************
 */
export const getTemplateList = (appId, pageNum = 1, pageSize = 10) => {
  return axios.request({
    url: '/template/list',
    params: {
      appId,
      pageNum,
      pageSize
    },
    method: 'get'
  });
};

export const addTemplate = reqTemplateBO => {
  return axios.request({
    url: '/template/add',
    data: reqTemplateBO,
    method: 'post'
  });
};

export const updateTemplate = reqTemplateBO => {
  return axios.request({
    url: '/template/update',
    data: reqTemplateBO,
    method: 'post'
  });
};

export const getTemplateInfo = id => {
  return axios.request({
    url: `/template/${id}`,
    method: 'get'
  });
};

/**
 **************************************************************
 *           版本                                             *
 **************************************************************
 */
export const getVersionList = (templateId, pageNum = 1, pageSize = 10) => {
  return axios.request({
    url: '/template/version/list',
    params: {
      templateId,
      pageNum,
      pageSize
    },
    method: 'get'
  });
};

export const addVersion = templateBO => {
  return axios.request({
    url: '/template/version/add',
    data: templateBO,
    method: 'post'
  });
};

export const enableVersion = id => {
  return axios.request({
    url: '/template/version/enable',
    data: {
      id
    },
    method: 'put'
  });
};

// 获取最新版本信息
export const getLatestVersion = templateId => {
  return axios.request({
    url: '/template/version/latest/',
    params: {
      templateId
    },
    method: 'get'
  });
};

// 预览协议
export const previewContractVersion = previewContractBO => {
  return axios.request({
    url: '/template/version/previewContract',
    data: {
      previewContractBO
    },
    method: 'post'
  });
};

// 修改版本信息，启用的版本不能被编辑
export const updateVersion = templateBO => {
  return axios.request({
    url: '/template/version/update',
    data: {
      template: templateBO
    },
    method: 'post'
  });
};

// 获取具体模板版本信息;
export const getVersionInfo = id => {
  return axios.request({
    url: `/template/version/${id}`,
    method: 'get'
  });
};
