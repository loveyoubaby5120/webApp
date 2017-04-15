import * as $ from 'jquery';
import 'jquery.cookie';
import {buildURL} from 'common/url';

export function csrfToken() {
  if ($('#csrf').data('csrf')) {
    return $('#csrf').data('csrf');
  }
  return $.cookie('csrftoken');
}

export function ajaxPost(url: string, data: Object, done: (result: any) => void, error: (error: any) => void) {
  $.ajax({
    type: 'POST',
    url: url,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(data),
    beforeSend: (xhr) => {
      xhr.setRequestHeader('X-CSRFToken', csrfToken());
    },
  }).done(done).fail(error);
}

export function ajaxPostForm(
  url: string,
  data: Object,
  done: (result: any) => void,
  error: (error: any) => void,
  withDataWrapper: boolean = true) {
  $.ajax({
    type: 'POST',
    url: url,
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: withDataWrapper ? {data: JSON.stringify(data)} : data,
    beforeSend: (xhr) => {
      xhr.setRequestHeader('X-CSRFToken', csrfToken());
    },
  }).done(done).fail(error);
}

export function ajaxGet(url: string, done: (result: any) => void, error: (error: any) => void) {
  $.ajax({
    type: 'GET',
    url: url,
    beforeSend: (xhr) => {
      xhr.setRequestHeader('X-CSRFToken', csrfToken());
    },
  }).done(done).fail(error);
}

export function ajaxPostFormData(
  url: string,
  data: FormData,
  done: (result: any) => void,
  error: (error: any) => void) {
  $.ajax({
    type: 'POST',
    url: url,
    contentType: false,
    data: data,
    processData: false,
    beforeSend: (xhr) => {
      xhr.setRequestHeader('X-CSRFToken', csrfToken());
    },
  }).done(done).fail(error);
}

export function postPromise(url: string, data: Object): Promise<any> {
  return new Promise((resolve, reject) => {
    ajaxPost(url, data, resolve, reject);
  });
}

export function getPromise(url: string, param?: Object): Promise<any> {
  const full = buildURL(url, param);
  return new Promise((resolve, reject) => {
    ajaxGet(full, resolve, reject);
  });
}

export function postFormPromise(url: string, data: Object, withDataWrapper: boolean = true): Promise<any> {
  return new Promise((resolve, reject) => {
    ajaxPostForm(url, data, resolve, reject, withDataWrapper);
  });
}

export function postFormDataPromise(url: string, data: FormData): Promise<any> {
  return new Promise((resolve, reject) => {
    ajaxPostFormData(url, data, resolve, reject);
  });
}
