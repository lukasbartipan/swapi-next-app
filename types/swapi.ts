export type SwapiPerson = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  url: string;
};

export type Person = {
  id: number;
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: number | null;
  mass: number | null;
  skinColor: string;
  avatarUrl: string;
};
