import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types"
import JSON5 from 'json5'

export const load: PageLoad = async ({ params }) => {
    try {
        const module = await import(`../../../lib/data/${params.name}.jsonc?raw`)

        return {
            json: JSON5.parse(module.default),
            name: params.name
        };
    } catch (e) {
        throw error(500, 'Internal Server Error: ' + e)
    }
};