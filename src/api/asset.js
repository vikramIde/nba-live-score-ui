import request from '@/utils/request'
import store from '@/store'
const base_url = store.state.app.bcBaseUrl

export function fetchAsset(query, assetType, assetId) {
  return request({
    url: typeof assetId === 'undefined' ? base_url + '/api/' + assetType + '/' : base_url + '/api/' + assetType + '/' + assetId,
    method: 'get',
    params: {}
  })
}

export function updateAsset(data, assetType, assetId) {
  return request({
    url: typeof assetId === 'undefined' ? base_url + '/api/' + assetType + '/' : base_url + '/api/' + assetType + '/' + assetId,
    method: 'put',
    data
  })
}

export function createAsset(data, assetType) {
  return request({
    url: base_url + '/api/' + assetType + '/',
    method: 'post',
    data
  })
}
