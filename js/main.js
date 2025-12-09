// create an arrow function named createElemWithText
// that recieves up to 3 parameters: 1st parameter is the html element
// string named to be created
// set a default value for the 1st parameter to be 'p'
// 2nd parameter is the text content to be added to the created element
// default value of the 2nd parameter is an empty string ""
// 3rd parameter is the class name to be added to the created element
// use document.createElement() to create the requested html element
// set the other desired element attributes and return the created element
const createElemWithText = (elem = 'p', text = "", className) => {
  const element = document.createElement(elem);
  element.textContent = text;
  if (className) {
    element.className = className;
  }
  return element;
}

// create an arrow function named createSelectOptions
// test users json data available at: https://jsonplaceholder.typicode.com/users
// receives users json data as a parameter
// returns undefined if no parameter received
// loops through the users data
// creates an option element for each user with document.createElement()
// assigns the user.id to the option.value
// assigns the user.name to the option.textContent
// return an array of options elements
const createSelectOptions = (users) => {
  if (!users) return undefined;
  const options = users.map(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name;
    return option;
  });
  return options;
}

// create an arrow function named toggleCommentSection
// receives a postId as the parameter
// return undefined if no postId is received
// selects the section element with the data-post-id attribute
// equal to the postId received as a parameter
// use code to verify the section exists before attempting to access the classList property
// toggles the class 'hide' on the section element
// return the section element
const toggleCommentSection = (postId) => {
  if (!postId) return undefined;
  const section = document.querySelector(`section[data-post-id='${postId}']`);
  if (section) {
    section.classList.toggle('hide');
  }
  return section;
}

// create an arrow function named toggleCommentButton
// receives a postId as the parameter
// return undefined if no postId is received
// selects the button with the data-post-id attribute equal to the postId received as a parameter
// if the button textContent is 'Show Comments' change it to 'Hide Comments'
// if the button textContent is 'Hide Comments' change it to 'Show Comments'
// use a ternary statement to accomplish the textContent changes
// return the button element
const toggleCommentButton = (postId) => {
  if (!postId) return undefined;
  const button = document.querySelector(`button[data-post-id='${postId}']`);
  if (button) {
    button.textContent = button.textContent === 'Show Comments' ? 'Hide Comments' : 'Show Comments';
  }
  return button;
}

// create an arrow function named deleteChildElements
// receives a parentElement as a parameter
// return undefined if an html element is not received as a parameter
// define a child variable as parentElement.lastElementChild
// use a while loop while the child exists
// use parent element.removeChild to remove the child in the loop
// reassign child to parentElement.lastElementChild in the loop
// return the parentElement
const deleteChildElements = (parentElement) => {
  if (!(parentElement instanceof HTMLElement)) return undefined;
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
  return parentElement;
}

// create an arrow function named addButtonListeners
// selects all buttons nested inside the main element
// if buttons exists, loop through the NodeList of buttons
// gets the postId from button.dataset.postId
// if a postid exists, add a click event listener to the button
// inside the loop so this happens to each button
// the listener calls an anonymous function
// inside the anonymous function: the function toggleComments is called with
// the event and postId as parameters
// return the button elements which were selected
const addButtonListeners = () => {
  const buttons = document.querySelectorAll('main button');
    buttons.forEach(button => {
      const postId = button.dataset.postId;
        if (postId) {
        button.addEventListener('click', (event) => {
          toggleComments(event, postId);
        });
      }
    });
  return buttons;
}

// create an arrow function named removeButtonListeners
// selects all buttons nested inside the main element
// loops through the NodeList of buttons
// gets the postId from button.dataset.postid
// if a postid exists, remove the click event listener from the button
// inside the loop so this happens to each button
// return the button elements which were selected
const removeButtonListeners = () => {
  const buttons = document.querySelectorAll('main button');
    buttons.forEach(button => {
      const postId = button.dataset.postId;
        if (postId) {
        button.removeEventListener('click', (event) => {
          toggleComments(event, postId);
        });
      }
    });
  return buttons;
}

