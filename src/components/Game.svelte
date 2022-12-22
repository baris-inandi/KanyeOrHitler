<script lang="ts">
	import { fly, scale } from "svelte/transition";
	import getQuote from "../lib/getQuote";
	let [quote, person] = getQuote();
	let win: boolean | undefined;
	let quoteVisible = true;
	const WIN_DELAY = 2000;
	let selected = "Kanye";

	const postAnswer = () => {
		quoteVisible = false;
		setTimeout(() => {
			quoteVisible = true;
			[quote, person] = getQuote();
			win = undefined;
		}, WIN_DELAY);
	};
</script>

<div class="select-none">
	<div
		class="z-40 transition-opacity duration-500 fixed top-0 left-0 h-1/2 md:h-full w-full md:w-1/2 hover:opacity-80 opacity-90 bg-neutral-900"
		on:click={() => {
			if (quoteVisible) {
				person == "kanye" ? (win = true) : (win = false);
				postAnswer();
			}
		}}
		on:mouseover={() => {
			selected = "Kanye";
		}}
		on:focus={() => {
			selected = "Kanye";
		}}
		on:keypress
	/>
	<div
		class="z-40 transition-opacity duration-500 fixed top-1/2 md:top-0 left-0 md:right-0 md:left-auto h-1/2 md:h-full w-full md:w-1/2 hover:opacity-80 opacity-90 bg-neutral-900"
		on:mouseover={() => {
			selected = "Hitler";
		}}
		on:focus={() => {
			selected = "Hitler";
		}}
		on:click={() => {
			if (quoteVisible) {
				person == "hitler" ? (win = true) : (win = false);
				postAnswer();
			}
		}}
		on:keypress
	/>
	<div class="z-30 fixed top-0 left-0 w-full h-full flex flex-col md:flex-row">
		<div class="h-1/2 md:h-full w-full">
			<img class="h-full w-full object-cover" src="/kanye.webp" alt="Kanye West" />
		</div>
		<div class="h-1/2 md:h-full w-full">
			<img class="h-full w-full object-cover" src="/hitler.webp" alt="Adolf Hitler" />
		</div>
	</div>
	<div
		class="z-50 pointer-events-none fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white font-bold"
	>
		{#if win != undefined}
			<div
				class="text-3xl md:text-5xl drop-shadow-md w-full h-full fixed left-0 top-0 flex flex-col items-center justify-center"
				in:scale={{ duration: 300, delay: 100 }}
				out:scale={{ duration: 500 }}
			>
				{#if win}
					<div class="text-emerald-200">Correct!</div>
				{:else}
					<div class="text-orange-200">Wrong!</div>
				{/if}
				<div class="font-normal text-2xl capitalize">
					It was {person}
				</div>
			</div>
		{/if}
		{#if quoteVisible}
			<div
				class="text-3xl md:text-5xl drop-shadow-md w-full max-w-screen-md px-8 md:px-16"
				in:fly={{ y: 150, duration: 350, delay: 50 }}
				out:scale
			>
				<div class="w-full text-xl">Who said it: Kanye or Hitler?</div>
				<div class="flex">
					<span class="w-0" style="transform:translateX(-0.5em)">"</span>
					<p class="of">{quote + '"'}</p>
				</div>
				<div class="hidden md:block">
					<div class="text-lg font-normal w-full pt-4 flex">
						<span style="padding-right: 0.4em;"> Click to select: </span>
						{#if selected == "Kanye"}
							<div
								class="w-0 font-bold"
								in:fly={{ y: 40, duration: 250 }}
								out:fly={{ y: -40, duration: 250 }}
							>
								Kanye
							</div>
						{:else if selected == "Hitler"}
							<div
								class="w-0 font-bold"
								in:fly={{ y: 40, duration: 250 }}
								out:fly={{ y: -40, duration: 250 }}
							>
								Hitler
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style scoped>
	.of {
		-webkit-box-orient: vertical;
		display: -webkit-box;
		-webkit-line-clamp: 6;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
	}
</style>
