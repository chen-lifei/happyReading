import rAxios from '@/utils/axios';

enum Api {
    GetUserInfo = "/books/bookInfo/:id",
    GetBookCategory = "/books/category"
}

export function getBookCategory() {
    return rAxios({
        methods: 'GET',
        url: Api.GetBookCategory
    });
}