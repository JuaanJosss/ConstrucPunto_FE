import { addressPattern, documentPattern, justLettersPattern, numberPattern } from "@/Patterns/formsPatterns"
import type { ValidationRule } from "react-hook-form"


export const requiredValidator: ValidationRule<boolean> = {
    value: true,
    message: "Este campo es obligatorio",
}

export const minValidator: ValidationRule<number> = {
    value: 1,
    message: 'El valor no debe ser menor a 1'
}

export const numberPatternValidator: ValidationRule<RegExp> = {
    value: numberPattern.reGex,
    message: numberPattern.message
}

export const addressPatternValidator: ValidationRule<RegExp> = {
    value: addressPattern.reGex,
    message: addressPattern.message
}


export const onlyLettersPatternValidator: ValidationRule<RegExp> = {
    value: justLettersPattern.reGex,
    message: justLettersPattern.message
}

export const documentValidator: ValidationRule<RegExp> = {
    value: documentPattern.reGex,
    message: documentPattern.message
}