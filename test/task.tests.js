// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Task = require('../src/server/models/task-model');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Tasks', () => {
	beforeEach((done) => {
        Task.remove({}, (err) => { 
           done();         
        });     
    });

	describe('/GET tasks', () => {
		it('it should GET all the tasks', (done) => {
			chai.request(server)
			.get('/api/tasks')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});
	});

	describe('/POST tasks', () => {
		it('It should create a task', (done) => {
			chai.request(server)
				.post('/api/tasks')
				.send({name: 'Teste 1234s'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.name.should.be.a('string');
					done();
				});
		});
	});

	describe('/GET/:id task', () => {
		it('it should GET a task by the given id', (done) => {
			
			const task = new Task({ name: "The task Name!" });

			task.save((err, task) => {
				chai.request(server)
				.get('/api/tasks/' + task._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name');
					res.body.should.have.property('Created_date');
					res.body.should.have.property('isCompleted');
					done();
				});
			});
		});
	});


	describe('/PUT/:id task', () => {
		it('it should UPDATE a task given the id', (done) => {
			
			const task = new Task({name: 'PUT task test'})
			
			task.save((err, task) => {
				chai.request(server)
				.put('/api/tasks/' + task.id)
				.send({name: 'PUT task test edited', isCompleted: true})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql('PUT task test edited');
					res.body.should.have.property('isCompleted').eql(true);
					done();
				});
			});
		});
	});

	describe('/DELETE/:id task', () => {
		it('it should DELETE a task given the id', (done) => {
			
			const task = new Task({name: "The Chronicles of Narnia"})
			
			task.save((err, task) => {
				chai.request(server)
				.delete('/api/tasks/' + task.id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Task successfully deleted');
					done();
				});
			});
		});
	});

});