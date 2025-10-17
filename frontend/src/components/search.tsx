export const Search = ({
  searchItem,
  setSearchItem,
}: {
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
  searchItem: string;
}) => {
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search to-dos"
        value={searchItem}
        onChange={onSearchChange}
        className="w-full outline-0 border-mutedTextColor/80 border-[1px] py-[8px] px-[15px] rounded-lg bg-mutedBackground/5 "
      />
    </div>
  );
};
