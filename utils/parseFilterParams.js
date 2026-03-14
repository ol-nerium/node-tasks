// const parseGender = (gender) => {
//     const isString = typeof gender === 'string';
//     if (!isString) return;

//     const isGender = ['male', 'female', 'other'].includes(gender);

//     if (isGender) return gender;
// };

// const parseNumber = (number) => {
//     const isString = typeof number === 'string';
//     if (!isString) return;
//     const parsedNumber = parseInt(number);
//     if (Number.isNaN(parsedNumber)) return;
//     return parsedNumber;
// };

// export const parseFilterParams = (query) => {
//     const { gender, maxAge, minAge, maxAvgMark, minAvgMark } = query;
//     const parsedGender = parseGender(gender);
//     const parsedMaxAge = parseNumber(maxAge);
//     const parsedMinAge = parseNumber(minAge);
//     const parsedMaxAvgMark = parseNumber(maxAvgMark);
//     const parsedMinAvgMark = parseNumber(minAvgMark);

//     return {
//         gender: parsedGender,
//         maxAge: parsedMaxAge,
//         minAge: parsedMinAge,
//         maxAvgMark: parsedMaxAvgMark,
//         minAvgMark: parsedMinAvgMark,
//     };
// };

const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;

    if (['work', 'home', 'personal'].includes(type)) return type;
};

const parseIsFavourite = (isFavorite) => {
    const isString = typeof isFavorite === 'string';
    if (!isString) return;

    if (['true', 'false'].includes(isFavorite)) return isFavorite;
};

export const parseFilterParams = (query) => {
    const { isFavourite, type } = query;

    const parsedIsFavourite = parseIsFavourite(isFavourite);
    const parsedType = parseType(type);

    return {
        isFavourite: parsedIsFavourite,
        type: parsedType,
    };
};
