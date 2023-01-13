/* eslint-disable prettier/prettier */
import request from "../utils/request"

export function loginUser(data) {
    return request({
      url: '/api/login',
      method: 'post',
      data: data
  });
}
export function registerUser(data) {
  return request({
    url: '/api/register',
    method: 'post',
    data: data
});
}