import useAuthStore from "../hooks/useAuthStore"
import useBlueberry from "../hooks/useBlueberry"
import usePeriod from "../hooks/usePeriod"

const Pagination = () => {

    const {user} = useAuthStore()
    const { PeriodState } = usePeriod(user.id)
    const { monthState } = PeriodState

    var p = monthState.split("/")

    const {pageBlueberrys, hasNextPage, hasPrevPage, totalPages, updatePageBlueberrys} = useBlueberry({
        user_id: user.id,
        m: p[0],
        y: p[1]
    })

    const handleNextPage = (e) => {
        hasNextPage ? updatePageBlueberrys(pageBlueberrys+1) : updatePageBlueberrys(1)
    }

    const handlePrevPage = (e) => {
        hasPrevPage ? updatePageBlueberrys(pageBlueberrys-1) : updatePageBlueberrys(totalPages)
    }

    return <div className="display-pagination">
        <button className="btn" onClick={handlePrevPage}>Anterjor</button>
        <p>{pageBlueberrys}</p>
        <button className="btn" onClick={handleNextPage}>Siguiente</button>
    </div>
}

export default Pagination