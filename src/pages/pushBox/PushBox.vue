<template>
  <div class="pushbox">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Mesh from "./mesh";
import Controller from "./controller";
export default Vue.extend({
  created() {
    console.log("push box");
  },
  mounted() {
    const mesh = new Mesh({
      mapNumber: 1
    });

    console.log(mesh);
    this.$nextTick(() => {
      const canvasEl: HTMLCanvasElement = this.$refs
        .canvas as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D = canvasEl.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      console.log(ctx);

      const resizeInit = function(): void {
        const short = Math.min(window.innerWidth, window.innerHeight);
        canvasEl.width = canvasEl.height = Math.min(short - 10, 600);
      };
      resizeInit();

      mesh.render(ctx);
      const controller = new Controller({
        onPressUp() {
          mesh.moveUp();
          mesh.render(ctx);
          const isComplete = mesh.checkComplete();
          console.log(isComplete);
        },
        onPressDown() {
          mesh.moveDown();
          mesh.render(ctx);
          const isComplete = mesh.checkComplete();
          console.log(isComplete);
        },
        onPressLeft() {
          mesh.moveLeft();
          mesh.render(ctx);
          const isComplete = mesh.checkComplete();
          console.log(isComplete);
        },
        onPressRight() {
          mesh.moveRight();
          mesh.render(ctx);
          const isComplete = mesh.checkComplete();
          console.log(isComplete);
        },
        onResize() {
          resizeInit();
          mesh.render(ctx);
        }
      });
    });
  }
});
</script>

<style lang="scss" scoped>
.pushbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  canvas {
    border: 1px dashed #ccc;
  }
}
</style>

