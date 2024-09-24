const EditComp = ({ id }) => {
  return (
    <div className="h-36 pt-6">
      <input
        value={id}
        className="bg-[#E6E6E6] px-2 py-2 rounded-lg border border-gray-300 w-[37%] cursor-not-allowed"
        disabled
      />
    </div>
  );
};

export default EditComp;
