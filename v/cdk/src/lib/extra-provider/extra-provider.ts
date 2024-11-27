import { ExtraToken } from './models/extra-token';


export class ExtraProvider {

    #extraList = new Map<ExtraToken<unknown>, unknown>();

    set<T>(token: ExtraToken<T>, value: T) {
        this.#extraList.set(token, value);
    }

    get<T = unknown>(token: ExtraToken<T>, defaultValue = null): T | null {
        if (this.#extraList.has(token)) {
            return this.#extraList.get(token) as T | null;;
        }
        return defaultValue as T | null;
    }

}
