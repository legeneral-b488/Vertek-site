/**
 * ================================================================
 *  GALERIE VERTEK — fichier de configuration
 * ================================================================
 *
 *  VIDÉOS LFS → champ "src" obligatoire avec l'URL GitHub :
 *    https://github.com/legeneral-b488/Vertek-site/raw/main/uploads/NOM%20FICHIER.mp4
 *    (remplace les espaces par %20, respecte la casse exacte du fichier)
 *
 *  PHOTOS → mettre le fichier dans uploads/, renseigner "file" avec le nom exact.
 *
 *  Champs :
 *    file  : nom exact du fichier (utilisé pour le titre)    (obligatoire)
 *    type  : "photo" ou "video"                              (obligatoire)
 *    tag   : catégorie affichée sur la vignette              (obligatoire)
 *    src   : URL complète GitHub — obligatoire pour les vidéos LFS
 * ================================================================
 */

const LFS = 'https://github.com/legeneral-b488/Vertek-site/raw/main/uploads/';

window.GALLERY = [

  /* ── VIDÉOS (GitHub LFS) ── */
  {
    file: 'Vente voiture.mp4',
    type: 'video',
    tag:  'Véhicules',
    src:  LFS + 'Vente%20voiture.mp4',
  },
  {
    file: 'Vente maison.MP4',
    type: 'video',
    tag:  'Immobilier',
    src:  LFS + 'Vente%20maison.MP4',
  },
  {
    file: 'Inspection antenne.mp4',
    type: 'video',
    tag:  'Inspection',
    src:  LFS + 'Inspection%20antenne.mp4',
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
    file: "Inspection ouvrage d'art.jpg",
    type: 'photo',
    tag:  'Inspection',
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

  /* ── Pour ajouter une vidéo LFS :
  {
    file: 'mon-vol.mp4',
    type: 'video',
    tag:  'Inspection',
    src:  LFS + 'mon-vol.mp4',
  },
  ── */

];
