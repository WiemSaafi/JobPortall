const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
//const cloudinary = require("../utils/cloudinary");
require("dotenv").config();//pour securiser api secure ...
const Multer = require("multer");//stocker temporairement les fichiers téléchargés en mémoire.
const express = require("express");
const cloudinary = require("../utils/cloudinary").v2;


//load all users
exports.allUsers = async (req, res, next) => {
    //enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        next();
    } catch (error) {
        return next(error);
    }
}

// Afficher un utilisateur spécifique
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        // Vérification si l'utilisateur existe
        if (!user) {
            return next(new ErrorResponse("Utilisateur non trouvé", 404));
        }
        // Envoi de la réponse avec l'utilisateur trouvé
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(error);
    }
};

// Modifier un utilisateur
// Modifier un utilisateur
exports.editUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return next(new ErrorResponse("Utilisateur non trouvé", 404));
        }

        // Mettre à jour les informations de l'utilisateur
        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Vérifier si une image a été fournie
        if (req.file) {
            // Télécharger l'image sur Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'image_user'
            });

            // Mettre à jour l'URL de l'image dans la base de données
            user.image = {
                public_id: result.public_id,
                url: result.secure_url
            };

            // Supprimer l'ancienne image de Cloudinary si elle existe
            if (user.image.public_id) {
                await cloudinary.uploader.destroy(user.image.public_id);
            }
        }

        // Sauvegarder les modifications de l'utilisateur dans la base de données
        await user.save();

        // Répondre avec l'utilisateur mis à jour
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};


// Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
    try {
        // Suppression de l'utilisateur
        const user = await User.findByIdAndRemove(req.params.id);
        // Vérification si l'utilisateur existe
        if (!user) {
            return next(new ErrorResponse("Utilisateur non trouvé", 404));
        }
        // Réponse de succès
        res.status(200).json({
            success: true,
            message: "Utilisateur supprimé"
        });
    } catch (error) {
        return next(error);
    }
};

// Ajouter l'historique des emplois d'un utilisateur
exports.createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;

    try {
        // Recherche de l'utilisateur actuel
        const currentUser = await User.findOne({ _id: req.user._id });
        // Vérification de l'authentification de l'utilisateur
        if (!currentUser) {
            return next(new ErrorResponse("Vous devez être connecté", 401));
        }
        // Création d'un nouvel historique d'emploi
        const addJobHistory = {
            title,
            description,
            salary,
            location,
            user: req.user._id
        };
        // Ajout de l'historique d'emploi à l'utilisateur
        currentUser.jobsHistory.push(addJobHistory);
        await currentUser.save();
        // Réponse de succès avec l'utilisateur mis à jour
        res.status(200).json({
            success: true,
            currentUser
        });
    } catch (error) {
        return next(error);
    }
};

exports.singleUserByEmpreintId = async (empreinte_id) => {
    try {
        const user = await User.findOne({ empreinte_id });
        // Vérification si l'utilisateur existe
        if (!user) {
            return next(new ErrorResponse("Utilisateur non trouvé", 404));
        }
        // Envoi de la réponse avec l'utilisateur trouvé
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(error);
    }
};