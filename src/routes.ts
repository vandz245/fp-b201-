import { Express, Request, Response } from "express";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/review.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/review.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {

   /**
   * @openapi
   * /check:
   *  get:
   *     tags:
   *     - Check
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/check", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register an account
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateUserResponse'
   *       409:
   *         description: Conflict
   *       400:
   *         description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Log in your account
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  /**
   * @openapi
   * '/api/sessions':
   *  get:
   *     tags:
   *     - Session
   *     summary: Get the detail the account's login session
   *     security:
   *      - bearerAuth: []
   *     parameters:
   *      - name: x-refresh
   *        in: header
   *        description: Header containing refreshToken
   *        required: true
   *        style: simple
   *        schema:
   *          type: string
   *          example: <refreshToken will be set when you create a session>
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Session'
   *       401:
   *         description: Access token is missing or invalid
   *       403:
   *         description: Forbidden
   */
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  /**
   * @openapi
   * '/api/sessions':
   *  delete:
   *     tags:
   *     - Session
   *     summary: Log out the account
   *     security:
   *      - bearerAuth: []
   *     parameters:
   *      - name: x-refresh
   *        in: header
   *        description: Header containing refreshToken
   *        required: true
   *        style: simple
   *        schema:
   *          type: string
   *          example: <refreshToken will be set when you create a session>
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/DeleteSessionResponse'
   *       401:
   *         description: Access token is missing or invalid
   *       403:
   *         description: Forbidden
   */
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  /**
   * @openapi
   * '/api/products':
   *  post:
   *     tags:
   *     - Review
   *     summary: Post your review
   *     security:
   *      - bearerAuth: []
   *     parameters:
   *      - name: x-refresh
   *        in: header
   *        description: Header containing refreshToken
   *        required: true
   *        style: simple
   *        schema:
   *          type: string
   *          example: <refreshToken will be set when you create a session>
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateReviewInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateReviewResponse'
   *       401:
   *         description: Access token is missing or invalid
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Review not found
   */
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  put:
   *     tags:
   *     - Review
   *     summary: Update your review
   *     security:
   *      - bearerAuth: []
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the review
   *        required: true
   *      - name: x-refresh
   *        in: header
   *        description: Header containing refreshToken
   *        required: true
   *        style: simple
   *        schema:
   *          type: string
   *          example: <refreshToken will be set when you create a session>
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateReviewInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UpdateReviewResponse'
   *       401:
   *         description: Access token is missing or invalid
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Review not found
   */
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Review
   *     summary: Get specific review by the its Id
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the review
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Review'
   *       404:
   *         description: Review not found
   */
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  delete:
   *     tags:
   *     - Review
   *     summary: Delete specific review by its Id
   *     security:
   *      - bearerAuth: []
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the review
   *        required: true
   *      - name: x-refresh
   *        in: header
   *        description: Header containing refreshToken
   *        required: true
   *        style: simple
   *        schema:
   *          type: string
   *          example: <refreshToken will be set when you create a session>
   *     responses:
   *       200:
   *         description: Success
   *       401:
   *         description: Access token is missing or invalid
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Review not found
   */
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
