import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Login from "../auth/pages/Login";
import UserList from "../features/users/pages/UserList";
import CreateUser from "../features/users/pages/CreateUser";
import RoleGuard from "./roleGuard";
import AuthGuard from "./authGuard";
import EditUser from "../features/users/pages/EditUser";
import DepartmentList from "../features/departments/pages/DepartmentList";
import EmployeeDashboard from "../features/dashboard/pages/EmployeeDashboard";
import MyGoalsPage from "../features/goals/pages/MyGoalsPage";
import TeamGoalsPage from "../features/goals/pages/TeamGoalsPage";
import PerformanceCycleList from "../features/performanceCycles/pages/PerformanceCycleList";
import ReviewCyclePage from "../features/reviewCycles/pages/ReviewCyclePage";
import RequireRole from "../components/common/RequireRole";
import ManagerRatingsPage from "../features/ratings/pages/ManagerRatingsPage";
import HrCalibrationPage from "../features/ratings/pages/HrCalibrationPage";
import FinalRatingsPage from "../features/ratings/pages/FinalRatingsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Entry point */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
       <Route element={<AuthGuard />}>
         <Route element={<AppLayout />}>
           <Route path="/dashboard" element={<EmployeeDashboard />} />
           <Route path="/users" element={<UserList />} />
           <Route path="/goals" element={<MyGoalsPage />} />
           <Route path="/goals/team" element={<TeamGoalsPage />} />
           <Route path="/goals/team" element={<TeamGoalsPage />} />



           {/* HR + ADMIN ONLY */}
           <Route element={<RoleGuard allowedRoles={["HR", "ADMIN"]} />}>
             <Route path="/users/create" element={<CreateUser />} />
             <Route path="/users/:id/edit" element={<EditUser />} />
             <Route path="/departments" element={<DepartmentList />} />
             <Route path="/performance-cycles" element={<PerformanceCycleList />}/>
           </Route>
         </Route>
       </Route>

       <Route
         path="/review-cycles"
         element={
           <RequireRole roles={["HR", "ADMIN"]}>
             <ReviewCyclePage />
           </RequireRole>
         }
       />

       <Route path="/ratings/manager" element={<RequireRole roles={["MANAGER"]}><ManagerRatingsPage /></RequireRole>} />
       <Route path="/ratings/hr" element={<RequireRole roles={["HR"]}><HrCalibrationPage /></RequireRole>} />
       <Route path="/ratings/final" element={<RequireRole roles={["LEADERSHIP"]}><FinalRatingsPage /></RequireRole>} />



      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
