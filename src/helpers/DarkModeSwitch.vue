<template>
  <div class="theme-switch-wrapper">
    <label class="theme-switch" for="checkbox">
      <input type="checkbox" id="checkbox" />
      <div class="slider round"></div>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "DarkModeSwitch"
})
export default class DarkModeSwitch extends Vue {
  switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toggleSwitch: any = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );
    if (toggleSwitch) {
      const currentTheme = localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : null;

      if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);

        if (currentTheme === "dark") {
          toggleSwitch.checked = true;
        }
      }
      toggleSwitch.addEventListener("change", this.switchTheme, false);
    }
  }
}
</script>
<style lang="scss">
.theme-switch-wrapper {
  display: flex;
  align-items: center;

  em {
    margin-left: 10px;
    font-size: 1rem;
  }
}

.theme-switch {
  display: inline-block;
  height: 20px;
  position: relative;
  width: 40px;
}

.theme-switch input {
  display: none;
}

.slider {
  background-color: var(--inverted-bg-color);
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
}

.slider:before {
  background-color: var(--bg-color);
  bottom: 2px;
  content: "";
  height: 16px;
  left: 2px;
  position: absolute;
  transition: 0.4s;
  width: 16px;
}

input:checked + .slider {
  background-color: var(--inverted-bg-color);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
