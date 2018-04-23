//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "Bamazon" 
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connection yeah");
    makeTable();
})

var makeTable = function(){
    connection.query("SELECT * FROM Products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].ItemID+" || "+res[i].ProductName+" || "+
                res[i].DepartmentName+" || "+res[i].Price+" || "+res[i].StockQuantity+"\n");
        }
    promptCustomer(res);
    })
}

var promptCustomer = function(res){
    inquirer.prompt([{
        type:'input',
        name:'choice',
        message:"What would you like to purchase? [Quit with Q]"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exit()
        }
        for(var i=0;i<res.length;i++){
            if(res[i].ProductName==answer.choice){
                correct=true;
                var product=answer.choice;
                var id=i;
                inquirer.prompt({
                    type:"input",
                    name:"quant",
                    message:"How many would you like to purchase?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].StockQuantity-answer.quant)>0){
                        connection.query("UPDATE products SET stockquantity='"+(res[id].StockQuantity-answer.quant)+"' WHERE ProductName='"+product+"'",function(err,res2){
                            console.log("Great Buy! You have successfully purchased the product");
                            makeTable();
                        })
                    } else {
                        console.log("Sorry, there is not enough in stock. Try a different quantity.");
                        promptCustomer(res);
                    }
                })
            }
        }
        if(i==res.length && correct==false){
            console.log("Not a valid selection!");
            promptCustomer(res);
    }    
    })
}
    
    