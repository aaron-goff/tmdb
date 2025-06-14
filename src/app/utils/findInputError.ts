// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findInputError: any = (errors: any, name: string) => {
    const filtered = Object.keys(errors)
        .filter(key => key.includes(name))
        .reduce((cur, key) => Object.assign(cur, {error: errors[key]}), {})
    return filtered
}