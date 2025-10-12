import z from "zod";

export const LoanSchema = z.object({
    cedula: z.number().or(z.string()),
    clientName: z.string(),
    date: z.string(),
    equipmentName: z.array(z.string()),
    promissoryNoteId: z.number()
})

export const LoanFormSchema = z.object({
    clientId: z.number().or(z.string()),
    deliveryCedula: z.number().or(z.string()),
    deposit: z.number().or(z.string()),
    delivery: z.object({
        name: z.string(),
        phoneNumber: z.string(),
        cedula: z.number().or(z.string())
    }).optional(),
    deliveryPrice: z.number().or(z.string()),
    comments: z.string(),
    equipmentIds: z.record(z.string(), z.number()),
    date: z.string().or(z.date()),
})

export const LoanByIdSchema = z.object({
    clientCedula: z.number(),
    clientName: z.string(),
    addressClient: z.string(),
    numberPhone: z.string(),
    deliveryName: z.string(),
    deliveryDate: z.date().or(z.string()),
    deliveryReturn: z.null(),
    deposit: z.number(),
    deliveryPrice: z.number(),
    loanEquipments: z.array(z.array(z.string())),
    totalDays: z.string().or(z.null()),
    total: z.number().or(z.null()),
    comments: z.string(),
});


export type LoanType = z.infer<typeof LoanSchema>;
export type LoanFormType = z.infer<typeof LoanFormSchema>;
export type LoanByIdType = z.infer<typeof LoanByIdSchema>;
