type ContestantsUploadPayload = {
    'Full Name': string
    'First Name': string
    'Last Name': string
    Series: string[]
    'Place of Birth': string
    Nationality: string
    'Place of Business': string
    Age: number[]
}

enum ContestantColumn {
    FullName = 'Full Name',
    FirstName = 'First Name',
    LastName = 'Last Name',
    Series = 'Series',
    PlaceOfBirth = 'Place of Birth',
    Nationality = 'Nationality',
    PlaceOfBusiness = 'Place of Business',
    Age = 'Age',
}

export {
    ContestantColumn
}
export type { ContestantsUploadPayload }
