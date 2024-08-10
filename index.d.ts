declare module 'nuxt-storage/local-storage' {
    export interface Data {
        created: number;
        updated: number;
        value: any;
        expiry: number;
        unit: unit;
    }
    export function setData(ket: string, value: string);
    export function getData(key: string, withMeta?: boolean): any | Data;
    export function setData(
        key: string,
        value: Record<string, any>,
        expiryInMinutes?: number,
        expiryUnit?: string
    ): void;

}
