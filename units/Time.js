import { seasonTypes } from "./Data.js"

export class Time {
    constructor(maxTime, seasonTime) {
        this.maxTime = maxTime
        this.seasonTime = seasonTime
        this.timeCount = 0
        this.isThereChangeOfSeason = false
    }

    addTime(unit) {
        this.isThereChangeOfSeason = this.timeCount % this.seasonTime >=  (this.timeCount + unit) % this.seasonTime
        this.timeCount += unit
    }

    isOver() {
        if(this.timeCount >= this.maxTime) {
            return true
        }
        else {
            return false
        }
    }

    getCurrentSeason() {
        return seasonTypes[this.getCurrentSeasonIndex()]
    }

    getCurrentSeasonIndex() {
        return (this.isOver()) ? Object.keys(seasonTypes).length - 1 : Number.parseInt(this.timeCount / this.seasonTime)
    }

    getRemainingTimeOfTheSeason() {
        return this.isOver() ? 0 : this.seasonTime - this.timeCount % this.seasonTime
    }
}