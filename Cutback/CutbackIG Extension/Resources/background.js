browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.operation === "hello")
        sendResponse({ farewell: "goodbye" });
    
    if (request.operation == "hideLiked") {

       // send a message to the content script
       browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
         browser.tabs.sendMessage(tabs[0].id, {operation: "hideLiked"});
       });
     }
    
    if (request.operation == "hideSuggested") {

       // send a message to the content script
       browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
         browser.tabs.sendMessage(tabs[0].id, {operation: "hideSuggested"});
       });
     }

});
