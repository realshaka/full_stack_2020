const mongoose = require('mongoose')
const argv = process.argv


if (argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.aqobk.mongodb.net/test?retryWrites=true`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argv.length < 4) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: argv[3],
        number: argv[4]
    })
    if(!person.name || !person.number) {
        console.log("missing content");
        process.exit()
    } 
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook!`);
        mongoose.connection.close()
    })
}


