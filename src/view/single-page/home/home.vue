<template>
  <div>

    <Row :gutter="20">
      <i-col span="8"
             v-for="(infor, i) in inforCardData"
             :key="`infor-${i}`"
             style="height: 200px;">
        <infor-card shadow
                    :color="infor.color"
                    :icon="infor.icon"
                    :icon-size="36">
          <count-to :end="infor.count"
                    count-class="count-style" />
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>

  </div>
</template>

<script>
import { getAppList } from '@/api/contract';
import InforCard from '_c/info-card';
import CountTo from '_c/count-to';
import { ChartPie, ChartBar } from '_c/charts';
import Example from './example.vue';
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data() {
    return {
      loading: false,
      totalCount: null,
      inforCardData: [
        {
          title: '应用',
          icon: 'md-person-add',
          count: 0,
          color: '#2d8cf0'
        },
        {
          title: '模版',
          icon: 'md-locate',
          count: 23,
          color: '#19be6b'
        },
        { title: '版本', icon: 'md-map', count: 112, color: '#9A66E4' }
      ]
    };
  },
  created() {
    this.getAppList();
  },
  mounted() {},
  methods: {
    getAppList() {
      this.loading = true;
      getAppList().then(res => {
        this.loading = false;
        this.inforCardData[0].count = this.totalCount =
          res.data.content.totalCount;
      });
    }
  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}

.welcome {
  padding: 20px;
  font-size: 50px;
}
</style>
