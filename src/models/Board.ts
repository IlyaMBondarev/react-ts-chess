import { Cell } from './Cell';
import { Colors } from './Colors';
import { Rook } from './figures/Rook';
import { Knight } from './figures/Knight';
import { Bishop } from './figures/Bishop';
import { Queen } from './figures/Queen';
import { King } from './figures/King';
import { Pawn } from './figures/Pawn';

export class Board {
    cells: Cell[][] = []

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                } else {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                }
            }
            this.cells.push(row)
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.WHITE, this.getCell(i, 6))
            new Pawn(Colors.BLACK, this.getCell(i, 1))
        }
    }

    private addRooks() {
        for (let i = 0; i < 8; i+=7) {
            new Rook(Colors.WHITE, this.getCell(i, 7))
            new Rook(Colors.BLACK, this.getCell(i, 0))
        }
    }

    private addKnights() {
        for (let i = 1; i < 8; i+=5) {
            new Knight(Colors.WHITE, this.getCell(i, 7))
            new Knight(Colors.BLACK, this.getCell(i, 0))
        }
    }

    private addBishops() {
        for (let i = 2; i < 8; i+=3) {
            new Bishop(Colors.WHITE, this.getCell(i, 7))
            new Bishop(Colors.BLACK, this.getCell(i, 0))
        }
    }

    private addQueens() {
        new Queen(Colors.WHITE, this.getCell(3, 7))
        new Queen(Colors.BLACK, this.getCell(3, 0))
    }

    private addKings() {
        new King(Colors.WHITE, this.getCell(4, 7))
        new King(Colors.BLACK, this.getCell(4, 0))
    }

    public addFigures() {
        this.addPawns()
        this.addRooks()
        this.addKnights()
        this.addBishops()
        this.addQueens()
        this.addKings()
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.availiable = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard
    }
}