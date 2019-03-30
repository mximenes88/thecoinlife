const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Product = require("../../src/db/models").Product;

describe("routes : products", () => {

  beforeEach((done) => {
    this.product;

    sequelize.sync({force: true}).then((res) => {

       Product.create({
        name: "Italian lire",
        description: "10 lire of 1998",
        price:100
      })
      .then((product) => {
        this.product = product;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

    describe("GET /products/new", () => {
        it("should render a new product upload form", (done) => {
          request.get(`${base}/products/new`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("New Product");
            done();
          });
        });
    
      });

      describe("POST /products/create", () => {

        it("should create a new product and redirect", (done) => {
           const options = {
             url: `${base}/products/create`,
             form: {
                name: "Italian lire",
                description: "10 lire of 1998",
                price:100
             }
           };
           request.product(options,
             (err, res, body) => {
               Product.findOne({where: {name: "Italian lire"}})
               .then((product) => {
                 expect(product).not.toBeNull();
                 expect(product.name).toBe("Italian lire");
                 expect(product.description).toBe("10 lire of 1998");
                 expect(product.price).toBe(100);
                 done();
               })
               .catch((err) => {
                 console.log(err);
                 done();
               });
             }
           );
         });
     
      });

  });
