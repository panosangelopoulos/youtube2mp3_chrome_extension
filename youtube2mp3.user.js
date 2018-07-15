// ==UserScript==
// @name         YouTube2mp3
// @namespace    youtubetomp3
// @version      0.1
// @description  download any youtube video to mp3
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const video_id = window.location.href.split('=')[1]
    const requestPage = function(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE) {
                    resolve(this.responseXML);
                }
            };
            xhr.open("GET", url, true);
            xhr.responseType = 'document';
            xhr.send();
        });
    };

    const renderDownloadButton = function(content) {
        const innerContainer = document.getElementById('api-button-container-inner');
        if (innerContainer) {
            innerContainer.innerHTML = content;
            return;
        }

        const video_appears = function (video_id){
          const video_id_appers = document.getElementById('video_id');
          video_id_appers.innerText = video_id;
          return video_id_appers;
        };

        const container = document.createElement('div');
        container.className = 'api-button-container';
        container.innerHTML = `
<style>
.api-button-container {
position: fixed;
top: 3em;
width: 40%;
left: 80%;
padding: 1em;
z-index: 9999999;
font-size: 150%;
}
</style>
<div id="api-button-container-inner">
  <iframe width="250px" height="60px" scrolling="no" style="border:none;"
    src="https://www.download-mp3-youtube.com/api/?api_key=MzU0NDc5MTU1&format=mp3&video_id=${video_id}">
  </iframe>
</div>
`;
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(container);
    };


    async function main() {
        renderDownloadButton();
    };

    main();
})();
