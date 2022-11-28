import dayjs from "dayjs";

export const formatDateTime = (str, split = "YYYY-MM-DD") => {
    const d = dayjs(str);
    if (d.isValid()) {
        return d.format(split)
    } else {
        return "";
    }
}