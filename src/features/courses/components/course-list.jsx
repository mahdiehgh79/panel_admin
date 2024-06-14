import { useLoaderData } from "react-router-dom"
import Course from "./course"

const CourseList = ({courses}) => {
    // const loadedCourse = useLoaderData()

    return(
        <>
          <div className="row">
            {
                courses.map((course) => (
                    <div className="col-3" key={course.id}>
                        <Course {...course}/>
                    </div>    
                ))
            }
          </div>
        </>
    )
}
export default CourseList