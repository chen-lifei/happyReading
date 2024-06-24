import request from '@/utils/request';

enum Api {
    GetBookInfo = "/api/books/bookInfo/",
    GetBookCategory = "/api/books/category",
    GetBookType = "/api/books/type",
    GetBookList = "/api/books/bookList",
    GetHotBookList = "/api/books/hotBookList",
    GetBookChapter = "/api/books/chapter",
    GetBookComment = "/api/books/comment",
    AddBookComment = "/api/books/addComment"
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
        method: "GET",
        url: Api.GetBookCategory
    });
}

export function fetchBookType() {
    return request({
        method: "GET",
        url: Api.GetBookType
    });
}

export function fetchBookList(data) {
    return request({
        method: "POST",
        url: Api.GetBookList,
        data
    });
}

export function fetchHotBookList(data) {
    return request({
        method: "POST",
        url: Api.GetHotBookList,
        data
    });
}

export function fetchBookChapter(data) {
    return request({
        method: "POST",
        url: Api.GetBookChapter,
        data
    });
}

export function fetchBookComment(data) {
    return request({
        method: "POST",
        url: Api.GetBookComment,
        data
    });
}

export function addBookComment(data) {
    return request({
        method: "POST",
        url: Api.AddBookComment,
        data
    });
}