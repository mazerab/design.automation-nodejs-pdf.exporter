function PDFExtension(viewer, options) {
  Autodesk.Viewing.Extension.call(this, viewer, options);
}

PDFExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
PDFExtension.prototype.constructor = PDFExtension;


function statusCallback(completed, message) {
  $.notify(message, { className: "info", position:"bottom right" });
  $('#exportPDF').prop("disabled", !completed);
}


PDFExtension.prototype.load = function () {
  var _viewer = this.viewer;


  // get Forge token (use your data:read endpoint here)
  // this sample is using client-side JavaScript only, so no
  // back-end that authenticate with Forge nor files, therefore
  // is using files from another sample. On your implementation,
  // you should replace this with your own Token endpoint
  function getForgeToken(callback) {
    jQuery.ajax({
      url: '/forge/oauth/token',
      success: function (oauth) {
        if (callback)
          callback(oauth.access_token, oauth.expires_in);
      }
    });
  }


  createUI = function () {
    // Button 1
    var button1 = new Autodesk.Viewing.UI.Button('toolbarPDF');
    button1.onClick = function (e) {
        ForgePDF.exportPDF(documentId, projectId, itemId, fileName, token, statusCallback, fileType); /*Optional*/
    };
    button1.addClass('toolbarPDFButton');
    button1.setToolTip('Export to .PDF');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('myAppGroup1');
    this.subToolbar.addControl(button1);

    _viewer.toolbar.addControl(this.subToolbar);
  };

  createUI();

  return true;
};


PDFExtension.prototype.unload = function () {
  alert('PDFExtension is now unloaded!');
  return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('Autodesk.Sample.PDFExtension', PDFExtension);
