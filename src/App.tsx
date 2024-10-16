import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const inputFile = useRef(null);
  // const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const handleFileInput = (event: { currentTarget: { files: any; }; }) => {
    const files = event.currentTarget.files
    // console.log(files)
    if(files)
    setFile(files[0])
  
    // show success message on file upload
    // setIsFileUploaded(true)
    
  } 
  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    }

    try {
      const response = await axios.post(`https://localhost:44388/api/UploadFile`, formData, { headers: { "Content-Type": "multipart/form-data" } })
      console.log(response);
      if(response.status == 200){
        alert("success !")
        setFile(null);
        if (inputFile.current) {
          inputFile.current.value = "";
          inputFile.current.type = "text";
          inputFile.current.type = "file";
      }
      }

    } catch (error: unknown) {
      console.error(error);
    }
  }
  return (
    <>
      <div>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>Vite + React</h1>
      <div className="flex justify-center items-center pt-44">
      <input id="dropzone-file" type="file" className="hidden" ref={inputFile} accept='.pdf, .docx, .doc, .odt, .xlsx' required onChange={handleFileInput}/>
      <button className="py-3 w-full bg-[blue] text-white rounded-lg text-center" onClick={handleFileSubmit} >Submit</button>
      {/* <form>
        <div className='flex flex-col gap-y-4'>
          <div className="flex items-center justify-center w-full mt-5">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center p-3 w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#ffffff] hover:bg-[#f9f9f9]">
              
              <input id="dropzone-file" type="file" className="hidden" accept='.pdf, .docx, .doc, .odt, .xlsx' required onChange={handleFileInput}/>
            </label>
          </div>

          
        </div>
      </form> */}
    </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
