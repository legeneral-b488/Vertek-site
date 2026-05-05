/**
 * ================================================================
 *  GALERIE VERTEK — fichier de configuration
 * ================================================================
 *
 *  VIDÉOS → renseigner le champ "src" avec l'URL GitHub LFS :
 *    https://media.githubusercontent.com/media/legeneral-b488/Vertek-site/main/uploads/NOM%20DU%20FICHIER.mp4
 *    (remplace les espaces par %20 dans l'URL)
 *
 *  PHOTOS → mettre le fichier dans uploads/ et indiquer son nom dans "file".
 *           Pas besoin de "src" pour les photos.
 *
 *  Champs :
 *    file  : nom du fichier (pour l'affichage du titre)    (obligatoire)
 *    type  : "photo" ou "video"                            (obligatoire)
 *    tag   : catégorie affichée sur la vignette            (obligatoire)
 *    src   : URL complète — obligatoire pour les vidéos LFS
 * ================================================================
 */

const LFS = 'https://media.githubusercontent.com/media/legeneral-b488/Vertek-site/main/uploads/';

window.GALLERY = [

  /* ── VIDÉOS (GitHub LFS) ── */
  {
    file: 'Vente voiture.mp4',
    type: 'video',
    tag:  'Véhicules',
    src:  LFS + 'Vente%20voiture.mp4',
  },
  {
    file: 'voiture.mp4',
    type: 'video',
    tag:  'Véhicules',
    src:  LFS + 'voiture.mp4',
  },
  {
    file: 'Vente Maison.MP4',
    type: 'video',
    tag:  'Immobilier',
    src:  LFS + 'Vente%20Maison.MP4',
  },

  /* ── PHOTOS (dossier uploads/) ── */
  {
    file: 'Inspection Toiture.JPG',
    type: 'photo',
    tag:  'Inspection',
  },
  {
    file: 'Annonce voiture .JPG',
    type: 'photo',
    tag:  'Véhicules',
  },
  {
    file: 'Diagnostique Inondation.JPG',
    type: 'photo',
    tag:  'Sinistre',
  },
  {
    file: 'Annonce moto.JPG',
    type: 'photo',
    tag:  'Véhicules',
  },
  {
    file: 'INSPECTION-PONTS-PAR-DRONE-DRONE-ON-AIR.jpg',
    type: 'photo',
    tag:  'Infrastructure',
  },
  {
    file: 'Diagnostique impact environnementale.JPG',
    type: 'photo',
    tag:  'Diagnostic',
  },
  {
    file: 'inspection bachage.JPG',
    type: 'photo',
    tag:  'Inspection',
  },

  /* ── Pour ajouter une nouvelle vidéo LFS :
  {
    file: 'mon-vol.mp4',
    type: 'video',
    tag:  'Inspection',
    src:  LFS + 'mon-vol.mp4',
  },
  ── */

];
