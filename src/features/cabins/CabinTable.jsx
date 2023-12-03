import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [urlParams] = useSearchParams();
  const filterValue = urlParams.get("discount") || "all";

  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resource="cabins" />;

  // Filtering
  let filteredCabins = [];
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // Sorting
  const sortBy = urlParams.get("sort") || "startDate";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) =>
    typeof a[field] === "string"
      ? a.name.localeCompare(b.name) * modifier
      : (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"} role="table">
        <Table.Header role="row">
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
