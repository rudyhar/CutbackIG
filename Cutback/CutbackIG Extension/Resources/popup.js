console.log("Hello World!", browser);


window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('hideLikedButton').addEventListener('click', function() {
        // You would replace the following line with the appropriate Safari Web Extensions API to send a message to the background script
        browser.runtime.sendMessage({operation: "hideLiked"});
    });
    
    document.getElementById('hideSuggButton').addEventListener('click', function() {
        // You would replace the following line with the appropriate Safari Web Extensions API to send a message to the background script
        browser.runtime.sendMessage({operation: "hideSuggested"});
    });
    
});

