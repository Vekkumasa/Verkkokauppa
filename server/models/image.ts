import mongoose from "mongoose";

export interface ImageInterface extends mongoose.Document {
  image: string;
  _id?: string;
}

const ImageSchema: mongoose.Schema = new mongoose.Schema(
{
  image: {
    data: Buffer,
    contentType: String
  }
},
{
  toJSON: {
    transform: (_document, returnedObject: ImageInterface) => {
      delete returnedObject.__v;
    }
  },
});

const Image = mongoose.model<ImageInterface>("Image", ImageSchema);
export default Image;