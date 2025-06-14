import { FieldValues } from "react-hook-form"
import { Supabase } from "../utils/supabase"
import { EpisodePayload } from "../types/Episodes"
import { SuccessOptions } from "../utils/types"

export const submitEpisode = async (supabase: Supabase, data: FieldValues) => {
        const payload: EpisodePayload = {
            Series: data.Series,
            Number: data.Number,
            Name: data.Name,
            'Prize Task': '',
            'Live Task': '',
            'Recorded Tasks': [],
            'Additional Tasks': null,
            First: [],
            Second: [],
            Third: [],
            Fourth: [],
            Fifth: [],
            'First Points': null,
            'Second Points': null,
            'Third Points': null,
            'Fourth Points': null,
            'Fifth Points': null,
            'Total Points': 0
        }
        if (data.Winner !== 'Select Winner') {
            payload.First?.push(data.Winner)
        }
        const sortedContestants = Object.entries(data)
            .filter(
                ([key]) =>
                    key !== 'Series' &&
                    key !== 'Number' &&
                    key !== 'Winner' &&
                    key !== 'Name'
            )
            .map(([key, value]) => [key, Number(value)])
            .sort(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ([_a, aValue], [_b, bValue]) => Number(bValue) - Number(aValue)
            )
            .map(([key, value]) => {return { contestant: key.toString(), points: Number(value)}})
        const totalPoints = sortedContestants
            .map(({ points}) => Number(points))
            .reduce((acc, curr) => {
                return acc + curr
            }, 0)
        payload['Total Points'] = totalPoints
        if (payload.First?.length === 0) {
            const winner = sortedContestants.shift()!
            payload.First.push(winner.contestant)
            payload['First Points'] = winner.points
        } else {
            const winnerIndex = sortedContestants.findIndex(({ contestant}) => {
                return contestant === (payload.First![0] ?? '')
            })
            payload['First Points'] = sortedContestants[winnerIndex].points
            sortedContestants.splice(winnerIndex, 1)
        }
        const second = sortedContestants.shift()!
        payload.Second?.push(second.contestant)
        payload['Second Points'] = second.points
        if (second.points === sortedContestants[0].points) {
            const second2 = sortedContestants.shift()!
            if (second2.points === sortedContestants[0].points) {
                const second3 = sortedContestants.shift()!
                if (second3.points === sortedContestants[0].points) {
                    payload.Second?.push(
                        second2.contestant,
                        second3.contestant,
                        sortedContestants[0].contestant
                    )
                } else {
                    payload.Second?.push(second2.contestant, second3.contestant)
                    payload.Fifth?.push(sortedContestants[0].contestant)
                    payload['Fifth Points'] = sortedContestants[0].points
                }
            } else {
                payload.Second?.push(second2.contestant)
                const fourth = sortedContestants.shift()!
                if (fourth.points === sortedContestants[0].points) {
                    payload.Fourth?.push(fourth.contestant, sortedContestants[0].contestant)
                    payload['Fourth Points'] = fourth.points
                } else {
                    payload.Fourth?.push(fourth.contestant)
                    payload['Fourth Points'] = fourth.points
                    payload.Fifth?.push(sortedContestants[0].contestant)
                    payload['Fifth Points'] = sortedContestants[0].points
                }
            }
        } else {
            const third = sortedContestants.shift()!
            payload.Third?.push(third.contestant)
            payload['Third Points'] = third.points
            if (third.points === sortedContestants[0].points) {
                const third2 = sortedContestants[0]
                payload.Third?.push(third2.contestant)
                if (third2.points === sortedContestants[0].points) {
                    payload.Third?.push(sortedContestants[0].contestant)
                } else {
                    payload.Fifth?.push(sortedContestants[0].contestant)
                    payload['Fifth Points'] = sortedContestants[0].points
                }
            } else {
                const fourth = sortedContestants.shift()!
                payload.Fourth?.push(fourth.contestant)
                payload['Fourth Points'] = fourth.points
                if (fourth.points === sortedContestants[0].points) {
                    payload.Fourth?.push(sortedContestants[0].contestant)
                } else {
                    payload.Fifth?.push(sortedContestants[0].contestant)
                    payload['Fifth Points'] = sortedContestants[0].points
                }
            }
        }
        if (!payload.Second?.length) payload.Second = null
        if (!payload.Third?.length) payload.Third = null
        if (!payload.Fourth?.length) payload.Fourth = null
        if (!payload.Fifth?.length) payload.Fifth = null
        const uploadEpisodeError = await supabase.addEpisode(payload)
        if (uploadEpisodeError) {
            return { success: SuccessOptions.Failure, errorMessage: `Something went wrong uploading the episode.\n${uploadEpisodeError.message}`}
        } else {
            return { success: SuccessOptions.Success, errorMessage: ''}
        }
}