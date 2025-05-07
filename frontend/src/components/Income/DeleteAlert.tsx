const DeleteAlert = ({ content, onDelete }: any) => {
  return (
    <div>
      <h5 className="text-md text-white">{content}</h5>
      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill dark:border-none hover:bg-red-500!"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
