import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types"
import { jsonc } from "jsonc"

export const load: PageLoad = async ({ params }) => {
	const module = import.meta.glob(`../../../lib/data/*.jsonc`, { eager: true, as: "raw" })
	const filteredModule = Object.entries(module).find(([key]) => {
		const folder = key.split('/')[5]
		return folder.includes(params.name)
	})

    if (!filteredModule) {
        throw error(404, 'Not found')
    }

	return {
		json: jsonc.parse(filteredModule[1])
	};
};