// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFormInvalid = (err: any) => {
    return Object.keys(err).length > 0
}