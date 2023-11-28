import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Player } from '../models/Player'
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    toggleCurrentPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, toggleCurrentPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (selectedCell?.x === cell.x && selectedCell?.y === cell.y) {
      setSelectedCell(null)
    } else if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      setSelectedCell(null)
      toggleCurrentPlayer()
    } else {
      if (currentPlayer?.color !== cell.figure?.color) return
      setSelectedCell(cell);
    }
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div className="board">
      {board.cells.map((row, index) => 
        <React.Fragment key={index}>
            {row.map(cell => 
                <CellComponent
                  cell={cell}
                  selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                  key={cell.id}
                  click={click} />
            )}
        </React.Fragment>
      )}
    </div>
  );
}

export default BoardComponent;
