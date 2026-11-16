import type { PageLoad } from './$types';
import { generateWgKeyPair } from '#lib/key.ts';

export const ssr = false;

export const load: PageLoad = async () => {
	try {
		const keyPair = await window.crypto.subtle.generateKey({ name: 'X25519' }, true, [
			'deriveBits'
		]);

		return generateWgKeyPair(keyPair);
	} catch (err) {
		console.error(err);
	}
};
