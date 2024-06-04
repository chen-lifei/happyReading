import request from '@/utils/request';

enum Api {
    GetUserInfo = "/api/books/bookInfo/:id",
    GetBookCategory = "/api/books/category",
    GetBookType = "/api/books/type",
    GetBookList = "/api/books/bookList",
    GetHotBookList = "/api/books/hotBookList"
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