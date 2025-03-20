import { ClassificationResponse, ObesityLevel } from './services/ApiService'

import { Heading } from '@radix-ui/themes'

export function Results({result}: {result: ClassificationResponse}) {

    return (<>
        <Heading>
            {resultText(result.level)}
        </Heading>
    </>)
}

function resultText(level: ObesityLevel) {
    switch(level) {
        case "insufficient_weight": return "Insufficient weight"
        case "normal_weight":       return "Normal weight"
        case "overweight_level_1":  return "Overweight (Level 1)"
        case "overweight_level_2":  return "Overweight (Level 2)"
        case "obesity_type_1":      return "Type 1 Obesity"
        case "obesity_type_2":      return "Type 2 Obesity"
        case "obesity_type_3":      return "Type 3 Obesity"
        default:                    return "Unknown"
    }
}
