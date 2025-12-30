import { useSearchParams, useNavigate, useParams } from "react-router";

export const usePlpQueryParams = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { category } = useParams();

  const categorySlug = category || "";
  let page = 1;
  let sort = "created_at_asc";

  const activeFilters = {};

  searchParams.forEach((value, key) => {
    if (key === "page") {
      page = Number(value);
    } else if (key === "sort") {
      sort = value;
    } else if (key === "price_min" || key === "price_max") {
      activeFilters[key] = Number(value) || 0;
    } else {
      activeFilters[key] = value.split(",").filter(Boolean);
    }
  });

  const updateUrlParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, String(value));
    });

    if (!("page" in updates)) {
      params.delete("page");
    }

    navigate(`/category/${categorySlug}?${params.toString()}`, {
      replace: true,
    });
  };

  const resetFilters = () => {
    navigate(`/category/${categorySlug}`, { replace: true });
  };

  return {
    categorySlug,
    page,
    sort,
    activeFilters,
    updateUrlParams,
    resetFilters,
  };
};
