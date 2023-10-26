import { environment } from "src/environments/environment.development"

export const imagePath = (): string => {
    return environment.url
}