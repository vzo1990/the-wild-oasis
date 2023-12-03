import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivities from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { recentBookings, isRecentLoading, numDays } = useRecentBookings();
  const { confirmedStays, isStaysLoading } = useRecentStays();

  if (isRecentLoading || isStaysLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats recentBookings={recentBookings} confirmedStays={confirmedStays} />

      <TodayActivities />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
