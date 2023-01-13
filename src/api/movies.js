/* eslint-disable prettier/prettier */
import request from "../utils/request"

export function loadMovies(data) {
    return request({
      url: '/api/movies',
      method: 'get',
      data: data
  });
}
export function filterMovies(data) {
  return request({
    url: '/api/moviesByCategory/'+data.category_id,
    method: 'get',
});
}


export function loadMovie(data) {
  return request({
    url: '/api/movies/'+data.id,
    method: 'get'
  });
}

export function saveMovie(data) {
  return request({
    url: '/api/movies' +( data.id ? '/'+ data.id : ''),
    method: 'post',
    data: data.data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteMovie(data) {
  return request({
    url: '/api/movies/'+data.id,
    method: 'delete'
  });
}
