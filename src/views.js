"use strict";

// One module is responsible for showing the two views of the app (song list and song form).

var addEl = $('#add--music');
var viewEl = $('#list--music');
var loginEl = $('#login');

//references to navigation menu items in DOM
var linkView = $('#link--view');
var linkAdd = $('#link--add');


function hideAll() {
  addEl.hide();
  viewEl.hide();
}

function showView () {
  addEl.removeClass('visible');
  addEl.addClass('hidden');
  viewEl.addClass('visible');
  viewEl.removeClass('hidden');

  linkAdd.removeClass('active');
  linkView.addClass('active');
}

function hideLogin() {
  loginEl.hide();
}

function showLogin() {
  loginEl.show();
}

function showAdd () {
  viewEl.removeClass('visible');
  viewEl.addClass('hidden');
  addEl.addClass('visible');
  addEl.removeClass('hidden');

  linkView.removeClass('active');
  linkAdd.addClass('active');
}

exports.showView = showView;
exports.showAdd = showAdd;
exports.linkView = linkView;
exports.linkAdd = linkAdd;
exports.hideLogin = hideLogin;
exports.showLogin = showLogin;
exports.hideAll = hideAll;

