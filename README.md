# iTunes Library Parser
Load an iTunes XML and display searchable information about it

## TBI ##
- [x] Load in XML and parse into JS Objects
- [x] Wrap node script into desktop app
- [ ] Search current directory for XMLs for user to select
- [ ] Load data into cache and use filter bar to display
- [ ] Popup div for displaying song specific stats
- [ ] Statistics: Genre %, total plays, etc.

## QUESTIONS/PROJECT GOALS ##
* Parse an XML with known format into meaningful JS data?
* Wrap node script into desktop app?
* How to handle autocomplete?

## BUILD STEPS ##
1. Run `npm install` for dependencies
2. Run npm appropriate npm script for target OS
```
npm run package-win
npm run package-linux
npm run package-mac
```
3. Experience the slow performance and immense file-size for a tiny app 😛
