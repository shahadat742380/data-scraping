import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";

interface Chapter {
  chapterTitle: string;
  chapterUrl: string;
  verses: Verse[];
}

interface Verse {
  subChapterLink: string;
  subChapterContent: string;
}

const baseURL = "https://vedabase.io";

const chapter = new Hono();

chapter.post("/", async (c) => {
  const response = await axios.get(`${baseURL}/en/library/bg/`);
  const $ = cheerio.load(response.data);

  const chapters: Chapter[] = [];

  const ab = $(".r-chapter a").each((index, element) => {
    const chapterTitle = $(element).text().trim();
    const chapterUrl = $(element).attr("href");

    if (chapterUrl) {
      chapters.push({ chapterTitle, chapterUrl, verses: [] });
    }
  });

  for (const chapter of chapters) {
    try {
      const chapterResponse = await axios.get(
        `${baseURL}${chapter.chapterUrl}`
      );
      const chapterPage = cheerio.load(chapterResponse.data);
      const verseElements = chapterPage(".r-verse");

      for (const verseElement of verseElements) {
        const subChapterLink = chapterPage(verseElement)
          .find("dt a")
          .attr("href")
          ?.trim();
        const subChapterContent = chapterPage(verseElement)
          .find("dd")
          .text()
          .trim();

        console.log(subChapterLink, subChapterContent);

        if (subChapterLink && subChapterContent) {
          // const fullSubChapterLink = `${baseURL}${subChapterLink}`;
          // const subChapterResponse = await axios.get(fullSubChapterLink);
          // const subChapterPage = cheerio.load(subChapterResponse.data);

          // const additionalData = subChapterPage("p").text().trim();

          chapter.verses.push({ subChapterLink, subChapterContent });
        }
      }
    } catch (error) {
      console.error(`Failed to fetch or parse ${chapter.chapterUrl}:`, error);
    }
  }

  console.log(chapters);

  return c.json(chapters);
});

export default chapter;
