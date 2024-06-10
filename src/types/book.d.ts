interface bookItem {
    id: Number | String,
    name: String,
    writer: String,
    introduction: String,
    cover: String | ImgHTMLAttributes,
    finish_time: String | null,
    publish_time: String | null,
    publisher: String | null,
    read_time: Number,
    collections: Number,
    category: Number,
    type: Number,
    chapter: Number,
    country: String
}
interface commentItem {
    id: Number | String,
    content: String,
    userName: String,
    date: String,
    from: String,
    innerComment: commentItem[] | [],
    likeNum: Number,
}

interface chapterItem {
    id: Number,
    book_id: Number,
    chapter_index: Number,
    chapter_name: String,
    content: String,
    status: String
}