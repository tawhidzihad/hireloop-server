const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGO_DB_URI;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();

		// Database and data collections
		const database = client.db("hireloop_db");
		const jobsCollection = database.collection("jobs");
		const companyCollection = database.collection("companies");

		/* Jobs Related APIs */
		app.get("/api/jobs", async (req, res) => {
			const query = {};
			if (req.query.companyId) {
				query.companyId = req.query.companyId;
			}
			if (req.query.status) {
				query.status = req.query.status;
			}

			const cursor = jobsCollection.find(query);
			const result = await cursor.toArray();
			res.json(result);
		});

		// Get Job By ID
		app.get("/api/jobs/:id", async (req, res) => {
			const id = req.params.id;
			const query = {
				_id: new ObjectId(id),
			};
			const result = await jobsCollection.findOne(query);
			console.log(result);
			res.json(result);
		});

		// New job creating API
		app.post("/api/jobs", async (req, res) => {
			const jobData = req.body;
			const newJobData = {
				...jobData,
				createdAt: new Date(),
			};
			const result = await jobsCollection.insertOne(newJobData);
			res.json(result);
		});

		/* Company related APIs */
		// Get company data
		app.get("/api/my/companies", async (req, res) => {
			const query = {};
			if (req.query.recruiterId) {
				query.recruiterId = req.query.recruiterId;
			}
			const result = await companyCollection.findOne(query);

			res.send(result || {});
		});

		// Register a company api
		app.post("/api/companies", async (req, res) => {
			const companyData = req.body;
			const newCompanyData = {
				...companyData,
				createdAt: new Date(),
			};
			const result = await companyCollection.insertOne(newCompanyData);
			res.json(result);
		});

		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!",
		);
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.json("Hireloop Server is Running!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
