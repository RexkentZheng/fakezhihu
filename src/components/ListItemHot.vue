<template>
  <div class="hot">
    <div class="hotItem-rank">
      <span :class="index > 2 ? 'backRank': 'frontRank'">{{index + 1}}</span>
    </div>
    <div class="hotItem-content">
      <a :href="item.target.link.url">
        <h2 class="hotItem-title">
          {{item.target.title_area.text}}
        </h2>
        <p class="hotItem-excerpt hotItem-excerpt-multiLine">
          {{item.target.excerpt_area.text}}
        </p>
      </a>
      <list-item-actions
        class="hotItem-actions"
        :metrics_area= "item.target.metrics_area"
        :showActionItems= "['hot', 'share']"
      />
    </div>
    <a class="hotItem-img" href="#">
      <img :src="item.target.image_area.url" alt="">
    </a>
  </div>
</template>
<script>
import ListItemActions from '@/components/ListItemActions';

export default {
  props: ['item', 'index'],
  components: {
    ListItemActions,
  }
};
</script>