// create an arrow function named createComments
// depends on the createElemWithText function
// receives json comments data as a parameter
// return undefined if it does not receive a parameter
// creates a fragment element with document.createDocumentFragment()
// loop through the comments
// for each comment create an article element with document.createElement()
// create an h3 element with the createElemWithText('h3', comment.name)
// create a paragraph element with createElemWithText('p', comment.body)
// create a paragraph element with createElemWithText('p', `From: ${comment.email}`)
// append the h3 and paragraphs to the article element
// append the article element to the fragment
// return the fragment element
const createComments = (comments) => {
  if (!comments) return undefined;
  const fragment = document.createDocumentFragment();
    comments.forEach(comment => {
      const article = document.createElement('article');
      const h3 = createElemWithText('h3', comment.name);
      const pBody = createElemWithText('p', comment.body);
      const pEmail = createElemWithText('p', `From: ${comment.email}`);
      article.appendChild(h3);
      article.appendChild(pBody);
      article.appendChild(pEmail);
      fragment.appendChild(article);
    });
  return fragment;
}

// create an arrow function named populateSelectMenu
// depends on the createSelectOptions function
// receives users json data as a parameter
// return undefined if no parameter is received
// selects the #selectMenu element by id
// passes the users json data to the createSelectOptions() function
// receives an array of option elements from createSelectOptions()
// loops through the options elements and appends each option
// to the select menu element
// return the selectMenu element
const populateSelectMenu = (users) => {
  if (!users) return undefined;
  const selectMenu = document.getElementById('selectMenu');
  const options = createSelectOptions(users);
  options.forEach(option => selectMenu.appendChild(option));
  return selectMenu;
}

// create an arrow function named getUsers
// fetches users data from https://jsonplaceholder.typicode.com/
// should be an async function
// should utilize a try...catch block
// uses the fetch api to request all users
// await the useres data response
// return json data
const getUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// create an arrow function named getUserPosts
// receives a user Id as a parameter
// return undefined if no userId is received
// fetches ALL posts data for a specific user from https://jsonplaceholder.typicode.com/
// if userId is invalid, undefined, or isNaN(), defaults to 1
// should be an async function
// should utilize a try...catch block
// uses the fetch api to request all posts for a specific user Id
// await the posts data response
// await and return the json data
const getUserPosts = async (userId) => {
  // console.log('getUserPosts called with userId:', userId);
  if (!userId) return undefined;
  if (isNaN(userId) || userId < 1) userId = 1;
  //console.log('Fetching posts for userId:', userId);
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // initialize data variable
    const dataCheck = await response.json();
    if (dataCheck && dataCheck.length > 0) {
      var data = dataCheck;
    } else {
      return [];
    }
    // console.log('Fetched posts data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
}

// create an arrow function named getUser
// receives a user id as a parameter
// return undefined if no userId is received
// fetches data for a specific user id from https://jsonplaceholder.typicode.com/
// if userId is invalid, undefined, or isNaN(), defaults to 1
// should be an async function
// should utilize a try...catch block
// uses the fetch api to request a specific user id
// away the user data response
// return the json data
const getUser = async (userId) => {
  if (!userId) return undefined;
  if (isNaN(userId) || userId < 1) userId = 1;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

// create an arrow function named getPostComments
// receives a postId as a parameter
// return undefined if no postId is received
// fetches comments for a specific post id from https://jsonplaceholder.typicode.com/
// should be an async function
// should utilize a try...catch block
// uses the fetch api to request comments for a specific post id
// await the users data response
// return the json data
const getPostComments = async (postId) => {
  if (!postId) return undefined;
    try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post comments:', error);
  }
}

// create an arrow function named displayComments
// depends on getPostComments and createComments functions
// should be an async function
// receives a postId as a parameter
// return undefined if no postId is received
// creates a section element with dument.createElement()
// sets an attribute on the section element with section.dataset.postId
// adds the classes 'comments' and 'hide' to the section element
// creates a variable comments equal to the result of await getPostComments(postId)
// creates a variable named fragment equal to createComments(comments)
// append the fragment to the section
// return the section element
const displayComments = async (postId) => {
  if (!postId) return undefined;
  const section = document.createElement('section');
  section.dataset.postId = postId;
  section.classList.add('comments', 'hide');
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.appendChild(fragment);
  return section;
}

