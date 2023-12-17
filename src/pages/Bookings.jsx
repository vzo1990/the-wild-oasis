import BookingTable from "../features/bookings/BookingTable";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Search from "../ui/Search";
import SortBy from "../ui/SortBy";
import TableOperations from "../ui/TableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bookings</Heading>
        <TableOperations>
          <Search placeholder="Cabin or Guest..." />
          <Filter
            filterName="status"
            options={[
              { value: "all", label: "All" },
              { value: "checked-out", label: "Checked out" },
              { value: "checked-in", label: "Checked in" },
              { value: "unconfirmed", label: "Unconfirmed" },
            ]}
          />

          <SortBy
            options={[
              { value: "startDate-desc", label: "Sort by date (recent first)" },
              { value: "startDate-asc", label: "Sort by date (earlier first)" },
              {
                value: "totalPrice-desc",
                label: "Sort by amount (high first)",
              },
              { value: "totalPrice-asc", label: "Sort by amount (low first)" },
            ]}
          />
        </TableOperations>
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
