const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

const PORT = process.env.PORT ?? 3000

let list = [
    ["Белоконева Анна", 0, 0, 0, 0, 0],
    ["Воробьёва Алисия", 0, 0, 0, 0, 0],
    ["Корлякова Анна", 0, 0, 0, 0, 0],
    
    ["Крутова Анна", 0, 0, 0, 0, 0],
    ["Латушкина Анастасия", 0, 0, 0, 0, 0],
    ["Серый-Казак Анастасия", 0, 0, 0, 0, 0],

    ["Тин Дарья", 0, 0, 0, 0, 0],
    ["Трощей Мария", 0, 0, 0, 0, 0],
    ["Чуйкова Елизовета", 0, 0, 0, 0, 0],

    ["Шилова Дарья", 0, 0, 0, 0, 0],
    ["Щурова Мария", 0, 0, 0, 0, 0],
    ["Черняева таисия", 0, 0, 0, 0, 0]

]


const sqlite3 = require("sqlite3").verbose()

let db = new sqlite3.Database('sqlite3.db', (err) => {});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT,
    name TEXT,
    allstars INT,
    star1 INT,
    star2 INT,
    star3 INT,
    star4 INT
)`, async (err, res) => {
    
    for (let i of list) {
        db.get(`SELECT id FROM users WHERE id = ${list.indexOf(i)}`, async (err, res) => {
            if (String(res) == "undefined") {
                db.run(`INSERT INTO users VALUES ("${list.indexOf(i)}", ?, ?, ?, ?, ?, ?)`, i)
            }
        })
    }
})

db.run(`CREATE TABLE IF NOT EXISTS star (
    number INT
)`, async (err, res) => {

        db.get(`SELECT number FROM star`, async (err, res) => {
            if (String(res) == "undefined") {
                db.run(`INSERT INTO star VALUES (1)`)
            }
        })

})

const fun2 = async () => {

    return new Promise(function(resolve, reject) {
        db.all(`SELECT * FROM users`, async(err, res) => {
            list = ""
            for (let i of res) {
                list += `
                    <label>${i.name} ${i.id} </label> 
                    <input type="text" placeholder="balls" name="balls!${i.id}"><br><br> 


                `
            }


            resolve(list)

        })

        
    })
    
}

const fun = async () => {

    return new Promise(function(resolve, reject) {
        db.all(`SELECT * FROM users`, async(err, res) => {
            list = ""
            for (let i of res) {
                list += `

                <div class="sign">
                <h1 class="name">${i.name.toUpperCase()}</h1>
                    <div class="dsfsf">
                    
                        <div class="asd">
                            <p class="bals" id = "1">${i.star1}</p>
                        </div>
                        


                        <div class="asd">
                            <p class="bals" id = "2">${i.star2}</p>
                        </div>



                        <div class="asd">
                            <p class="bals" id = "3">${i.star3}</p>
                        </div>



                        <div class="asd">
                            <p class="bals" id = "4">${i.star4}</p>
                        </div>



                        <div class="asd">
                            <p class="bals" id = "5">${i.allstars}</p>
                        </div>

                        
                        <p>                  </p>

                    </div>

                </div>
                `
            }


            resolve(list)

        })

        
    })
    
}

const urlencodedParser = express.urlencoded({extended: false});

app.get("/api", async (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>8 Марта</title>
        <link rel="stylesheet" href="style.css">
    </head>

<body>

    <form action="/api" method="POST"> 

        ${await fun2()}

        <button>Submit</button> 
    </form> 

</body>
</html>
    `)
})
app.post("/api", urlencodedParser, async (request, response) => {
    if(!request.body) return response.sendStatus(400);

    db.get(`SELECT number FROM star`, async (err,res) => {
        for (const i of Object.entries(request.body)) {
            const id = i[0].split("!")[1]
            const ball = Number(i[1])
            
            db.run(`UPDATE users SET star${res.number} = ${ball} WHERE id = ${id}`)
            db.run(`UPDATE users SET allstars = allstars + ${ball} WHERE id = ${id}`)
        }
    })


    db.run(`UPDATE star SET number = number + 1`)


    response.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>8 Марта</title>
        <link rel="stylesheet" href="style.css">
    </head>

<body>

    <form action="/api" method="POST"> 

        ${await fun2()}

        <button>Submit</button> 
    </form> 

</body>
</html>`)


});


app.get('/', async (request, response) => {

    




    response.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>8 Марта</title>
        <link rel="stylesheet" href="style.css">
    </head>
    
    <style>
    body {
        background-color: rgb(255, 255, 255);
    }


    .main {
        background-color: rgb(240, 187, 229);


        margin: 0 auto;
        width: 90%;
        height: auto;



        border-radius: 25px;
    }

    .sign {
        background-color: rgb(192, 153, 255);
        
        font-family: Arial, Helvetica, sans-serif;

        margin: 0 auto;
        margin-top:25px;
        width: 80%;
        height: 60px;
        vertical-align:middle;
        border-radius: 25px;
    }

    p {
        font-weight: 1000;
        height: 10;
    }

    h1 {
        font-weight: 1000;
    }

    .space {
        width: 80%;
        height: 50px;
    }

    .textname {
        color: rgb(255, 255, 255);

        margin: 0 auto;
        margin-top: 60px;

        font-family: Arial, Helvetica, sans-serif;

        font-size: 50px;

        text-align: center;

        
    }

    .name {

            position: relative;
            color: rgb(250, 217, 255);
            font-size: 30px;

            margin: 30px;
            overflow: hidden;
            margin-top: 10px;
            display: inline-block;
        }


    .bals {

        position: relative;
            color: azure;
            font-size:30px;

            margin: 30px;
            overflow: hidden;
            margin-top: 10px;
            display: inline-block;

        padding-left: 20px;
        padding-right: 20px;
    }

    .dsfsf {
        float: right;
        display: flex;
justify-content: space-between
    }
    
    .asd {

    margin-top: 0px!important;
    position: relative;
    margin: 0 auto;
    width: 200px;
    height: 50px;
    display: inline-block;
    }
    </style>
    
    <body>
        
    
            <div class="main">
                <div>
                    
                    <h1 class = "textname">Результаты</h1>
                    <p class="textname" style="font-size: 30px; text-align: right; margin-right: 15%;">Конкурс 1ㅤКонкурс 2ㅤКонкурс 3ㅤКонкурс 4ㅤВсе балы</p>
                </div>
    
        
            
        
            
            <div class="score">

                ${await fun()}


                
                <div class="space"> </div>
            </div>
        </div>
    
    </body>
    </html>`)




});



app.listen(PORT, () => {
  console.log('App is listening on port 5000 http://localhost:' + PORT);
  console.log('App is listening on port 5000 http://localhost:' + PORT + '/api');
});