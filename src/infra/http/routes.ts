import { Router } from "express";

import { WhatsappRoutes } from "@/modules/whatsapp/infra/http/routes/whatsapp.routes";
import { CompaniesRoutes } from "@/modules/companies/infra/http/routes/companies.routes";

const routes = Router();

routes.use("/companies", new CompaniesRoutes().router);
routes.use("/whatsapp", new WhatsappRoutes().router);

export { routes };
