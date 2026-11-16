export const generateWgKeyPair = async (keyPair: CryptoKeyPair) => {
	const publicKey = new Uint8Array(await window.crypto.subtle.exportKey('raw', keyPair.publicKey));

	const privateKeyPkcs8 = new Uint8Array(
		await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey)
	);
	const privateKey = privateKeyPkcs8.slice(-32);

	return {
		publicKey: publicKey.toBase64({ alphabet: 'base64' }),
		privateKey: privateKey.toBase64({ alphabet: 'base64' })
	};
};
