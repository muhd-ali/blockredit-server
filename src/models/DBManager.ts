import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient
const dbUrl = 'mongodb://venom:abc321456321@ds151416.mlab.com:51416/blockredit'

type useDBType = (dbo: mongodb.Db) => Promise<any>

class DBManager {
  public url: string
  constructor(url: string) {
    this.url = url
  }

  public connectAndUseDBObject<T>(useDB: useDBType) {
    return new Promise<T>((resolve, reject) => {
      MongoClient.connect(
        this.url,
        { useNewUrlParser: true },
        (err, db) => {
          if (err) { throw err }
          const dbo = db.db('blockredit')
          useDB(dbo)
            .then((response) => resolve(response))
            .catch((error) => reject(error))
            .finally(() => {
              db.close()
            })
        },
      )
    })
  }
}

export const dbManager = new DBManager(dbUrl)
