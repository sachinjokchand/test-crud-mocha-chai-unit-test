//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Product = require('../src/models/product');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/index');
let should = chai.should();


chai.use(chaiHttp);

describe("Products", function(){
    describe ("DELETE ALL", function(){
        it("should remove all first", done=>{
            console.log ("Deleting all data in db first.")
            chai.request(server)
                .delete("/api/product/delete")
                .end((err,res)=>{
                    res.should.have.status(200);
                    console.log("Response Body:", res.body);
                    done()
                })
        })
    })

    describe ("CRUD OPERATIONS", function(){

        var products = [{
            "productName": "test 1",
            "price": "120",
            "description": "test product description",
            "_id": "61ac8c60388d77d8a08aaa92",
        }, {
            "productName": "test 2",
            "price": "130",
            "description": "test2 product description",
            "_id": "61ac8c89388d77d8a08aaa95",

        }];
        it("Should add product in DB", (done) => {
            for (product in products) {
                chai.request(server)
                    .post("/api/product/create")
                    .send(products[product])
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log("Response Body:", res.body);
                    })
            }
            done()
        })

        it ("Should Fecth all the products", (done)=>{
            chai.request(server)
                .get("/api/product/list")
                .end((err, result)=>{
                    result.should.have.status(200);
                    console.log ("list product",result.body.data.length, " docs")
                    //console.log ("Result Body:", result.body);
                    
                    done()
                })
        })

        it ("Should Update Partcular Product Only", (done)=>{
            var updatedProduct = {
                "productName": "test 2",
                "price": "130",
                "description": "test2 product description",
                "_id": "61ac8c89388d77d8a08aaa95",
            }
            
            chai.request(server)
                .put("/api/product/"+products[1]._id)
                .send(updatedProduct)
                .end((err, result)=>{                    
                    result.should.have.status(200)
                    console.log("Updated Particlar Product using /GET/Product/:Product_id ::::", result.body)
                    done()
                })
        })

        it("Should Delete Particular Product", (done)=>{
            chai.request(server)
                .delete("/api/product/delete/"+products[1]._id)
                .end((err, result)=>{                    
                    result.should.have.status(200)                
                    console.log("Deleted Particlar Product using /GET/Product/:Product_id ::::", result.body)    
                    done()
                })
        })
    });
});
