import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPeriodState, setPeriodTranslate } from "../store/auth/PeriodSlice"

const usePeriod = (user_id = "") => {

    const [periodValue, setPeriodValue] = useState([])
    const [period, setPeriod] = useState([])

    const PeriodState = useSelector(state => state.Period)
    const dispatch = useDispatch()

    const updatePeriodState = (value = "default") => {
        dispatch( setPeriodState(value) )
    }

    const updatePeriodTranslateState = (value) => {
        dispatch( setPeriodTranslate(value) )
    }

    useEffect(() => {
        const request = async () => {
            const res = await fetch("http://localhost:8000/api/blueberry/get-months", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user_id})
            })
            const {month, number} = await res.json()
            setPeriod(month)
            setPeriodValue(number)
        }
        request()
    }, [])

    return {
        period,
        periodValue,
        PeriodState,
        updatePeriodState,
        updatePeriodTranslateState
    }
}

export default usePeriod