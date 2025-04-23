import type { BaseGame, BaseScoreField } from "@/types/base-game";
import { create } from "zustand";

type AppStore = {
  user: string | null;
  sheet: {
    games: BaseGame[];
  };
};

export const useAppStore = create<AppStore>(() => ({
  user: null,
  sheet: {
    games: [],
  },
}));

export const startSheet = (gamesCount: number) => {
  const games = Array.from({ length: gamesCount }).map(
    (_, index) =>
      ({
        index,
      }) as BaseGame,
  );

  useAppStore.setState({ sheet: { games } });
};

export const score = (
  gameIndex: number,
  field: BaseScoreField,
  score: number | null,
) => {
  const sheet = useAppStore.getState().sheet;
  const game = sheet.games.find((g) => g.index === gameIndex);

  if (game) {
    const updGame = {
      ...game,
      scores: {
        ...game.scores,
        [field]: score,
      },
    };

    useAppStore.setState({
      sheet: {
        games: [
          ...sheet.games.map((g) => (g.index === gameIndex ? updGame : g)),
        ],
      },
    });
  }
};
