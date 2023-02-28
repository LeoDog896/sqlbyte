import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types"
import JSON5 from 'json5'

export const load: PageLoad = async ({ params }) => {
	const module = import.meta.glob(`../../../lib/data/*.jsonc`, { eager: true, as: "raw" })
	const filteredModule = Object.entries(module).find(([key]) => {
		const folder = key.split('/')[5]
		return folder.includes(params.name)
	})

    if (!filteredModule) {
        throw error(404, 'Not found')
    }

    try {
        return {
            json: JSON5.parse(filteredModule[1])
        };
    } catch (e) {
        throw error(500, 'Internal Server Error: ' + e)
    }
};