export const calculatePaginationData = (count, perPage, page) => {
    const totalPages = Math.ceil(count / perPage);
    const hasPrevPage = Boolean(page > 1);
    const hasNextPage = Boolean(page < totalPages);

    return {
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasNextPage,
        hasPrevPage,
    };
};
