import React from 'react'
import {useSelector} from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover hover:cursor-pointer self-center mt-2' />
        <input type="text" placeholder='username' id="username" className='rounded-lg p-3 border'  />
        <input type="email" placeholder='email' id="email" className='rounded-lg p-3 border' />
        <input type="password" placeholder='password' id="password" className='rounded-lg p-3 border' />
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
        <div className='flex justify-between'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
                    <span className='text-red-700 cursor-pointer'>Sign out</span>
        </div>
      </form>
    </div>
  )
}
