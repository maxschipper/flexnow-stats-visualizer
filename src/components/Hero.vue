<script setup lang="ts">
import { CloudOffIcon } from "lucide-vue-next";

import FileInput from "./FileInput.vue";
</script>

<template>
  <!-- <div class="hero bg-base-200 min-h-screen"> -->
  <div class="hero min-h-dvh">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">FlexNow Stats Visualizer</h1>
        <p class="py-6">
          Use this tool to visualize the statistics of your own exams and compare yourself against
          the others.
        </p>
      </div>
      <div class="card bg-base-200 max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <FileInput />
          <div class="text-base-content/50 flex items-center gap-2 text-xs">
            <div class="badge badge-accent text-accent-content">
              <CloudOffIcon :size="16" />
              <!-- <ShieldCheckIcon :size="16" /> -->
              <!-- <LockKeyholeIcon :size="16" /> -->
              <!-- <FileLockIcon :size="16" /> -->
              <!-- <GlobeXIcon :size="16" /> -->
            </div>
            Processed locally in your browser.
            <!-- Processed locally in your browser. No data leaves your device. -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
