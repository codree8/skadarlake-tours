import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import BookTours from "./pages/BookToursPage";
import useAuthentication from "./useAuthentication";
import LoadingSpinner from "./components/ui/loading-spinner";
import NotFound from "./pages/Page404";
import Book from "./pages/BookPage";
import Profile from "./pages/ProfilePage";
import Dashboard from "./pages/DashboardPage";
import Unauthorized from "./pages/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const { isLoading } = useAuthentication();

  if (isLoading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="tours" element={<BookTours />} />
        <Route path="tours/:id" element={<Book />} />
        <Route path="profile" element={<Profile />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

