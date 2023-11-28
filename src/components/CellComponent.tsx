import React, { FC } from 'react';
import { Cell } from '../models/Cell'

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  return (
    <div
      className={["cell", cell.color, selected && 'selected', cell.availiable && cell.figure && 'capturable'].join(' ')}
      onClick={() => click(cell)}
    >
      {cell.availiable && !cell.figure && <div className="availiable" />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
}

export default CellComponent;
