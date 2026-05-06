const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

const fc = require('fast-check');
const forever = require('forever-monitor');

fc.configureGlobal({
  interruptAfterTimeLimit: 150000,
  markInterruptAsFailure: true,
});

// Start server
const child = new (forever.Monitor)('server.js', { max: 1, silent: true });

child.on('start', () => console.log('Starting server.js'));
child.on('error', () => console.log('Server error'));
child.on('exit', () => console.log('Server stopped'));

before(done => {
  child.start();
  setTimeout(done, 500);
});

after(() => {
  if (child.running) child.stop();
});

/* ===================== UNIT TESTS ===================== */

describe('GET /', () => {
  it('responds with HTML', () => {
    return chai.request('http://localhost:3000')
      .get('/')
      .then((res: any) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('POST /highscore', () => {
  it('creates score', () => {
    return chai.request('http://localhost:3000')
      .post('/highscore')
      .send({ name: 'TonnyRulez', score: 123 })
      .then((res: any) => {
        expect(res).to.have.status(201);
      });
  });

  it('rejects 0 score', () => {
    return chai.request('http://localhost:3000')
      .post('/highscore')
      .send({ name: 'Zero', score: 0 })
      .then((res: any) => {
        expect(res).to.have.status(400);
      });
  });

  it('rejects negative score', () => {
    return chai.request('http://localhost:3000')
      .post('/highscore')
      .send({ name: 'Bad', score: -10 })
      .then((res: any) => {
        expect(res).to.have.status(400);
      });
  });
});

describe('GET /highscores', () => {
  it('returns JSON array', () => {
    return chai.request('http://localhost:3000')
      .get('/highscores')
      .then((res: any) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });
});

describe('DELETE /highscores', () => {
  it('clears highscores', () => {
    return chai.request('http://localhost:3000')
      .delete('/highscores')
      .then((res: any)=> {
        expect(res).to.have.status(200);
      });
  });
});