/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Get ?user=XYZ parameter value
const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('user');

/** Sets the page title based on the URL parameter username. */
function setUserName() {
  console.log(parameterUsername);
  if (parameterUsername) {
    document.getElementById('message-form-div').innerText = 'Enter a new message as ' + parameterUsername + ': ';
    return;
  }
  document.getElementById('message-form-div').innerText = 'Please log in to comment!';
  document.getElementById('message-form').style.display = 'none';
  
}

function fetchBlobstoreUrlAndShowForm() {
  fetch('/blobstore-upload-url')
    .then((response) => {
      return response.text();
    })
    .then((imageUploadUrl) => {
      const messageForm = document.getElementById('message-form');
      messageForm.action = imageUploadUrl;
      messageForm.classList.remove('hidden');
    });

}

// Fetch messages and add them to the page.
  function fetchMessages(){
    const url = '/feed';
    fetch(url).then((response) => {
      return response.json();
    }).then((messages) => {
      const messageContainer = document.getElementById('message-container');
      if(messages.length == 0){
       messageContainer.innerHTML = '<p>There are no posts yet.</p>';
      }
      else{
       messageContainer.innerHTML = '';
      }
      messages.forEach((message) => {
       const messageDiv = buildMessageDiv(message);
       messageContainer.appendChild(messageDiv);
      });
    });
  }

/**
 * Builds an element that displays the message.
 * @param {Message} message
 * @return {Element}
 */
function buildMessageDiv(message) {
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-header');
  headerDiv.appendChild(document.createTextNode(
      message.user + ' - ' + new Date(message.timestamp)));

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  bodyDiv.innerHTML = message.text;
  if (typeof message.imageUrl !== "undefined") {
    const newImg = document.createElement("img");
    newImg.setAttribute("src", message.imageUrl);
    bodyDiv.appendChild(newImg);
  }

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message-div');
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);

  return messageDiv;
}

// Change the content of the page to the current page content
const POSTS_PER_PAGE = 5;
var currentPage = 1;
function changePage(page) {
  var btnForward = document.getElementById("btn_forward");
  var btnBack = document.getElementById("btn_back");
  const url = '/feed';
  fetch(url).then((response) => {
      return response.json();
   }).then((messages) => {
    const NUM_PAGES = Math.ceil(messages.length / POSTS_PER_PAGE);
    var messageContainer = document.getElementById("message-container");

    // Validate page
    if (page < 1) page = 1;
    if (page > NUM_PAGES) page = NUM_PAGES;

    if(messages.length == 0){
     messageContainer.innerHTML = '<p>No posts on this page.</p>';
    }
    else {
     messageContainer.innerHTML = '';
    }
    for (var i = (page-1) * POSTS_PER_PAGE; i < (page * POSTS_PER_PAGE) && i < messages.length; i++) {
      const messageDiv = buildMessageDiv(messages[i]);
      messageContainer.appendChild(messageDiv);
    }
    if (page == 1) {
      btnBack.style.visibility = "hidden";
    } else {
      btnBack.style.visibility = "visible";
    }
    if (page == NUM_PAGES) {
      btnForward.style.visibility = "hidden";
    } else {
      btnForward.style.visibility = "visible";
    }
  });
}

/**
 * Navigate the message feed one page back
 */
function navigateBack() {
  currentPage--;
  changePage(currentPage);
}

/**
 * Navigate the message feed one page forward
 */
function navigateForward() {
  currentPage++;
  changePage(currentPage);
}

// When the page loads render the first five elements
window.onload = function() {
  buildUI();
  changePage(currentPage);
};

// Logs user in or out depending on their status 
function addLoginOrLogout() {
  const navigationElement = document.getElementById('head-navbar');

  fetch('/login-status')
      .then((response) => {
        return response.json();
      })
      .then((loginStatus) => {
        if (loginStatus.isLoggedIn) {
          navigationElement.appendChild(
            createListItem(createLink('/logout', 'Logout')));
        } else {
          navigationElement.appendChild(
              createListItem(createLink('/login', 'Login')));
        }
      });
}

/**
 * Creates an li element.
 * @param {Element} childElements
 * @return {Element} li element
 */
function createListItem(childElement) {
  const listItemElement = document.createElement('li');
  listItemElement.appendChild(childElement);
  return listItemElement;
}

/**
 * Creates an anchor element.
 * @param {string} url
 * @param {string} text
 * @return {Element} Anchor element
 */
function createLink(url, text) {
  const linkElement = document.createElement('a');
  linkElement.appendChild(document.createTextNode(text));
  linkElement.href = url;
  return linkElement;
}

/** Fetches data and populates the UI of the page. */
function buildUI() {
  addLoginOrLogout();
  fetchBlobstoreUrlAndShowForm();
  setUserName();
}
