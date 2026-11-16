export const generateConfig = (
	privateKey: string,
	address: string,
	dns: string,
	serverPublicKey: string,
	serverEndpoint: string,
	allowedIPs: string
) => {
	return `[Interface]
PrivateKey = ${privateKey}
Address = ${address}
DNS = ${dns}

[Peer]
PublicKey = ${serverPublicKey}
Endpoint = ${serverEndpoint}
AllowedIPs = ${allowedIPs}
PersistentKeepalive = 25`;
};
