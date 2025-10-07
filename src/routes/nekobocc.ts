import { Router } from "express";
import {
  getRelease,
  searchQuery,
  getUrl,
  getRandom,
  getGenres
} from "./controllers";

const router = Router();

router.get("/release", getRelease);
router.get("/search", searchQuery);
router.get("/get", getUrl);
router.get("/random", getRandom);
router.get("/genres", getGenres);

export default router;
