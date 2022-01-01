// ==UserScript==
// @name         UniBo AutoLogin
// @description  AutoLogin to UniBo IDP by using saved passwords
// @version      0.1.0
// @author       VaiTon <eyadlorenzo@gmail.com>
// @match        https://idp.unibo.it/adfs/ls/*
// @match        https://shib.unibo.it/idp/*
// @icon         https://www.google.com/s2/favicons?domain=unibo.it
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

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

  if (document.location.origin === 'https://shib.unibo.it') {
    let loginForm = document.forms[0];

    navigator.credentials.get({ password: true }).then((cred) => {
      loginForm.elements.j_username.value = cred.id;
      loginForm.elements.j_password.value = cred.password;
      loginForm.elements._eventId_proceed.click()
    });
    return;
  }
})();
