import { defineComponent } from 'vue';
import { useDemoService } from '@/service/modules/demo';

export default defineComponent({
  setup() {
    const demoService = useDemoService();

    let data = $ref<string>();

    demoService.hello()
      .then((res) => {
        data = res;
      })
      .catch((err: unknown) => {
        console.error(err);
      });

    return () => (<div>HTTP请求数据：{ data }</div>);
  }
});
