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
    file: 'Vente maison.MP4',
    type: 'video',
    tag:  'Immobilier',
    src:  LFS + 'Vente%20maison.MP4',
  },
  {
    file: 'Vente voiture.mp4',
    type: 'video',
    tag:  'Véhicules',
    src:  LFS + 'Vente%20voiture.mp4',
  },
  {
    file: 'Inspection antenne.mp4',
    type: 'video',
    tag:  'Inspection',
    src:  LFS + 'Inspection%20antenne.mp4',
  },
  {
    file: 'Vidéo pont ouvrage d\'art.mp4',
    type: 'video',
    tag:  'Inspection',
    src:  LFS + 'Vid%C3%A9o%20pont%20ouvrage%20d\'art.mp4',
  },
  {
    file: 'Hyperlapse.MP4',
    type: 'video',
    tag:  'Chantier',
    src:  LFS + 'Hyperlapse.MP4',
  },
  {
    file: 'Suivi de chantier.mp4',
    type: 'video',
    tag:  'Chantier',
    src:  LFS + 'Suivi%20de%20chantier.mp4',
  },

  /* ── PHOTOS (dossier uploads/) ── */
  {
    file: 'Inspection Toiture.JPG',
    type: 'photo',
    tag:  'Inspection',
  },
  {
    file: 'inspection bachage.JPG',
    type: 'photo',
    tag:  'Inspection',
  },
  {
    file: 'Diagnostique Inondation.JPG',
    type: 'photo',
    tag:  'Diagnostic',
  },
  {
    file: 'Bachage (Suivi de chantier).JPG',
    type: 'photo',
    tag:  'Chantier',
  },
  {
    file: "Inspection d'après travaux (SNCF).JPG",
    type: 'photo',
    tag:  'Ferroviaire',
  },
  {
    file: 'Pilier de Pont (SNCF).JPG',
    type: 'photo',
    tag:  'Ferroviaire',
  },
  {
    file: 'Poteau caténaire (SNCF).JPG',
    type: 'photo',
    tag:  'Ferroviaire',
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
