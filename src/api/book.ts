import rAxios from '@/utils/axios';

enum Api {
    GetUserInfo = "/books/bookInfo/:id",
    GetBookCategory = "/books/category",
    GetBookList = "/books/bookList",
}

export function fetchBookCategory() {
    return rAxios({
        method: 'GET',
        url: Api.GetBookCategory
    });
}

export function fetchBookList(data) {
    return rAxios({
        method: 'POST',
        url: Api.GetBookList,
        data
    });
}