// create an arrow function named createPosts
// depends on createElemWithText, getUser, and displayComments functions
// should be an async function
// receives posts json data as a parameter
// return undefined if no parameter is received
// creates a fragment element with document.createDocumentFragment()
// loops through the posts data
// for each post create an article element with document.createElement()
// create an h2 element with the post title
// create a p element with the post body
// create another p element with the text 'Post ID: ${post.id}'
// define an author variable equal to the result of await getUser(post.userId)
// create another p element with the text of 'Author: ${author.name} with ${author.company.name}'
// create another p element with the author's company catchphrase
// create a button with the text 'Show Comments'
// set an attribute on the button with button.dataset.postId = post.id
// append the h2, paragraphs, button, and section elements you have created to the article element.
// create a variable named section equal to the result of await displayComments(post.id);
// append the section element to the article element
// after the loop completes, append the article element to the fragment
// return the fragment element
const createPosts = async (posts) => {
  if (!posts) return undefined;
    const fragment = document.createDocumentFragment();
    for (const post of posts) {
      const article = document.createElement('article');
      const h2 = createElemWithText('h2', post.title);
      const pBody = createElemWithText('p', post.body);
      const pPostId = createElemWithText('p', `Post ID: ${post.id}`);
      const author = await getUser(post.userId);
      const pAuthor = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
      const pCatchphrase = createElemWithText('p', author.company.catchPhrase);
      const button = createElemWithText('button', 'Show Comments');
      button.dataset.postId = post.id;
      const section = await displayComments(post.id);
      article.append(h2, pBody, pPostId, pAuthor, pCatchphrase, button, section);
      fragment.appendChild(article);
    }
    return fragment;
}

// create an arrow function named displayPosts
// depends on createPosts and createElemWithText functions
// should be an async function
// receives posts data as a parameter
// selects the main element
// defines a variable named element that is equal to:
    // IF posts exist the element returned from await createPosts(posts)
    // ELSE (post data does not exist): create a paragraph element with the class="default-text"
    // if no post data is provided
// appends the element to the main element
// return the element variable
const displayPosts = async (posts) => {
  const main = document.querySelector('main');
  const element = posts ? await createPosts(posts) : createElemWithText('p', 'Select an Employee to display their posts.', 'default-text');
  main.appendChild(element);
  return element;
}

// create an arrow function named toggleComments
// depends on toggleCommentSection and toggleCommentButton functions
// receives 2 parameters: event and postId
// return undefined if no event or no postId is received
// sets event.target.listener = true
// passes the postid parameter to toggleCommentSection()
// toggleCommentSection result is a section element
// passees the postId parameter to toggleCommentButton()
// toggleCommentButton result is a button
// return an array containing the section element returned from
// toggleCommentSection and the button element returned from
// toggleCommentButton: [section, button]
const toggleComments = (event, postId) => {
  if (!event || !postId) return undefined;
  event.target.listener = true;
  const section = toggleCommentSection(postId);
  const button = toggleCommentButton(postId);
  return [section, button];
}

// create an arrow function named refreshPosts
// depends on removeButtonListeners, deleteChildElements, displayPosts, and addButtonListeners functions
// should be an async function
// receives posts json data as a parameter
// return undefined if no parameter is received
// call removeButtonListeners
// result of removeButtonListeners is the buttons returned from this function
// call deleteChildElements with the main element passed in as the parameter
// result of deleteChildElements is the return of the main element
// passes posts json data to displayPosts and awaits completion
// result of displayPosts is a document fragment
// call addButtonListeners
// result of addButtonListeners is the buttons returned from this function
// return an array of the results from the funcitons called:
// [removedButtons, main, fragment, addedButtons]
const refreshPosts = async (posts) => {
  if (!posts) return undefined;
  const removedButtons = removeButtonListeners();
  const main = deleteChildElements(document.querySelector('main'));
  const fragment = await displayPosts(posts);
  const addedButtons = addButtonListeners();
  return [removedButtons, main, fragment, addedButtons];
}

