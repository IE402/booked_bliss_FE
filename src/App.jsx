import ListPage from "./routes/listPage/listPage";
// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/SinglePage";
import Profile from "./routes/UserProfile/userProfile";
import HomePage from "./Routes/homePage/homePage";
import NewPostPage from "./Routes/newPostPage/newPostPage";
import Register from "./routes/register/register";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage"
import { listPageLoader, singPageLoader, profilePageLoader, homePageLoader, chatPageLoader } from "./lib/loaders";
import ContactUs from "./Routes/LeftoverPage/ContactUs";
import TypeofHouses from "./Routes/LeftoverPage/TypeOfHouses";
import FAQPage from "./Routes/FAQPage/FAQPAge";
import Cooperation from "./Routes/LeftoverPage/Cooperation";
import Agents from "./Routes/LeftoverPage/Agents";
// import ChatPage from "./routes/Chat/Chat";
import { AuthContext } from "./components/context/AuthContext";
import { useContext } from "react";

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
        {
          path: "/contactus",
          element: <ContactUs />,
        },
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
        // {
        //   path: "/chat",
        //   element: <ChatPage />,
        //   loader: chatPageLoader,
        // },
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App;



