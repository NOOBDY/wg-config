<script lang="ts">
	import QRCode from 'qrcode';
	import type { PageProps } from './$types';
	import { generateConfig } from '#lib/config.ts';

	let { data }: PageProps = $props();

	let address = $state('');
	let dns = $state('1.1.1.1');
	let serverPublicKey = $state('');
	let serverEndpoint = $state('');
	let allowedIPs = $state('0.0.0.0/0');

	let canvas = $state<HTMLCanvasElement | undefined>();

	let qrcodeToggle = $state(true);

	const config = $derived(() => {
		if (address && dns && serverPublicKey && serverPublicKey && allowedIPs) {
			return generateConfig(
				data.privateKey,
				address,
				dns,
				serverPublicKey,
				serverEndpoint,
				allowedIPs
			);
		}
	});

	$effect(() => {
		if (canvas) {
			const c = config();

			if (c) {
				QRCode.toCanvas(canvas, c, { width: 400, margin: 2 });
			} else {
				const ctx = canvas.getContext('2d');
				ctx?.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	});

	const handleCopyPublicKey = async () => {
		await navigator.clipboard.writeText(data.publicKey);
	};

	const handleCopyConfig = async () => {
		const c = config();
		if (c) {
			await navigator.clipboard.writeText(c);
		}
	};
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-1">
		Server public key:
		<input bind:value={serverPublicKey} class="border px-1 break-all" />

		Server endpoint:
		<input
			bind:value={serverEndpoint}
			class="border px-1 break-all"
			placeholder="vpn.example.com:51280"
		/>

		Allocated address:
		<input bind:value={address} class="border px-1 break-all" placeholder="10.0.0.2/24" />

		Allowed IPs: (0.0.0.0/0 for full tunneling)
		<input bind:value={allowedIPs} class="border px-1 break-all" />

		DNS:
		<input bind:value={dns} class="border px-1 break-all" />

		Client public key:
		<code class="break-all">{data.publicKey}</code>

		<div class="flex items-center justify-center">
			<button onclick={handleCopyPublicKey} class="cursor-pointer border px-4 py-1 hover:outline">
				Copy
			</button>
		</div>
	</div>

	{#if config()}
		{#if qrcodeToggle}
			<div class="flex flex-col gap-1">
				Generated QR code:
				<div class="flex justify-center">
					<canvas bind:this={canvas}></canvas>
				</div>
			</div>
		{:else}
			<div class="flex flex-col gap-1">
				<p>Generated config:</p>
				<pre>{config()}</pre>
			</div>

			<div class="flex items-center justify-center">
				<button onclick={handleCopyConfig} class="cursor-pointer border px-4 py-1 hover:outline">
					Copy
				</button>
			</div>
		{/if}

		<div class="flex items-center justify-center">
			<button
				onclick={() => (qrcodeToggle = !qrcodeToggle)}
				class="cursor-pointer border px-4 py-1 hover:outline"
			>
				Toggle Raw Config
			</button>
		</div>
	{/if}

	<div class="flex flex-col items-center">
		<p class="font-bold text-red-600">
			WARNING: Do not show your generated QR code or config to others!
		</p>
		<p>
			For more detailed config generation please refer to:
			<a href="https://www.wireguardconfig.com/" class="underline">Wireguard Config Generator</a>
		</p>
	</div>
</div>
