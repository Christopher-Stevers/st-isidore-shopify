import React, {type SetStateAction} from 'react';

const Search = ({
  searchState,
}: {
  searchState: [string, React.Dispatch<SetStateAction<string>>];
}) => {
  const [search, setSearch] = searchState;
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="w-full flex-1 ">
      <input
        onChange={handleSearch}
        value={search}
        placeholder="Search"
        className="w-full rounded-sm border border-black p-2 px-4 text-lg "
      />
    </div>
  );
};

export default Search;
