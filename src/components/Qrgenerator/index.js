import {useState} from "react"

import "./index.css"
const Qrgenerator = () => {
    const [img,setImg] = useState("")
    const [loading,setLoading]= useState(false)
    const [qrData,setQrdata] =useState("") 
    const [qrSize,setQrSize] = useState("")
    const generateQr = async ()=>{
      setLoading(true)
      try{
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
        setImg(url)
        setQrSize("")
        setQrdata("")
      }catch(error){
        console.log("Error while generating QR Code ",{error})
      }finally{
        setLoading(false)
      }
      

    }

    const downloadQr = () =>{
        fetch(img).then((response)=>response.blob()).then(blob=>{
            const link = document.createElement("a")
            link.href=URL.createObjectURL(blob)
            link.download="qrcode.png"
            document.body.append(link)
            link.click()
            document.body.removeChild(link)
        })
        .catch((error) =>{
            console.log("error",error)
        })
    }

    return (
        <div className="app-cointainor">
            <h1>QR Generator</h1>
            {loading && <p>Please Wait...</p>}
            
            {img && 
                <img 
                src={img}
                className="img-qr"
                alt="img"
                />
            }
            
            <div>
                <label htmlFor="dataInput"  placeHolder="Data for QR Code" className="input-label">
                    Data for QR Code
                </label>
                <input id="dataInput" value={qrData}
                 type="text" 
                 placeholder="Enter the data ?"
                 onChange={(e)=>setQrdata(e.target.value)}
                />
                <label htmlFor="sizeInput" className="input-label">
                    Image Size (eg.,150)
                </label>
                <input id="sizeInput"
                    type="text"
                    value={qrSize}
                    placeholder="Enter the Size"
                    onChange={(e)=>setQrSize(e.target.value)}
                />
                <button className="generate-btn" disabled={loading} onClick={generateQr}>Generate QR Code</button>
                <button className= "download-btn" onClick={downloadQr}>Download QR Code</button>
            </div>
            <p className="footer">Designed By <span>Sandeep Raj </span></p>
        </div>
    )
}

export default Qrgenerator