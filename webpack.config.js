module.exports = {
  entry: "./src/index.js",
  resolve: {
    alias: {
      "jquery-ui/widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",
      "jquery-fileupload": "blueimp-file-upload/js/vendor/jquery.fileupload.js"
    }
  },
  module: {
    loaders: [
      {
        test: require.resolve("blueimp-file-upload"),
        loader: "imports?define=>false"
      },
      {
        test: require.resolve("medium-editor-insert-plugin"),
        loader: "imports?define=>false"
      }
    ]
  }
};
