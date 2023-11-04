import { cellTypes, mountainPoints, seasonTypes, clock } from "./units/Data.js";
import { Matrix } from "./units/Matrix.js"
import { Card } from "./units/Card.js"
import { Time } from "./units/Time.js"
import { Mission } from "./units/Mission.js"

const maxTime = 28
const seasonTime = 7
const resetGameField = document.querySelector('div#new-game')
const tableField = document.querySelector('table#table')
const cardField = document.querySelector('table#cards')
const buttonField = document.querySelector('div#buttons')
const pointCounterField = document.querySelector('div#point-counter')
const currentSeasonField = document.querySelector('p#current-season')
const missionsField = document.querySelector('table#missions')
const remainingTimeOfTheSeasonField = document.querySelector('p#remaining-time-of-the-season')

class Game {
   constructor() {
      this.table = new Matrix(11, 11)
      this.card = new Card()
      this.time = new Time(maxTime, seasonTime)
      this.mission = new Mission(this.table.matrix, 4, 2)

      console.log(clock.src);
      this.createButton(buttonField, "Rotating", "click", () => this.card.rotate(() => this.generateCardField(cardField)))
      this.createButton(buttonField, "Mirroring", "click", () => this.card.mirror(() => this.generateCardField(cardField)))
      this.createButton(resetGameField, "New Game", "click", () => this.newGame())
      this.loadGame()
      this.start()
   }

   start() {
      this.generateTableField(tableField, 11, 11, this.table.matrix)
      this.generateCardField(cardField)
      this.addMountainPoints(tableField, mountainPoints)
      this.setPointCounterField(pointCounterField, this.mission.pointsArray)
      this.setCurrentSeasonField(currentSeasonField, this.time.getCurrentSeason())
      this.setRemainingTimeOfTheSeasonField(remainingTimeOfTheSeasonField, this.time.getRemainingTimeOfTheSeason())
      this.setMissionsField(missionsField)
      this.saveGame()

      tableField.addEventListener('click', e => {
         const point = { row: e.target.dataset.row, col: e.target.dataset.col }
         if (!this.time.isOver()) {
            if (e.target.matches('td') && this.table.isPlaceable(point, this.card.randomElement.shape)) {
               this.table.setPointsOfMatrix(point, this.card.randomElement.type, this.card.randomElement.shape)
               this.mission.setPointsArray(this.time.getCurrentSeasonIndex())
               this.time.addTime(this.card.randomElement.time)
               if (this.time.isThereChangeOfSeason) {
                  this.mission.setNextActiveIndexes()
                  this.setMissionsField(missionsField)
                  this.mission.setPointsArray(this.time.getCurrentSeasonIndex())
               }
               this.setPointsOfTableField(tableField, point, this.card.randomElement.type, this.card.randomElement.shape)
               this.setCurrentSeasonField(currentSeasonField, this.time.getCurrentSeason())
               this.setRemainingTimeOfTheSeasonField(remainingTimeOfTheSeasonField, this.time.getRemainingTimeOfTheSeason())
               this.setPointCounterField(pointCounterField, this.mission.pointsArray)
               this.card.newCard()
               this.generateCardField(cardField)
               this.saveGame()
            }
         }
         else {
            alert("Game over")
         }
      })
   }

   addMountainPoints(tableField, mountainPointsArray) {
      mountainPointsArray.forEach(e => {
         if (this.table.isPlaceable(e)) {
            this.table.setPointsOfMatrix(e, cellTypes.MOUNTAIN)
            this.setPointsOfTableField(tableField, e, cellTypes.MOUNTAIN)
         }
      })
   }

   setPointCounterField(pField, points) {
      let text = '<table id="season-table"><tr>'
      let sum = 0
      points.forEach((x, i) => {
         text += "<td>" + seasonTypes[i] + ":<br>" + x + " point" + "</td>"
         sum += x
      })
      text += `</tr></table>`
      text = `<p id="total">Total: ${sum}</p>` + text
      pField.innerHTML = text
   }

   setCurrentSeasonField(pField, currentSeason) {
      pField.innerHTML = "Current season: " + currentSeason
   }

