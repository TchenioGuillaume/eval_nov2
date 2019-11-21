// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

	document.getElementById('uploadButton').addEventListener('click', evt => {
		const { dialog } = require('electron').remote
		let filtres =  [
			{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },
		]
		let path = dialog.showOpenDialog({
			filters : filtres
		}).then(result => {
      console.log(result.filePaths)
      for (const f of result.filePaths) {
        //console.log('File(s) you dragged here: ', f.path)
        make_base(f);
      }
    });
	})

	document.addEventListener('dragover', (e) => {
		e.preventDefault();
		e.stopPropagation();
	});
	
	document.addEventListener('drop', (e) => {
		e.preventDefault();
		e.stopPropagation();
		for (const f of e.dataTransfer.files) {
			//console.log('File(s) you dragged here: ', f.path)
      make_base(f.path);
		}
	});
  function make_base($path)
  {
    console.log('Affichage de '+$path);
    base_image = new Image();
    base_image.src = $path;
    base_image.onload = function(){
      scaleToFit(this);
    }
  }
  function scaleToFit(img){
    var canvas = document.getElementById('impossible'),
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }
})