import {useState} from "react"
import axios from "axios"
import "./FileUpload.css"

const FileUpload = ({contract, account, provider}) => {

  const [file,setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(file){
      try{
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: `
            
            2cbab2da2fac4f28a375`,
            pinata_secret_api_key: `
            
            4191832e5aac17086ae1ce24354c3fa4a385b84afcbe1171e45b82a3b968617b`,
            "Content-Type": "multipart/form-data",
          },
        });
        const imgHash = 'ipfs://${resFile.data.IpfsHash}'
        contract.add(account,imgHash)
        alert("Successfully image uploaded")
        setFileName("No image selected")
        setFile(null)
      }catch(error){}
    }
  }

  const retrieveFile = (event) => {
    const data = event.target.files[0];
    console.log(data)
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile(event.target.files[0])
    }
    setFileName(event.target.files[0].name);
    event.preventDefault();

  }
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}></input>
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}> Upload file</button>
      </form>
    </div>

)}

export default FileUpload