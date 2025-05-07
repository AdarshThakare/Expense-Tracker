const CustomLegend = ({ payload }: any) => {
  if (payload && payload.length) {
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
        {payload.map((entry: any, index: number) => {
          <div className="flex items-center space-x-2" key={index}>
            <div
              className="size-2 5 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-700 font-medium">
              {entry.value}
            </span>
          </div>;
        })}
      </div>
    );
  }
};

export default CustomLegend;
