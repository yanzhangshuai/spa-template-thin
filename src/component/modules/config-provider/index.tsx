import { defineComponent } from 'vue';

import 'dayjs/locale/zh-cn';

export default defineComponent({

  setup(_props, { slots }) {
    return () => (
      <div class="config-provider">
        { slots.default && slots.default() }
      </div>
    );
  }

});
