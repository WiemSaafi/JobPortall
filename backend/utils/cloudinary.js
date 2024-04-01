require("dotenv").config();// Charge les variables d'environnement depuis un fichier .env
const cloudinary = require('cloudinary').v2;
 //  Une bibliothèque JavaScript pour interagir avec le service Cloudinary, qui est un service de gestion et de stockage d'images basé sur le cloud.// Importe le module Cloudinary
const express = require("express");// framework web pour Node.js.
const cors = require("cors");//Importe le module CORS
const Multer = require("multer"); //Middleware pour gérer les téléchargements de fichiers dans les requêtes HTTP
const router = express.Router();
// // Configure les informations d'authentification pour Cloudinary en utilisant les variables d'environnement
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
    /* const PORT = process.env.PORT || 8000;
const DATABASE = process.env.DATABASE;
const JWT_SECRET = process.env.JWT_SECRET; */
});
// Multer est configuré pour stocker temporairement les fichiers téléchargés en mémoire avec new Multer.memoryStorage()Configuration du stockage pour Multer, en utilisant la mémoire
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

// Modifier la fonction pour télécharger une image vers Cloudinary
//(handleUpload) : Cette fonction utilise l'API de Cloudinary pour
// télécharger les données de l'image vers Cloudinary.
// Elle prend le fichier téléchargé (sous forme de chaîne de caractères base64) 
//en entrée et renvoie la réponse de Cloudinary.
// Fonction asynchrone pour gérer le téléchargement vers Cloudinary
async function handleUpload(file) {
     // Télécharge le fichier vers Cloudinary et renvoie la réponse
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }

  const app = express();
  app.use(cors());


  app.get('/', function(req, res) {
    res.send('Hi')
})

// Route pour gérer le téléchargement de fichiers
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        // Encode le fichier téléchargé en base64
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
       // Appelle la fonction handleUpload pour télécharger le fichier vers Cloudinary
      const cldRes = await handleUpload(dataURI);
          // Renvoie la réponse de Cloudinary au client
      res.json(cldRes);
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: error.message });
    }
  });
  const port = 8000;
  app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
  });


/* exports.uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'image_user' // Le dossier dans lequel vous souhaitez stocker les images sur Cloudinary
        });

        // Supprimer le fichier temporaire après le téléchargement
        fs.unlinkSync(req.file.path);

        res.status(200).json({ success: true, imageUrl: result.secure_url });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

 
  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res; */
 // }
// Exportez la configuration Cloudinary pour pouvoir l'utiliser dans d'autres parties de votre application
// Définissez les autres configurations après la configuration de Cloudinary

/* const PORT = process.env.PORT || 8000;
const DATABASE = process.env.DATABASE;
const JWT_SECRET = process.env.JWT_SECRET; */

//module.exports = cloudinary;