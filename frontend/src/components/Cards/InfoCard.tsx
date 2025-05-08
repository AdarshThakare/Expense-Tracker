const InfoCard = ({ icon, label, color, value }: any) => {
  return (
    <div className=" ml-1 mr-2 flex gap-6 bg-white p-6 items-center rounded-2xl shadow-md shadow-gray-300 border border-gray-200/50">
      <div
        className={`size-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-md text-gray-500">{label}</h6>
        <span className="text-[24px]">${value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
