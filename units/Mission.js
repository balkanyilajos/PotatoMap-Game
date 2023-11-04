import { cellTypes, missions, mountainPoints } from "./Data.js";

export class Mission {
    constructor(matrix, numberOfMissions, activeIndexesAtOnce) {
        this.matrix = matrix
        this.numberOfMissions = numberOfMissions
        this.activeIndexesAtOnce = activeIndexesAtOnce
        this.pointsArray = Array(this.numberOfMissions).fill(0)
        this.activeIndexes
        this.missionObjects
        this.initActiveIndexes()
        this.setMissionObjects()
    }

    setMissionObjects() {
        this.missionObjects = []
        for(let i = 0; i < this.numberOfMissions; i++) {
            let randomMission = missions[Math.floor(Math.random() * missions.length)]
            while(this.missionObjects.includes(randomMission)) {
                randomMission = missions[Math.floor(Math.random() * missions.length)]
            }
            this.missionObjects.push(randomMission)
        }
    }

    initActiveIndexes() {
        this.activeIndexes = []
        for(let i = 0; i < this.activeIndexesAtOnce; i++) {
            this.activeIndexes.push(i)
        }
    }

    setNextActiveIndexes() {
        this.activeIndexes = this.activeIndexes.map( x => (x + 1) % this.numberOfMissions )
    }

    setPointsArray(seasonIndex) {
        let points = 0
        this.activeIndexes.forEach(x => {
            points += Number.parseInt(this[this.missionObjects[x].function]())
        })
        points += this.fullMountains()
        this.pointsArray[seasonIndex] = points
    }

    getNumberOfAroundFields(nextToshapeType, shapeType) {
        let points = 0
        const checkColRow = (i, j) => this.matrix[i][j].value == nextToshapeType.value 
        for(let i = 0; i < this.matrix.length; i++) {
            for(let j = 0; j < this.matrix[0].length; j++) {
                if(this.matrix[i][j].value == shapeType.value) {
                    if(j + 1 < this.matrix[0].length && checkColRow(i, j + 1)) {
                        points += 1
                        continue
                    }
                    if(j - 1 >= 0 && checkColRow(i, j - 1)) {
                        points += 1
                        continue
                    }
                    if(i + 1 < this.matrix.length && checkColRow(i + 1, j)) {
                        points += 1
                        continue
                    }
                    if(i - 1 >= 0 && checkColRow(i - 1, j)) {
                        points += 1
                        continue
                    }
                }
            }
        }
        return points
    }

    getLongestContiguousArea(isVertical, type) {
        let maxCount = 0
        let count = 0
        let selectedFunction, matrixLength1, matrixLength2
        const setMax = (i, j) => {
            if(this.matrix[i][j].value == type.value) {
                count += 1
                if(count > maxCount) {
                    maxCount = count
                }
            }
            else {
                count = 0
            }
        }

        if(isVertical) {
            matrixLength1 = this.matrix[0].length
            matrixLength2 = this.matrix.length
            selectedFunction = (i, j) => setMax(i, j)
        }
        else {
            matrixLength2 = this.matrix[0].length
            matrixLength1 = this.matrix.length
            selectedFunction = (i, j) => setMax(j, i)
                
        }

        for(let j = 0; j < matrixLength1; j++) {
            for(let i = 0; i < matrixLength2; i++) {
                selectedFunction(i, j, count)
                // console.log(selectedFunction(i, j, count));
            }
        }
        return maxCount
    }

    fullMountains() {
        let points = 0
        for(let i = 0; i < mountainPoints.length; i++) {
            let point = mountainPoints[i]
            let isNotFull = false
            if(point.row >= this.matrix.length || point.row - 2 < 0 || point.col - 2 < 0 || point.col > this.matrix[0].length) {
                break
            }
            for(let j = point.col - 2; j < point.col; j++) {
                if(this.matrix[point.row][j].value == cellTypes.EMPTY.value) {
                    isNotFull = true
                    break
                }
                if(this.matrix[point.row-2][j].value == cellTypes.EMPTY.value) {
                    isNotFull = true
                    break
                }
            }
            if(this.matrix[point.row-1][point.col] == cellTypes.EMPTY.value || this.matrix[point.row-1][point.col-1] == cellTypes.EMPTY.value) {
                break
            }
            if(!isNotFull) {
                points += 1
            }
        }
        return points
    }

