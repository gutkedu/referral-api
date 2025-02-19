import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to event',
        tags: ['subscriptions'],
        description: 'Subscribe to event by providing your email address',
        body: z.object({
          email: z.string().email(),
          name: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, name } = request.body

      const { subscriberId } = await subscribeToEvent({
        email,
        name,
      })

      return reply.status(201).send({ subscriberId })
    }
  )
}
