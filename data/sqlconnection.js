var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
TYPES = require('tedious').TYPES;
var PersonIdCount = Math.floor(Math.random() * 100000);;

module.exports = {
    
    insertRow: function(name, balance) {
        // Create connection to database
        var config = {
            userName: 'tpan', // update me
            password: 'Tp2535989', // update me
            server: 'somi.database.windows.net', // update me
            options: {
                encrypt: true, database: 'somi' //update me
            }
        }

        var connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function(err) {
            if (err) {
                console.log(err)
            }
            else{
                insertIntoDatabase()
            }
        });

        function insertIntoDatabase(){
        var request = new Request("INSERT INTO Users (PersonId, Name, Balance) VALUES (@personid, @pname, @pbalance)",
            function(err){
                if(err){
                    console.log(err);
                };
            });

            PersonIdCount++;
            request.addParameter('personid', TYPES.Int, PersonIdCount);
            request.addParameter('pname', TYPES.NVarChar, name);
            request.addParameter('pbalance', TYPES.Decimal, balance);

            connection.execSql(request);
        };
    },
    
    readRow: function(name) {
        // Create connection to database
        var config = {
            userName: 'tpan', // update me
            password: 'Tp2535989', // update me
            server: 'somi.database.windows.net', // update me
            options: {
                encrypt: true, database: 'somi' //update me
            }
        }
        var connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function(err) {
            if (err) {
                console.log(err)
            }
            else{
                queryDatabase()
            }
        });

        function queryDatabase(){
            console.log('Reading rows from the Table...');

            // Read all rows from table
            request = new Request(
                "SELECT Users.Balance WHERE Users.Name = @pname",
                function(err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                }
            );

            request.addParameter('pname', TYPES.NVarChar, name);

            request.on('row', function(columns) {
                columns.forEach(function(column) {
                    console.log("Balance: %f", "column.value");
                });
            });

            connection.execSql(request);
        }
    }
    /*
    updaterow: function() {
        // Create connection to database
        var config = {
            userName: 'tpan', // update me
            password: 'Tp2535989', // update me
            server: 'somi.database.windows.net', // update me
            options: {
                encrypt: true, database: 'somi' //update me
            }
        }

        var connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function(err) {
            if (err) {
                console.log(err)
            }
            else{
                updateInDatabase()
            }
        });

        function updateInDatabase(){
            console.log("Updating the price of the brand new product in database...");
            request = new Request(
                "UPDATE SalesLT.Product SET ListPrice = 50 WHERE Name = 'BrandNewProduct'",
                function(err, rowCount, rows) {
                    console.log(rowCount + ' row(s) updated');
                }
            );
            connection.execSql(request);
        }
    }
    */
}