enum SeriesColumn {
    Name = 'Name',
    Left = 'Left',
    MiddleLeft = 'Middle-Left',
    Middle = 'Middle',
    MiddleRight = 'Middle-Right',
    Right = 'Right',
    Episodes = 'Episodes',
    Network = 'Network',
    IsSpecial = 'IsSpecial',
    Date = 'Date'
}

type SeriesPayload = {
    Name: string,
    Left: string,
    'Middle-Left': string,
    Middle: string,
    'Middle-Right': string,
    Right: string,
    Episodes: number,
    Network: string,
    IsSpecial: boolean,
    Date: string
}

export {
    SeriesColumn
}

export type {
    SeriesPayload
}