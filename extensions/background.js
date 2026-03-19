const installed = "ODNS Extension installed successfully!";

chrome.runtime.onInstalled.addListener(() => {
    console.log(installed);
})

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {

    let url = new URL(details.url)

    if (url.hostname.endsWith(".sus") || url.hostname.endsWith(".xdd") || url.hostname.endsWith(".odns") || url.hostname.endsWith(".dev") || url.hostname.endsWith(".cloud") || url.hostname.endsWith(".web") || url.hostname.endsWith(".app") || url.hostname.endsWith(".page") || url.hostname.endsWith(".site") || url.hostname.endsWith(".online") || url.hostname.endsWith(".tech") || url.hostname.endsWith(".store") || url.hostname.endsWith(".blog") || url.hostname.endsWith(".art") || url.hostname.endsWith(".design") || url.hostname.endsWith(".space") || url.hostname.endsWith(".fun") || url.hostname.endsWith(".xyz")) {

        let domain = url.hostname

        let redirect = "https://resolver.odns.dev/?domain=" + domain

        return {
            redirectUrl: redirect
        }

    }

  },
  { urls: ["<all_urls>"] },
  ["blocking"]
)

