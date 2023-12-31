import logo from '../../assets/white-knight.png'
import { Colors } from '../Colors'
import { Cell } from '../Cell'

export enum FigureNames {
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    BISHOP = "Слон",
    PAWN = "Пешка",
    ROOK = "Ладья",
    QUEEN = "Ферзь"
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell) {
        if (target.figure?.color === this.color) return false
        if (target.figure?.name === FigureNames.KING) return false
        return true
    }

    moveFigure(target: Cell) {

    }
}