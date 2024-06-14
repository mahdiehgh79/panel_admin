import _ from 'lodash'
import { useSearchParams } from 'react-router-dom'
const Pagination = ({totalRecords, pageSize = import.meta.env.VITE_PAGE_SIZE}) => {
    const pages = Math.ceil(totalRecords/pageSize)
    const [searchParams,setSearhParams] = useSearchParams()

    const currentPage= +searchParams.get('page') || 1

    const prevPage = () => {
        if (currentPage>1){
            setSearhParams({page: currentPage-1 })
        }
    }
    const nextPage = () => {
        if (currentPage<pages){
            setSearhParams({page: currentPage+1 })
        }
    }


    return(
        <nav>
            <ul className="pagination pagination-lg">
                <li className={`page-item ${currentPage === 1 ? 'disabled opacity-50' : ''} `} onClick={prevPage}>
                    <a className="page-link">
                        قبلی
                    </a>
                </li>
                {
                    _.times(pages, index => (
                        <li key={`page${index+1}`} onClick={() => setSearhParams({page:index+1})} className={`page-item ${index+1 === currentPage ? 'active' : ''}`}>
                            <a className='page-link'>{index+1}</a>
                        </li>
                    ))
                }
                <li className={`page-item ${currentPage === pages ? 'disabled opacity-50' : ''}`} onClick={nextPage}>
                    <a className="page-link">
                        بعدی
                    </a>
                </li>
            </ul>
        </nav>
    )
}
export default Pagination