import { Column } from "../components/Column";
import type { JSX } from "react";
import { type ColumnType } from "../context/BoardContext";


const columnTitles: ColumnType[] = [
  "Backlog",
  "Todo",
  "In Progress",
  "Review",
  "Done",
];

export function Board(): JSX.Element {
  return (
    <div className="board-container flex space-x-6 overflow-x-auto py-6 px-4">
      {columnTitles.map((title) => (
        <Column key={title} mainTitle={title} />
      ))}
    </div>
  );
}
