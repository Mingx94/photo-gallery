import type { Config } from '@sveltejs/adapter-vercel';
import type { RequestHandler } from '@sveltejs/kit';
// @ts-expect-error - This is a workaround for a bug in the SvelteKit type definitions
import { requestHandler } from 'sveltekit-image/api';

export const config: Config = {
	runtime: 'nodejs18.x'
};

export const GET: RequestHandler = requestHandler({
	leadingUrl:
		process.env.NODE_ENV === 'production'
			? 'https://coding-shutter.blog'
			: 'http://127.0.0.1:5173',
	avif: false,
	remoteDomains: ['live.staticflickr.com'],
	allowedDomains: ['live.staticflickr.com'],
	ttl: 1000 * 60 * 60 * 24 * 7,
	storePath: '.svelte-kit/images'
}) satisfies RequestHandler;
