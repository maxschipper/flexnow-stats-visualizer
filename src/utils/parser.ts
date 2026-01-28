import type { ExamStats, Lecture } from "@/types";

// maps prefix strings found in HTML to the corresponding ExamStats key.
const STATS_MAP: Record<string, keyof ExamStats> = {
  "Anmeldungen:": "participants",
  "davon noch nicht bewertet:": "not_yet_graded",
  "Insgesamt wurden bewertet:": "graded",
  "davon bestanden:": "passed",
  "davon angetreten, aber nicht bestanden:": "graded_but_not_passed",
  "davon sonstige:": "other",
  "Median:": "median_grade",
  "Standardabweichung:": "standard_deviation_grade",
  // some prefixes are long/complex, we handle those via partial matches below
};

// special handling for the long/complex prefixes
const STATS_PREFIXES_COMPLEX = [
  {
    prefix: "∅ Note aus den Ergebnissen",
    key: "average_grade" as keyof ExamStats,
  },
  {
    prefix: "∅ Punke aus den Ergebnissen",
    key: "average_points" as keyof ExamStats,
  },
];
/**
 * Utility to parse German-formatted numbers (so , instead of .).
 * @param input
 * @returns
 */
function parseGermanFloat(input: string): number | null {
  const normalized = input.replace(",", ".").trim();
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? null : parsed;
}

/**
 * clean up strings from crazy html formatting, like tabs and newlines
 * @param input
 * @returns the input string without any duplicate spaces or tabs and newlines
 */
function cleanupString(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

/**
 * retrieves all non-empty text nodes from an element.
 * @param rootElement the root element to create the walker on
 * @returns an array of strings with all the text inside of the root element
 */
function getTextTokens(rootElement: Element): string[] {
  const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT);
  const tokens: string[] = [];
  let node: Node | null;

  while ((node = walker.nextNode())) {
    const text = node.textContent?.trim();
    if (text && text.length > 0) {
      // console.log(cleanupString(text));
      tokens.push(cleanupString(text));
    }
  }
  return tokens;
}

/**
 * Extracs all the lecture stats from the FlexNow HTML page
 * @param htmlContent the html page exported from FlexNow
 * @returns an array of `Lecture[]` objects with the parsed data
 */
export function extractLecturesFromHtml(htmlContent: string): Lecture[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // the container with id="listePrffachAbgelegt" has the lectures with their results
  const container = doc.querySelector("#listePrffachAbgelegt ul ul");
  if (!container) {
    throw new Error("Parser Error: Container '#listePrffachAbgelegt ul ul' not found.");
  }

  // every li element with class="collapsable" is a lecture
  const lectureNodes = Array.from(container.querySelectorAll("li.collapsable"));
  if (lectureNodes.length === 0) {
    throw new Error("Parser Error: No lectures found (no 'li.collapsable').");
  }

  const final = lectureNodes
    .map((lectureNode) => parseLecture(lectureNode))
    .filter((l): l is Lecture => l !== null);
  console.log(JSON.stringify(final, null, 2));
  return final;
}

/**
 * Parses a single raw lecture element.
 * @param lectureNode - The DOM node containing the lecture data
 * @returns a Lecture object with the parsed in data or null if the nodes structure is invalid
 */
function parseLecture(lectureNode: Element): Lecture | null {
  const nameSpan = lectureNode.querySelector("span");
  if (!nameSpan || !nameSpan.textContent) {
    console.warn("Skipping lecture node: missing name span.");
    return null;
  }

  const propertyContainer = lectureNode.querySelector("ul > li");
  if (!propertyContainer) {
    console.warn(`Skipping lecture node "${nameSpan.textContent}": missing details container.`);
    return null;
  }

  // const fullTitle = nameSpan.textContent.replace(/\s+/g, " ").trim();
  const fullTitle = cleanupString(nameSpan.textContent);
  // regex to split "Inf-Einf: Einführung in die Informatik" -> ["Inf-Einf", "Einführung in die Informatik"]
  const titleMatch = fullTitle.match(/^([^:]+):\s+(.+)$/);

  const id = titleMatch?.[1] ?? fullTitle;
  const name = titleMatch?.[2] ?? null;

  const lecture: Lecture = {
    id,
    name,
    grade: null,
    points: null,
    passed: null,
    ects: null,
    stats: null,
  };

  // parse properties (tokens)
  const tokens = getTextTokens(propertyContainer);
  console.log("tokens:", tokens);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token == undefined) {
      continue;
    }

    if (token === "Note:") {
      const nextToken = tokens[i + 1];
      if (nextToken) {
        lecture.grade = parseGermanFloat(nextToken);
        i++; // skip the next token since we consumed it
      }
      continue;
    }

    if (token.endsWith("Bestanden")) {
      lecture.passed = true;
      continue;
    }

    // if (token.includes("ECTS:")) {
    //   // const val = token.split("ECTS:").at(1)?.trim(); // needs target es2022
    //   const val = token.split("ECTS:");
    //   lecture.ects = parseGermanFloat(val[1]!); // no need to trim, handled in parseGerFloat
    //   continue;
    // }
    if (token.includes("ECTS:")) {
      const search = "ECTS:";
      const val = token.substring(token.lastIndexOf(search) + search.length);
      lecture.ects = parseGermanFloat(val); // no need to trim, handled in parseGerFloat
      // continue; // do not continue as points and ects are in the same token
    }

    if (token.includes("Punkte")) {
      const val = token.match(/([\d,]+)\s+Punkte\)/);
      if (val) {
        lecture.points = parseGermanFloat(val[0]);
      }
      // continue; // do not continue as points and ects are in the same token
    }

    if (token.includes("Keine Statistik vorhanden")) {
      lecture.stats = null;
    }

    // if (lecture.stats === null) {
    //   console.log("skipped stats parsing because of noStats flag for lecture " + lecture.id);
    //   continue;
    // }

    // check exact prefix matches from the map
    let statFound = false;
    for (const [prefix, key] of Object.entries(STATS_MAP)) {
      if (token.startsWith(prefix)) {
        // if lecture.stats is still null initialize it now
        if (!lecture.stats) {
          lecture.stats = {
            participants: null,
            not_yet_graded: null,
            graded: null,
            passed: null,
            other: null,
            graded_but_not_passed: null,
            average_grade: null,
            median_grade: null,
            standard_deviation_grade: null,
            average_points: null,
          };
        }
        const valStr = token.substring(prefix.length);

        // float is okay here as it will also work with integers; also i expect only numbers here
        lecture.stats[key as keyof ExamStats] = parseGermanFloat(valStr);
        statFound = true;
        break;
      }
    }
    if (statFound) continue;

    // check complex prefixes
    for (const { prefix, key } of STATS_PREFIXES_COMPLEX) {
      if (token.startsWith(prefix)) {
        // if lecture.stats is still null initialize it now
        if (!lecture.stats) {
          lecture.stats = {
            participants: null,
            not_yet_graded: null,
            graded: null,
            passed: null,
            other: null,
            graded_but_not_passed: null,
            average_grade: null,
            median_grade: null,
            standard_deviation_grade: null,
            average_points: null,
          };
        }
        // the value is usually after the colon at the end of the long string
        const parts = token.split(":");
        if (parts.length > 1) {
          const value = parts[parts.length - 1];
          if (value) {
            lecture.stats[key] = parseGermanFloat(value);
          }
        }
        break;
      }
    }
  }

  return lecture;
}
