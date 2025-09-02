const Spinner = ({ size = 32, color = "border-orange-900" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-b-2 ${color}`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Spinner;
