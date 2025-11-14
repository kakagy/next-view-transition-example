export type Digimon = {
  id: string;
  name: string;
  level: string;
  type: string;
  attribute: string;
  skill: string;
  description: string;
  relations: (string | Digimon)[];
  url: string;
  imageSrc: string;
};

export const COLUMN_LENGTH = 12;
