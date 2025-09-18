import { z } from 'zod'

export const ClientSchema = z.object({
    id: z.number().or(z.string()),
    name: z.string(),
    address: z.string(),
    numberPhone: z.number().or(z.string()),
    cedula: z.number()
});


export type ClientType = z.infer<typeof ClientSchema>;