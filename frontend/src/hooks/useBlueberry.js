import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { onPageBlueberrys } from "../store/pagination/PaginationSlice";

const useBlueberry = ({user_id, m, y}) => {

    const pageBlueberrys = useSelector(state => state.Pagination.pageBlueberrys)
    const dispatch = useDispatch()

    const updatePageBlueberrys = (value) => {
        dispatch(onPageBlueberrys(value))
    }

    const [blueberry, setBlueberry] = useState({})
    const [trays, setTrays] = useState([]);

    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const get_paginate_blueberrys = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blueberry/get-trays?user_id=${user_id}&m=${m}&y=${y}&page=${pageBlueberrys}`)
            const data = await res.json()
            const {docs, hasNextPage, hasPrevPage, totalPages} = await data
            setHasNextPage(hasNextPage)
            setHasPrevPage(hasPrevPage)
            setTotalPages(totalPages)
            setBlueberry(data)
            setTrays(docs)
        }
        get_paginate_blueberrys()
    }, [m, pageBlueberrys])

    return {
        blueberry,
        trays,
        pageBlueberrys,
        hasNextPage,
        hasPrevPage,
        totalPages,
        updatePageBlueberrys
    }
}

export default useBlueberry