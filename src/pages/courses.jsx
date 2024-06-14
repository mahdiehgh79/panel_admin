import { httpInterceptedService } from "@core/http-service"
import CourseList from "../features/courses/components/course-list"
import { Await } from "react-router-dom"
import { Suspense } from "react"
import { useLoaderData } from "react-router-dom"
import { defer } from "react-router-dom"

const Courses = () => {
    const data = useLoaderData()
    return(
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a className="btn btn-primary fw-bolder mt-n1">
                        افرودن دوره جدید
                    </a>
                </div>
                <Suspense fallback={<p className="text-info">درحال دریافت اطلاعات ...</p>}>
                <Await resolve={data.courses}>
                    {
                        (loadCourses) => <CourseList courses={loadCourses}/>
                    }
                </Await>
                </Suspense>
                
            </div>
        </div>
    )
}

export async function coursesLoader() {
    return defer({
        courses: loadCourses(),
    })
   
}
const loadCourses = async() => {
    const response = await httpInterceptedService.get('/Course/list')
    return response.data
}

export default Courses