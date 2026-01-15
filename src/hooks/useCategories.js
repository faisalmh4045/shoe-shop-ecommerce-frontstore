import { useRouteLoaderData } from "react-router";

export const useCategories = () => {
  const data = useRouteLoaderData("root");
  return data?.categories || [];
};
