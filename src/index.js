import { default as Hello } from './hello'

const hello = new Hello('John')
const msg = hello.greet()
console.log(msg)
document.querySelector('#output').innerText = msg
