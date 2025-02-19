import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribe to event",
        tags: ["subscriptions"],
        description: "Subscribe to event by providing your email address",
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body;
      return reply.status(201).send({ email });
    }
  );
};
