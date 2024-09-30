const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(cors());

//user:divyaakkim3
//password:gnLk6aUm08kzEwn0

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@task-demo.reybnxw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //Create DB

    const db = client.db("mernTaskportal");
    const taskCollection = db.collection("demotasks");

    //Post a task
    app.post("/post-task", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      const result = await taskCollection.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Can not insert! try again later",
          status: false,
        });
      }
    });

    //get all tasks

    app.get("/all-tasks", async (req, res) => {
      const tasks = await taskCollection.find({}).toArray();
      res.send(tasks);
    });

    //get tasks by email
    app.get("/myTasks/:email", async (req, res) => {
      const tasks = await taskCollection
        .find({ postedFor: req.params.email })
        .toArray();
      res.send(tasks);
      //console.log(req.params.email)
    });

    //get single task

    app.get("/all-tasks/:id", async (req, res) => {
      const id = req.params.id;
      const task = await taskCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(task);
    });

    //Delete a task
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {
        _id: new ObjectId(id),
      };
      const result = await taskCollection.deleteOne(filter);
      res.send(result);
    });

    //UPdate tasks
    app.patch("/update-task/:id", async (req, res) => {
      const id = req.params.id;
      const taskData = req.body;
      const filter = {
        _id: new ObjectId(id),
      };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...taskData,
        },
      };
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Update time spent on a task
    app.patch("/update-time/:id", async (req, res) => {
      const id = req.params.id;
      const { timeSpent } = req.body; // Get timeSpent from request body
      const filter = {
        _id: new ObjectId(id),
      };
      const updateDoc = {
        $set: {
          timeSpent: timeSpent, // Update the timeSpent field
        },
      };
      const result = await taskCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
