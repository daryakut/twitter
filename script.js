
let feedContainer = document.querySelector(".feed-container");

function createPost(name, image, body, reaction) {
  var feedItemContainer = document.createElement("div");
  feedItemContainer.className = "feed-item-container";

  // Creating the first inner div with class "feed-user-image"
  var feedUserImage = document.createElement("div");
  feedUserImage.className = "feed-user-image";

  feedUserImage.style.backgroundImage = `url(${image})`;

  const userName = document.createElement("span");
  userName.className = "user-name";
  userName.textContent = name;

  const icon = document.createElement("i");
  icon.className = "icon-verified";
  icon.style.backgroundImage = "url('assets/verified.svg')";
  userName.appendChild(icon);

  // Creating the second inner div with class "feed-item-box"
  var feedItemBox = document.createElement("div");
  feedItemBox.className = "feed-item-box";

  // Creating the third inner div with class "feed-item-content"
  var feedItemContent = document.createElement("div");
  feedItemContent.className = "feed-item-content";
  feedItemContent.textContent = body;

  // Creating the fourth inner div with class "reactions-block"
  var reactionsBlock = document.createElement("div");
  reactionsBlock.className = "reactions-block";

  // Creating the first reaction group
  var reactionGroup1 = document.createElement("div");
  reactionGroup1.className = "reaction-group";

  // Creating the first icon and value in the first reaction group
  var retweetIcon1 = document.createElement("i");
  retweetIcon1.className = "retweet-icon";
  retweetIcon1.style.backgroundImage = "url('assets/Reply.svg')";

  var retweetValue1 = document.createElement("div");
  retweetValue1.className = "retweet-value";
  retweetValue1.textContent = Math.floor(Math.random() * 201).toString();

  // Appending the icon and value to the first reaction group
  reactionGroup1.appendChild(retweetIcon1);
  reactionGroup1.appendChild(retweetValue1);

  // Creating the second reaction group (similar structure as the first)
  var reactionGroup2 = document.createElement("div");
  reactionGroup2.className = "reaction-group";

  var retweetIcon2 = document.createElement("i");
  retweetIcon2.className = "retweet-icon";
  retweetIcon2.style.backgroundImage = "url('assets/Retweet.svg')";

  var retweetValue2 = document.createElement("div");
  retweetValue2.className = "retweet-value";
  retweetValue2.textContent = Math.floor(Math.random() * 201).toString();

  reactionGroup2.appendChild(retweetIcon2);
  reactionGroup2.appendChild(retweetValue2);

  // Creating the third reaction group (similar structure as the first)
  var reactionGroup3 = document.createElement("div");
  reactionGroup3.className = "reaction-group";

  var retweetIcon3 = document.createElement("i");
  retweetIcon3.className = "retweet-icon";
  retweetIcon3.style.backgroundImage = "url('assets/React.svg')";

  var retweetValue3 = document.createElement("div");
  retweetValue3.className = "retweet-value";
  retweetValue3.textContent = reaction;

  reactionGroup3.appendChild(retweetIcon3);
  reactionGroup3.appendChild(retweetValue3);

  // Creating the last individual icon outside of any reaction group
  var singleIcon = document.createElement("i");
  singleIcon.className = "retweet-icon";
  singleIcon.style.backgroundImage = "url('assets/Share.svg')";

  // Appending the reaction groups and the individual icon to the reactions block
  reactionsBlock.appendChild(reactionGroup1);
  reactionsBlock.appendChild(reactionGroup2);
  reactionsBlock.appendChild(reactionGroup3);
  reactionsBlock.appendChild(singleIcon);

  // Appending all the inner divs to the outermost div
  feedItemBox.appendChild(userName);
  feedItemBox.appendChild(feedItemContent);
  feedItemBox.appendChild(reactionsBlock);

  feedItemContainer.appendChild(feedUserImage);
  feedItemContainer.appendChild(feedItemBox);

  // Finally, appending the entire structure to the body or another parent element
  feedContainer.prepend(feedItemContainer);
}

async function sendMessageToServer(event) {
  event.preventDefault();

  const userMessage = document.getElementById("userMessage").value;
  const userId = 20;

  try {
    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: userMessage,
        userId: userId,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Сервер ответил:", responseData);

      createPost(
        "Daria",
        "https://robohash.org/perferendisideveniet.png",
        userMessage,
        0
      ); 
    } else {
      console.error("Ошибка при отправке сообщения:", response.statusText);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

async function main() {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  console.log(data);
  let onlyTenPosts = data.posts.slice(0, 10);
  for (const post of onlyTenPosts) {
    let userId = post.userId;
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    const data = await response.json();
    console.log(data);
    const name = data.username;
    const image = data.image;
    const body = post.body;
    const reaction = post.reactions;

    createPost(name, image, body, reaction);
  }
}

main();

document
  .getElementById("tweetForm")
  .addEventListener("submit", sendMessageToServer);
