/* eslint-disable prettier/prettier */
import request from "../utils/request"

export function loadCategory() {
    return request({
      url: '/api/category',
      method: 'get',
  });
}

export function saveCategory(data) {
  return request({
    url: '/api/category' +( data.id ? '/'+ data.id : ''),
    method: 'post',
    data
  });
}

export function deleteCategory(data) {
  return request({
    url: '/api/category/'+data.id,
    method: 'delete',
  });
}
