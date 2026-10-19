/* VerTek — script du site (aucun cookie, aucun service tiers hormis l'envoi du formulaire). */
(function () {
  'use strict';

  /* ─────────── RÉGLAGE DU FORMULAIRE ───────────
     Clé d'accès Web3Forms (gratuite) : https://web3forms.com → saisir vertek.contact@gmail.com,
     la clé arrive par email. La coller ci-dessous à la place de A_COMPLETER.
     Tant que la clé n'est pas renseignée, le bouton ouvre un email pré-rempli à la place. */
  var WEB3FORMS_KEY = 'A_COMPLETER';
  var EMAIL = 'vertek.contact@gmail.com';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── Navigation ── */
  var nav = $('#nav'), hero = $('#hero');
  if (nav && hero) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
      nav.classList.toggle('on-hero', window.scrollY < hero.offsetHeight - 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  var menu = $('#mob-menu');
  if (menu) {
    $('#menu-open').addEventListener('click', function () { menu.classList.add('open'); });
    $('#menu-close').addEventListener('click', function () { menu.classList.remove('open'); });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  /* ── Vidéo de fond : seulement sur grand écran, hors mode économie de données ── */
  var hv = $('#hero-video');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  if (hv && !reduced && !saveData && window.innerWidth >= 760) {
    hv.src = hv.getAttribute('data-src');
    var p = hv.play();
    if (p && p.catch) p.catch(function () {});
  }

  /* ── Drone animé du hero ── */
  var unit = $('#drone-unit');
  if (unit && hero && !reduced) {
    var CX = 50, CY = 42, RX = 36, RY = 22;
    var angle = -Math.PI / 2, paused = false, last = null;
    var cone = $('.scan-cone', unit);
    var schedule = function () {
      setTimeout(function () {
        paused = true; unit.classList.add('scanning');
        setTimeout(function () {
          paused = false; unit.classList.remove('scanning'); schedule();
        }, 1400 + Math.random() * 1600);
      }, 3000 + Math.random() * 4000);
    };
    schedule();
    var tick = function (ts) {
      if (!last) last = ts;
      var dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      if (!paused) angle += (0.28 + 0.06 * Math.sin(angle * 3)) * dt;
      var x = CX + RX * Math.cos(angle), y = CY + RY * Math.sin(angle);
      unit.style.left = x + '%';
      unit.style.top = y + '%';
      var dX = (CX - x) / 100 * hero.offsetWidth, dY = (CY - y) / 100 * hero.offsetHeight;
      cone.style.transformOrigin = '0px 55px';
      cone.style.transform = 'rotate(' + (Math.atan2(dY, dX) * 180 / Math.PI) + 'deg)';
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ── Agrandissement (photos et vidéo) ── */
  var openLightbox = function (node) {
    var ov = document.createElement('div');
    ov.className = 'lb-overlay';
    var box = document.createElement('div');
    box.className = 'lb-box';
    var close = document.createElement('button');
    close.className = 'lb-close';
    close.setAttribute('aria-label', 'Fermer');
    close.textContent = '✕';
    box.appendChild(close);
    box.appendChild(node);
    ov.appendChild(box);
    var shut = function () {
      document.removeEventListener('keydown', onKey);
      if (ov.parentNode) ov.parentNode.removeChild(ov);
    };
    var onKey = function (e) { if (e.key === 'Escape') shut(); };
    ov.addEventListener('click', function (e) { if (e.target === ov || e.target === close) shut(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(ov);
    close.focus();
  };

  /* ── Galerie : chaque emplacement affiche son fichier s'il existe, sinon reste vide ── */
  var addLabel = function (parent, titre) {
    if (!titre) return;
    var l = document.createElement('span');
    l.className = 'lib-lbl';
    l.textContent = titre;
    parent.appendChild(l);
  };

  $$('#galerie .lib-cell').forEach(function (cell, i) {
    var src = cell.getAttribute('data-photo');
    var titre = cell.getAttribute('data-titre');
    var img = new Image();
    img.alt = titre ? 'Réalisation VerTek : ' + titre : 'Réalisation VerTek, photo ' + (i + 1);
    img.loading = 'lazy';
    img.decoding = 'async';
    img.onerror = function () { cell.innerHTML = ''; cell.classList.add('empty'); };
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Agrandir la photo ' + (i + 1));
    btn.appendChild(img);
    addLabel(btn, titre);
    btn.addEventListener('click', function () {
      var big = new Image();
      big.src = src;
      big.alt = img.alt;
      openLightbox(big);
    });
    cell.appendChild(btn);
    img.src = src;
  });

  $$('#videos .lib-video-cell').forEach(function (vcell, i) {
    var titre = vcell.getAttribute('data-titre');
    var poster = new Image();
    poster.alt = titre ? 'Vidéo drone : ' + titre : 'Vidéo drone VerTek ' + (i + 1);
    poster.loading = 'lazy';
    poster.onerror = function () { vcell.innerHTML = ''; vcell.classList.add('empty'); };
    var vbtn = document.createElement('button');
    vbtn.type = 'button';
    vbtn.setAttribute('aria-label', 'Lire la vidéo' + (titre ? ' ' + titre : ''));
    vbtn.appendChild(poster);
    var play = document.createElement('span');
    play.className = 'lib-play';
    play.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l9 5-9 5V3z"/></svg>';
    vbtn.appendChild(play);
    addLabel(vbtn, titre);
    vbtn.addEventListener('click', function () {
      var v = document.createElement('video');
      v.src = vcell.getAttribute('data-video');
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      openLightbox(v);
    });
    vcell.appendChild(vbtn);
    poster.src = vcell.getAttribute('data-poster');
  });

  /* ── Reels : le bloc reste masqué tant qu'aucun reel n'est disponible ── */
  var reelsBloc = $('#reels-bloc');
  if (reelsBloc) {
    $$('#reels .reel-cell').forEach(function (cell, i) {
      var poster = new Image();
      poster.alt = 'Reel VerTek ' + (i + 1);
      poster.loading = 'lazy';
      poster.onload = function () { reelsBloc.hidden = false; };
      poster.onerror = function () { cell.parentNode.removeChild(cell); };
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Lire le reel ' + (i + 1));
      btn.appendChild(poster);
      var play = document.createElement('span');
      play.className = 'lib-play';
      play.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l9 5-9 5V3z"/></svg>';
      btn.appendChild(play);
      btn.addEventListener('click', function () {
        var v = document.createElement('video');
        v.src = cell.getAttribute('data-video');
        v.className = 'vertical';
        v.controls = true;
        v.autoplay = true;
        v.playsInline = true;
        openLightbox(v);
      });
      cell.appendChild(btn);
      poster.src = cell.getAttribute('data-poster');
    });
  }

  /* ── Portrait : affiche la photo si le fichier existe, sinon les initiales ── */
  var portrait = $('#portrait');
  if (portrait) {
    var ph = new Image();
    ph.alt = 'Jules Verilhac';
    ph.onload = function () { portrait.textContent = ''; portrait.appendChild(ph); };
    ph.src = portrait.getAttribute('data-src');
  }

  /* ── Formulaire de devis ── */
  var form = $('#devis-form');
  if (!form) return;
  var status = $('#f-status'), submit = $('#f-submit');
  var offres = $$('input[name="offre"]', form);
  var offresSet = $('#f-offres-set');

  // Les boutons des cartes d'offres cochent l'offre correspondante dans le formulaire
  $$('[data-offre]').forEach(function (a) {
    a.addEventListener('click', function () {
      var c = $('input[data-id="' + a.getAttribute('data-offre') + '"]', form);
      if (c) c.checked = true;
    });
  });

  var dateField = $('#f-date');
  if (dateField) {
    var d = new Date();
    dateField.min = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  var val = function (name) { return (form.elements[name].value || '').trim(); };
  var frDate = function (iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    return m ? m[3] + '/' + m[2] + '/' + m[1] : iso;
  };
  var choisies = function () {
    return offres.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
  };

  // Validation simple : champs obligatoires remplis, email valide, au moins une offre, accord coché
  var valider = function () {
    var manquants = 0;
    $$('input[required]:not([type="checkbox"]), textarea[required], select[required]', form).forEach(function (f) {
      var ok = f.value.trim() !== '' && f.checkValidity();
      f.classList.toggle('f-invalid', !ok);
      if (!ok) manquants++;
    });
    var aucuneOffre = choisies().length === 0;
    offresSet.classList.toggle('f-invalid', aucuneOffre);
    var consent = $('#f-consent').checked;
    if (manquants || aucuneOffre || !consent) {
      var msg = [];
      if (manquants) msg.push('remplir les champs en rouge');
      if (aucuneOffre) msg.push('choisir au moins une offre');
      if (!consent) msg.push('cocher la case d\'accord');
      status.textContent = 'Merci de ' + msg.join(', ') + '.';
      var premier = $('.f-invalid', form);
      if (premier && premier.scrollIntoView) premier.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };
  form.addEventListener('input', function (e) {
    if (e.target.classList.contains('f-invalid') && e.target.value.trim() !== '' && e.target.checkValidity()) e.target.classList.remove('f-invalid');
  });
  offres.forEach(function (c) {
    c.addEventListener('change', function () { if (choisies().length) offresSet.classList.remove('f-invalid'); });
  });

  var termine = function () {
    form.hidden = true;
    $('#f-done').hidden = false;
    $('#devis').scrollIntoView({ behavior: 'smooth' });
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    // Anti-spam : un robot remplit les champs invisibles, on fait comme si c'était envoyé
    if (form.elements.botcheck.checked || form.elements.site_web.value) { termine(); return; }
    if (!valider()) return;

    var data = {
      'Agence': val('agence'),
      'Contact': val('contact'),
      'Email': val('email'),
      'Téléphone': val('telephone'),
      'Offre(s) souhaitée(s)': choisies().join(', '),
      'Ville du bien': val('ville'),
      'Type de bien et surface': val('type_surface'),
      'Date souhaitée': frDate(val('date_souhaitee')),
      'Message': val('message') || '—',
      'Consentement': 'Oui'
    };
    var sujet = 'Demande de devis — ' + data['Agence'] + ' — ' + data['Ville du bien'];

    // Clé non renseignée : on ouvre un email pré-rempli
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'A_COMPLETER') {
      var corps = Object.keys(data).map(function (k) { return k + ' : ' + data[k]; }).join('\n');
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(corps);
      status.textContent = 'Votre messagerie s\'ouvre avec la demande pré-remplie : il reste à l\'envoyer. Sinon, appelez le 06 95 74 25 16.';
      return;
    }

    var payload = { access_key: WEB3FORMS_KEY, subject: sujet, from_name: 'Site VerTek', replyto: data['Email'] };
    Object.keys(data).forEach(function (k) { payload[k] = data[k]; });

    submit.disabled = true;
    submit.textContent = 'Envoi…';
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j.success) throw new Error(j.message || 'Erreur');
        termine();
      })
      .catch(function () {
        submit.disabled = false;
        submit.textContent = 'Envoyer ma demande';
        status.textContent = 'L\'envoi n\'a pas fonctionné. Réessayez, ou contactez-moi au 06 95 74 25 16 ou à ' + EMAIL + '.';
      });
  });
})();
