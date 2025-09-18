import { z } from "zod";


export const EquipmentSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    unitPrice: z.number(),
    description: z.string().optional(),
    quantity: z.number(),
    total: z.number()
});


export const EquipmentToList = EquipmentSchema.pick({
    id: true,
    name: true,
    unitPrice: true
}).extend({
    quantity: z.number(),
})

export interface EquipsEdited {
    id: string;
    name: string;
    returns: string
}



export type EquipmentType = z.infer<typeof EquipmentSchema>
export type EquipmentTypeToListType = z.infer<typeof EquipmentToList>