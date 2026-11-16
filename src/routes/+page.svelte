<script lang="ts">
	import QRCode from 'qrcode';

	let input = $state('');

	let canvas = $state<HTMLCanvasElement | undefined>();

	$effect(() => {
		if (canvas) {
			if (input.trim()) {
				QRCode.toCanvas(canvas, input);
			} else {
				const ctx = canvas.getContext('2d');
				ctx?.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	});
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-1">
		Input:
		<input bind:value={input} class="border px-1 break-all" />
	</div>

	{#if input.trim()}
		<canvas bind:this={canvas}></canvas>
	{/if}
</div>
