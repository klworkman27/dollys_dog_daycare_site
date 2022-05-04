from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps

#Create a engine for connecting to SQLite3.
#Assuming salaries.db is in your app root folder

e = create_engine('sqlite:///../database/dog-daycare.db')

app = Flask(__name__)
api = Api(app)

class All_Owners(Resource):
    def get(self):
        #Connect to databse
        conn = e.connect()
        #Perform query and return JSON data
        query = conn.execute("select * from Owner")
        return [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]

class All_Pets_Of_Owner(Resource):
    def get(self, owner_id):
        conn = e.connect()
        query = conn.execute("select * from Pet where ownerId='%s'"%owner_id)
        #Query the result and get cursor.Dumping that data to a JSON is looked by extension
        result = [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]
        return result
        #We can have PUT,DELETE,POST here. But in our API GET implementation is sufficient

class Insert_Pet(Resource):
    def get(self, owner_id):
        args = request.args
        name = args.get('name')
        breed = args.get('breed')
        gender = args.get('gender')

        conn = e.connect()
        statement = "insert into Pet(name, breed, gender, ownerId) VALUES (?, ?, ?, ?)"
        conn.execute(statement, [name, breed, gender, owner_id])
        # conn.commit()
        return 'Pet Added.'
 
api.add_resource(All_Owners, '/getAllOwners')
api.add_resource(All_Pets_Of_Owner, '/getPetsOfOwner/<owner_id>')
api.add_resource(Insert_Pet, '/insertpet/<owner_id>')

"""
Enable CORS.
"""
@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*" # <- You can change "*" for a domain for example "http://localhost"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response

if __name__ == '__main__':
     app.run()