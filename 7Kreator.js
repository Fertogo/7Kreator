var canvas  = new fabric.Canvas('c');
$(document).ready(function(){
  console.log("Ready")
  canvas.setOverlayImage('7kback.png', canvas.renderAll.bind(canvas));
});

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

  var reader  = new FileReader();

  reader.onloadend = function () {
      console.log(reader.result)
      fabric.Image.fromURL(reader.result, function(oImg) {
        canvas.add(oImg);
        canvas.sendBackwards(oImg);
      });
  }
  var file = files[0]

  if (file) {
    reader.readAsDataURL(file);
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);


function download(url,name){
  // make the link. set the href and download. emulate dom click
  $('<a>').attr({href:url,download:name})[0].click();
}
function downloadFabric(canvas,name){
  //  convert the canvas to a data url and download it.
  download(canvas.toDataURL({multiplier: 4}),name+'.png' );
}

$("#submit").click(function(){
    downloadFabric(canvas,'test');
});


$("#back").click(sendToBack);
$("#front").click(bringToFront);
$("#delete").click(deleteImage);

/*
* Sends currently selected image object to the back
*/
function sendToBack(){
  console.log("Send to Back")
  image = canvas.getActiveObject();
  if (image) canvas.sendToBack(image)
}

/*
* Brings currently selected image object to the front
*/
function bringToFront(){
  console.log("Bring To Front")
  image = canvas.getActiveObject();
  if (image) canvas.bringToFront(image)
}

/*
* Removes the selected image from the canvas
*/
function deleteImage(){
  console.log("Delete")
  image = canvas.getActiveObject();
  if (image) image.remove()
}


