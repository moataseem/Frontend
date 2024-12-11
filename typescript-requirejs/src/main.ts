import { greet } from './index';

const message = greet('World');
console.log(greet('World'));
const rootElement = document.getElementById('root');
if (rootElement) {
    rootElement.innerText = message;
}


// import('./index').then(module => {
//     console.log(module.greet('World'));
// });