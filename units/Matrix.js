import {cellTypes} from "./Data.js"

export class Matrix {
    constructor(row, col) {
        this.row = row
        this.col = col
        this.matrix
        this.generateMatrix()
    }

    generateMatrix() {
        this.matrix = Array(this.row).fill(cellTypes.EMPTY).map(() => Array(this.col).fill(cellTypes.EMPTY))
    }

    setPointsOfMatrix(point, type, shape = undefined) {
        const pointRow = Number.parseInt(point.row) - 1
        const pointCol = Number.parseInt(point.col) - 1
        const setMatrix = (i, j) => this.matrix[i][j] = type

        if(shape === undefined) {
            setMatrix(pointRow, pointCol)
        }
        else {
            shape.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if(cell != 0) {
                        setMatrix(pointRow + i, pointCol + j)
                    }
                })
            })
        }
    }

    isPlaceable(point, shape = undefined) {
        let pointRow = Number.parseInt(point.row) - 1
        let pointCol = Number.parseInt(point.col) - 1

        if(shape === undefined) {
            return this.matrix[pointRow][pointCol].value == cellTypes.EMPTY.value
        }
        else {
            return shape.every((row, i) => !row.some((cell, j) => cell !== cellTypes.EMPTY.value && this.matrix[pointRow + i][pointCol + j].value !== cellTypes.EMPTY.value))
        }
    }

}