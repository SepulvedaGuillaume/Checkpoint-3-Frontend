export type Country = {
  code: string;
  name: string;
  emoji: string;
  continent: {
    id: number;
    name: string;
  };
};