    edgeOfTheForest() {
        let points = 0
        for(let j = 1; j < this.matrix[0].length - 1; j++) {
            points += (this.matrix[0][j].value == cellTypes.FOREST.value)
            points += (this.matrix[this.matrix.length - 1][j].value == cellTypes.FOREST.value)
        }
        for(let i = 0; i < this.matrix.length; i++) {
            points += (this.matrix[i][0].value== cellTypes.FOREST.value)
            points += (this.matrix[i][this.matrix.length - 1].value == cellTypes.FOREST.value)
        }
        return points
    }

    sleepyValley() {
        let points = 0
        this.matrix.forEach(row => points += Number.parseInt(row.reduce((total, x) => total += (x.value == cellTypes.FOREST.value), 0) / 3) * 4)
        return points
    }

    wateringPotatoes() {
        return this.getNumberOfAroundFields(cellTypes.FARM, cellTypes.WATER) * 2
    }

    borderlands() {
        let points = 0
        for(let i = 0; i < this.matrix.length; i++) {
            let countCol = 0
            let countRow = 0
            for(let j = 0; j < this.matrix.length; j++) {
                countCol += (this.matrix[i][j].value != cellTypes.EMPTY.value)
                countRow += (this.matrix[j][i].value != cellTypes.EMPTY.value)
            }
            points += (countCol == this.matrix.length) ? 6 : 0
            points += (countRow == this.matrix.length) ? 6 : 0
        }

        return points
    }

    treeLine() {
        return this.getLongestContiguousArea(true, cellTypes.FOREST) * 2
    }

    wealthyTown() {
        let points = 0
        const checkColRow = (i, j, diffTypes) => {
            if(this.matrix[i][j].value != cellTypes.EMPTY.value && !diffTypes.includes(this.matrix[i][j].value)) {
                diffTypes.push(this.matrix[i][j].value)
            }
        }
        for(let i = 0; i < this.matrix.length; i++) {
            for(let j = 0; j < this.matrix[0].length; j++) {
                if(this.matrix[i][j].value == cellTypes.TOWN.value) {
                    const diffTypes = []
                    if(j + 1 < this.matrix[0].length) { checkColRow(i, j + 1, diffTypes) }
                    if(j - 1 >= 0) { checkColRow(i, j - 1, diffTypes) }
                    if(i + 1 < this.matrix.length) { checkColRow(i + 1, j, diffTypes) }
                    if(i - 1 >= 0) { checkColRow(i - 1, j, diffTypes) }
                    points += (diffTypes.length >= 3) ? 3 : 0
                }
            }
        }
        return points
    }

    wateringCanal() {
        let points = 0
        for(let j = 0; j < this.matrix[0].length; j++) {
            let farmCount = 0
            let waterCount = 0
            for(let i = 0; i < this.matrix.length; i++) {
                if(this.matrix[i][j].value == cellTypes.FARM.value) { farmCount += 1 }
                if(this.matrix[i][j].value == cellTypes.WATER.value) { waterCount += 1 }
            }
            points += (farmCount != 0 && farmCount == waterCount) ? 4 : 0
        }
        return points
    }

    valleyOfMagicians() {
        return this.getNumberOfAroundFields(cellTypes.MOUNTAIN, cellTypes.WATER) * 3
    }

    emptySite() {
        return this.getNumberOfAroundFields(cellTypes.TOWN, cellTypes.EMPTY) * 2
    }

    rowOfHouses() {
        return this.getLongestContiguousArea(false, cellTypes.TOWN) * 2
    }

    oddNumberedSilos() {
        let points = 0
        for(let j = 0; j < this.matrix[0].length; j += 1) {
            let countRow = 0
            for(let i = 0; i < this.matrix.length; i++) {
                countRow += (this.matrix[i][j].value != cellTypes.EMPTY.value)
            }
            points += (countRow == this.matrix.length) ? 10 : 0
        }
        return points
    }

    richCountryside() {
        let points = 0
        this.matrix.forEach(row => {
            const diffTypes = new Set()
            let rowCount = 0
            row.forEach(col => {
                if(col.value != cellTypes.EMPTY.value) {
                    rowCount += 1
                    diffTypes.add(col)
                }
            })
            if(diffTypes.size >= 5) {
                points += 4
            }
        })
        return points
    }

}