const CustomBarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="font-sm font-semibold text-purple-600">
          Amount :{" "}
          <span className="text-sm font-medium text-gray-900">
            ${payload[0].value}
          </span>
        </p>
        <p className="font-sm font-semibold text-purple-600">
          Month :{" "}
          <span className="text-sm font-medium text-gray-900">
            {payload[0].payload.month}
          </span>
        </p>
      </div>
    );
  }
};

export default CustomBarTooltip;
