import { Validator } from "./form";

let i18n;

export function initValidatorsLocales(vueI18n) {
    i18n = vueI18n;
}

export const custom = (func: Validator) => (value, fields, rootState, rootGetters) => {
    return func(value, fields, rootState, rootGetters);
}


export const required = (): Validator => (value) => {
    if (value === "" || value === 0 || value === undefined || value === null || value === false)  {
        return i18n.t("validators.required");
    }
}

export const length = (length: number): Validator => (value) => {
    if (value.length !== length) {
        return i18n.t("validators.length", { length });
    }
}

export const minLength = (min: number): Validator => (value) => {
    if (value.length < min) {
        return i18n.t("validators.minLength", { min });
    }
}

export const maxLength = (max: number): Validator => (value) => {
    if (value.length > max) {
        return i18n.t("validators.maxLength", { max });
    }
}

export const minValue = (min: number | string): Validator => (value: string) => {
    if (Number(value) < min) {
        return i18n.t("validators.minValue", { min });
    }
}

export const maxValue = (max: number): Validator => (value: string) => {
    if (Number(value) > max) {
        return i18n.t("validators.maxValue", { max });
    }
}

export const letters = (): Validator => (value: string) => {
    if (!/^[A-Za-zА-Яа-яЁё]*$/.test(value)) {
        return i18n.t("validators.letters");
    }
}

export const digits = (): Validator => (value: string) => {
    if (!/^[0-9]*$/.test(value)) {
        return i18n.t("validators.digits");
    }
}

export const alpha = (): Validator => (value: string) => {
    if (!/^[a-zA-Z]*$/.test(value)) {
        return i18n.t("validators.alpha");
    }
}

export const alphanumeric = (): Validator => (value: string) => {
    if (!/^[a-zA-Z0-9_]*$/.test(value)) {
        return i18n.t("validators.alphanumeric");
    }
}

export const float = (): Validator => (value: string) => {
    if (!/^\d+((\.|,)\d+)?$/.test(value)) {
        return i18n.t("validators.float");
    }
}

export const email = (): Validator => (value: string) => {
    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)) {
        return i18n.t("validators.email");
    }
}

export const url = (): Validator => (value: string) => {
    if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(value)) {
        return i18n.t("validators.url");
    }
}

export const sameAs = (field: string, label?: string): Validator => (value: string, fields) => {
    if (value !== fields[field]) {
        return i18n.t("validators.sameAs", { label:  label || field });
    }
}

export const notSameAs = (field: string, label?: string): Validator => (value: string, fields) => {
    if (value === fields[field]) {
        return i18n.t("validators.notSameAs", { label:  label || field });
    }
}

export const when = (condition: (value, fields, rootState, rootGetters) => boolean, func: Validator) => (value, fields, rootState, rootGetters) => {
    if (condition(value, fields, rootState, rootGetters)) {
        return func(value, fields, rootState, rootGetters);
    }
}

