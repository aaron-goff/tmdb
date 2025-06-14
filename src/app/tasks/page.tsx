'use client'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Supabase } from '../utils/supabase'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import supabaseSessionEffect from '../hooks/supabaseSessionEffect'
import { AuthedFormProvider } from '../components/AuthedFormProvider'
import getSeriesDropdownOptions from '../hooks/getSeriesDropdownOptions'
import { getEpisodesBySeries } from '../hooks/getEpisodesBySeries'
import { getSeriesContestantsBySettingPosition } from '../hooks/getSeriesContestantsBySittingPositions'
import getSeriesContestants from '../hooks/getSeriesContestants'
import { submitTask } from './submitTask'
import { SuccessOptions } from '../utils/types'

export default function Tasks() {
    const supabase = new Supabase()
    const session = supabaseSessionEffect(supabase, null)
    const methods = useForm()
    const defaultContestant = {
        value: 'Enter series name first',
        label: 'Enter series name first',
        disabled: true,
    }
    const contestantPlaceholder = {
        value: 'Select a contestant...',
        label: 'Select a contestant...',
        disabled: true,
    }
    const seriesPlaceholder = 'Select a series...'
    const episodePlaceholder = {
        value: 'Select an episode...',
        label: 'Select an episode...',
        disabled: true,
    }

    const seriesName = useWatch({
        control: methods.control,
        name: 'Series',
    })

    const isTiebreak = useWatch({
        control: methods.control,
        name: 'IsTiebreak',
    })

    const [uploadSuccess, setUploadSuccess] = useState(SuccessOptions.Undefined)
    const [uploadErrorMessage, setUploadErrorMessage] = useState('')
    const {
        success: contestantsOptionsSuccess,
        errorMessage: contestantsOptionsErrorMessage,
        contestantOptions,
    } = getSeriesContestants(
        supabase,
        methods,
        seriesName,
        [defaultContestant],
        contestantPlaceholder
    )
    const {
        success: contestantsSuccess,
        errorMessage: contestantsErrorMessage,
        left,
        middleLeft,
        middle,
        middleRight,
        right,
    } = getSeriesContestantsBySettingPosition(supabase, methods, seriesName)
    const {
        success: seriesSuccess,
        errorMessage: seriesErrorMessage,
        series,
    } = getSeriesDropdownOptions(supabase, seriesPlaceholder)
    const {
        success: episodesSuccess,
        errorMessage: episodesErrorMessage,
        episodes,
    } = getEpisodesBySeries(supabase, methods, seriesName, episodePlaceholder)

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = methods.handleSubmit(async (data) => {
        setIsLoading(true)
        const { success, errorMessage } = await submitTask(supabase, data)
        setUploadSuccess(success)
        setUploadErrorMessage(errorMessage)
        if (uploadSuccess === SuccessOptions.Success) methods.reset()
        setIsLoading(false)
    })

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // height: '100vh', // Adjust as needed
            }}
        >
            <AuthedFormProvider methods={methods} session={session}>
                <form
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                    }}
                    onSubmit={(e) => e.preventDefault()}
                    noValidate
                >
                    <div style={{ gridColumn: 1 }}>
                        <fieldset disabled={isLoading}>
                            <Input
                                label={'Name'}
                                type={'text'}
                                id={'Name'}
                                placeholder={'Enter Task Name'}
                                required={true}
                            />
                            <Select
                                multiple={false}
                                options={series}
                                name={'Series'}
                                label={'Series'}
                                required={true}
                                defaultValue={seriesPlaceholder}
                            />
                            <Select
                                multiple={false}
                                options={episodes}
                                name={'Episode'}
                                label={'Episode'}
                                required={true}
                                defaultValue={episodePlaceholder.value}
                            />
                            <Select
                                multiple={true}
                                options={contestantOptions}
                                name={'Particpants'}
                                label={'Participants'}
                                required={true}
                            />
                            <Select
                                multiple={true}
                                options={contestantOptions}
                                name={'Winner'}
                                label={'Winner'}
                                required={true}
                            />
                            <Select
                                multiple={true}
                                options={contestantOptions}
                                name={'Disqualified'}
                                label={'Disqualified'}
                                required={false}
                            />
                            <Input
                                label={'Categories'}
                                type={'text'}
                                id={'Categories'}
                                placeholder={'Enter Categories'}
                                required={true}
                            />
                        </fieldset>
                    </div>
                    <div style={{ gridColumn: 2 }}>
                        <fieldset disabled={isLoading}>
                            <Input
                                label={'Location'}
                                type={'text'}
                                id={'Location'}
                                placeholder={'Enter Location'}
                                required={true}
                            />

                            <Select
                                multiple={true}
                                options={contestantOptions}
                                name={'ContestantUsesVisualEditing'}
                                label={'ContestantUsesVisualEditing'}
                                required={false}
                            />
                            <Input
                                label={'HasSecret'}
                                type={'checkbox'}
                                id={'hasSecret'}
                                placeholder={'Enter hasSecret'}
                                required={false}
                            />
                            <Input
                                label={'IsTeamTask'}
                                type={'checkbox'}
                                id={'IsTeamTask'}
                                placeholder={'Enter IsTeamTask'}
                                required={false}
                            />
                            <Input
                                label={'IsLiveTask'}
                                type={'checkbox'}
                                id={'IsLiveTask'}
                                placeholder={'Enter IsLiveTask'}
                                required={false}
                            />
                            <Input
                                label={'IsPrizeTask'}
                                type={'checkbox'}
                                id={'IsPrizeTask'}
                                placeholder={'Enter IsPrizeTask'}
                                required={false}
                            />
                            <Input
                                label={'IsTiebreak'}
                                type={'checkbox'}
                                id={'IsTiebreak'}
                                placeholder={'Enter IsTiebreak'}
                                required={false}
                            />
                            <Input
                                label={'IsVisualEditing'}
                                type={'checkbox'}
                                id={'IsVisualEditing'}
                                placeholder={'Enter IsVisualEditing'}
                                required={false}
                            />
                            <Input
                                label={'CompletelyObjective'}
                                type={'checkbox'}
                                id={'CompletelyObjective'}
                                placeholder={'Enter CompletelyObjective'}
                                required={false}
                            />
                            <Input
                                label={'IsCompletedInStudio'}
                                type={'checkbox'}
                                id={'IsCompletedInStudio'}
                                placeholder={'Enter IsCompletedInStudio'}
                                required={false}
                            />

                            {isTiebreak && (
                                <div>
                                    <Select
                                        multiple={true}
                                        options={contestantOptions}
                                        name={'Tiebreak Win'}
                                        label={'Tiebreak Win'}
                                        required={false}
                                    />
                                    <Select
                                        multiple={true}
                                        options={contestantOptions}
                                        name={'Tiebreak Loss'}
                                        label={'Tiebreak Loss'}
                                        required={false}
                                    />
                                </div>
                            )}
                        </fieldset>
                    </div>
                    <div style={{ gridColumn: 3 }}>
                        <fieldset disabled={isLoading}>
                            <Input
                                label={'Left'}
                                type={'text'}
                                id={'Left'}
                                placeholder={'Enter points for: ' + left}
                                required={false}
                            />
                            <Input
                                label={'Middle-Left'}
                                type={'text'}
                                id={'Middle-Left'}
                                placeholder={'Enter points for: ' + middleLeft}
                                required={false}
                            />
                            <Input
                                label={'Middle'}
                                type={'text'}
                                id={'Middle'}
                                placeholder={'Enter points for: ' + middle}
                                required={false}
                            />
                            <Input
                                label={'Middle-Right'}
                                type={'text'}
                                id={'Middle-Right'}
                                placeholder={'Enter points for: ' + middleRight}
                                required={false}
                            />
                            <Input
                                label={'Right'}
                                type={'text'}
                                id={'Right'}
                                placeholder={'Enter points for: ' + right}
                                required={false}
                            />
                        </fieldset>
                    </div>
                    <div
                        className="mt-5"
                        style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
                    >
                        {uploadSuccess === SuccessOptions.Success && (
                            <p className="flex items-center gap-1 mb-5 font-semibold text-green-500">
                                Task has been submitted successfully
                            </p>
                        )}
                        {uploadSuccess === SuccessOptions.Failure && (
                            <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                                Task has not been submitted successfully. Check
                                database and console
                                <br />
                                {uploadErrorMessage}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="submit-button"
                            onClick={onSubmit}
                        >
                            Upload Task
                        </button>
                    </div>
                </form>
            </AuthedFormProvider>
        </div>
    )
}
