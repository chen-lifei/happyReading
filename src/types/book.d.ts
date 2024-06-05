interface chapterItem {
    id: Number | String,
    name: String,
    status: String
}
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