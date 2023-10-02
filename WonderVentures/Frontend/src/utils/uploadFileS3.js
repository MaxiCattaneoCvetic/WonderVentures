import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { uid } from "uid";

const S3_BUCKET = "wonderventures3";
const region = "us-east-1";

// Configura el cliente de S3
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

// Función para cargar un archivo a S3
const uploadFile = async (file) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: uid(4) + file.name,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3Client
      .send(new PutObjectCommand(params))
      .then((data) => {
        console.log(data)
        resolve({
          url: `https://${S3_BUCKET}.s3.${region}.amazonaws.com/${params.Key}`,
          identificador: params.Key,
        });
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  });
};

// Función para eliminar un archivo en S3
const deleteFile = async (fileKey) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: fileKey,
  };

  return new Promise((resolve, reject) => {
    s3Client
      .send(new DeleteObjectCommand(params))
      .then(() => {
        resolve("Archivo borrado correctamente");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { uploadFile, deleteFile };


