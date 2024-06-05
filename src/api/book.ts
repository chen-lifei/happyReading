import request from '@/utils/request';

enum Api {
    GetBookInfo = "/api/books/bookInfo/",
    GetBookCategory = "/api/books/category",
    GetBookType = "/api/books/type",
    GetBookList = "/api/books/bookList",
    GetHotBookList = "/api/books/hotBookList"
}

export function fetchBookInfo(data) {
    return request({
        method: "POST",
        url: Api.GetBookInfo,
        data
    });
}

export function fetchBookCategory() {
    return request({
        method: 'GET',
        url: Api.GetBookCategory
    });
}

export function fetchBookType() {
    return request({
        method: 'GET',
        url: Api.GetBookType
    });
}

export function fetchBookList(data) {
    return request({
        method: 'POST',
        url: Api.GetBookList,
        data
    });
}

export function fetchHotBookList(data) {
    return request({
        method: 'POST',
        url: Api.GetHotBookList,
        data
    });
}