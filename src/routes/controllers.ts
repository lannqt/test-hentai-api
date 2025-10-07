import { Request, Response } from "express";
import NekoBocc from "hyesuneko";
import { logger } from "../utils/logger";

const nekobocc = new NekoBocc();

export const getRelease = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const data = await nekobocc.release(page);
    if ("error" in data) {
      logger.error(`[RELEASE] page=${page} failed: ${data.error}`);
    } else {
      logger.http(`[RELEASE] page=${page} fetched (${data.length} items)`);
    }
    res.json(data);
  } catch (err: any) {
    logger.error(`[RELEASE] error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const searchQuery = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const data = await nekobocc.search(query);
    if ("error" in data) {
      logger.error(`[SEARCH] query="${query}" failed: ${data.error}`);
    } else {
      logger.http(`[SEARCH] query="${query}" -> ${data.length} results`);
    }
    res.json(data);
  } catch (err: any) {
    logger.error(`[SEARCH] error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getUrl = async (req: Request, res: Response) => {
  try {
    const url = req.query.url as string;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const data = await nekobocc.get(url);
    logger.http(`[GET] url=${url} -> success`);
    res.json(data);
  } catch (err: any) {
    logger.error(`[GET] error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getRandom = async (_req: Request, res: Response) => {
  try {
    const data = await nekobocc.random();
    logger.http(`[RANDOM] fetched random item`);
    res.json(data);
  } catch (err: any) {
    logger.error(`[RANDOM] error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getGenres = async (_req: Request, res: Response) => {
  try {
    const data = await nekobocc.genres();
    if ('error' in data) {
      logger.error(`[GENRES] failed: ${data.error}`);
    } else {
      logger.http(`[GENRES] ${data.length} genres fetched`);
    }
    res.json(data);
  } catch (err: any) {
    logger.error(`[GENRES] error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
