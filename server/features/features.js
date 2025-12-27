

const cloudinary = require("cloudinary").v2
const uuid = require("uuid").v4

const uploadCloundinary =  async (files=[]) => {
    if (!files) {
        console.log("file is not found in cloudinary");
        
    }
    const uploadpromise = await files.map((file)=>{
return new Promise((resolve,reject)=>{
if (!file.buffer) {
  return reject("Audio buffer is undefined");

}
const public_id = uuid()
const stream = cloudinary.uploader.upload_stream(
  {
  resource_type:"auto",
  public_id
},
(error,result)=>{
if (error) {
  return reject("Audio failed to upload: " + error.message);
}

resolve({
  url:result.secure_url,
  public_id:result.public_id
})}
)
stream.end(file.buffer)
})

    })
    const results = Promise.all(uploadpromise)
    return results
}
module.exports = uploadCloundinary