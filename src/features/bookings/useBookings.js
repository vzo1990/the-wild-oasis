import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../utils/constants";

export default function useBookings() {
  const [urlParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = urlParams.get("status") || "all";
  const search = urlParams.get("search") || "";

  const sortValue = urlParams.get("sort") || "startDate-desc";
  const [sortField, sortDirection] = sortValue.split("-");

  const page = +urlParams.get("page") || 1;

  // fetching current page
  const { data: { bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filterValue, sortValue, page, search],
    queryFn: () =>
      getBookings({
        filter: { name: "status", value: filterValue },
        sort: { field: sortField, direction: sortDirection },
        page,
        search,
      }),
  });

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  // prefetching
  if (page < totalPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortValue, page + 1, search],
      queryFn: () =>
        getBookings({
          filter: { name: "status", value: filterValue },
          sort: { field: sortField, direction: sortDirection },
          page: page + 1,
          search,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortValue, page - 1, search],
      queryFn: () =>
        getBookings({
          filter: { name: "status", value: filterValue },
          sort: { field: sortField, direction: sortDirection },
          page: page - 1,
          search,
        }),
    });

  return { bookings, count, isLoading };
}
