<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
        <div class="selected" :class="{ open: open }" @click="open = !open">
            {{ selected }}
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div
            v-for="(option, i) of options"
            :key="i"
            @click="
            selected = option;
            open = false;
            $emit('option-input', option);
            "
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  emits: ['option-input'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },

};
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  text-align: left;
  outline: none;
  line-height: 54px;
}

.custom-select .selected {
  padding: 0 3em 0 1em;
  cursor: pointer;
  user-select: none;
  border-left: 2px solid $tertiary;
  border-right: 2px solid $tertiary;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 25px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: $tertiary transparent transparent transparent;
}

.custom-select .items {
  background-color: #FFF;
  border-radius: 0px 0px 15px 15px;
  overflow: hidden;
  border: 2px solid $tertiary;
  border-top: none;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  border-bottom: 2px solid $tertiary ;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  &:last-child {
      border-bottom: none;
  }
  &:first-child {
      border-top: 2px solid $tertiary;
  }
}

.selectHide {
  display: none;
}

</style>