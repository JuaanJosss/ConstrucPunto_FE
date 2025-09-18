import { addressPattern, justLettersPattern, numberPattern } from "@/Patterns/formsPatterns"

export const requiredValidator = {
    value: true,
    message: "Este campo es obligatorio",
}

export const minValidator = {
    value: 1,
    message: 'El valor no debe ser menor a 1'
}

export const numberPatternValidator = {
    value: numberPattern.reGex,
    message: numberPattern.message
}

export const addressPatternValidator = {
    value: addressPattern.reGex,
    message: addressPattern.message
}


export const onlyLettersPatternValidator = {
    value: justLettersPattern.reGex,
    message: justLettersPattern.message
}