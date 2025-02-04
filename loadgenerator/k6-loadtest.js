import { check } from 'k6';
import http from 'k6/http';


const url = "https://$DEVSHELL_PROJECT_ID.appspot.com/";

const endpoints = [
    'log',
    'score',
    'random-error',
    'error',
    'uncaught',
    'slow'
]

export default function() {

// llamamos al hello world sin nada
    const res = http.get(`${url}`)
    /*const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    const rest = http.get(`${url}${endpoint}`)*/

/*
guarrada en consola: 
while true; \
    do curl -s https://$DEVSHELL_PROJECT_ID.appspot.com/random-error \
    -w '\n' ;sleep .1s;done
*/

check(res, {
    'GET status was 200': (r) => r.status == 200,
    'GET transaction time below 300ms': (r) => r.timings.duration < 300,
});

}