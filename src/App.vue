<template>
  <!--<input v-input-mask v-input-mask.pattern="123" @input="change" />-->

  <input v-my-mask="'###-###'" v-model="value" />

  <!--<div v-masked-mask>
    <input />
    <input />
  </div>-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      value: "",
    };
  },
  methods: {
    input() {
      console.log("from input event");
    },
  },
});
</script>

<style scoped></style>
