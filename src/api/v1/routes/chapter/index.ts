import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";

interface Chapter {
  title: string;
  url: string;
}

const chapter = new Hono();

chapter.post("/", async (c) => {
  const response = await axios.get("https://vedabase.io/en/library/bg/");
  const $ = cheerio.load(response.data);
  
  const chapters: Chapter[] = [];
  
  $(".r-chapter a").each((index, element) => {
    const chapterTitle = $(element).text().trim();
    const chapterUrl = $(element).attr("href");
    
    if (chapterUrl) {
      chapters.push({ title: chapterTitle, url: chapterUrl });
    }
  });
  
  console.log(chapters);
  return c.json(chapters);
});

export default chapter;
