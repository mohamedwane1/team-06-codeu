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

/**
  Fetches images to display in the message
*/
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

/**
  Fetches endpoint and retrieve messages from a specific endpoint.
  Stores previous cursors for the back button and gets the next
  cursors. Builds the message body.
*/
var cursors = {}
// Fetch messages and add them to the page.
function fetchMessages(currentCursor) {
  var url = '/feed';
  if (!currentCursor) {
    url = '/feed';
  } else {
    url = '/feed?cursor=' + currentCursor;
  }
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {
    const messageContainer = document.getElementById('message-container');
    if (messages.length == 0) {
      messageContainer.innerHTML = '<p>There are no posts yet.</p>';
    }
    else {
      messageContainer.innerHTML = '';
    }
    for (var i = 0; i < messages.length; i++) {
      if (typeof messages[i] === "string") continue;
      const messageDiv = buildMessageDiv(messages[i]);
      messageContainer.appendChild(messageDiv);
    }
    if (cursors) {
      document.getElementById("btn_back").onclick = () => fetchMessages(cursors[currentCursor])
    }

    if (messages[messages.length-1] !== currentCursor) {
      cursors[messages[messages.length-1]] = currentCursor;
      document.getElementById("btn_forward").style.visibility = "visible";
      document.getElementById("btn_forward").onclick = () => fetchMessages(messages[messages.length-1]);
    } else {
      document.getElementById("btn_forward").style.visibility = "hidden";
    }
  });
}

/**
  Logs user in or out depending on their status
  If a user is logged out, prompts log in function.
  If a user is logged in, prompts log out function.
*/
function addLoginOrLogout() {
  const navigationElement = document.getElementById('head-navbar');

  fetch('/login-status')
    .then((response) => {
      return response.json();
    })
    .then((loginStatus) => {
      if (loginStatus.isLoggedIn) {
        navigationElement.appendChild(createListItem(createLink('/logout', 'Logout')));
        document.getElementById('message-form-div').innerText = 'Enter a new message as ' + loginStatus.username + ': ';
      } else {
        navigationElement.appendChild(createListItem(createLink('/login', 'Login')));
        document.getElementById('message-form-div').innerText = 'Please log in to comment!';
        document.getElementById('message-form').style.display = 'none';
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
}

// When the page loads render the first five elements
window.onload = function() {
  buildUI();
  fetchMessages("");
};
