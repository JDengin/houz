import { Navbar } from "../components"
import { useState } from "react";
import { RMIUploader } from "react-multiple-image-uploader";

 const dataSources = [
   {
    id: 1,
    dataURL: "https://picsum.photos/seed/1/600",
  },
  {
    id: 2,
    dataURL: "https://picsum.photos/seed/2/600",
  },
  {
    id: 3,
    dataURL: "https://picsum.photos/seed/3/600",
  },
  {
    id: 4,
    dataURL: "https://picsum.photos/seed/4/600",
  },
  {
    id: 5,
    dataURL: "https://picsum.photos/seed/5/600",
  },
  {
    id: 6,
    dataURL: "https://picsum.photos/seed/6/600",
  },
  {
    id: 7,
    dataURL: "https://picsum.photos/seed/7/600",
  },
  {
    id: 8,
    dataURL: "https://picsum.photos/seed/8/600",
  },
  {
    id: 9,
    dataURL: "https://picsum.photos/seed/9/600",
  },
  {
    id: 10,
    dataURL: "https://picsum.photos/seed/10/600",
  },
]; 


  

const HomeDetails = () => {
  
  const [visible, setVisible] = useState(false);

  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  return (
    <>
      <Navbar/>  

      <div className="App">
      <button onClick={handleSetVisible}>Show Me</button>
      <RMIUploader
        isOpen={visible}
        hideModal={hideModal}
        onSelect={onSelect}
        onUpload={onUpload}
        onRemove={onRemove}
        dataSources={dataSources}
      />
    </div>  

  </>

  );
}

export default HomeDetails





 
