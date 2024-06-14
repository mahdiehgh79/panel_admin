import { createBrowserRouter } from "react-router-dom";
import Login from "./features/identity/components/login"
import Register from "./features/identity/components/register"
import IdentityLayout from "./layouts/identity-layout";
import { registerAction } from "./features/identity/components/register";
import { loginAction } from "./features/identity/components/login";
import MainLayout from "./layouts/mainLayout/main-layout";
import Courses from "./pages/courses";
import { coursesLoader } from "./pages/courses";
import CoursesCategories from "./pages/course-categories";
import CourseDetails from "./features/courses/components/course-datail";
import { courseDetailsLoader } from "./features/courses/components/course-datail";
import { categoriesLoader } from "./pages/course-categories";
import { CategoryProvider } from "./features/categories/category-context";
import NotFound from "./pages/not-found";
import UnhandledException from "./pages/unhandled-exception";

const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout/>,
        errorElement: <UnhandledException/>,
        children:[{
            element: <Courses/>,
            index:true,
            loader: coursesLoader
        },
        {
           path:'course-categories',
           element:(
            <CategoryProvider>
                <CoursesCategories/>
            </CategoryProvider>
           
        ),
           loader:categoriesLoader
        },
        {
            path:'courses/:id',
            element:<CourseDetails/>,
            loader: courseDetailsLoader
        }
    ]
    },
    {
        element:<IdentityLayout/>,
        children:[
            {
                path :'login',
                element: <Login/>,
                action: loginAction,
                errorElement: <Login/>
            },
            {  
                path:'register',
                element:<Register/>,
                action: registerAction,
                errorElement: <Register/>,
            },
        ],
    },
    {
        path:'*',
        element:<NotFound/>
    }
    
])
export default router