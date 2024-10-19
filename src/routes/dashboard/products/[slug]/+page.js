import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.slug === 'hello-world') {
        error(404, 'Not found');
	}

    return {
        slug: params.slug,
    };
}