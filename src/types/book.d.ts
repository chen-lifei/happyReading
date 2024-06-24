interface bookItem {
    id: number | string,
    name: string,
    writer: string,
    introduction: string,
    cover: string | ImgHTMLAttributes,
    finish_time: string | null,
    publish_time: string | null,
    publisher: string | null,
    read_time: number,
    collections: number,
    category: number,
    type: number,
    chapter: number,
    country: string
}
interface commentItem {
    id: number | string,
    content: string,
    name: string,
    avatar: string,
    comment_date: string,
    from_region: string,
    childComment: commentItem[] | [],
    like_number?: number,
    to_comment_id?: number | string
}

interface chapterItem {
    id: number,
    book_id: number,
    chapter_index: number,
    chapter_name: string,
    content: string,
    status: string
}