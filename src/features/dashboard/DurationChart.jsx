import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    label: "1 night",
    duration: { from: 1, to: 1 },
    value: 0,
    color: "#ef4444",
  },
  {
    label: "2 nights",
    duration: { from: 2, to: 2 },
    value: 0,
    color: "#f97316",
  },
  {
    label: "3 nights",
    duration: { from: 3, to: 3 },
    value: 0,
    color: "#eab308",
  },
  {
    label: "4-5 nights",
    duration: { from: 4, to: 5 },
    value: 0,
    color: "#84cc16",
  },
  {
    label: "6-7 nights",
    duration: { from: 6, to: 7 },
    value: 0,
    color: "#22c55e",
  },
  {
    label: "8-14 nights",
    duration: { from: 8, to: 14 },
    value: 0,
    color: "#14b8a6",
  },
  {
    label: "15-21 nights",
    duration: { from: 15, to: 21 },
    value: 0,
    color: "#3b82f6",
  },
  {
    label: "21+ nights",
    duration: { from: 21, to: Infinity },
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    label: "1 night",
    duration: { from: 1, to: 1 },
    value: 0,
    color: "#b91c1c",
  },
  {
    label: "2 nights",
    duration: { from: 2, to: 2 },
    value: 0,
    color: "#c2410c",
  },
  {
    label: "3 nights",
    duration: { from: 3, to: 3 },
    value: 0,
    color: "#a16207",
  },
  {
    label: "4-5 nights",
    duration: { from: 4, to: 5 },
    value: 0,
    color: "#4d7c0f",
  },
  {
    label: "6-7 nights",
    duration: { from: 6, to: 7 },
    value: 0,
    color: "#15803d",
  },
  {
    label: "8-14 nights",
    duration: { from: 8, to: 14 },
    value: 0,
    color: "#0f766e",
  },
  {
    label: "15-21 nights",
    duration: { from: 15, to: 21 },
    value: 0,
    color: "#1d4ed8",
  },
  {
    label: "21+ nights",
    duration: { from: 21, to: Infinity },
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // Maybe in needs to place this fn into helpers folder
  function checkIsInRange(from, to, number) {
    return from <= number && to >= number;
  }

  function incArrayValue(arr, nights) {
    return arr.map((obj) => {
      const { from, to } = obj.duration;
      const isInRange = checkIsInRange(from, to, nights);

      return isInRange ? { ...obj, value: obj.value + 1 } : obj;
    });
  }

  const data = stays
    .reduce((arr, cur) => incArrayValue(arr, cur.numNights), startData)
    .filter((obj) => obj.value > 0);
  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="label"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
