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
const { skip } = require("node:test");
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
		const applicationsCollection = database.collection("applications");
		const planCollection = database.collection("plans");
		const subscriptionCollection = database.collection("subscriptions");
		const usersCollection = database.collection("user");

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

		/* Job Applications Related */
		// Get applications data
		app.get("/api/applications", async (req, res) => {
			const query = {};
			if (req.query.applicantId) {
				query.applicantId = req.query.applicantId;
			}
			if (req.query.jobId) {
				query.jobId = req.query.jobId;
			}
			const cursor = applicationsCollection.find(query);
			const result = await cursor.toArray();
			res.json(result);
		});

		// Create new job application
		app.post("/api/applications", async (req, res) => {
			const application = req.body;
			const newApplication = {
				...application,
				createdAt: new Date(),
			};

			const result =
				await applicationsCollection.insertOne(newApplication);
			res.json(result);
		});

		/* Company related APIs */
		// Get my company data
		app.get("/api/my/companies", async (req, res) => {
			const query = {};
			if (req.query.recruiterId) {
				query.recruiterId = req.query.recruiterId;
			}
			const result = await companyCollection.findOne(query);

			res.send(result || {});
		});

		// app.get("/api/companies/advance", async (req, res) => {
		// 	const pipeline = [{ $skip: 5 }, { $limit: 2 }];
		// 	const cursor = companyCollection.aggregate(pipeline);
		// 	const result = await cursor.toArray();
		// 	res.json(result);
		// });

		app.get("/api/companies", async (req, res) => {
			const cursor = await companyCollection.find();
			const companies = await cursor.toArray();

			for (const company of companies) {
				const filter = {
					companyId: company._id.toString(),
				};
				const jobCount = await jobsCollection.countDocuments(filter);
				company.jobCount = jobCount;
			}
			res.json(companies);
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

		// Update company status
		app.patch("/api/companies/:id", async (req, res) => {
			const { id } = req.params;
			const updatedCompany = req.body;
			const filter = {
				_id: new ObjectId(id),
			};
			const updatedStatus = {
				$set: {
					status: updatedCompany.status,
				},
			};

			const result = await companyCollection.updateOne(
				filter,
				updatedStatus,
			);

			res.json(result);
		});

		/* Plan Collection related APIs */
		app.get("/api/plans", async (req, res) => {
			const query = {};
			if (req.query.planId) {
				query.planId = req.query.planId;
			}
			const result = await planCollection.findOne(query);
			res.json(result);
		});

		/* Subscription & Update User Plan related APIs */
		app.post("/api/subscriptions", async (req, res) => {
			const subscriptionData = req.body;
			const subsNewData = {
				...subscriptionData,
				createdAt: new Date(),
			};
			const result = await subscriptionCollection.insertOne(subsNewData);

			// Update User Plan
			const filter = { email: subscriptionData.email };
			const updatePlan = {
				$set: {
					plan: subscriptionData.planId,
				},
			};

			const updatePlanResult = await usersCollection.updateOne(
				filter,
				updatePlan,
			);

			res.json(updatePlanResult);
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
