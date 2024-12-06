import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export const singPageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
}

// eslint-disable-next-line no-unused-vars
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  return defer({
    postResponse: postPromise,
  });
};

export const chatPageLoader = async () => {
  const chatPromise = apiRequest("/chats");
  return defer({
    chatResponse: chatPromise,
  });
};

export const homePageLoader = async () => {
  const postPromise = apiRequest("/posts");
  return defer({
    postResponse: postPromise,
  });
};