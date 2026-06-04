const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const { MongoClient, ServerApiVersion } = require("mongodb");
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

		// New job creating API
		app.post("/api/jobs", async (req, res) => {
			const jobData = req.body;
			const result = await jobsCollection.insertOne(jobData);
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
