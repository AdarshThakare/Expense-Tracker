import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomBarTooltip from "./CustomBarToolTip";

const CustomBarChart = ({ data }: any) => {
  const getBarColor = (index: any) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };
  return (
    <div className="bg-whtie mt-6">
      <ResponsiveContainer
        width="100%"
        height={350}
        className="overflow-x-auto max-md:-ml-9 max-md:w-screen! max-md:h-[320px]! md:h-[350px] "
      >
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomBarTooltip />} />

          <Bar dataKey="amount" fill="#ff8042" radius={[10, 10, 0, 0]}>
            {data.map((entry: any, index: any) => (
              <Cell key={`${entry} ${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
