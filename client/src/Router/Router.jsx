import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';
import CreateJob from '../Pages/CreateTask';
import MyJobs from '../Pages/MyTasks';
import TaskAllocation from '../Pages/taskAllocation'
import UpdateJob from '../Pages/UpdateTask';
import JobDetails from '../Pages/taskDetails';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <ProtectedRoute element={<Home />} /> // Protecting the Home route
            },
            {
                path: '/post-task',
                element: <ProtectedRoute element={<CreateJob />} /> // Protecting the CreateJob route
            },
            {
                path: '/your-tasks',
                element: <ProtectedRoute element={<MyJobs />} /> // Protecting the MyJobs route
            },
            {
                path: '/task-allocated',
                element: <ProtectedRoute element={<TaskAllocation />} /> // Protecting the MyJobs route
            },
            {
                path: 'edit-task/:id',
                element: <ProtectedRoute element={<UpdateJob />} />, // Protecting the UpdateJob route
                loader: ({ params }) => fetch(`https://todo-application-vrr8.onrender.com/all-tasks/${params.id}`),
            },
            {
                path: 'task/:id',
                element: <ProtectedRoute element={<JobDetails />} />, // Protecting the JobDetails route
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    }
]);

export default router;
