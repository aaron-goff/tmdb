'use client'
import { useEffect, useState } from 'react'
import { getContestants } from './getContestants'

const columns = [
    'Full Name',
    'Series',
    'Nationality',
    'Episode Wins',
    'Live Task Points',
    'Total Live Task Points',
    'Percentage Total Live Task Points',
]

export default function Stats() {
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await getContestants()
                setData(JSON.parse(JSON.stringify(getData)))
            } catch (err: any) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <p>Loading data...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data
                    .sort(
                        (a: any, b: any) =>
                            (Array.isArray(a.Series) ? a.Series[0] : a.Series) -
                                (Array.isArray(b.Series)
                                    ? b.Series[0]
                                    : b.Series) || a.id - b.id
                    )
                    .map((contestant: any) => (
                        <tr key={contestant.id}>
                            {columns.map((column) => (
                                <td key={`${contestant.id}-${column}`}>
                                    {Array.isArray(contestant[column])
                                        ? contestant[column].join(', ')
                                        : contestant[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}
