const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let chaiHttp = require('chai-http');
let server = require('../app');
chai.use(chaiHttp);
const expect = chai.expect;

const { resetDB, seedAllDB } = require('../../test-utils/test-utils');
const { Entree } = require('../db/models');

describe('Phase 3 (Ordering Specs) - Ordered and Alphabetical Entrees', () => {
  before(async () => {
    await resetDB();
    return seedAllDB();
  });

  describe('GET /entrees', () => {
    it('returns entrees ordered by highest price first then name alphabetically', async () => {
      await chai.request(server)
        .get('/entrees')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.eq(7);
          const firstEntree = res.body[0];
          expect(firstEntree).to.have.own.property('name');
          expect(firstEntree).to.have.own.property('description');
          expect(firstEntree).to.have.own.property('price');
          expect(res.body.map(entree => entree.name)).to.eql([
            "Steak Frites",
            "Egg Salad",
            "John's Impossible Burger",
            "Beef Skewers",
            "Chicken Noodle Soup",
            "Caesar Salad",
            "Milk Bread",
          ]);
        });

      await Entree.bulkCreate([
        {
          name: 'Test Entree 1',
          description: 'testing entree order',
          price: '111.11'
        },
        {
          name: 'Test Entree 2',
          description: 'testing entree order',
          price: '111.11'
        },
      ], { validate: true });

      return await chai.request(server)
        .get('/entrees/')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.eq(9);
          const firstEntree = res.body[0];
          expect(firstEntree).to.have.own.property('name');
          expect(firstEntree).to.have.own.property('description');
          expect(firstEntree).to.have.own.property('price');
          expect(res.body.map(entree => entree.name)).to.eql([
            'Test Entree 1',
            'Test Entree 2',
            "Steak Frites",
            "Egg Salad",
            "John's Impossible Burger",
            "Beef Skewers",
            "Chicken Noodle Soup",
            "Caesar Salad",
            "Milk Bread",
          ]);
        });
    });
  });
})
