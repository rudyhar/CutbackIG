let firstArticleGrabbed = false;
var desiredClassCount = 0;

browser.runtime.sendMessage({ operation: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.operation == "hideLiked") {
      // run your function here
      console.log("Hello from the background script");
      // hideLikedBy();
      hideLikedAlt();
      console.log(window.location.pathname);

    }
    
    if (request.operation == "hideSuggested") {
      // run your function here
      console.log("Hello from the background script");
      hideSuggested();
      hideStories();

    }
});

console.log("CONTENT HAS LOADED FOR INSTA CUSTOMIZER");



async function ApplyAllBlockers() {
//    hideLikedBy();
    hideLikedAlt();
    // hideSuggested();
    hideStories();
//    hideReelsButton();
    hideExplorePage();
    hideSponsoredPosts();
    
    if(firstArticleGrabbed)
        hideSuggestedPosts();
}


async function ApplyExploreBlockers() {
    hideLikedAlt();
    hideExplorePage();
}



async function hideLikedBy() {
    console.log("HIDDEN");
    let text_elements = Array.from(document.querySelectorAll('div > span > a[role="link"]'));

    
    // THIS HIDES THE LIKED BY TEXT AND NAMES
    let likedByElements = text_elements.filter(el => el.getAttribute('href').includes('liked_by'));
    likedByElements.forEach(el => el.parentNode.style.display = 'none');
    
    
    // Get all elements with crossorigin="anonymous"
    let allElements = Array.from(document.querySelectorAll('[crossorigin="anonymous"]'));

    
    //  Filter out elements which have an img child with alt containing "profile picture" (case insensitive)
    /// THIS MAKES SURE THAT PROFILE PHOTOS IN POSTS AND STORIES DONT GET HIDDEN
    let filteredElements = allElements.filter(element => !element.alt.includes('profile picture'));

    
    // Further filter out elements which have style containing "object-fit: cover;"
    /// THIS MAKES SURE THAT POSTS DONT GET HIDDEN
    filteredElements = filteredElements.filter(el => {
        let style = el.getAttribute('style');
        return !(style && style.includes('object-fit: cover;'));
    });
    
    
    console.log(filteredElements);

    // Hide the remaining elements
    filteredElements.forEach(el => el.style.display = 'none');


    // fin
    

}

async function getFirstArticleClassLength()
{
    let articleElement = document.querySelector('article');  // Select the first <article> element
    desiredClassCount = articleElement.classList.length;  // Get the count of classes

    console.log(classCount);  // Output the count
}






async function hideSuggested()
/// this hides the suggested posts by queryying the leaf node div with text "Follow" it then traverses up the parent nodes until
/// it finds an article class and hides this
/// The reason this no longer works is because this will block posts that are sent from firends to friends which we would like to keep
{
  let allDivs = document.querySelectorAll('div');

  allDivs.forEach(div => {
    if (div.textContent.includes('Follow') && div.children.length === 0) {
      let currentParent = div.parentNode;

      while(currentParent && currentParent.tagName !== 'ARTICLE'){
        currentParent = currentParent.parentNode;
      }

      if(currentParent && currentParent.tagName === 'ARTICLE'){
        currentParent.style.display = 'none';
      }
    }
  });
  /// hides suggestion box

    allDivs.forEach(div => {
        if (div.textContent.includes('Follow') && div.children.length === 0) {
            let currentParent = div.parentNode;
            for(let i = 0; i < 6; i++){
                if(currentParent){
                    currentParent = currentParent.parentNode;
                } else {
                    break;
                }
            }
            if(currentParent){
                currentParent.style.display = 'none';
            }
        }
    });
}

// THIS FUNCTION IS WORKING and better than other one but we still use both for now
async function hideLikedAlt()
{
  const searchText = "Liked by";
  const spans = document.querySelectorAll("span");
  const spansWithText = Array.from(spans).filter(span => span.textContent.includes(searchText));
  
  spansWithText.forEach(span => {
    let grandparent = span.parentElement.parentElement;
    if (grandparent && grandparent.tagName === 'DIV') {
      grandparent.style.display = "none";
    }
  });
}


