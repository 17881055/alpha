<template>
    <div>
        <Card title="多功能阅读器（pdf ods odp odt）">
            <viewer class="canvas-wrap"/>

        </Card>
    </div>

</template>
<script>
import Viewer from '_c/viewer';
export default {
  name: 'viewer_page',
  components: {
    Viewer
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style>
.text-right {
  text-align: right;
}
.m-b-5 {
  margin-bottom: 5px;
}
.m-t-5 {
  margin-top: 5px;
}

.m-r-5 {
  margin-right: 5px;
}
.page-wrap {
  text-align: right;
  margin: 10px 0;
}
.wrap {
  margin: 10px;
}

.canvas-wrap {
  width: 100%;
  height: 600px;
}
</style>
