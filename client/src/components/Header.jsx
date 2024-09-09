import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  console.log(currentUser)
  return (
      <header className='bg-slate-200 shadow-md'>
          <div className='flex justify-between items-center mx-auto p-3'>
                        <h1>
              <span>mahsa</span>
              <span>Estate</span>
              </h1>
              <form className='bg-slate-100 p-3 rounded-lg flex items-center' >
                  <input className='bg-transparent focus:outline-none w-24 sm:w-64' type='text' placeholder='search...' />
             <FaSearch color='gray' />
              </form>
              <div className='flex'>
                                <ul className='flex gap-4'>
                  <Link to="/"><li>home</li></Link>
                  <Link to="/about"><li>about</li></Link>
            <Link to="/profile">{currentUser? <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover' />: <li>sign in</li> }</Link>
              </ul>
              </div>
          </div>
    </header>
  )
}
