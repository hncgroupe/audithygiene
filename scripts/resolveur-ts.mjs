/**
 * Résolveur pour les scripts qui importent directement les contenus en .ts.
 *
 * Node sait retirer les types depuis la version 22, mais il ne connaît ni les
 * alias du tsconfig, `@/config/site`, ni les imports sans extension,
 * `../config/site`. Les deux sont partout dans le code applicatif, et les
 * réécrire pour faire plaisir à un script de build serait le monde à l'envers.
 *
 * Ce hook comble les deux manques, et rien d'autre : il ne touche pas aux
 * paquets de node_modules, ni aux specificateurs qui portent déjà une
 * extension.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RACINE = process.cwd();

/** Les extensions tentées, dans l'ordre, pour un specificateur nu. */
const EXTENSIONS = [".ts", ".tsx", ".mjs", ".js", "/index.ts", "/index.tsx"];

function premierExistant(base) {
  /* Un chemin qui porte deja son extension, un .json par exemple, se resout
     tel quel : les suffixes ne servent qu'aux specificateurs nus. */
  if (existsSync(base)) return pathToFileURL(base).href;
  for (const suffixe of EXTENSIONS) {
    const chemin = `${base}${suffixe}`;
    if (existsSync(chemin)) return pathToFileURL(chemin).href;
  }
  return null;
}

/* Un .json importe sans attribut casse en ESM. Le code applicatif s'appuie sur
   le resolveur de Next, qui n'en demande pas : on le pose ici a sa place. */
const attributs = (url) =>
  url.endsWith(".json") ? { importAttributes: { type: "json" } } : {};

export function resolve(specificateur, contexte, suivant) {
  if (specificateur.startsWith("@/")) {
    const trouve = premierExistant(join(RACINE, "src", specificateur.slice(2)));
    if (trouve) return { url: trouve, shortCircuit: true, ...attributs(trouve) };
  }

  if (specificateur.startsWith(".") && !/\.[a-z]+$/i.test(specificateur)) {
    const depuis = contexte.parentURL ? fileURLToPath(contexte.parentURL) : RACINE;
    const base = join(depuis, "..", specificateur);
    const trouve = premierExistant(base);
    if (trouve) return { url: trouve, shortCircuit: true, ...attributs(trouve) };
  }

  return suivant(specificateur, contexte);
}
