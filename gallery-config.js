/**
 * ================================================================
 *  GALERIE VERTEK — fichier de configuration
 * ================================================================
 *  1. Glisse tes photos/vidéos dans le dossier "uploads/"
 *  2. Ajoute une entrée ci-dessous avec le nom du fichier
 *  3. Sauvegarde et recharge le site — c'est tout !
 *
 *  Champs disponibles :
 *    file  : nom du fichier dans uploads/  (obligatoire)
 *    type  : "photo" ou "video"            (obligatoire)
 *    label : titre affiché sur la vignette (obligatoire)
 *    tag   : catégorie affichée en haut    (obligatoire)
 *    large : true pour la grande case      (1 seul max)
 * ================================================================
 */
window.GALLERY = [
  {
    file:  'DJI_20240412193357_0126_D.JPG',
    type:  'photo',
    label: 'Vue aérienne — Vertek',
    tag:   'Photo',
    large: true,
  },
  {
    file:  'pasted-1777023291134-0.png',
    type:  'photo',
    label: 'Champs de colza',
    tag:   'Diagnostic Agricole',
  },
  {
    file:  'nettoyage-panneaux-solaires.jpg',
    type:  'photo',
    label: 'Panneaux solaires',
    tag:   'Inspection',
  },
  {
    file:  'photographie-aerienne-par-drone-d-un-propriete.jpg',
    type:  'photo',
    label: 'Immobilier & Maisons',
    tag:   'Photo Aérienne',
  },
  {
    file:  'INSPECTION-PONTS-PAR-DRONE-DRONE-ON-AIR.jpg',
    type:  'photo',
    label: 'Contrôle Pont',
    tag:   'Infrastructure',
  },

  /* ── Exemples à décommenter quand tu ajoutes tes propres fichiers ──

  {
    file:  'mon-chantier.jpg',
    type:  'photo',
    label: 'Chantier industriel',
    tag:   'Inspection',
  },
  {
    file:  'survol-maison.mp4',
    type:  'video',
    label: 'Villa — Lyon',
    tag:   'Immobilier',
  },

  ──────────────────────────────────────────────────────────────── */
];
