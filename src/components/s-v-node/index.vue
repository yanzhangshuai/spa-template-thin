<script lang="ts">
import type { PropType, VNodeChild } from 'vue'

import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    nodes: Object as PropType<VNodeChild>,
  },
  setup(props) {
    return () => props.nodes || null
  },
})
</script>
