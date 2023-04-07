<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import PhotoSwipeGallery from '$lib/components/PhotoSwipeGallery.svelte';
	import type { GalleryItem } from '$lib/components/PhotoSwipeGallery.svelte';
	import Image from 'sveltekit-image';

	export let data: PageData;

	$: primaryPhoto = data.album.photoset.photo.find(
		(photo) => photo.id === data.albumInfo.photoset.primary
	)!;

	$: title = `${data.albumInfo.photoset.title._content} - Album | Coding Shutter`;
	$: description = data.albumInfo.photoset.description._content;

	$: images = data.album.photoset.photo.map((photo) => {
		return {
			src: `/api/_image?${new URLSearchParams({
				url: photo.url_o,
				w: photo.width_o.toString(),
				q: '100'
			}).toString()}`,
			width: photo.width_o,
			height: photo.height_o,
			alt: photo.title,
			thumbnail: {
				src: photo.url_c,
				width: photo.width_c,
				height: photo.height_c
			}
		} as GalleryItem;
	});
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Facebook Meta Tags -->
	<meta
		property="og:url"
		content="https://coding-shutter.blog/albums/{data.albumInfo.photoset.id}"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{data.albumInfo.photoset.title._content} - Album" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={primaryPhoto.url_c} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="coding-shutter.blog" />
	<meta
		property="twitter:url"
		content="https://coding-shutter.blog/albums/{data.albumInfo.photoset.id}"
	/>
	<meta name="twitter:title" content="{data.albumInfo.photoset.title._content} - Album" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={primaryPhoto.url_c} />
</svelte:head>

<div class="container">
	<Image
		class="title-img"
		src={primaryPhoto.url_w}
		alt={data.album.photoset.title}
		width={primaryPhoto.width_w}
		height={primaryPhoto.height_w}
	/>
	<h1 class="title">
		{data.albumInfo.photoset.title._content}
	</h1>
	<p class="description">
		{data.albumInfo.photoset.description._content}
	</p>
</div>
<section in:fade={{ duration: 300 }}>
	<PhotoSwipeGallery {images} />
</section>

<style>
	.container {
		padding: 2rem;
		display: grid;
		grid-template-areas:
			'image title'
			'image description';

		grid-template-columns: minmax(400px, 1fr) 1fr;
		grid-template-rows: 60px 1fr;

		gap: 30px;
	}

	.title {
		grid-area: title;
		margin: 0;
	}

	.description {
		grid-area: description;
		margin: 0;
	}

	.container :global(.title-img) {
		grid-area: image;
		align-self: start;
		justify-self: self-end;
		width: 400px;
		height: auto;
		object-fit: contain;
	}

	section {
		padding: 4rem;
		max-width: 1600px;
		margin: 0 auto;
	}

	@media (max-width: 767px) {
		.container {
			display: grid;
			grid-template-areas:
				'title'
				'description';
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}

		.container :global(.title-img) {
			display: none;
		}

		section {
			padding: 1rem;
		}
	}
</style>
