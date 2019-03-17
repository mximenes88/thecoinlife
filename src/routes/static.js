const staticController = require("../controllers/staticController");

router.get("/", staticController.index);