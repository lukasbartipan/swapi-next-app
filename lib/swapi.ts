import "server-only";
import type { Person, SwapiPerson } from "@/types/swapi";

import { cache } from "react";

const SWAPI_BASE = "https://swapi.py4e.com/api/people/";
const AVATAR_BASE =
  "https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people";

export function getCharacterIdFromUrl(url: string): number {
  const match = url.match(/\/people\/(\d+)\/?$/u);

  if (!match) {
    return Number.NaN;
  }

  return Number.parseInt(match[1], 10);
}

function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/gu, "").trim();

  if (!cleaned || cleaned === "unknown" || cleaned === "n/a") {
    return null;
  }

  const parsed = Number.parseInt(cleaned, 10);

  return Number.isNaN(parsed) ? null : parsed;
}

export function normalizePerson(person: SwapiPerson): Person {
  const id = getCharacterIdFromUrl(person.url);

  return {
    id: Number.isNaN(id) ? -1 : id,
    name: person.name,
    birthYear: person.birth_year,
    eyeColor: person.eye_color.trim().toLowerCase(),
    gender: person.gender.trim().toLowerCase(),
    hairColor: person.hair_color,
    height: parseNumber(person.height),
    mass: parseNumber(person.mass),
    skinColor: person.skin_color,
    avatarUrl: `${AVATAR_BASE}/${Number.isNaN(id) ? 1 : id}.jpg`,
  };
}

export async function fetchAllPeople(): Promise<Person[]> {
  let url: string | null = SWAPI_BASE;
  const people: Person[] = [];

  while (url) {
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch people from ${url}`);
    }

    const data = (await response.json()) as {
      next: string | null;
      results: SwapiPerson[];
    };

    people.push(...data.results.map((item) => normalizePerson(item)));
    url = data.next;
  }

  return people.filter((person) => person.id > 0);
}

export const fetchAllPeopleCached = cache(fetchAllPeople);
