## Requirements

- [node.js](https://nodejs.org) 16.13.0
- [npm](https://docs.npmjs.com/cli) 8.1.0 or later

---
## Project setup

1. Clone repo
2. Run `npm install`
3. To open app run `npm start` and open `localhost:3000`

### Important

If you setup project for the first time please run

```
npm run prepare
```

This command should be run only once to install [husky](https://typicode.github.io/husky/#/) pre commit hook

---
## Stack

For state management we use **[React Context](https://reactjs.org/docs/context.html)**

For UI needs we use **[AntD](https://ant.design/)**

For some additional styling we use **[styled-components](https://styled-components.com/)**

Application created by [create-react-app](https://create-react-app.dev/)

---
## Deployment

Application will be automatically deployed after every merge to `master` branch

You can find live app here https://challenger-frontend-app.herokuapp.com
