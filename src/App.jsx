import ListPage from "./routes/listPage/listPage";
// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./Routes/singlePage/singlePage";
import Profile from "./routes/UserProfile/userProfile";
import HomePage from "./Routes/homePage/homePage";
import NewPostPage from "./Routes/newPostPage/newPostPage";
import Register from "./routes/register/register";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage"
import { listPageLoader, singPageLoader, profilePageLoader, homePageLoader, chatPageLoader } from "./lib/loaders";
import TypeofHouses from "./Routes/LeftoverPage/TypeOfHouses";
import FAQPage from "./Routes/FAQPage/FAQPAge";
import Cooperation from "./Routes/LeftoverPage/Cooperation";
import Agents from "./Routes/LeftoverPage/Agents";
import { AuthContext } from "./components/context/AuthContext";
import { useContext } from "react";
import MapPage from "./Routes/MapPage/MapPage";
import { HopDong } from "./Routes/Rent/HopDong";
import ListUserThue from "./Routes/LeftoverPage/HopDong";
function App() {
  const {currentUser  } = useContext(AuthContext);
  console.log(currentUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          loader: homePageLoader,
        },
        {
          path: "/homePage",
          element: <HomePage />,
          loader: homePageLoader,
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singPageLoader,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        // {
        //   path: "/contactus",
        //   element: <ContactUs />,
        // },
        {
          path: "/houses",
          element: <TypeofHouses />,
        },
        {
          path: "/faq",
          element: <FAQPage />,
        },
        {
          path: "/coop",
          element: <Cooperation />,
        },
        {
          path: "/agents",
          element: <Agents />,
        },
        {
          path: "/map",
          element: <MapPage />,
          loader: listPageLoader,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        {
          path: "/rent",
          element: <HopDong />,
        },
        {
          path: "/reqRent",
          element: <ListUserThue />,
        },
        // {
        //   path: "/chat",
        //   element: <ChatPage />,
        //   loader: chatPageLoader,
        // },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        
        {
          path: "/rent",
          element: <HopDong />,
        },
        
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App;



