<template>
  <!--<input v-input-mask v-input-mask.pattern="123" @input="change" />-->

  <input
    v-my-mask="bindedObject"
    data-mask="#-#---#"
    :value="value"
    ref="input"
  />

  <!--<input v-maska="bindedObject" data-maska="###-###" v-model="value" />-->
  <p>{{ binding }}</p>

  or {{ bindedObject.masked }} Unmasked value:
  {{ bindedObject.unmasked }}
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
      value: "123",
      binding: "12",
      test: { unmasked: "1212" },
      bindedObject: {
        masked: "",
        unmasked: "",
        completed: false,
      },
    };
  },
  mounted() {
    (this.$refs.input as HTMLInputElement).addEventListener("mask", (e) => {
      console.log(e);
    });
  },
  methods: {
    input() {
      console.log("from input event");
    },
  },
});
</script>

<style scoped></style>
