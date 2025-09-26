import { z } from "zod";

export const ToolsSchema = z.object({
    id: z.string(),
    name: z.string(),
    disponibility: z.number(),
});


export const ToolsToList = ToolsSchema.pick({
    id: true,
    name: true,
}).extend({
    quantity: z.number(),
})


export type ToolsType = z.infer<typeof ToolsSchema>
export type ToolsToListType = z.infer<typeof ToolsToList>