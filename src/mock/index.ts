import btthJson from "./btth.json";
import bgvlJson from "./bgvl.json";
import prJson from "./pr.json";
import type { Btth, Bgvl, Problem } from "../types";

export const btthKayitlari = btthJson as Btth[];
export const bgvlKayitlari = bgvlJson as Bgvl[];
export const prKayitlari = prJson as Problem[];