# WaxLinker Chrome Extension

**WaxLinker** is a Chrome extension designed to enhance Twitter by providing additional functionalities related to Wax users.

## Description

With WaxLinker, users can seamlessly get information about Wax users directly under their Twitter profiles. The extension uses modern web technologies such as React and Webpack to ensure smooth and efficient operation.

## Building the Extension

### Prerequisites:

- Node.js and npm installed on your system.
- A clone of this repository.

### Steps:

1. Navigate to the project directory.
2. Install the required dependencies using:
   ```
   npm install
   ```
3. Build the extension using Webpack:
   ```
   npx webpack --mode production
   ```

After executing the above command, the bundled files will be available in the `dist` directory. These files can be loaded into Chrome to run the extension.

## Configuration

### Manifest Configuration

The extension uses the Chrome's Manifest V3 specification. Key configurations in the `manifest.json` include:

- **manifest_version**: Version of the manifest file format. It's set to `3`.
- **name**: Name of the extension - "WaxLinker".
- **description**: A brief description - "Get Wax users under Twitter".
- **version**: The version of the extension. Currently, it's `1.0.0`.
- **action**: Configuration for the popup action of the extension.
- **icons**: Specifies icons of different sizes for the extension.
- **content_scripts**: Specifies scripts to inject into matching web pages. Currently, it targets Twitter URLs.
- **web_accessible_resources**: Lists resources that web pages might reference.

For more details, refer to the `public/manifest.json` file in the repository.

## Contributing

Feel free to fork this repository, create a feature branch, and submit a pull request if you have any improvements or features to add.

