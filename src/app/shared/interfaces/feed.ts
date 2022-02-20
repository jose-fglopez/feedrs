export interface Feed {
    title:string;
    link:string;
    description?:string;
    item: FeedItem[];
    lastBuildDate:Date;
}

export interface FeedParsed {
    rss: {
        channel: Feed
    }
}

export interface FeedSource {
    title:string;
    link:string;
}

export interface FeedResponse {
    contents: string;
    status: {
        content_length: number;
        content_type: string;
        http_code: number;
        response_time: number;
        url: string;
    }
}

export interface FeedItem {
    title: string;
    link: string;
    description: string;
    content: string;
    pubDate: Date;
    author: string;
    "content:encoded"?: string;
}

