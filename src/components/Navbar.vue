<script setup lang="ts">
import { RotateCcwIcon } from "lucide-vue-next";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import { ref } from "vue";

import Debug from "./Debug.vue";
import Details from "./Details.vue";
import { useLectures } from "@/composables/useLectures";

const { clearLectures } = useLectures();
const modalRef = ref<HTMLDialogElement | null>(null);

const openModal = () => modalRef.value?.showModal();
// const closeModal = () => modalRef.value?.close();
</script>
<template>
  <div class="navbar bg-base-100 gap-5 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">StatsVisu</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal items-center gap-0 px-1">
        <li>
          <!-- dark mode toggle -->
          <label class="swap swap-rotate">
            <input type="checkbox" class="theme-controller" value="mydark" />

            <MoonIcon class="swap-off" />
            <SunIcon class="swap-on" />
          </label>
        </li>
        <li>
          <button class="btn btn-ghost" @click="openModal">Data</button>

          <Teleport to="body">
            <dialog ref="modalRef" class="modal modal-center">
              <div class="modal-box">
                <!-- <form method="dialog">
                  <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
                </form> -->
                <div class="flex flex-col gap-4">
                  <h3 class="font-semibold">Inspect your parsed data</h3>
                  <Details />
                  <Debug />
                </div>
                <div class="modal-action">
                  <form method="dialog">
                    <div class="flex gap-6">
                      <button
                        @click="clearLectures"
                        class="btn btn-warning flex justify-center gap-1"
                      >
                        <RotateCcwIcon :size="16" :stroke-width="2.5" /> Reset
                      </button>
                      <button class="btn btn-neutral">Close</button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </Teleport>
        </li>
      </ul>
    </div>
  </div>
</template>
