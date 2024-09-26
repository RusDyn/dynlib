import { clsx } from 'clsx';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
export function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}
// Define the guard function
export function deleteForbiddenFields(data, forbiddenFields) {
    for (var _i = 0, forbiddenFields_1 = forbiddenFields; _i < forbiddenFields_1.length; _i++) {
        var field = forbiddenFields_1[_i];
        if (field in data) {
            delete data[field];
        }
    }
}
export var processError = function (error) {
    if (error.code === 404) {
        return notFound();
    }
    throw new Error(error.error);
};
export function extractFormData(formData, booleanKeys, arrayKeys) {
    var data = {};
    formData.forEach(function (value, key) {
        // Assuming T is an object with string keys
        var typedKey = key;
        // write info about t2
        if (booleanKeys.includes(typedKey)) {
            // Convert string to boolean
            data[typedKey] = (value === 'true');
        }
        else if (arrayKeys.includes(typedKey)) {
            // Convert comma-separated string to an array
            data[typedKey] = value.split(',');
        }
        else {
            // Default to treating the value as a string
            data[typedKey] = value;
        }
    });
    return data;
}
