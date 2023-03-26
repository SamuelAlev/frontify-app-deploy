function readPackage(pkg) {
    if (pkg.name === '@frontify/fondue') {
        pkg.dependencies = {
            ...pkg.dependencies,
            scheduler: '>=0.19.0',
        };
    }

    return pkg;
}

module.exports = {
    hooks: {
        readPackage,
    },
};
