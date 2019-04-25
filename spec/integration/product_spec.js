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

      describe("POST /products/:id/destroy", () => {

        it("should delete the product with the associated ID", (done) => {
          expect(product.id).toBe(1);
   
          request.post(`${base}/products/${this.product.id}/destroy`, (err, res, body) => {
            Product.findById(1)
            .then((product) => {
              expect(err).toBeNull();
              expect(product).toBeNull();
              done();
            })
          });
   
        });
   
      });

      describe("GET /products/:id/edit", () => {
        it("should render a view with an edit post form", (done) => {
          request.get(`${base}/products/${this.product.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Edit Product");
            expect(body).toContain("Italian Lire");
            done();
          });
        });
   
      });

      describe("POST /products/:id/update", () => {

        it("should return a status code 302", (done) => {
          request.post({
            url: `${base}/products/${this.product.id}/update`,
            form: {
              name: "Dollar",
              description: "American Money",
              price:10
            }
          }, (err, res, body) => {
            expect(res.statusCode).toBe(302);
            done();
          });
        });
   
        it("should update the product with the given values", (done) => {
            const options = {
              url: `${base}/products/${this.product.id}/update`,
              form: {
                title: "Dollar"
              }
            };
            request.product(options,
              (err, res, body) => {
   
              expect(err).toBeNull();
   
              Product.findOne({
                where: {id: this.product.id}
              })
              .then((product) => {
                expect(product.title).toBe("Dollar");
                done();
              });
            });
        });
   
      });

  });

