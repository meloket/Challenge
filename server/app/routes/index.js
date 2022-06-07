import * as dataController from "../controllers/data.controller.js";

export function init (app) {
  app.get("/", dataController.getAll);
  app.post("/add", (req, res) => dataController.add(req, res));
  app.post("/remove", dataController.remove);
};
