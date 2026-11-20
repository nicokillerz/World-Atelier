# Contributing

1. Fork the repository and create a branch (`git checkout -b my-idea`).
2. Run `npm install`, `npm start` to test, and `npm test` before submitting.
3. Open a Pull Request describing what has changed and why.

Tips:
* The interface is pure JS, with no build step: edit `src/renderer/app.js` / `styles.css` and reload (Ctrl+R in dev mode).
* Made changes to the saving logic? Run `npm test` and, if possible, `npx electron test/smoke/electron-smoke.js`.
* When reporting bugs, include steps to reproduce them and the app version (the version is displayed in *Settings*).


Contributions are accepted under the terms of the [PolyForm Noncommercial License 1.0.0](LICENSE). By submitting a contribution, you confirm that you have the right to make it available under this license.