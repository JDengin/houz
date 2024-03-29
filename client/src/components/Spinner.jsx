import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
  <div className="bg-white flex flex-col items-center justify-start m-auto w-full h-[30vh]">
      <p className="text-[#1B4571]">Is Loading...</p>
      <ClipLoader color={'#1B4571'} size={150} />
  </div>
        
  )
}

export default Spinner