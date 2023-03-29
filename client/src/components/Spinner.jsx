
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
  <div className="bg-black flex flex-col items-center justify-center m-auto w-full h-[100vh]">
      <p className="text-white">Is Loading...</p>
      <ClipLoader color={'#ffffff'} size={150} />
  </div>
        
  )
}

export default Spinner