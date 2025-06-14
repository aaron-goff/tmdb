export const SubmitButton = ({
    onSubmit,
    label,
}: {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
    label: string
}) => {
    return (
        <button type="submit" className="submit-button" onClick={onSubmit}>
            {label}
        </button>
    )
}
