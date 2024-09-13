import React,{useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData,setFormData] = useState({})

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])
  
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    setFileUploadError(false)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(Math.round(progress))
      },
       (error) => {
    setFileUploadError(true)
      },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setFormData({...formData, avatar:downloadUrl})
      })
    }
    );
     
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>profile</h1>
      <input type='file' ref={fileRef} onChange={e => {
        setFile(e.target.files[0])
          console.log("file", file)
      }} className='hidden' accept='image/*'/>
      <form className='flex flex-col gap-4'>
        <img src={formData.avatar || currentUser.avatar} alt="profile" onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover hover:cursor-pointer self-center mt-2' />
         <p className='text-sm self-center'>
          {fileUploadError ? <span className='text-red-700'>error image upload - image should be less that 2mb</span> : filePercentage <100 && filePercentage>0 ? <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span> : filePercentage == 100 ? <span className='text-green-700'>successfully uploaded</span> : <></>}
        </p>

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
