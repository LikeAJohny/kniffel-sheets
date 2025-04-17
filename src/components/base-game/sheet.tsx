import {
  ArrowRight,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
} from "lucide-react";
import { Game } from "./game";
import { SheetRow } from "./sheet-row";

export function Sheet({ games }: { games: number }) {
  return (
    <section className="flex border">
      <aside>
        <SheetRow
          name={
            <>
              <Dice1 />
              <Dice1 />
              <Dice1 />
            </>
          }
          explanation="nur Einser zählen"
        />
        <SheetRow
          name={
            <>
              <Dice2 />
              <Dice2 />
              <Dice2 />
            </>
          }
          explanation="nur Zweier zählen"
        />
        <SheetRow
          name={
            <>
              <Dice3 />
              <Dice3 />
              <Dice3 />
            </>
          }
          explanation="nur Dreier zählen"
        />
        <SheetRow
          name={
            <>
              <Dice4 />
              <Dice4 />
              <Dice4 />
            </>
          }
          explanation="nur Vierer zählen"
        />
        <SheetRow
          name={
            <>
              <Dice5 />
              <Dice5 />
              <Dice5 />
            </>
          }
          explanation="nur Fünfer zählen"
        />
        <SheetRow
          name={
            <>
              <Dice6 />
              <Dice6 />
              <Dice6 />
            </>
          }
          explanation="nur Sechser zählen"
        />
        <SheetRow name="gesamt" explanation={<ArrowRight />} />
        <SheetRow name="Bonus bei 63 oder mehr" explanation="35 Punkte" />
        <SheetRow name="gesamt oberer Teil" explanation={<ArrowRight />} />

        <SheetRow name="Dreierpasch" explanation="Alle Augen zählen" />
        <SheetRow name="Viererpasch" explanation="Alle Augen zählen" />
        <SheetRow name="Full House" explanation="25 Punkte" />
        <SheetRow name="Kleine Straße" explanation="30 Punkte" />
        <SheetRow name="Große Straße" explanation="40 Punkte" />
        <SheetRow name="Kniffel" explanation="50 Punkte" />
        <SheetRow name="Chance" explanation="Alle Augen zählen" />
        <SheetRow name="gesamt unterer Teil" explanation={<ArrowRight />} />
        <SheetRow name="gesamt oberer Teil" explanation={<ArrowRight />} />
        <SheetRow name="Endsumme" explanation={<ArrowRight />} />
      </aside>
      <main className="flex">
        {[...Array(games).keys()].map((g) => (
          <Game key={g} />
        ))}
      </main>
    </section>
  );
}
