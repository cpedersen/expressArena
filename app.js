const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Hello Cathy!');
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

app.get('/burgers', (req, res) => {
    res.send('We love vegan burgers!');
})

app.get('/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})

app.get('/pineapple', (req, res) => {
    res.send('We don\'t serve that here. Never call again!');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });


//Assignment Part #1
app.get('/sum', (req, res) => {
    console.log(req.query);
    const a = req.query.a;
    const aNum = parseFloat(a);
    const b = req.query.b;
    const bNum = parseFloat(b);
    const c = [aNum, bNum].reduce((a,b) => a + b)
    console.log("sum = " + c);

    //validate the values
    if(!a || !b) {
        //input not provided
        return res.status(400).send('Please provide a number');
    }

    const total = `The sum of ${a} and ${b} is ${c}`;
    res.send(total);
});


//Assignment Part #2
app.get('/cipher', (req, res) => {
    console.log(req.query);
    const {text, shift} = req.query;
    //validate the values
    if(!text) {
        //input not provided
        return res.status(400).send('Please provide text');
    }
    if(!shift) {
        //input not provided
        return res.status(400).send('Please provide a shift value');
    }
    const shiftNum = parseFloat(shift);
    if(Number.isNaN(shiftNum)) {
        return res.status(400).send('ERROR: Please provide a number for the shift value');
    }

    //start with the char code
    const charCodeStart = 'A'.charCodeAt(0);

    const cipher = text
        .toUpperCase()
        .split('')
        .map(char => {
            //get the char code
            const code = char.charCodeAt(0);

            //break loop when char code isn't valid 
            if(code < charCodeStart || code > (charCodeStart + 26)) {
                return char;
            }

            //calc distance from 'A' charCodeStart
            let dis = code - charCodeStart;
            dis = dis + shiftNum;

            //if value goes past 'Z'
            dis = dis % 26;

            //convert to char
            const newChar = String.fromCharCode(charCodeStart + dis);
            console.log(newChar);
            return newChar;
        })
        .join('');
    
    res.status(200).send(cipher);
});