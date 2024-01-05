import React, { useEffect, useState } from 'react';

const FileUpload = () => {
  const [fileInputValue, setFileInputValue] = useState(null);

  const[filedata,setFileData]=useState([])

  const handleFileInputChange = (event) => {

    setFileInputValue(event.target.files[0]);
    // console.log("file",fileInputValue)
  };
  let token=JSON.parse(localStorage.getItem("token")) || null
  // console.log(token)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', fileInputValue);
    console.log(fileInputValue)

    try {
      console.log(fileInputValue)
      let response = await fetch('http://localhost:8080/uploads', {
        method: 'POST',
        mode: 'cors',
        body: formData,
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        response = await response.json();
        console.log(response);
        
      } else {
        response = await response.json();
        console.error(response);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  // Fetch data on component mount
  console.log(filedata)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:8080/allfiles', {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization:token,
          },
        });

        if (response.ok) {
          response = await response.json();
          console.log("response",response);
          setFileData(response)
        } else {
          response = await response.json();
          console.error(response);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <br /><br /><br /><br /><br />
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" id="file" onChange={handleFileInputChange} />
      <button type="submit">Submit</button>
    </form>
    <br /><br /><br />
    {filedata.map((file,i)=><img key={i+1} src={`http://localhost:8080${file.url}`} alt={file.filename}/>)}
    </>

  );
};

export default FileUpload;
