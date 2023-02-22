import request from '@/utils/request';

enum Api {
    GetUserInfo = "/api/books/bookInfo/:id",
    GetBookCategory = "/api/books/category",
    GetBookList = "/api/books/bookList",
}

export function fetchBookCategory() {
    return request({
        method: 'GET',
        url: Api.GetBookCategory
    });
}

export function fetchBookList(data) {
    return request({
        method: 'POST',
        url: Api.GetBookList,
        data
    });
}