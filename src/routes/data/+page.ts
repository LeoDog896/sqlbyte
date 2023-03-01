import type { PageLoad } from "./$types"

export const load: PageLoad = async () => {
	const modules = import.meta.glob(`../../lib/data/*.jsonc`, { eager: true, as: 'raw' })

    return {
        modules
    };
};