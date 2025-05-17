<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
</script>

<Tabs.Root>
	<Tabs.List>
		<Tabs.Trigger value="daily">Daily</Tabs.Trigger>
		<Tabs.Trigger value="hourly">Hourly</Tabs.Trigger>
		<Tabs.Trigger value="monthly">Monthly</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="daily">
		<p>Daily Weather Content</p>
	</Tabs.Content>

	<Tabs.Content value="hourly">
		<p>Hourly Weather Content</p>
	</Tabs.Content>

	<Tabs.Content value="monthly">
		<p>Monthly Weather Content</p>
	</Tabs.Content>
</Tabs.Root>
