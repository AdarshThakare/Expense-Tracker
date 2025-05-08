import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomLineChart = ({ data }: any) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
      className="overflow-x-auto max-md:-ml-9 max-md:w-screen! max-md:h-[320px]! md:h-[350px] "
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#875cf5" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="none" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#875cf5"
          fill="url(#incomeGradient)"
          strokeWidth={3}
          dot={{ r: 3, fill: "#ab8df8" }}
          stackId={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
