
const argc = process.argv.length

if (argc !== 2 && argc !== 4) {
  console.log(`incorrect number of arguments: ${argc} given`)
  console.log()
  console.log(`usage: node ${process.argv[1]} [<Name> <Number>]`)
  console.log(' with 2 args: displays current collection (of people)')
  console.log(' with 4 args: adds person & number to phonebook')
  process.exit(1)
}

const Person = require('./models/people')
if (argc == 2) {
  Person.find({})
    .then(persons =>
      persons.forEach(person => {
        console.log(`${person.id} ${person.name} ${person.number}`)
      })
    )
} else if (argc == 4) {
  const name = process.argv[2]
  const number = process.argv[3]
  const newPerson = new Person({ name, number })
  newPerson.save()
    .then(savedPerson => {
      console.log(savedPerson)
    })
}