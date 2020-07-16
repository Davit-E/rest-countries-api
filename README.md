# rest-countries-api
Website :
const commentArea = document.querySelector('.comment_area');
const dragDropEventsArr = ['dragenter', 'dragover', 'dragleave', 'drop'];

dragDropEventsArr.forEach((eventName) => {
  commentArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

['dragenter', 'dragover'].forEach((eventName) => {
  commentArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach((eventName) => {
  commentArea.addEventListener(eventName, removeHighlight, false);
});

function highlight(event) {
  commentArea.classList.add('highlight');
}

function removeHighlight(event) {
  commentArea.classList.remove('highlight');
}

commentArea.addEventListener('drop', dropHandler, false);

function dropHandler(event) {
  let data = event.dataTransfer;
  let files = data.files;
  handleFiles(files);
}

function handleFiles(files) {
  files = [...files];
  initializeProgress(files.length);
  files.forEach(uploadFile);
}

function uploadFile(file) {
  console.log(file);
  var url = 'url';
  var formData = new FormData();

  formData.append('file', file);
  for (var value of formData.values()) {
    // console.log(value);
  }
}

let uploadProgress = [];
let progressBar = document.querySelector('#progress_bar');

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgress.push(0);
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total =
    uploadProgress.reduce((acc, currentVal) => acc + currentVal, 0) /
    uploadProgress.length;
  progressBar.value = total;
}

commentArea.addEventListener('input', updateValue);
let inputText = '';
function updateValue(e) {
  inputText = e.target.value;
  console.log(inputText);
}

commentArea.addEventListener('paste', retrieveFromClipboard);

function retrieveFromClipboard(pasteEvent) {
  pasteEvent.stopPropagation();
  pasteEvent.preventDefault();
  var items = (pasteEvent.clipboardData || pasteEvent.originalEvent.clipboardData).items;
  for (index in items) {
    var item = items[index];
    if (item.kind === 'file') {
      var blob = item.getAsFile();
      initializeProgress(items.length - 1);
      uploadFile(blob);
    }
  }
}
