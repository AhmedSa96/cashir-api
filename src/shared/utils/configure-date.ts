import moment from "moment";

export function configureDate(date?: Date | string): moment.Moment | null {
    const value = moment(date ?? null);

    return value.isValid() ? value : null;
}