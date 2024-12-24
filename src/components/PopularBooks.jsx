import React, { useContext, useEffect,useState } from 'react'
import Title from './Title'
import { ShopContext } from '../contexts/ShopContext'
import Item from './Item'

const PopularBooks = () => {
  const {books} = useContext(ShopContext)
  const [popularBooks, setPopularBooks] = useState([])
  useEffect(()=>{
    const data =books.filter((item)=>item.popular)
    setPopularBooks(data.sort(() => Math.random() - 0.5) 
    .slice(0,8))
  },[books])
  return (
    <section className='max-padd-container py-16 bg-white'>
      <Title title1={'Popular '} title2={'Books'} titleStyles={'pb-10'} paraStyles={'!block'}/>
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {
          popularBooks.map(book=>(
            <div key={book._id}>
              <Item book={book}/>
              </div>
          ))
        }
      </div>
    </section>
  )
}

export default PopularBooks