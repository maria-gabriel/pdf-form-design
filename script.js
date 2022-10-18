$('#downloadPDF').click(function () {
  getScreenshotOfElement(
    $('#content2').get(0),
    0,
    0,
    $('#content2').width() + 45,
    $('#content2').height() + 30,
    function (data) {
      var pdf = new jsPDF('l', 'pt', [
        $('#content2').width(),
        $('#content2').height(),
      ]);

      pdf.addImage(
        'data:image/png;base64,' + data,
        'PNG',
        0,
        0,
        $('#content2').width(),
        $('#content2').height()
      );
      pdf.save('PDF-Form-Format.pdf');
    }
  );
});

function getScreenshotOfElement(element, posX, posY, width, height, callback) {
  html2canvas(element, {
    onrendered: function (canvas) {
      var context = canvas.getContext('2d');
      var imageData = context.getImageData(posX, posY, width, height).data;
      var outputCanvas = document.createElement('canvas');
      var outputContext = outputCanvas.getContext('2d');
      outputCanvas.width = width;
      outputCanvas.height = height;

      var idata = outputContext.createImageData(width, height);
      idata.data.set(imageData);
      outputContext.putImageData(idata, 0, 0);
      callback(outputCanvas.toDataURL().replace('data:image/png;base64,', ''));
    },
    width: width,
    height: height,
    useCORS: true,
    taintTest: false,
    allowTaint: false,
  });
}
