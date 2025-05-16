<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let {
		items
	}: {
		items: {
			title: string;
			url: string;
			icon?: any;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
		}[];
	} = $props();
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each items as mainItem (mainItem.title)}
			<a href={mainItem.url} class="w-full">
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet tooltipContent()}
							{mainItem.title}
						{/snippet}
						{#if mainItem.icon}
							<mainItem.icon />
						{/if}
						<span>{mainItem.title}</span>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</a>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
