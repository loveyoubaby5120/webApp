import { buildURL } from './url';
import * as $ from 'jquery';
import 'jquery.cookie';
import * as Promise from 'promise';
// let Promise = require('promise');



$(document).ajaxStart(() => { (window as any).Pace.restart(); });

function countDone(cb: (r: any) => void) {
    return (r: any) => {
        cb(r);
    };
}

export function csrfToken() {
    if ($('#csrf').data('csrf')) {
        return $('#csrf').data('csrf');
    }
    return $.cookie('csrftoken');
}

export function ajaxPost(url: string, data: object, done: (result: any) => void, error: (error: any) => void) {

    $.ajax({
        type: 'POST',
        url,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        beforeSend: (xhr) => {
            xhr.setRequestHeader('X-CSRFToken', csrfToken());
        },
    }).done(countDone(done)).fail(countDone((err) => {
        console.warn(url, err);
        error(err);
    }));
}

export function ajaxPostForm(
    url: string,
    data: object,
    done: (result: any) => void,
    error: (error: any) => void,
    withDataWrapper: boolean = true) {

    $.ajax({
        type: 'POST',
        url,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: withDataWrapper ? { data: JSON.stringify(data) } : data,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('X-CSRFToken', csrfToken());
        },
    }).done(countDone(done)).fail(countDone((err) => {
        console.warn(err);
        error(err);
    }));
}

export function ajaxGet(url: string, done: (result: any) => void, error: (error: any) => void) {
    $.ajax({
        type: 'GET',
        url,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('X-CSRFToken', csrfToken());
        },
    }).done(countDone(done)).fail(countDone(error));
}

export function ajaxPostFormData(
    url: string,
    data: FormData,
    done: (result: any) => void,
    error: (error: any) => void) {

    $.ajax({
        type: 'POST',
        url,
        contentType: false,
        data,
        processData: false,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('X-CSRFToken', csrfToken());
        },
    }).done(countDone(done)).fail(countDone(error));
}

export function postPromise(url: string, data: object): Promise<any> {
    return new Promise((resolve, reject) => {
        ajaxPost(url, data, resolve, reject);
    });
}

export function getPromise(url: string, param?: object): Promise<any> {
    const full = buildURL(url, param);
    return new Promise((resolve, reject) => {
        ajaxGet(full, resolve, reject);
    });
}

export function postFormPromise(url: string, data: object, withDataWrapper: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
        ajaxPostForm(url, data, resolve, reject, withDataWrapper);
    });
}

export function postFormDataPromise(url: string, data: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
        ajaxPostFormData(url, data, resolve, reject);
    });
}

export function getFormPromise(url: string, param?: object): Promise<any> {
    const data = { data: JSON.stringify(param) };
    const full = buildURL(url, data);
    return new Promise((resolve, reject) => {
        ajaxGet(full, resolve, reject);
    });
}
