import { Faker, en, ru, en_US } from '@faker-js/faker';
import { writeFile } from 'fs';

const faker = new Faker({
  locale: [ru],
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate() {
  // Get the start and end dates
  const startDate = new Date('2000-01-01');
  const endDate = new Date();
  
  // Get the difference in milliseconds between the start and end dates
  const timeDiff = endDate.getTime() - startDate.getTime();
  
  // Get a random number within that time difference
  const randomTime = Math.floor(Math.random() * timeDiff);
  
  // Add the random time to the start date to get the random date
  const randomDate = new Date(startDate.getTime() + randomTime);
  
  return randomDate;
}


// Generate a random integer between -5 and 5 (inclusive)
// const randomInt = getRandomInt(-5, 5);

function createRandomUser() {
  const sex = Math.floor(Math.random() * (2) + 1) === 1 ? 'male' : 'female'
  return {
    email: faker.internet.email(),
    birthdate: faker.date.birthdate(),
    firstName: faker.person.firstName(sex),
    lastName: faker.person.lastName(sex),
    middleName: faker.person.middleName(sex),
    sex: sex === 'male' ? 'Мужчина' : "Женщина",
    "report": [
      {
        "title": "Зрение",
        "type": "double",
        "id": "6460a232484f590b854ce14c",
        "value": getRandomInt(-5, 5)
      },
      {
        "title": "COVID",
        "type": "boolean",
        "id": "6460a232484f590b854ce14d",
        value: Math.floor(Math.random() * (2) + 1) === 1
      },
      {
        "title": "Кол-во посещений",
        "type": "int",
        "id": "6460a232484f590b854ce14e",
        value: getRandomInt(0, 40)
      },
      {
        "title": "Дата последнего посещения",
        "type": "date",
        "id": "6460a232484f590b854ce150",
        value: randomDate()
      }
    ],
    "reportVersion": 2,
  };
}

const result = [];
for (let i = 0; i < 2000; i++) {
  result.push(createRandomUser())
}

const data = JSON.stringify(result, null, 2);

writeFile('fake-data.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});