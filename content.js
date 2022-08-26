//Download Chords from ultimate guitar tabs

//Download Button
var downloadBtn = document.createElement("button");
downloadBtn.className = "btnD";
downloadBtn.id = "btn-down";
var textnode = document.createTextNode("Download");
downloadBtn.appendChild(textnode);

//Anchor Button
var downloadAnchor = document.createElement("a");
//downloadBtn.className = "btnD";
downloadAnchor.id = "downloadlink";
var textnode2 = document.createTextNode("Download Chords text");
downloadAnchor.appendChild(textnode2);
downloadAnchor.style.color = "red";

//Button Styles
downloadBtn.style.position = "fixed";
downloadBtn.style.zIndex = "9997";
downloadBtn.style.backgroundColor = "#03a9f4";
downloadBtn.style.opacity = "0.5";
downloadBtn.style.borderRadius = "8px";
downloadBtn.style.border = "none";
downloadBtn.style.cursor = "pointer";

var bodyX = document.body;
bodyX.insertBefore(downloadBtn, bodyX.childNodes[0]);
bodyX.insertBefore(downloadAnchor, bodyX.childNodes[0]);

downloadBtn.onclick = function () {
  console.log("Download button Clicked");
  //Process the content
  let dateOfBirth = document
    .getElementsByClassName("news-title")[0]
    .innerText.split("!!!")[1]
    .trim();
  var artistsArray = document
    .getElementsByClassName("news-content")[0]
    .getElementsByTagName("p")[0]
    .getElementsByTagName("strong")[0]
    .innerText.split(",");

  let jsonData = { dob: dateOfBirth, artists: artistsArray };

  //Call preparetext doc function
  myFunc(dateOfBirth, jsonData);
};

function myFunc(dob, artists) {
  console.log("myfunc executed");
  (function () {
    let textFile = null;
    let makeTextFile = function (text) {
      var data = new Blob([text], { type: "text/plain" });
      // If we are replacing a previously generated file we need to
      // manually revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      return textFile;
    };

    var create = document.getElementById("btn-down");
    // textbox = document.getElementById("textbox");
    //textbox = chords;

    create.addEventListener(
      "click",
      function () {
        var link = document.getElementById("downloadlink");
        link.setAttribute("download", dob + ".json");
        link.href = makeTextFile(JSON.stringify(artists));
        link.style.display = "block";
      },
      false
    );
  })();
}
