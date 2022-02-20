import { Article } from "@shared/interfaces/article";
import { FeedResponse, FeedParsed, FeedItem, FeedSource, Feed } from "@shared/interfaces/feed";
import { Parser } from "xml2js";

/**  
 * Parses rss FeedResponse with contents in xml format to a Feed objects using a promise
 * @param {FeedResponse} data - Feed response object to parse
 * @return {Promise<Feed>} Parsed object
 */
export function parseFeed(data: FeedResponse): Promise<Feed> {
  return new Promise((resolve, reject) => {
    const parser = new Parser({ explicitArray: false });
    parser.parseString(data.contents, function (err: unknown, result: FeedParsed) {
      if (err || !result?.rss?.channel)
        reject(err)
      else
        resolve(result.rss.channel)
    });
  })
}

/**  
 * Parses a FeedItem object from a source to an Article usable object. It also transforms the contents, replacing 
 * class and style tags so the contents of the article can be normalized.
 * @param {FeedItem} feedItem - Item to be parsed
 * @param {FeedSource} source - Source from where that article came from
 * @return {Article} Article parsed object
 */
export function parseFeedToArticle(feedItem: FeedItem, source: FeedSource): Article {

  // Content or description could be empty, assign accordingly
  let content: string = feedItem.content ? feedItem.content : feedItem["content:encoded"] as string;
  content = content ? content : feedItem.description;
  let description: string = feedItem.description ? feedItem.description : content;

  // Extract first image from the article
  let domParser = new DOMParser().parseFromString(content, "text/xml");
  const img: string = domParser.querySelector("img")?.getAttribute("src") as string;

  // Extract the text content from the description
  domParser = new DOMParser().parseFromString(description, 'text/html');
  description = (domParser.body.textContent || "").replace(/\s+/g, ' ').trim()

  // Remove the class and style tags from the content
  content = content.replace(/class=".*"/g, '').trim();
  content = content.replace(/style=".*"/g, '').trim();

  return {
    title: feedItem.title,
    link: feedItem.link,
    pubDate: feedItem.pubDate,
    author: feedItem.author,
    content: content,
    description: description,
    img: img,
    source: {
      title: source.title,
      link: source.link
    }
  };
  
}