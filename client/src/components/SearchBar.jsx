import React, {useState} from 'react'


const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

    
    
    const categoriesOfGift = [
      { name: "Cinema"},
      { name: "Restaurant"},
      { name: "Bookstore"},
      { name: "Household"},
      { name: "Phone data"},
      { name: "Flowershop"},
    ];
    
    const handleChange = (e) => {
      e.preventDefault();
    setSearchInput(e.target.value);
    
    if (searchInput.length > 0){
        categoriesOfGift.filter((category) => {
            return category.name.match(searchInput);
        });
    }
  }
    return  <div>

<input
   type="text"
   placeholder="Search here"
   onChange={handleChange}
   value={searchInput} />

<table>


{categoriesOfGift.map((category, index) => {
    
    
    
  <tr>
    <td>{category.name}</td>
  </tr>

})}
</table>

</div>


}
export default SearchBar