// create an arrow function named selectMenuChangeEventHandler
// Depends on getUserPosts and refreshPosts functions
// Should be an async function
// Automatically receives the event as a parameter
// Disables the select menu when select menu change event occurs
// define userId variable equal to the select menu value
// if user id is invalid, defaults to 1
// if userId is undefined, defaults to 1
// get user id from getUser().
// Passes the userId parameter to await getUserPosts
// Result is the posts JSON data as an array
// Passes the posts JSON data to await refreshPosts
// Result is the refreshPostsArray
// Enables the select menu after results are received
// Return an array with the userId, posts and the array returned from refreshPosts:
// [userId, posts, refreshPostsArray]
// return undefined if it does not receive a change event parameter
// use .setAttribute and .removeAttribute to disable/enable the select menu
const selectMenuChangeEventHandler = async (event) => {
    // console.log('selectMenuChangeEventHandler called with event:', event);
  if (!event || !event.target || !event.target.value) return undefined;
  if (event.type !== 'change') return undefined;
  if (event.target.id !== 'selectMenu') return undefined;
    //console.log('Select menu changed, value:', event);
    // if event.target.value is '0', set it to 1
  if (event.target.value === '0') {
    event.target.value = 1;
  }
  if (isNaN(event.target.value)
      || event.target.value === undefined
      || event.target.value === null
      || event.target.value === ''
      || event.target.value === 0
      || event.target.value === '0') {
    event.target.value = 1;
  }

  if (event.target.value < 0) {
    event.target.value = Math.abs(Math.floor(event.target.value));
  }

  if (event.target.value > 0 && event.target.value < 1) {
    event.target.value = 1;
  }
    // if (isNaN(event) || !event) event = 1;
  document.getElementById('selectMenu').setAttribute('selectMenu', 'disabled');
  
  
  const userId = event.target.value; // Default to 1 if no value is provided
    //console.log('User selected userId:', userId);
    /* NOTE: event.target.value KEEPS GIVING AN ERROR THAT IT IS UNDEFINED ????????
    const userId = 0;
    if (event.target.value === 0) {
      userId = 1;
    }
    else if (event.target.value < 0) {
      userId = Math.abs(Math.ceil(event.target.value));
    }
    else if (isNaN(event.target.value)) {
      userId = 1;
    }
    else {
      userId = 1;
    }
    */
  
    // console.log('Determined userId:', userId);
  if (userId === 0) userId = 1;
  if (userId < 0) userId = Math.abs(Math.floor(userId));
  if (isNaN(userId)) userId = 1;
  const posts = await getUserPosts(Math.abs(userId));
    //console.log('Fetched posts for userId', userId, ':', posts);
  const refreshPostsArray = await refreshPosts(posts);
    //console.log('Refreshed posts array:', refreshPostsArray);
  document.getElementById('selectMenu').removeAttribute('selectMenu');
  console.log([userId, posts, refreshPostsArray]);
    // validate that posts is an array
    /*if (!Array.isArray(posts)) {
      console.error('Posts is not an array:', posts);
    }
    // validate that refreshPostsArray is an array
    if (!Array.isArray(refreshPostsArray)) {
      console.error('refreshPostsArray is not an array:', refreshPostsArray);
    }
    // validate that userId is a number
    if (isNaN(userId)) {
      console.error('userId is not a number:', userId);
    }*/
  return [userId, posts, refreshPostsArray];
}

// create an arrow function named initPage
// depends on getUsers and populateSelectMenu functions
// should be an async function
// no parameters received
// calls await getUsers
// result is the users json data
// passes the users json data to populateSelectMenu
// result is the select element returned from populateSelectMenu
// return an array with users json data and the select element
// result from populateSelectMenu: [users, selectElement]
const initPage = async () => {
  const users = await getUsers();
  const selectElement = populateSelectMenu(users);
  return [users, selectElement];
}

// create an arrow function named initApp
// depends on initPage and selectMenuChangeEventHandler functions
// call the initPage function
// select the #selectMenu element by id
// add an event listener to the #selectMenu for the "change" event
// the event listener calls the selectMenuChangeEventHandler when the change
// event fires for the #selectMenu
const initApp = () => {
  initPage();
  const selectMenu = document.getElementById('selectMenu');
  selectMenu.addEventListener('change', selectMenuChangeEventHandler);
}

// add event listener to the window object
// for the "DOMContentLoaded" event
// put initApp as the event handler function
window.addEventListener('DOMContentLoaded', initApp);
