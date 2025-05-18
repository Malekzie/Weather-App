<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	export let timeOfDay: string = 'unknown';
	export let className: string = 'capitalize';
</script>

<Badge variant="outline" class={className}>{timeOfDay}</Badge>
