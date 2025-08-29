import { z } from 'zod'

const ClientSchema = z.object({
    id: z.number().or(z.string()),
    name: z.string(),
    address: z.string(),
    phone: z.number().or(z.string()),
});


export type ClientType = z.infer<typeof ClientSchema>;