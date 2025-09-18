import { numberPattern } from "@/Patterns/formsPatterns";

export function isNumber(value: string | number) {

    if (numberPattern.reGex.test(value.toString())) {
        return true
    }
    return false
}