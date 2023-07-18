"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
const favArray = [];

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  
  return $(`
      
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}
/**Handle the form submit when adding a new story */

async function formSubmit() {
  const title = document.getElementById('story-title').value
  const author = document.getElementById('story-author').value
  const URL = document.getElementById('story-URL').value
  Array.from(document.querySelectorAll('#story-form'))
  .reduce((acc, input) =>
  ({...acc, [input.id]: input.value}), {});

  const story = await storyList.addStory(currentUser, {title, author, URL});
  
}

const submitEntry = document.getElementById('add-story');
submitEntry.addEventListener('click', formSubmit)


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
  
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    const favoriteStar = document.createElement('span')
    favoriteStar.className = 'far fa-star';
    $story.append(favoriteStar);
    $allStoriesList.append($story);

    favoriteStar.addEventListener('click', function() {
      favoriteStar.setAttribute('class', 'fas fa-star')
      //this.classList.remove('far');
      //this.classList.add('fas');

      this.addEventListener('dblclick', function() {
        if (this.classList.contains('fas')) {
          this.classList.remove('fas');
          this.classList.add('far')
        }
      })
      })
      
  }
  $allStoriesList.show();
}

function pushFavorites() {
  const storyLi = document.querySelectorAll('li')
  const favoritesMenu = document.getElementById('favorites')
  const section = document.getElementsByClassName('stories-container container')[0]

  storyLi.forEach((item) => {
    const span = item.querySelector('span');
    if ( span.classList.contains('fas')) {
    section.appendChild(item)
      //favoritesMenu.appendChild(item.cloneNode(true))
    }
  })
}

favorites.addEventListener('click', function() {
  hidePageComponents();
  pushFavorites();
})

mystories.addEventListener('click', function() {
  const section = document.getElementsByClassName('stories-container container')[0]
  section.innerHTML = 'No Stories Added Yet!'

})




