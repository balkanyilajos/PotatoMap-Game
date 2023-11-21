export const cellTypes = {
    EMPTY: {
        value: 0
    },
    MOUNTAIN: {
        value: 1,
        src: "./pictures/fields/mountain.svg",
        alt: "mountain"
    },
    WATER: {
        value: 2,
        src: "./pictures/fields/water.svg",
        alt: "water"
    },
    FOREST: {
        value: 3,
        src: "./pictures/fields/forest.svg",
        alt: "forest"
    },
    TOWN: {
        value: 4,
        src: "./pictures/fields/town.svg",
        alt: "town"
    },
    FARM: {
        value: 5,
        src: "./pictures/fields/farm.svg",
        alt: "farm"
    }
}

export const seasonTypes = {
    0: "Spring",
    1: "Summer",
    2: "Autumn",
    3: "Winter"
}

export const clock = {
    src: "./pictures/clock.png",
    alt: "clock"
}

export const mountainPoints = [
    {
        row: 2,
        col: 2,
    },
    {
        row: 4,
        col: 9,
    },
    {
        row: 6,
        col: 4,
    },
    {
        row: 9,
        col: 10,
    },
    {
        row: 10,
        col: 6,
    }
]

export const elements = [
    {
        time: 2,
        type: cellTypes.WATER,
        shape: 
        [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.TOWN,
        shape: 
        [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: cellTypes.FOREST,
        shape: 
        [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.FARM,
        shape: 
        [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.FOREST,
        shape: 
        [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.TOWN,
        shape: 
        [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.FARM,
        shape: 
        [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: cellTypes.TOWN,
        shape: 
        [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: cellTypes.TOWN,
        shape: 
        [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: cellTypes.FARM,
        shape: 
        [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: cellTypes.FARM,
        shape: 
        [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.WATER,
        shape: 
        [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.WATER,
        shape: 
        [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.FOREST,
        shape: 
        [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.FOREST,
        shape: 
        [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: cellTypes.WATER,
        shape: 
        [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
]

export const missions = [
    {
        title: "edge of the forest",
        description: "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
        function: "edgeOfTheForest",
        src: "./pictures/missions/edgeOfTheForest.png"
    },
    {
        title: "sleepy valley",
        description: "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
        function: "sleepyValley",
        src: "./pictures/missions/sleepyValley.png"
    },
    {
        title: "watering potatoes",
        description: "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
        function: "wateringPotatoes",
        src: "./pictures/missions/wateringPotatoes.png"
    },
    {
        title: "borderlands",
        description: "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
        function: "borderlands",
        src: "./pictures/missions/borderlands.png"
    },
    {
        title: "tree line",
        description: "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
        function: "treeLine",
        src: "./pictures/missions/treeLine.png"
    },
    {
        title: "wealthy town",
        description: "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
        function: "wealthyTown",
        src: "./pictures/missions/wealthyTown.png"
    },
    {
        title: "watering canal",
        description: "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
        function: "wateringCanal",
        src: "./pictures/missions/wateringCanal.png"
    },
    {
        title: "valley of magicians",
        description: "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
        function: "valleyOfMagicians",
        src: "./pictures/missions/valleyOfMagicians.png"
    },
    {
        title: "empty site",
        description: "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
        function: "emptySite",
        src: "./pictures/missions/emptySite.png"
    },
    {
        title: "row of houses",
        description: "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
        function: "rowOfHouses",
        src: "./pictures/missions/rowOfHouses.png"
    },
    {
        title: "odd numbered silos",
        description: "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
        function: "oddNumberedSilos",
        src: "./pictures/missions/oddNumberedSilos.png"
    },
    {
        title: "rich countryside",
        description: "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
        function: "richCountryside",
        src: "./pictures/missions/richCountryside.png"
    }
]