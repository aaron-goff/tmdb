type TaskPayload = {
    Name: string,
    Series: string,
    Episode: number,
    Participants: string[],
    NumOfParticipants: number,
    Categories: string[],
    HasSecret: boolean,
    IsTeamTask: boolean,
    IsLiveTask: boolean,
    IsPrizeTask: boolean,
    isTiebreak: boolean,
    IsVisualEditing: boolean,
    ContestantUsesVisualEditing: string[] | null,
    Location: string[],
    CompletelyObjective: boolean,
    IsCompletedInStudio: boolean,
    TotalPoints: number,
    Winner: string
}

type TaskScoringPayload = {
    task: number,
    '5': string[] | null,
    '4': string[] | null,
    '3': string[] | null,
    '2': string[] | null,
    '1': string[] | null,
    '0': string[] | null,
    'Disqualified': string[] | null,
    '6': string[] | null,
    'Tiebreak Win': string[] | null,
    'Tiebreak Loss': string[] | null,
    'Total Points': number | null,
    '15': string[] | null,
    '12': string[] | null,
    '7': string[] | null
}

enum TaskColumn {
    Name = 'Name',
    Id = 'id',
    Series = 'Series',
    Episode = 'Episode',
    NumOfParticipants = 'NumOfParticipants',
    TotalPoints = 'TotalPoints',
    Participants = 'Participants',
    Categories = 'Categories',
    HasSecret = 'HasSecret',
    IsTeamTask = 'IsTeamTask',
    IsLiveTask = 'IsLiveTask',
    IsPrizeTask = 'IsPrizeTask',
    IsTiebreak = 'isTiebreak',
    IsVisualEditing = 'IsVisualEditing',
    ContestantUsesVisualEditing = 'ContestantUsesVisualEditing',
    Location = 'Location',
    CompletelyObjective = 'CompletelyObjective',
    IsCompletedInStudio = 'IsCompletedInStudio',
    Winner = 'Winner',

}

export type {
    TaskPayload, TaskScoringPayload
}

export { TaskColumn }