const sharp = require("sharp")
const path = require("path")
const fs = require("fs") // Required to delete files

/**
 * Middleware to process and compress images using Sharp.
 * @param {string} outputFormat - The desired output format (e.g., "webp", "jpeg", "png").
 * @param {number} quality - The quality of the output image (0-100).
 * @returns {Function} - Express middleware function.
 */

const sharpMiddleware = (outputFormat = "webp", quality = 80) => {
 return async (req, res, next) => {
  if (!req.file) {
   return next() // Skip if no file is uploaded
  }
  try {
   const inputPath = req.file.path // Temporary file path from Multer

   const filenameWithoutExtension = req.file.filename
    .split(".")
    .slice(0, -1)
    .join(".") // Remove the file extension
   const outputPath = path.join(
    "uploads",
    `${filenameWithoutExtension}.${outputFormat}`
   ) // Output file path

   // Process the image using Sharp
   await sharp(inputPath)
    .toFormat(outputFormat, { quality: quality }) // Convert to the desired format
    .toFile(outputPath)

   // Delete the original file (uncompressed file saved by Multer)
   fs.unlink(inputPath, (err) => {
    if (err) {
     console.error("Error deleting original file:", err)
    } else {
     console.log("Original file deleted successfully:", inputPath)
    }
   })

   // Replace the original file with the processed file
   req.file.processedPath = outputPath // Add the processed file path to the request object
   req.file.mimetype = `image/${outputFormat}` // Update the MIME type
   req.file.originalname = `${filenameWithoutExtension}.${outputFormat}` // Update the original name

   next() // Proceed to the next middleware or route handler
  } catch (err) {
   console.error("Error processing image with Sharp:", err)
   res.status(500).json({ error: "Failed to process image" })
  }
 }
}

module.exports = sharpMiddleware
 