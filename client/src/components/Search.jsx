import React, { useState } from "react";

function Search(props) {
  const { setMoviesData } = props;
  const [searchText, setSearchText] = useState("");

  const changeHandler = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearch = () => {
    fetch(`https://www.omdbapi.com/?apikey=b83494f&s=${searchText}`)
      .then((response) => response.json())
      .then((response) => setMoviesData(response.Search))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input type="text" value={searchText} onChange={changeHandler} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