function hideReelsButton() {
    // get all SVG elements in the document
    var svgs = document.getElementsByTagName("svg");
    
    // iterate over the SVG elements
    for (var i = 0; i < svgs.length; i++) {
        // if the aria-label of the SVG is "Reels"
        if (svgs[i].getAttribute("aria-label") === "Reels") {
            // hide the grandparent of the SVG
            var grandparent = svgs[i].parentNode.parentNode.parentNode;
            if (grandparent) {
                grandparent.style.display = "none";
            }
        }
    }
}




async function hideStories(){
  
  // const box = document.querySelectorAll("div[role='presentation']")[0].nextSibling || null;
  // box.style.display = "none";
  const box = document.querySelectorAll("div[role='menu']")[0] || null;
  box.style.display = "none";

}



async function hideExplorePage(){
    
    // this works on WEB but need a diff method for ios
    
    //    try {
    //          var elements = document.querySelectorAll('[role="main"]');
    //          // hide the element
    //          elements[0].style.display = "none";
    //          // navbarElement = document.body.querySelector("nav > div:last-child > div"); //div.Hz2lF
    //          // mainSectionElement.style.display = "none";
    //          // navbarElement.style.display = "none";
    //
    //        } catch (error) {
    //          console.error("cutbackIG error" + error);
    //        }
        
    
    /// THIS HIDES THE TAGS
    
// get all <a> elements in the document
    var anchors = document.querySelectorAll('a');

    // iterate over the anchors
    for (var i = 0; i < anchors.length; i++) {
        // check if the href attribute contains the specific string
        if (anchors[i].href.includes("/explore/search/keyword/")) {
            // get the grandparent of the anchor
            var fourthParent =  anchors[i].parentNode.parentNode;
            
            // if the fifth parent is a div, hide it
            if (fourthParent && fourthParent.nodeName === 'DIV') {
                fourthParent.style.display = "none";
            }
        }
    }
     
    
   /// THIS HIDES THE IMG POSTS
    // get all <img> elements in the document
    
//    var images = document.querySelectorAll('img');
//
//    // iterate over the images
//    for (var i = 0; i < images.length; i++) {
//        // check if the alt attribute contains the specific string
//        if (images[i].alt.includes("Photo by")) {
//            // get the fifth parent of the image
//            var fifthParent = images[i].parentNode.parentNode.parentNode.parentNode.parentNode;
//
//            // if the fifth parent is a div, hide it
//            if (fifthParent && fifthParent.nodeName === 'DIV') {
//                fifthParent.style.display = "none";
//
//                // break the loop after hiding one element
//            }
//        }
//    }
    
    
    /// THIS HIDES ALL THE REELS
    // get all <svg> elements in the document
    var svgs = document.querySelectorAll('svg');

    // iterate over the svgs
    for (var i = 0; i < svgs.length; i++) {
        // check if the aria-label attribute is "Reel"
        if (svgs[i].getAttribute('aria-label') === "Reel")
//            || svgs[i].getAttribute('aria-label') === "Carousel") <- THIS HIDES SOME POSTS ON ACCOUNTS DONT USE
        {
            // get the parent of the svg
            var parent = svgs[i].parentNode.parentNode.parentNode.parentNode.parentNode;

            // hide the parent
            if (parent) {
                parent.style.display = "none";
            }
        }
    }
    
}



async function hideSponsoredPosts(){
  const searchText = "Sponsored";
  const spans = document.querySelectorAll("span");
  const spansWithText = Array.from(spans).filter(span => span.textContent.includes(searchText));
  
spansWithText.forEach(span => {
   let parent = span.parentElement;
   if (parent) {
     let anscestor = parent.parentElement.parentElement.parentElement.parentElement.parentElement;
     if (anscestor && anscestor.tagName === 'DIV') {
         anscestor.style.display = "none";
     }
   }
 });
}




/// ONLY RUN SCRIPTS IN HOME PAGE
/*
if(window.location.pathname == '/'){
  setInterval(ApplyAllBlockers, 500);
}

/// WHEN IN EXPLORE TAB HIDE ALL CONTENT EXCEPT FOR SEARCH ~ run like removal but not suggested removal
else if(window.location.pathname.slice(0, 9) == '/explore/'){
  setInterval(ApplyExploreBlockers, 500);
}

// in all other circumstances only hide liked by or things get messy
else
{
    setInterval(hideLikedAlt, 500);
}
*/

if(firstArticleGrabbed == false){
    setInterval(getFirstArticleClassLength, 500)
    firstArticleGrabbed = true
}

setInterval(ApplyAllBlockers, 500);


 
