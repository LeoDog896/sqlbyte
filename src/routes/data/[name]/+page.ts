import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types"
import JSON5 from 'json5'

export const load: PageLoad = async ({ params }) => {
	const module = await import(`../../../lib/data/${params.name}.jsonc?raw`)

    if (!module.default) {
        throw error(404, 'Not found')
    }

    try {
        return {
            json: JSON5.parse(module.default)
        };
    } catch (e) {
        throw error(500, 'Internal Server Error: ' + e)
    }
};