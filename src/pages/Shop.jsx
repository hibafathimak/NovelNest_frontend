import React, { useContext, useEffect, useState } from 'react'
import { RiSearch2Line } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";
import Title from '../components/Title';
import { ShopContext } from '../contexts/ShopContext';
import Item from '../components/Item';
import Footer from '../components/Footer';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';


const Shop = () => {

  const { books, categories,navigate } = useContext(ShopContext)
  const [category, setCategory] = useState([])
  const [sortType, setSortType] = useState("relevant")
  const [filteredBooks, setFilteredBooks] = useState([])
  const [search, setSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const toggleFilter = (value, setValue) => {
    setValue((prev) => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }
  const applyFilter = () => {
    let filtered = [...books];

    if (search) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length) {
      filtered = filtered.filter((book) =>
        category.includes(book.category.trim().toLowerCase())
      );
    }


    return filtered;
  };
  const applySorting = (booksList) => {
    switch (sortType) {
      case "low": return booksList.sort((a, b) => a.price - b.price);
      case "high": return booksList.sort((a, b) => b.price - a.price);
      default: return booksList;
    }
  }

  useEffect(() => {
    let filtered = applyFilter()
    let sorted = applySorting(filtered)
    setFilteredBooks(sorted)
    setCurrentPage(1)
  }, [category, sortType, books, search])

  const getBooksPerPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredBooks.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)

  
    const generateRandomBook = () => {
      const randomBook = books[Math.floor(Math.random() * books.length)];      
      navigate(`/books/${randomBook._id}`)
    };

  return (
    <section className='bg-white'>
      <div className='max-padd-container pt-28'>
        <div className='w-full flexBetween'>
          <div className='inline-flex items-center justify-center bg-primary overflow-hidden w-[60%] rounded-full p-4 px-5'>
            <div className='text-lg cursor-pointer'><RiSearch2Line /></div>
            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search here...' className='border-none outline-none w-full text-sm pl-4 bg-primary' />
            <div className='flexCenter cursor-pointer text-lg border-1 pl-2'><LuSettings2 /></div>
          </div>
          <button
          onClick={generateRandomBook}
            className="flexCenter flex-col text-gray-600">
            <GiPerspectiveDiceSixFacesRandom className='text-3xl animate-bounce' />
            <span className='text-base animate-pulse'>Random Book</span>
          </button>

        </div>

        <div className='mt-12 mb-16'>
          <h4 className='h4 mb-4 hidden sm:flex'>Categories</h4>
          <div className='flexCenter sm:flexStart flex-wrap gap-x-10 gap-y-4'>
            {categories.map(item => (
              <label key={item.name}>
                <input value={item.name} onChange={(e) => toggleFilter(e.target.value, setCategory)} type="checkbox" className='hidden peer' />
                <div className='flexCenter flex-col peer-checked:text-secondaryOne cursor-pointer'>
                  <div className='bg-primary flexCenter h-20 w-20 rounded-full'>
                    <img src={item.image} alt="" className='object-cover h-10 w-10' />
                  </div>
                  <span className='medium-14 capitalize'>{item.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>


        <div className='mt-8'>
          <div className='flexBetween !items-center gap-7 flex-wrap pb-16 max-sm:flexCenter text-center'>
            <Title title1={'Our '} title2={'Book List'} titleStyles={'pb-0 text-start'} paraStyles={'!block'} />
            <div className='flexCenter gap-x-2'>
              <span className='hidden sm:flex medium-16'>Sort by:</span>
              <select onChange={(e) => setSortType(e.target.value)} className='text-sm p-2.5 outline-none bg-primary text-gray-30 rounded'>
                <option value="relevant">Relevant</option>
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
              {
                getBooksPerPage().length > 0 ?
                  getBooksPerPage().map((book) => (
                    <Item book={book} key={book._id} />
                  ))
                  :
                  <p>No Books found for selected filters</p>
              }
            </div>
          </div>
        </div>


        <div className="flex items-center justify-center mt-14 mb-10 gap-1 sm:gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`btn-secondaryOne !py-1 !px-3 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          >
            Previous
          </button>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-full px-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn-light !py-1 !px-3 whitespace-nowrap ${currentPage === index + 1 ? '!bg-secondaryOne' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`btn-secondaryOne !py-1 !px-3 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>




      </div>

      <Footer />
    </section>
  )
}

export default Shop