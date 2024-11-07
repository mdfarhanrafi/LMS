import { uploadMediaToCloudinary,deleteMediaFromCloudinary } from "../../helpers/cloudinary.js";
  
class MediaController{
      static async upload (req,res){
        try {
            const result = await uploadMediaToCloudinary(req.file.path);
            res.status(200).json({
              success: true,
              data: result,
            });
          } catch (e) {
            console.log(e);
        
            res.status(500).json({ success: false, message: "Error uploading file" });
          }
      }
      
      static async delete(req,res){
        try {
          const { id } = req.params;
      
          if (!id) {
            return res.status(400).json({
              success: false,
              message: "Assest Id is required",
            });
          }
      
          await deleteMediaFromCloudinary(id);
      
          res.status(200).json({
            success: true,
            message: "Assest deleted successfully from cloudinary",
          });
        } catch (e) {
          console.log(e);
      
          res.status(500).json({ success: false, message: "Error deleting file" });
        }
      }

      static async bulkUpload(req,res){
        try {
          const uploadPromises = req.files.map((fileItem) =>
            uploadMediaToCloudinary(fileItem.path)
          );
      
          const results = await Promise.all(uploadPromises);
      
          res.status(200).json({
            success: true,
            data: results,
          });
        } catch (event) {
          console.log(event);
      
          res
            .status(500)
            .json({ success: false, message: "Error in bulk uploading files" });
        }
      }




}


export default MediaController