import { FeedSource } from "./feed";


export interface Article {
    id?:string;
    title: string;
    link: string;
    description: string;
    img: string;
    content: string;
    pubDate: Date;
    author: string;
    source: FeedSource;
}
