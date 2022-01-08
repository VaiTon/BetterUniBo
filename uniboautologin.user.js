// ==UserScript==
// @name         UniBo AutoLogin
// @description  AutoLogin to UniBo IDP by using saved passwords
// @version      0.1.0
// @author       VaiTon <eyadlorenzo@gmail.com>
// @match        https://idp.unibo.it/adfs/ls/*
// @match        https://shib.unibo.it/idp/*
// @match        https://almaesami.unibo.it/*
// @match        https://studenti.unibo.it/*
// @icon         https://www.google.com/s2/favicons?domain=unibo.it
// @grant        none
// ==/UserScript==

(function () {
  function injectCSS(style) {
    let el = document.createElement('style');
    el.innerHTML = style;
    document.getElementsByTagName('head')[0].appendChild(el);
  }

  ('use strict');

  if (document.location.origin === 'https://idp.unibo.it') {
    if (window.HRD) {
      // Select UniBo
      window.HRD.selection('AD AUTHORITY');
      return;
    }

    let loginForm = document.forms.loginForm;
    if (loginForm && window.PasswordCredential) {
      navigator.credentials.get({ password: true }).then((cred) => {
        // Login through the browser identity manager
        loginForm.elements.userNameInput.value = cred.id;
        loginForm.elements.passwordInput.value = cred.password;
        loginForm.submit();
      });
      return;
    }
  } else if (document.location.origin === 'https://shib.unibo.it') {
    let loginForm = document.forms[0];

    navigator.credentials.get({ password: true }).then((cred) => {
      loginForm.elements.j_username.value = cred.id;
      loginForm.elements.j_password.value = cred.password;
      loginForm.elements._eventId_proceed.click();
    });
    return;
  } else if (document.location.origin === 'https://almaesami.unibo.it') {
    injectCSS(`
      .titoloPagina {
        color: initial;
        font-family: "Roboto", sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
        margin-left: 1rem;
      }
      span.sottotitoloPagina {
        margin-left: 1rem;
      }
    `);
  } else if (document.location.origin === 'https://studenti.unibo.it') {
    injectCSS(`
      .box .services div, .box ul li {
        border-radius: 5px;
        box-shadow: none;
      }
      .box .services div:hover, .box ul li:hover {
            background: #00000010;

      }
    `);
  }
})();
