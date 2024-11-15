<script lang="ts">
import type { PropType, VNode } from 'vue'

import { defineComponent, h } from 'vue'

export default defineComponent({
  functional: true,
  props     : {
    nodes: [Array, Object, String] as PropType<VNode | Array<VNode> | string>,
  },
  render: (props: { nodes: VNode | Array<VNode> | string }) => {
    return props.nodes || h('')
  },
})
</script>
