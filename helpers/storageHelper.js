/*jshint -W097, esversion: 6, devel: true, nomen: true, indent: 2, maxerr: 50 , browser: true, bitwise: true*/ /*jslint plusplus: true */
/*global browser*/
"use strict";
//----------------------------------------------------------------------
async function storageLocalSetItemAsync(key, value) {
  await browser.storage.local.set({[key]: value});
}
//----------------------------------------------------------------------
async function storageLocalGetItemAsync(key) {
  return new Promise((resolve) => {
    let item = browser.storage.local.get(key);
    item.then(function (obj) {
      resolve(obj[key]);
    });
  });
}
//----------------------------------------------------------------------
async function cleanStorage() {
  let keysToRemove = [];
  let storageItems = await browser.storage.local.get();
  let items = Object.entries(storageItems);
  for (let [key, value] of items) {
    if (value) {
      if (value.bkmrkId) {
        keysToRemove.push(key);
      } else if (value.checked) {
        keysToRemove.push(key);
      }
    }
  }
  await browser.storage.local.remove(keysToRemove);
}
//----------------------------------------------------------------------
