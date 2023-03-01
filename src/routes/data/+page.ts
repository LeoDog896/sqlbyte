import type { PageLoad } from "./$types"

export const load: PageLoad = async () => {
	const modules = import.meta.glob(`../../lib/data/*.jsonc`, { eager: true, as: 'raw' })

    const moduleNames = Object.keys(modules).map(module => {
        const splitArr = module.split("/")
        const value = splitArr[splitArr.length - 1].split(".")[0]
        return value
    })

    return {
        moduleNames
    };
};