   setRemainingTimeOfTheSeasonField(pField, remainingTime) {
      pField.innerHTML = `Time left in the season: ${remainingTime}/${seasonTime}`
   }

   generateTableField(tableField, row, col, matrix = undefined) {
      let stringTable = ""
      for (let i = 1; i <= row; i++) {
         stringTable += "<tr>"
         for (let j = 1; j <= col; j++) {
            let inside = ""
            if(matrix != undefined && matrix[i-1][j-1].value != cellTypes.EMPTY.value) {
               inside = `<img src="${matrix[i-1][j-1].src}" alt="${matrix[i-1][j-1].alt}"`
            }
            stringTable += `<td data-row="${i}" data-col="${j}">${inside}</td>`
         }
         stringTable += "</tr>"
      }
      tableField.innerHTML = stringTable
   }

   setPointsOfTableField(tableField, point, type, shape = undefined) {
      let pointRow = Number.parseInt(point.row) - 1
      let pointCol = Number.parseInt(point.col) - 1
      const setTable = (i, j) => {
         tableField.children[0].children[i].children[j].style.backgroundImage = `url('${type.src}')`
      }
      if (shape === undefined) {
         setTable(pointRow, pointCol)
      }
      else {
         shape.forEach((row, i) => {
            row.forEach((cell, j) => {
               if (cell != 0) {
                  setTable(pointRow + i, pointCol + j)
               }
            })
         })
      }
   }

   generateCardField(tableField) {
      const img = `<div id="time"><span>${this.card.randomElement.time}</span><img src="${clock.src}" alt="${clock.alt}"></img></div>`
      this.generateTableField(tableField, 3, 3)
      this.setPointsOfTableField(tableField, { row: 1, col: 1 }, this.card.randomElement.type, this.card.matrix)
      tableField.children[0].innerHTML += img
   }

   createButton(buttonField, buttonText, event, eventListenerFunction) {
      const button = document.createElement('button')
      button.innerText = buttonText
      button.addEventListener(event, eventListenerFunction)
      buttonField.appendChild(button)
   }

   setMissionsField(missionsTableField) {
      let text = ""
      let isEven = true

      this.mission.missionObjects.forEach((x, i) => {
         const middleText = ((this.mission.activeIndexes.includes(i)) ? '<td class="actual-mission">' : "<td>") + `<img src="${x.src}" alt="${x.title}">`
         if (isEven) {
            text += '<tr>' + middleText
            isEven = !isEven
         }
         else {
            text += middleText + '</tr>'
            isEven = !isEven
         }
      })
      missionsTableField.innerHTML = text
   }

   saveGame() {
      localStorage.setItem('table', JSON.stringify(this.table.matrix))
      localStorage.setItem('card', JSON.stringify(this.card.randomElement))
      localStorage.setItem('timeCount', this.time.timeCount)
      localStorage.setItem('activeIndexes', JSON.stringify(this.mission.activeIndexes))
      localStorage.setItem('pointsArray', JSON.stringify(this.mission.pointsArray))
      localStorage.setItem('missionObjects', JSON.stringify(this.mission.missionObjects))
   }

   loadGame() {
      if (localStorage.getItem('table') != undefined) {
         this.table.matrix = JSON.parse(localStorage.getItem('table'))
         this.card.randomElement = JSON.parse(localStorage.getItem('card'))
         this.card.matrix = this.card.randomElement.shape
         this.time.timeCount = localStorage.getItem('timeCount')
         this.mission.matrix = this.table.matrix
         this.mission.activeIndexes = JSON.parse(localStorage.getItem('activeIndexes'))
         this.mission.pointsArray = JSON.parse(localStorage.getItem('pointsArray'))
         this.mission.missionObjects = JSON.parse(localStorage.getItem('missionObjects'))
      }

   }

   newGame() {
      this.table = new Matrix(11, 11)
      this.card = new Card()
      this.time = new Time(maxTime, seasonTime)
      this.mission = new Mission(this.table.matrix, 4, 2)
      this.start()
   }

}
const game = new Game()