var faker = require("faker");

console.log("==================");
console.log("WELCOME TO MY SHOP");
console.log("==================");

faker.locale = "cz";
for (let i = 0; i < 10; i++) {
    // console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
    console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
}
