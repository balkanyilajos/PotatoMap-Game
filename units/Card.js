import { Matrix } from "./Matrix.js"
import { elements } from "./Data.js"

export class Card extends Matrix {
    constructor() {
        super(3, 3)
        this.randomElement
        this.newCard()
    }

    newCard() {
        this.randomElement = elements[Math.floor(Math.random() * elements.length)]
        this.matrix = this.randomElement.shape
    }

    verticalAlignment(shape) {
        let emptyRows = 0
        for(let i = 0; i < shape.length; i++) {
            let j = 0
            while(j < shape.length && shape[i][j] == 0) {
                j += 1
            }
            if(j == shape.length) {
                emptyRows += 1
            }
            else {
                break
            }
        }

        for(let i = 0; i < shape.length - emptyRows; i++) {
            for(let j = 0; j < shape[0].length; j++) {
                let temp = shape[i][j]
                shape[i][j] = shape[i + emptyRows][j]
                shape[i + emptyRows][j] = temp
            }
        }
    }

    horizontalAlignment(shape) {
        let emptyCols = 0
        for(let j = 0; j < shape[0].length; j++) {
            let i = 0
            while(i < shape.length && shape[i][j] == 0) {
                i += 1
            }
            if(i == shape.length) {
                emptyCols += 1
            }
            else {
                break
            }
        }
        for(let i = 0; i < shape.length; i++) {
            for(let j = 0; j < shape[0].length - emptyCols; j++) {
                let temp = shape[i][j]
                shape[i][j] = shape[i][j + emptyCols]
                shape[i][j + emptyCols] = temp
            }
        }
    }

    rotate(guiFunction) {
        const newShape = []
        const shape = this.randomElement.shape
        for (let i = 0; i < shape.length; i++) {
            const rowArray = []
            for (let j = 0; j < shape[0].length; j++) {
                rowArray.push(shape[j][shape[0].length - i - 1])
            }
            newShape.push(rowArray)
        }
        this.randomElement.shape = newShape
        this.randomElement.rotation = ++this.randomElement.rotation % 4
        this.matrix = this.randomElement.shape
        
        this.horizontalAlignment(this.randomElement.shape)
        this.verticalAlignment(this.randomElement.shape)
        guiFunction()
    }

    mirror(guiFunction) {
        const shape = this.randomElement.shape
        shape.forEach(row => row.reverse())
        this.randomElement.mirrored = !this.randomElement.mirrored
        this.matrix = shape

        this.horizontalAlignment(shape)
        guiFunction()
    }

}