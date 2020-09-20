const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://api:YaMFtPQuP8C2ObW2@cluster0.u5xks.mongodb.net/TreasureIsland?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let database;
client.connect().then(db => database = db)

/*
client.connect(err => {
    const collection = client.db("TreasureIsland").collection('inventory').find().toArray((err, res) => {
        console.log(res)
    });
    // perform actions on the collection object
    client.close();
});
*/

module.exports = class DbWrapper {
    static getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            database.db('TreasureIsland').collection('inventory')
                .find({username: username})
                .toArray((err, res) => {
                if(err)
                    reject(err)
                resolve(res);
            });
        })
    }

    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            database.db('TreasureIsland').collection('inventory')
                .find({email: email})
                .toArray((err, res) => {
                if(err)
                    reject(err)
                resolve(res);
            });
        })
    }

    static async insertUser({username, pwHash, email}) {
        return new Promise((resolve, reject) => {
            database.db('TreasureIsland').collection('inventory')
                    .insertOne(
                        {
                            username: username,
                            pwHash: pwHash,
                            email: email
                        }, (err) => {
                            if(err)
                                reject(err)
                            resolve()
                    }
            );
        });
    }
}